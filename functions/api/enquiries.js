const reply=(status,body)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function onRequestPost({request,env}) {
 if(!env.ENQUIRIES_DB)return reply(503,{error:'Enquiries are temporarily unavailable'});
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return reply(403,{error:'Origin rejected'});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply(415,{error:'JSON required'});
 let text='';const reader=request.body?.getReader();if(!reader)return reply(400,{error:'Missing body'});
 let size=0;const decoder=new TextDecoder();while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>12000){await reader.cancel();return reply(413,{error:'Too large'});}text+=decoder.decode(value,{stream:true});}text+=decoder.decode();
 let data;try{data=JSON.parse(text)}catch{return reply(400,{error:'Invalid request'})}
 if(!data||['name','email','company','message'].some(k=>typeof data[k]!=='string'||!data[k].trim()||data[k].length>2000)||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))return reply(400,{error:'Check your details'});
 try{
 const recent=await env.ENQUIRIES_DB.prepare("SELECT count(*) AS total FROM business_enquiries WHERE created_at > datetime('now','-1 hour')").first();
 if(recent.total>=100)return reply(429,{error:'Please try later'});
 await env.ENQUIRIES_DB.prepare('INSERT INTO business_enquiries(name,email,company,message) VALUES(?,?,?,?)').bind(data.name.trim(),data.email.trim(),data.company.trim(),data.message.trim()).run();return reply(201,{saved:true});
 }catch{return reply(503,{error:'Please try later'})}
}
export const onRequestGet=()=>reply(405,{error:'Method not allowed'});
