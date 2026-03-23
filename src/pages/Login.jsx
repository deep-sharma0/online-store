import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(form);
    navigate(from, { replace: true });
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Login
        </h2>

        <div className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full mt-6"
        >
          Login
        </Button>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;