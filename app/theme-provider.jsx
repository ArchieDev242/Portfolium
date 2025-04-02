"use client";

import { useEffect } from "react";

const colors = {
  green: "#00ff99",
  blue: "#00bfff",
  purple: "#9d4edd",
  pink: "#ff69b4",
  orange: "#ffa500",
  cyan: "#00ffff",
};

export function ThemeProvider({ children }) {
  useEffect(() => {
    const savedColor = localStorage.getItem("theme-color") || "green";
    document.documentElement.style.setProperty("--accent-default", colors[savedColor]);
  }, []);

  return children;
} 