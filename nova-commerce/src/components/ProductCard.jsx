import { Heart, ShoppingBag, Star, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const saved = wishlist.some(item => item.id === product.id);
  return <article className="product-card">
    <div className="product-image-wrap">
      <Link to={`/product/${product.id}`} className="product-image"><img src={product.image} alt={product.name} loading="lazy"/></Link>
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <button className={`heart-btn ${saved ? "is-saved" : ""}`} onClick={() => toggleWishlist(product)} aria-label="Save product"><Heart size={17} fill={saved ? "currentColor" : "none"}/></button>
      <button className="quick-add" onClick={() => addToCart(product)}><ShoppingBag size={15}/> Quick add</button>
    </div>
    <div className="product-meta"><span>{product.category}</span><span className="rating"><Star size={12} fill="currentColor"/> {product.rating}</span></div>
    <Link to={`/product/${product.id}`} className="product-name">{product.name}<ArrowUpRight size={15}/></Link>
    <div className="price-row"><strong>{formatPrice(product.price)}</strong>{product.oldPrice > 0 && <del>{formatPrice(product.oldPrice)}</del>}</div>
  </article>;
}