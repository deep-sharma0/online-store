import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 🔥 Load from localStorage (important)
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // 🔥 Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add to cart (backend-ready)
  const addToCart = async (product) => {
    try {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);

        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...prev, { ...product, quantity: 1 }];
      });

      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (productId, removeAll = false) => {
    try {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === productId);
        if (!existing) return prev;

        if (removeAll || existing.quantity === 1) {
          return prev.filter((item) => item.id !== productId);
        }

        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      });

      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  // ✅ Derived values
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🔥 Custom hook
export const useCart = () => useContext(CartContext);