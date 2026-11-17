import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
export default function Wishlist() {
  const { wishlist } = useShop();
  return <main className="page-shell"><div className="page-title"><span className="eyebrow">A LITTLE LIST OF LOVES</span><h1>Saved for later<span>.</span></h1><p>{wishlist.length} item{wishlist.length!==1?"s":""} saved</p></div>{wishlist.length ? <div className="product-grid shop-grid">{wishlist.map(p=><ProductCard key={p.id} product={p}/>)}</div> : <div className="empty-state"><Heart size={36}/><h2>Your saved list is empty.</h2><p>Tap the heart on anything that catches your eye.</p><Link to="/shop" className="btn btn-dark">Explore products</Link></div>}</main>;
}