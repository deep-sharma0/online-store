import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ShoppingCart, Moon, Sun, User } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext"; // create later
import { useAuth } from "../../context/AuthContext";   // create later

const Navbar = () => {
  const { cartCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // backend ready
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/90 border-b border-gray-200 dark:border-gray-800 shadow-md transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* 🔹 Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <Home className="w-7 h-7 text-cyan-500 group-hover:scale-110 transition" />
          <h1 className="text-2xl font-bold tracking-wide">
            ONLINE<span className="text-cyan-500">STORE</span>
          </h1>
        </Link>

        {/* 🔹 Right Section */}
        <div className="flex items-center gap-4">
          
          {/* 🌗 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* 🛒 Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition"
          >
            <ShoppingCart className="w-6 h-6 text-cyan-500" />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center text-xs font-semibold text-white bg-red-500 rounded-full min-w-[18px] h-[18px] px-1">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 👤 Auth Section */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm transition"
            >
              <User className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;