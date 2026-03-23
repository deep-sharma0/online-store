import React, { useEffect, useMemo, useState } from "react";

import SearchFilter from "../components/product/SearchFilter";
import CategoryFilter from "../components/product/CategoryFilter";
import ProductCard from "../components/product/ProductCard";
import Loader from "../components/common/Loader";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 Fetch products (backend-ready)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // 👉 Replace later with API
        const res = await fetch("./data/products.json");
        const data = await res.json();

        setProducts(data);

        // extract categories dynamically
        const uniqueCategories = [
          ...new Set(data.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);

      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 Filtering (optimized)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // 🔄 Loading state
  if (loading) return <Loader />;

  // ❌ Error state
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      {/* 🔍 Search */}
      <SearchFilter onSearch={setSearchTerm} />

      {/* 🏷 Category */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* 🔹 Heading */}
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Products ({filteredProducts.length})
      </h2>

      {/* 🧱 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 📭 Empty state */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products found
        </p>
      )}
    </div>
  );
};

export default ProductList;