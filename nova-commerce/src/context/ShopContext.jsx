import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ShopContext = createContext(null);
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => read("nova-cart", []));
  const [wishlist, setWishlist] = useState(() => read("nova-wishlist", []));
  const [toast, setToast] = useState("");
  useEffect(() => localStorage.setItem("nova-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("nova-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const addToCart = (product, quantity = 1) => {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      return found
        ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }];
    });
    setToast(`${product.name} added to bag`);
  };
  const updateQuantity = (id, quantity) => setCart(current => quantity < 1 ? current.filter(x => x.id !== id) : current.map(x => x.id === id ? { ...x, quantity } : x));
  const removeFromCart = id => setCart(current => current.filter(x => x.id !== id));
  const toggleWishlist = product => {
    setWishlist(current => current.some(x => x.id === product.id) ? current.filter(x => x.id !== product.id) : [...current, product]);
    setToast(wishlist.some(x => x.id === product.id) ? "Removed from saved items" : "Saved for later");
  };
  const value = useMemo(() => ({
    cart, wishlist, toast, setToast, addToCart, updateQuantity, removeFromCart, toggleWishlist,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }), [cart, wishlist, toast]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
export const useShop = () => useContext(ShopContext);