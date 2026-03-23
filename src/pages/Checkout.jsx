import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import OrderConfirmation from "./OrderConfirmation";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { Package, MapPin } from "lucide-react";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    address: "",
    city: "",
    zip: "",
  });

  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Submit (backend-ready)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.address || !form.city || !form.zip) {
      return alert("Please fill all required fields");
    }

    try {
      setLoading(true);

      // 🔥 Replace with backend API later
      /*
      await axios.post("/api/orders", {
        user,
        items: cart,
        total: cartTotal,
        shipping: form,
      });
      */

      clearCart();
      setIsConfirmed(true);
    } catch (err) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Order confirmation page
  if (isConfirmed) {
    return <OrderConfirmation deliveryDetails={form} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 📦 Shipping Form */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <MapPin className="w-5 h-5 text-cyan-500" />
            Shipping Information
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <Input
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />

            <Input
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />

            <Input
              label="Pin Code"
              name="zip"
              type="number"
              value={form.zip}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full mt-4"
            >
              Pay ₹{cartTotal.toFixed(2)}
            </Button>
          </form>
        </div>

        {/* 💳 Order Summary */}
        <div className="lg:col-span-1 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm sticky top-20 h-fit">
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-500" />
            Summary
          </h3>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <span className="truncate">{item.name}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="flex justify-between pt-3">
              <span>Subtotal</span>
              <span className="text-gray-900 dark:text-white">
                ₹{cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>

            <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3 text-base font-semibold text-gray-900 dark:text-white">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;