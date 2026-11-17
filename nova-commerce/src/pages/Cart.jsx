import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../data/products";

export default function Cart() {
  const { cart, subtotal, updateQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();
  const shipping = subtotal === 0 || subtotal >= 4999 ? 0 : 149;
  const total = subtotal + shipping;
  return <main className="page-shell cart-page"><div className="page-title"><span className="eyebrow">YOUR SELECTION</span><h1>Shopping bag<span>.</span></h1><p>{cart.length} unique item{cart.length!==1?"s":""} in your bag</p></div>
    {cart.length===0 ? <div className="empty-state"><ShoppingBag size={38}/><h2>Your bag is taking a breather.</h2><p>Find something useful, beautiful, or a little bit of both.</p><Link to="/shop" className="btn btn-dark">Explore the collection <ArrowRight size={16}/></Link></div> :
    <div className="cart-layout"><div className="cart-items">{cart.map(item=><div className="cart-item" key={item.id}><Link to={`/product/${item.id}`} className="cart-thumb"><img src={item.image} alt={item.name}/></Link><div className="cart-item-info"><span className="eyebrow">{item.category}</span><Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link><span className="cart-color">Colour: {item.color}</span><div className="quantity cart-quantity"><button onClick={()=>updateQuantity(item.id,item.quantity-1)}><Minus size={13}/></button><span>{item.quantity}</span><button onClick={()=>updateQuantity(item.id,item.quantity+1)}><Plus size={13}/></button></div></div><div className="cart-item-end"><b>{formatPrice(item.price*item.quantity)}</b><button onClick={()=>removeFromCart(item.id)} aria-label="Remove item"><X size={17}/></button></div></div>)}</div>
      <aside className="order-summary"><span className="eyebrow">THE BREAKDOWN</span><h2>Order summary</h2><div className="summary-line"><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div><div className="summary-line"><span>Delivery</span><b>{shipping===0?"Complimentary":formatPrice(shipping)}</b></div>{subtotal<4999&&<p className="shipping-hint">You're {formatPrice(4999-subtotal)} away from complimentary delivery.</p>}<div className="summary-total"><span>Total</span><b>{formatPrice(total)}</b></div><button className="btn btn-dark checkout-btn" onClick={()=>navigate("/checkout")}>Continue to checkout <ArrowRight size={17}/></button><div className="secure-note"><ShieldCheck size={16}/> Secure checkout · Demo experience</div><Link to="/shop" className="continue-shopping">Continue shopping</Link></aside></div>}
  </main>;
}