import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // 🔥 Initialize theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setIsDark(storedTheme === "dark");
    } else {
      // fallback to system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  // 🔥 Apply theme to <html>
 useEffect(() => {
  const root = document.documentElement;

  if (isDark) {
    root.classList.add("dark");
    root.style.colorScheme = "dark"; // 🔥 IMPORTANT
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light"; // 🔥 IMPORTANT
    localStorage.setItem("theme", "light");
  }
}, [isDark]);

  // 🔥 Toggle function
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 🔥 Custom hook
export const useTheme = () => useContext(ThemeContext);