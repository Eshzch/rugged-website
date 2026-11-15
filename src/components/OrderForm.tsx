"use client";
import { useState, type FormEvent } from "react";
export default function OrderForm() {
 const [busy,setBusy]=useState(false); const [status,setStatus]=useState("");
 async function submit(e:FormEvent<HTMLFormElement>){
   e.preventDefault(); if(busy)return;
   const form=e.currentTarget; const data=new FormData(form);
   const image=data.get("reference");
   if(image instanceof File&&image.size>4*1024*1024){setStatus("Please upload an image smaller than 4 MB.");return;}
   setBusy(true);setStatus("");
   try{
     const res=await fetch("/api/requests",{method:"POST",body:data});
     const payload=await res.json();
     if(!res.ok)throw new Error(payload.error||"Unable to send request.");
     setStatus("Your idea is on its way! Esh can now review your request and get back to you.");form.reset();
   }catch(err){setStatus(err instanceof Error?err.message:"Something went wrong. Please try again.");}
   finally{setBusy(false);}
 }
 return <form onSubmit={submit} className="form-grid">
  <label className="field">Your name *<input name="name" minLength={2} maxLength={100} placeholder="Your name" required /></label>
  <label className="field">Email address *<input type="email" name="email" maxLength={254} placeholder="you@example.com" required /></label>
  <label className="field">Phone / WhatsApp (optional)<input type="tel" name="phone" maxLength={30} placeholder="+91 ..." /></label>
  <label className="field">Preferred size *<select name="size" required defaultValue=""><option value="" disabled>Select a size</option><option>2 × 2 ft</option><option>3 × 3 ft</option><option>4 × 4 ft</option><option>Custom dimensions</option></select></label>
  <label className="field full">Tell us your rug idea *<textarea name="description" required minLength={15} maxLength={3000} placeholder="Colors, design, dimensions, references—tell us everything!" /></label>
  <label className="field full">Upload reference image (optional, PNG/JPG/WEBP, max 4MB)<input name="reference" type="file" accept="image/png,image/jpeg,image/webp" /></label>
  <label className="field full" style={{flexDirection:"row",alignItems:"start",fontWeight:400}}><input name="consent" type="checkbox" required style={{width:"auto",marginTop:3}} /> I agree that rugged. may use my contact details and design request to respond to my enquiry. *</label>
  <div className="field full"><button className="button" disabled={busy} type="submit">{busy?"Sending your idea…":"Send my rug idea ↗"}</button><p className="form-disclaimer">No payment required. Each request is a quote enquiry, not an order confirmation. We will only begin production after discussing the design and price with you.</p>{status&&<p role="status" className="form-status">{status}</p>}</div>
 </form>;
}
