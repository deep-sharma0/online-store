import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader";

import ProtectedRoute from "./routes/ProtectedRoute";

// 🔥 Lazy loaded pages
const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <Router>
      {/* 🔔 Global Toast */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        theme="dark"
        transition={Bounce}
      />

      {/* 🌗 Layout */}
      <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-300">
        
        {/* 🔝 Navbar */}
        <Navbar />

        {/* 🔥 Main */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4">
          <Suspense fallback={<Loader />}>
            <Routes>
              
              {/* 🏠 Public */}
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />

              {/* 🔐 Protected */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* 🔑 Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* ❌ 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {/* 🔻 Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;