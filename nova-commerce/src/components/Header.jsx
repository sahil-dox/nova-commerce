import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Heart, Menu, X, ArrowUpRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Header() {
  const { cartCount, wishlist } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const submit = e => { e.preventDefault(); navigate(`/shop?search=${encodeURIComponent(query)}`); setSearchOpen(false); setMenuOpen(false); };
  return <>
    <div className="announcement">A little something extra — complimentary shipping on orders over ₹4,999 <ArrowUpRight size={13}/></div>
    <header className="header">
      <button className="icon-btn mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      <Link to="/" className="logo">NOVA<span>.</span></Link>
      <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
        <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop all</NavLink>
        <NavLink to="/shop?category=Home" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/shop?category=Tech" onClick={() => setMenuOpen(false)}>Technology</NavLink>
        <NavLink to="/shop?category=Accessories" onClick={() => setMenuOpen(false)}>Accessories</NavLink>
      </nav>
      <div className="header-actions">
        <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search/></button>
        <Link className="icon-btn wishlist-link" to="/wishlist" aria-label="Wishlist"><Heart/><span className="count">{wishlist.length}</span></Link>
        <Link className="icon-btn bag-link" to="/cart" aria-label="Shopping bag"><ShoppingBag/><span className="count">{cartCount}</span></Link>
      </div>
      {searchOpen && <form className="search-popover" onSubmit={submit}><Search size={17}/><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." /><button type="submit">Search</button></form>}
    </header>
  </>;
}