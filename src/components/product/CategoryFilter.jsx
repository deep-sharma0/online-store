import React from "react";
import { Tag } from "lucide-react";

const CategoryFilter = ({
  categories = [],
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      
      {/* 🔹 Icon */}
      <Tag className="w-5 h-5 text-cyan-500 hidden sm:block" />

      {/* 🔹 Categories */}
      {["All", ...categories].map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-4 py-1.5 text-sm rounded-full border transition
              ${
                isActive
                  ? "bg-cyan-500 text-white border-cyan-500"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;