import { ArrowUpRight, Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  return <footer className="footer">
    <div className="footer-top"><div><Link to="/" className="logo footer-logo">NOVA<span>.</span></Link><p>Thoughtful objects. Better everyday.</p></div><div className="newsletter"><span className="eyebrow">THE NOVA LETTER</span><h3>Good things, occasionally.</h3><p>New arrivals, considered edits and notes from our world.</p><form onSubmit={e => {e.preventDefault(); alert("Thanks for subscribing to NOVA.");}}><input type="email" required placeholder="Your email address"/><button aria-label="Subscribe"><ArrowUpRight/></button></form></div></div>
    <div className="footer-bottom"><span>© 2026 NOVA Studio. All rights reserved.</span><div className="footer-links"><Link to="/shop">Shop</Link><Link to="/cart">Shipping & returns</Link><Link to="/wishlist">Saved items</Link></div><div className="socials"><Instagram/><Facebook/><Youtube/></div></div>
  </footer>;
}