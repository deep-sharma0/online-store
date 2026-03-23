import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

const SearchFilter = ({ onSearch, placeholder = "Search products..." }) => {
  const [query, setQuery] = useState("");

  // 🔥 Debounce (important for backend API)
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch?.(query.trim());
    }, 400); // 400ms delay

    return () => clearTimeout(delay);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-cyan-500 transition">
        
        {/* 🔍 Icon */}
        <Search className="w-5 h-5 text-gray-400" />

        {/* 🔹 Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
        />

        {/* ❌ Clear Button */}
        {query && (
          <button
            onClick={clearSearch}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;