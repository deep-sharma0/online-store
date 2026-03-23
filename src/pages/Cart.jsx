import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

import CartItem from "../components/cart/CartItem";
import Button from "../components/common/Button";

import { ChevronLeft, ShoppingCart, Zap } from "lucide-react";

const Cart = () => {
  const { cart, cartTotal, cartCount } = useCart();

  // 🛑 Empty cart state
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <ShoppingCart className="w-12 h-12 text-gray-400 mb-4" />

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <Link to="/">
          <Button>Go Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      {/* 🔙 Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-cyan-500 transition mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to store
      </Link>

      {/* 🧾 Heading */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Shopping Cart ({cartCount})
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 🛒 Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* 💳 Summary */}
        <div className="lg:col-span-1 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm sticky top-20 h-fit">
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-gray-900 dark:text-white font-medium">
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

          {/* 🔥 Checkout */}
          <Link to="/checkout" className="block mt-6">
            <Button className="w-full flex items-center gap-2 justify-center">
              <Zap className="w-4 h-4" />
              Proceed to Checkout
            </Button>
          </Link>

          <p className="text-xs text-gray-400 text-center mt-3">
            Secure checkout powered by encrypted payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;