import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../components/common/Button";

const OrderConfirmation = ({ deliveryDetails, orderId }) => {
  // 🔥 fallback order ID (frontend demo)
  const generatedId =
    orderId || "ORD-" + Math.floor(Math.random() * 1000000);

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      
      <div className="w-full max-w-xl p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md text-center">
        
        {/* ✅ Icon */}
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        {/* ✅ Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Order Confirmed!
        </h2>

        {/* ✅ Order ID */}
        <p className="text-sm text-gray-500 mb-4">
          Order ID:{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {generatedId}
          </span>
        </p>

        {/* ✅ Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your order has been placed successfully. A confirmation email will be sent shortly.
        </p>

        {/* 📦 Delivery Details */}
        <div className="text-left text-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6 bg-gray-50 dark:bg-gray-800">
          
          <p className="font-semibold text-gray-900 dark:text-white">
            {deliveryDetails?.name}
          </p>

          <p className="text-gray-600 dark:text-gray-400">
            {deliveryDetails?.address}
          </p>

          <p className="text-gray-600 dark:text-gray-400">
            {deliveryDetails?.city}, {deliveryDetails?.zip}
          </p>
        </div>

        {/* 🔁 Action */}
        <Link to="/">
          <Button className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;