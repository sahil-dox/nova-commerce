import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(25000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const category = params.get("category") || "All";
  const setCategory = value => { const next = new URLSearchParams(params); value === "All" ? next.delete("category") : next.set("category", value); setParams(next); };
  const filtered = useMemo(() => {
    let list = products.filter(p => (category === "All" || p.category === category) && p.price <= maxPrice && `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === "price-low") list = [...list].sort((a,b) => a.price-b.price);
    if (sort === "price-high") list = [...list].sort((a,b) => b.price-a.price);
    if (sort === "rating") list = [...list].sort((a,b) => b.rating-a.rating);
    return list;
  }, [category, maxPrice, search, sort]);
  return <main className="page-shell">
    <div className="shop-hero"><span className="eyebrow">THE NOVA COLLECTION</span><h1>Good things,<br/><em>well chosen.</em></h1><p>Useful objects and everyday upgrades, made to live with.</p></div>
    <div className="shop-toolbar"><div className="category-pills">{categories.map(c => <button key={c} className={category===c?"active":""} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="toolbar-right"><span>{filtered.length} products</span><button className="filter-toggle" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={15}/> Filters</button><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></div></div>
    {filtersOpen && <div className="filter-panel"><div><label>Search products</label><div className="filter-search"><Search size={15}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name or category"/></div></div><div className="price-filter"><label>Maximum price: ₹{maxPrice.toLocaleString("en-IN")}</label><input type="range" min="1000" max="25000" step="500" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/></div><button className="clear-filter" onClick={()=>{setSearch("");setMaxPrice(25000);setCategory("All");}}>Clear all <X size={14}/></button></div>}
    <div className="product-grid shop-grid">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div>
    {filtered.length===0 && <div className="empty-state"><Search size={30}/><h3>No products found</h3><p>Try adjusting your search or filters.</p><button className="btn btn-dark" onClick={()=>{setSearch("");setMaxPrice(25000);setCategory("All");}}>Clear filters</button></div>}
  </main>;
}