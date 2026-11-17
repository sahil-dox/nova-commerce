import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0,0), [pathname]);
  return null;
}
export default function App() {
  return <><ScrollToTop/><Header/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/shop" element={<Shop/>}/>
    <Route path="/product/:id" element={<Product/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/checkout" element={<Checkout/>}/>
    <Route path="/wishlist" element={<Wishlist/>}/>
    <Route path="*" element={<main className="empty-state"><h1>Page not found</h1><a href="/" className="text-link">Back home</a></main>}/>
  </Routes><Footer/><Toast/></>;
}