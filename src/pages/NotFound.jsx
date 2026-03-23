import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import Button from "../components/common/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      
      {/* ⚠️ Icon */}
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />

      {/* 🔹 Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        404 - Page Not Found
      </h1>

      {/* 🔹 Message */}
      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* 🔁 Action */}
      <Link to="/">
        <Button>
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;