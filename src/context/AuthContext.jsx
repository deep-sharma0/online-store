import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = async (credentials) => {
    try {
      setLoading(true);

      // 🔥 Replace this with real API later
      /*
      const res = await axios.post("/api/auth/login", credentials);
      const { user, token } = res.data;
      */

      // TEMP MOCK
      const fakeUser = {
        id: 1,
        name: "Deep Sharma",
        email: credentials.email,
      };
      const fakeToken = "sample-jwt-token";

      setUser(fakeUser);
      setToken(fakeToken);

      localStorage.setItem("user", JSON.stringify(fakeUser));
      localStorage.setItem("token", fakeToken);

      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ REGISTER
  const register = async (data) => {
    try {
      setLoading(true);

      // 🔥 Replace with API later
      /*
      await axios.post("/api/auth/register", data);
      */

      toast.success("Registration successful. Please login.");
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 Hook
export const useAuth = () => useContext(AuthContext);