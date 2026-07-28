import { useEffect, useState } from "react";
import api from "../api/axios";

const statusColor = {
  placed: "bg-gold/30 text-plum",
  processing: "bg-blush text-plum",
  shipped: "bg-wine/20 text-wine",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="font-display text-4xl text-plum mb-10 blush-stroke inline-block">My Orders</h1>

      {orders.length === 0 ? (
        <p className="font-body text-plum/60">No orders placed yet.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-body text-xs text-plum/50">Order #{order._id.slice(-8)}</p>
                  <p className="font-body text-xs text-plum/50">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs font-body px-3 py-1 rounded-full capitalize ${statusColor[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-blush-light" />
                    <div className="font-body text-sm text-plum flex-1">
                      {item.name} × {item.quantity}
                    </div>
                    <div className="font-body text-sm text-wine">₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-blush-light pt-3 flex justify-between font-body text-sm">
                <span className="text-plum/60">Total</span>
                <span className="text-plum font-medium">₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
