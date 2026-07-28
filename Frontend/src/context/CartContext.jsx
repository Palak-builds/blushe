import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) refreshCart();
    else setCart({ items: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await api.post("/cart", { productId, quantity });
    setCart(res.data);
  };

  const updateQuantity = async (productId, quantity) => {
    const res = await api.put(`/cart/${productId}`, { quantity });
    setCart(res.data);
  };

  const removeFromCart = async (productId) => {
    const res = await api.delete(`/cart/${productId}`);
    setCart(res.data);
  };

  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.items.reduce(
    (sum, i) => sum + i.priceAtAdd * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, updateQuantity, removeFromCart, cartCount, cartTotal, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
