import { Check } from "lucide-react";
import { useShop } from "../context/ShopContext";
export default function Toast() {
  const { toast } = useShop();
  return toast ? <div className="toast"><span><Check size={15}/></span>{toast}</div> : null;
}