import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { X } from "lucide-react";

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);

  const increaseQ = async () => {
    try {
      setLoading(true);
      await addToCart(item);
    } finally {
      setLoading(false);
    }
  };

  const decreaseQ = async () => {
    if (item.quantity <= 1) return; // safeguard
    try {
      setLoading(true);
      await removeFromCart(item.id);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async () => {
    try {
      setLoading(true);
      await removeFromCart(item.id, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 mb-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition">
      
      {/* 🔹 Product Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
        />

        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
            {item.name}
          </h3>

          <p className="text-sm text-cyan-500 font-medium">
            ₹{item.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* 🔹 Actions */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-4 sm:mt-0 gap-4">
        
        {/* Quantity Control */}
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={decreaseQ}
            disabled={loading || item.quantity <= 1}
            className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            -
          </button>

          <span className="px-3 text-sm font-medium bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white">
            {item.quantity}
          </span>

          <button
            onClick={increaseQ}
            disabled={loading}
            className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            +
          </button>
        </div>

        {/* Total Price */}
        <p className="hidden sm:block text-sm font-semibold text-gray-800 dark:text-gray-200 min-w-[80px] text-right">
          ₹{(item.price * item.quantity).toFixed(2)}
        </p>

        {/* Remove */}
        <button
          onClick={removeItem}
          disabled={loading}
          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;