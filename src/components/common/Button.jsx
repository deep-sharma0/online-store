import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | danger | outline
  size = "md", // sm | md | lg
  loading = false,
  disabled = false,
  className = "",
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none";

  const variants = {
    primary:
      "bg-cyan-500 hover:bg-cyan-600 text-white",
    secondary:
      "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700",
    danger:
      "bg-red-500 hover:bg-red-600 text-white",
    outline:
      "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        disabled || loading ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;