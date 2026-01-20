import React, { useEffect, useState, useCallback } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

type Theme = "light" | "dark";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) return saved;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);

    document.body.className = theme === "dark" ? "dark-mode" : "light-mode";
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <button
      data-aos="fade-left"
      id="themeToggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      {theme === "dark" ? (
        <FaMoon className="themed-text" style={{ fontSize: "1.6rem" }} />
      ) : (
        <FaSun className="themed-text" style={{ fontSize: "1.6rem" }} />
      )}
    </button>
  );
};

export default ThemeToggle;
