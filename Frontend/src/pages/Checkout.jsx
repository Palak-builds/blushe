import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { state } = useLocation();
  const buyNow = state?.buyNow;
  const { user } = useAuth();
  const { cart, cartTotal, refreshCart } = useCart();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [newAddress, setNewAddress] = useState({
    fullName: user?.name || "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [giftCardCode, setGiftCardCode] = useState("");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    api.get("/addresses").then((res) => {
      setAddresses(res.data);
      const def = res.data.find((a) => a.isDefault) || res.data[0];
      if (def) setSelectedAddressId(def._id);
      else setUseNewAddress(true);
    });
  }, []);

  const total = buyNow ? (buyNow.product.discountPrice || buyNow.product.price) * buyNow.quantity : cartTotal;

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      let shippingAddress;
      if (useNewAddress) {
        shippingAddress = newAddress;
        await api.post("/addresses", newAddress);
      } else {
        shippingAddress = addresses.find((a) => a._id === selectedAddressId);
      }

      const payload = {
        shippingAddress,
        paymentMethod: "COD",
        giftCardCode: giftCardCode || undefined,
      };
      if (buyNow) payload.buyNow = { productId: buyNow.productId, quantity: buyNow.quantity };

      const res = await api.post("/orders", payload);
      if (!buyNow) await refreshCart();
      navigate(`/orders`, { state: { justPlaced: res.data._id } });
    } catch (err) {
      alert(err.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-plum mb-10 blush-stroke inline-block">Checkout</h1>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-display text-2xl text-plum mb-4">Shipping Address</h2>

        {addresses.length > 0 && !useNewAddress && (
          <div className="space-y-3 mb-4">
            {addresses.map((a) => (
              <label
                key={a._id}
                className={`block border rounded-xl p-4 cursor-pointer font-body text-sm ${
                  selectedAddressId === a._id ? "border-wine bg-blush-light" : "border-blush-dark/40"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  className="mr-2"
                  checked={selectedAddressId === a._id}
                  onChange={() => setSelectedAddressId(a._id)}
                />
                {a.fullName}, {a.addressLine1}, {a.city}, {a.state} - {a.pincode}
              </label>
            ))}
          </div>
        )}

        <button
          onClick={() => setUseNewAddress((v) => !v)}
          className="text-wine font-body text-sm underline underline-offset-2"
        >
          {useNewAddress ? "Use saved address" : "+ Add new address"}
        </button>

        {useNewAddress && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {["fullName", "phone", "addressLine1", "addressLine2", "city", "state", "pincode"].map((field) => (
              <input
                key={field}
                placeholder={field}
                value={newAddress[field]}
                onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                className="border border-blush-dark/40 rounded-lg px-3 py-2 font-body text-sm col-span-1"
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-display text-2xl text-plum mb-4">Gift Card</h2>
        <input
          placeholder="Enter gift card code (optional)"
          value={giftCardCode}
          onChange={(e) => setGiftCardCode(e.target.value)}
          className="border border-blush-dark/40 rounded-lg px-3 py-2 font-body text-sm w-full"
        />
      </div>

      <div className="bg-blush-light rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="font-body text-plum/60 text-sm">Order Total</p>
          <p className="font-display text-3xl text-plum">₹{total}</p>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          className="px-8 py-3 rounded-full bg-wine text-white font-body text-sm uppercase tracking-widest hover:bg-wine-dark transition disabled:opacity-50"
        >
          {placing ? "Placing…" : "Place Order"}
        </button>
      </div>
    </div>
  );
}
