import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 🔄 Show loader while checking auth
  if (loading) {
    return <Loader />;
  }

  // ❌ Not logged in → redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // 🔥 for redirect after login
      />
    );
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;