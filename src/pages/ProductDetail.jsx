import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import Loader from "../components/common/Loader";
import Button from "../components/common/Button";

import { ShoppingCart, ChevronLeft, Tag } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 Fetch product (backend-ready)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // 👉 Replace later with API
        const res = await fetch("/data/products.json");
        const data = await res.json();

        const found = data.find((p) => p.id === Number(id));

        if (!found) {
          setError("Product not found");
        } else {
          setProduct(found);
        }

      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔄 Loading
  if (loading) return <Loader />;

  // ❌ Error
  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
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
        Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 🖼 Image */}
        <div className="w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md mx-auto rounded-xl border border-gray-200 dark:border-gray-800"
          />
        </div>

        {/* 📦 Details */}
        <div className="flex flex-col gap-4">
          
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {product.name}
          </h1>

          <p className="text-xl font-bold text-cyan-500">
            ₹{product.price.toFixed(2)}
          </p>

          {/* Category */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Tag className="w-4 h-4 text-cyan-500" />
            {product.category}
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• High-quality materials</li>
            <li>• 1-year warranty</li>
            <li>• Fast shipping</li>
          </ul>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-4">
            
            <Button
              onClick={() => addToCart(product)}
              className="w-full flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>

            <Link to="/">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;