import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-plum mb-4">Your bag is empty</h1>
        <p className="font-body text-plum/60 mb-8">Find something you'll love.</p>
        <Link
          to="/makeup"
          className="px-7 py-3 rounded-full bg-wine text-white font-body text-sm uppercase tracking-widest"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-plum mb-10 blush-stroke inline-block">Your Bag</h1>

      <div className="space-y-5 mb-10">
        {cart.items.map((item) => (
          <div key={item.product._id} className="flex items-center gap-5 bg-white rounded-2xl p-4 shadow-sm">
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-20 h-20 rounded-xl object-cover bg-blush-light"
            />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-gold font-body">{item.product.brand}</p>
              <h3 className="font-display text-lg text-plum">{item.product.name}</h3>
              <p className="font-body text-wine">₹{item.priceAtAdd}</p>
            </div>
            <div className="flex items-center border border-blush-dark rounded-full">
              <button
                onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                className="px-3 py-1 text-wine"
              >
                −
              </button>
              <span className="px-3 font-body">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                className="px-3 py-1 text-wine"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.product._id)}
              className="text-plum/40 hover:text-wine font-body text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blush-light rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="font-body text-plum/60 text-sm">Subtotal</p>
          <p className="font-display text-3xl text-plum">₹{cartTotal}</p>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="px-8 py-3 rounded-full bg-wine text-white font-body text-sm uppercase tracking-widest hover:bg-wine-dark transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
