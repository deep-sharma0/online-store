import React from "react";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {/* 🔹 Label */}
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* 🔹 Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg border text-sm 
          bg-white dark:bg-gray-900 
          text-gray-900 dark:text-white 
          border-gray-300 dark:border-gray-700 
          focus:ring-2 focus:ring-cyan-500 outline-none
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}`}
        {...props}
      />

      {/* 🔹 Error */}
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;