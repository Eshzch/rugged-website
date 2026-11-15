import OrderForm from "@/components/OrderForm";
import { ArrowRight, Sparkles } from "lucide-react";

const collections = [
 {title:"Cartoon Collection",subtitle:"Character energy",mark:"✳",className:"cartoon"},
 {title:"Retro Collection",subtitle:"Arcade nostalgia",mark:"GAME\nON",className:"retro"},
 {title:"Octopus Collection",subtitle:"Under-the-sea whimsy",mark:"✿",className:"octopus"},
 {title:"Music Collection",subtitle:"For the vinyl lovers",mark:"◉",className:"music"}
];
const looks=[
 {label:"Your own logo",mark:"rugged.",className:"look-logo"},
 {label:"Retro classics",mark:"❽",className:"look-eight"},
 {label:"Flower power",mark:"✿",className:"look-flower"},
 {label:"Bold shapes",mark:"✳",className:"look-leaf"}
];
function Logo({small=false}:{small?:boolean}) {
 return <span className={small?"brand-logo small":"brand-logo"} aria-label="Rugged">Rugged</span>;
}
export default function Home(){return <main>
 <div className="top-banner"><span aria-hidden="true">✦</span> FREE SHIPPING ON ORDERS ABOVE ₹999 <span aria-hidden="true">✦</span></div>
 <header className="site-header"><div className="header-inner wrap"><a href="#" className="header-brand" aria-label="Rugged home"><Logo small /></a>
 <nav className="main-navigation" aria-label="Main navigation"><a href="#collections">Shop <span aria-hidden="true">⌄</span></a><a href="#about">About</a><a href="#contact">Contact</a></nav>
 <a href="#custom" className="header-cta">Custom rug <ArrowRight size={16}/></a></div></header>
 <section className="hero-rework" aria-labelledby="hero-title"><div className="hero-text">
 <span className="hero-twinkle twinkle-1" aria-hidden="true">✦</span><div className="hero-logo"><Logo /></div>
 <h1 id="hero-title">Tufted Rugs for<br/>Real Ones.</h1><span className="hero-swoosh" aria-hidden="true"/>
 <a className="cream-button" href="#collections">Shop the Collection <ArrowRight size={17}/></a>
 </div><div className="hero-visual"><div className="hero-visual-bg"/><div className="hero-rug" role="img" aria-label="Illustration of a handmade smiling rug"><span>☺</span></div><span className="hero-visual-star" aria-hidden="true">✦</span><p>MADE TO BE YOURS ♡</p></div></section>
 <section id="collections" className="collections-section"><div className="collections-grid wrap"><div className="collection-intro"><h2 className="display-type">Our<br/>Collections<span>✦</span></h2><p>Bold designs. Soft textures.<br/>Made to stand out.</p><a href="#custom" className="outline-button">Explore All <ArrowRight size={15}/></a></div>
 {collections.map((item)=><a key={item.title} href="#custom" className="collection-card"><div className={"collection-image "+item.className}><span className="rug-symbol">{item.mark}</span></div><h3>{item.title}</h3><span>Request a rug <ArrowRight size={13}/></span></a>)}</div>
 <p className="collection-caption wrap">Design concepts shown for inspiration. Actual rugs are made to order after Esh confirms your design and quote.</p>
 </section>
 <section className="about-section" id="about"><div className="about-copy"><span className="about-star" aria-hidden="true">✦</span><h2 className="display-type">About<br/>Rugged</h2><p>Rugged is a tufted rug brand for the bold, the nostalgic and the a little bit chaotic.</p><p>We turn pop culture, colour and creativity into rugs — handmade, full of character and completely your own.</p><a className="cream-button" href="#custom">Make your own <ArrowRight size={16}/></a></div><div className="about-visual"><div className="toadstool"><span className="mushroom-top">✿</span><span className="mushroom-bottom">☺</span></div></div></section>
 <section className="looks-section"><div className="looks-grid wrap"><div className="looks-intro"><h2 className="display-type">Rugged<br/>Looks Better<br/>In Your Space</h2><span className="looks-underline" aria-hidden="true"/></div>{looks.map((item)=><div className={"look-card "+item.className} key={item.label}><span className="look-symbol" aria-hidden="true">{item.mark}</span><span className="sr-only">{item.label}</span></div>)}</div></section>
 <section id="custom" className="quote-section"><div className="wrap quote-inner"><div className="quote-intro"><p className="eyebrow-light"><Sparkles size={17}/> YOUR RUG. YOUR RULES.</p><h2 className="display-type">Got an idea?<br/>Let&apos;s tuft it.</h2><p>Send Esh a reference, choose your size, and tell us the vibe. We&apos;ll get back to you with a custom quote — no payment required yet.</p><div className="quote-doodle" aria-hidden="true">✿</div></div><div className="quote-card"><h3>Make it yours ♡</h3><OrderForm/></div></div></section>
 <footer className="footer-rework" id="contact"><div className="wrap footer-top"><div className="footer-brand"><Logo small/><p>Tufted with love. Made to stand out.</p></div><div className="footer-news"><h3>Stay in the loop</h3><p>New rug drops and custom creations coming soon.</p><a className="newsletter-link" href="#custom">Have an idea? Start a request <ArrowRight size={17}/></a></div><div className="footer-nav"><a href="#collections">Shop</a><a href="#about">About</a><a href="#custom">Custom rugs</a><a href="#contact" aria-label="Contact">Contact</a></div></div><div className="wrap footer-bottom"><small>© {new Date().getFullYear()} Rugged. All rights reserved.</small><small>Tufted with love. ♡</small></div></footer>
 </main>}
