import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Minus, Plus, ShieldCheck, Truck, Star } from "lucide-react";
import { products, formatPrice } from "../data/products";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  if (!product) return <div className="empty-state"><h2>Product not found</h2><Link to="/shop" className="text-link">Back to shop</Link></div>;
  const saved = wishlist.some(x=>x.id===product.id);
  return <main className="page-shell product-detail">
    <Link to="/shop" className="back-link"><ArrowLeft size={15}/> Back to collection</Link>
    <div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.name}/><span className="detail-image-note">NOVA / OBJECT NO. {String(product.id).padStart(3,"0")}</span></div><div className="detail-info"><span className="eyebrow">{product.category.toUpperCase()} / NOVA EDITION</span><h1>{product.name}</h1><div className="detail-rating"><Star size={14} fill="currentColor"/> {product.rating} <span>({product.reviews} reviews)</span></div><div className="detail-price">{formatPrice(product.price)} {product.oldPrice>0&&<del>{formatPrice(product.oldPrice)}</del>}</div><p className="detail-description">{product.description}</p><div className="detail-spec"><span>Colour</span><b>{product.color}</b></div><div className="detail-spec"><span>Availability</span><b className="in-stock">{product.stock>0?"In stock":"Out of stock"}</b></div><div className="purchase-row"><div className="quantity"><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={14}/></button><span>{qty}</span><button onClick={()=>setQty(qty+1)}><Plus size={14}/></button></div><button className="btn btn-dark add-detail" onClick={()=>addToCart(product,qty)}>Add to bag — {formatPrice(product.price*qty)}</button><button className={`detail-heart ${saved?"is-saved":""}`} onClick={()=>toggleWishlist(product)}><Heart fill={saved?"currentColor":"none"}/></button></div><div className="detail-perks"><div><Truck size={17}/><span>Complimentary delivery over ₹4,999</span></div><div><ShieldCheck size={17}/><span>Secure checkout & easy returns</span></div></div><button className="text-link continue-link" onClick={()=>navigate("/cart")}>Go to your bag →</button></div></div>
    <section className="section related-section"><div className="section-heading"><div><span className="eyebrow">MORE TO DISCOVER</span><h2>You may also like<span>.</span></h2></div></div><div className="product-grid">{products.filter(p=>p.id!==product.id).slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  </main>;
}