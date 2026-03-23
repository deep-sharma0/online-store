import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product); // backend-ready
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      
      {/* 🔹 Image */}
      <Link
        to={`/product/${product.id}`}
        className="relative overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* 💰 Price */}
        <div className="absolute bottom-2 left-2 bg-cyan-600 text-white px-3 py-1 text-sm font-semibold rounded-lg shadow">
          ₹{product.price.toFixed(2)}
        </div>
      </Link>

      {/* 🔹 Content */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1 hover:text-cyan-500 transition">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Category */}
        <span className="inline-block text-xs font-medium px-2 py-1 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md w-fit">
          {product.category}
        </span>

        {/* 🔹 Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="mt-auto flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium transition disabled:opacity-70"
        >
          {loading ? (
            <span className="animate-pulse">Adding...</span>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;