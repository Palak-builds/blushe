import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user } = useAuth();
  const [tab, setTab] = useState("addresses");
  const [addresses, setAddresses] = useState([]);
  const [giftCards, setGiftCards] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: "", phone: "", addressLine1: "", addressLine2: "", city: "", state: "", pincode: "",
  });
  const [giftAmount, setGiftAmount] = useState("");

  const loadAddresses = () => api.get("/addresses").then((res) => setAddresses(res.data));
  const loadGiftCards = () => api.get("/giftcards").then((res) => setGiftCards(res.data));

  useEffect(() => {
    loadAddresses();
    loadGiftCards();
  }, []);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    await api.post("/addresses", newAddress);
    setNewAddress({ fullName: "", phone: "", addressLine1: "", addressLine2: "", city: "", state: "", pincode: "" });
    loadAddresses();
  };

  const handleDeleteAddress = async (id) => {
    await api.delete(`/addresses/${id}`);
    loadAddresses();
  };

  const handleBuyGiftCard = async (e) => {
    e.preventDefault();
    await api.post("/giftcards", { amount: Number(giftAmount) });
    setGiftAmount("");
    loadGiftCards();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-plum mb-2 blush-stroke inline-block">My Account</h1>
      <p className="font-body text-plum/60 mb-10">{user?.email}</p>

      <div className="flex gap-6 border-b border-blush-dark/30 mb-8 font-body text-sm uppercase tracking-widest">
        {["addresses", "giftcards"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 ${tab === t ? "text-wine border-b-2 border-wine" : "text-plum/50"}`}
          >
            {t === "addresses" ? "Addresses" : "Gift Cards"}
          </button>
        ))}
      </div>

      {tab === "addresses" && (
        <div>
          <div className="space-y-4 mb-8">
            {addresses.map((a) => (
              <div key={a._id} className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-start">
                <div className="font-body text-sm text-plum">
                  <p className="font-medium">{a.fullName} {a.isDefault && <span className="text-gold text-xs">(Default)</span>}</p>
                  <p className="text-plum/60">{a.addressLine1}, {a.addressLine2}</p>
                  <p className="text-plum/60">{a.city}, {a.state} - {a.pincode}</p>
                  <p className="text-plum/60">{a.phone}</p>
                </div>
                <button onClick={() => handleDeleteAddress(a._id)} className="text-wine text-sm font-body">
                  Delete
                </button>
              </div>
            ))}
            {addresses.length === 0 && <p className="font-body text-plum/50">No saved addresses yet.</p>}
          </div>

          <form onSubmit={handleAddAddress} className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-display text-xl text-plum mb-4">Add New Address</h3>
            <div className="grid grid-cols-2 gap-3">
              {["fullName", "phone", "addressLine1", "addressLine2", "city", "state", "pincode"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={newAddress[field]}
                  onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                  required={field !== "addressLine2"}
                  className="border border-blush-dark/40 rounded-lg px-3 py-2 font-body text-sm"
                />
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-2 rounded-full bg-wine text-white font-body text-sm uppercase tracking-widest hover:bg-wine-dark transition"
            >
              Save Address
            </button>
          </form>
        </div>
      )}

      {tab === "giftcards" && (
        <div>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {giftCards.map((g) => (
              <div key={g._id} className="bg-gradient-to-br from-blush to-gold rounded-2xl p-6 text-plum">
                <p className="font-display text-2xl mb-1">₹{g.currentBalance}</p>
                <p className="font-body text-xs tracking-widest">{g.code}</p>
              </div>
            ))}
            {giftCards.length === 0 && <p className="font-body text-plum/50">No gift cards yet.</p>}
          </div>

          <form onSubmit={handleBuyGiftCard} className="bg-white rounded-2xl p-6 shadow-sm flex gap-4 items-end">
            <div className="flex-1">
              <label className="font-body text-sm text-plum/60 block mb-1">Amount (₹)</label>
              <input
                type="number"
                min="100"
                value={giftAmount}
                onChange={(e) => setGiftAmount(e.target.value)}
                required
                className="w-full border border-blush-dark/40 rounded-lg px-3 py-2 font-body"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-wine text-white font-body text-sm uppercase tracking-widest hover:bg-wine-dark transition"
            >
              Buy Gift Card
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
