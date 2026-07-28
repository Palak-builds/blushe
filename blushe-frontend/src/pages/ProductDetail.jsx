import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="max-w-6xl mx-auto px-6 py-20 font-body text-plum/60">Loading…</div>;

  const price = product.discountPrice || product.price;

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    await addToCart(product._id, quantity);
    setMessage("Added to cart");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleBuyNow = () => {
    if (!user) return navigate("/login");
    navigate("/checkout", { state: { buyNow: { productId: product._id, quantity, product } } });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12">
      <div className="rounded-2xl overflow-hidden bg-blush-light aspect-square">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-gold font-body mb-2">{product.brand}</p>
        <h1 className="font-display text-4xl text-plum mb-4">{product.name}</h1>
        <p className="font-body text-2xl text-wine mb-6">₹{price}</p>
        <p className="font-body text-plum/70 mb-8 leading-relaxed">{product.description}</p>

        <div className="flex items-center gap-4 mb-8">
          <label className="font-body text-sm text-plum">Quantity</label>
          <div className="flex items-center border border-blush-dark rounded-full">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 text-wine"
            >
              −
            </button>
            <span className="px-3 font-body">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 text-wine">
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 px-6 py-3 rounded-full border border-wine text-wine font-body text-sm uppercase tracking-widest hover:bg-wine hover:text-white transition"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 px-6 py-3 rounded-full bg-wine text-white font-body text-sm uppercase tracking-widest hover:bg-wine-dark transition"
          >
            Buy Now
          </button>
        </div>
        {message && <p className="text-wine font-body text-sm mt-3">{message}</p>}
      </div>
    </div>
  );
}
