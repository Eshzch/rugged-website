import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";
const allowedSizes = new Set(["2 × 2 ft", "3 × 3 ft", "4 × 4 ft", "Custom dimensions"]);
const allowedTypes = new Set(["image/jpeg","image/png","image/webp"]);
function field(data:FormData,key:string){const val=data.get(key);return typeof val==="string"?val.trim():"";}
export async function POST(req:NextRequest){
 try{
  const length=Number(req.headers.get("content-length")||"0");
  if(length>5*1024*1024)return NextResponse.json({error:"The request is too large (5MB maximum)."}, {status:413});
  const data=await req.formData();
  const name=field(data,"name"),email=field(data,"email"),phone=field(data,"phone"),size=field(data,"size"),description=field(data,"description"),consent=field(data,"consent");
  if(name.length<2||name.length>100||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||phone.length>30||!allowedSizes.has(size)||description.length<15||description.length>3000||consent!=="on")return NextResponse.json({error:"Please check the required fields and consent."},{status:400});
  const upload=data.get("reference"); const image=upload instanceof File&&upload.size>0?upload:null;
  if(image&&(!allowedTypes.has(image.type)||image.size>4*1024*1024))return NextResponse.json({error:"Upload a JPG, PNG or WEBP image under 4 MB."},{status:400});
  const url=process.env.SUPABASE_URL,secret=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!secret)return NextResponse.json({error:"The order form is being configured. Please try again later."},{status:503});
  const supabase=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
  const id=crypto.randomUUID();let imagePath:string|null=null;
  if(image){const bytes=new Uint8Array(await image.arrayBuffer());
   const signature=Array.from(bytes.slice(0,12));
   const jpg=signature[0]===255&&signature[1]===216&&signature[2]===255;
   const png=signature.slice(0,8).join(",")==="137,80,78,71,13,10,26,10";
   const webp=String.fromCharCode(...signature.slice(0,4))==="RIFF"&&String.fromCharCode(...signature.slice(8,12))==="WEBP";
   if(!((image.type==="image/jpeg"&&jpg)||(image.type==="image/png"&&png)||(image.type==="image/webp"&&webp)))return NextResponse.json({error:"The uploaded file is not a valid image."},{status:400});
   imagePath=`requests/${id}.${image.type==="image/png"?"png":image.type==="image/webp"?"webp":"jpg"}`;
   const stored=await supabase.storage.from("rug-references").upload(imagePath,bytes,{contentType:image.type,upsert:false});
   if(stored.error)return NextResponse.json({error:"Could not store the reference image. Please retry."},{status:500});
  }
  const {error}=await supabase.from("rug_requests").insert({id,name,email,phone:phone||null,size,description,reference_path:imagePath,status:"new"});
  if(error){if(imagePath)await supabase.storage.from("rug-references").remove([imagePath]);return NextResponse.json({error:"Could not save your request. Please retry."},{status:500});}
  return NextResponse.json({ok:true,requestId:id},{status:201});
 }catch{return NextResponse.json({error:"Unable to process this request. Please try again."},{status:400});}
}
