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

const shadow_colors = {
  green: "rgba(0, 255, 153, 0.1)",
  blue: "rgba(0, 191, 255, 0.1)",
  purple: "rgba(157, 78, 221, 0.1)",
  pink: "rgba(255, 105, 180, 0.1)",
  orange: "rgba(255, 165, 0, 0.1)",
  cyan: "rgba(0, 255, 255, 0.1)",
};

export function ThemeProvider({ children }) {
  useEffect(() => {
    const saved_color = localStorage.getItem("theme-color") || "green";
    document.documentElement.style.setProperty("--accent-default", colors[saved_color]);
    document.documentElement.style.setProperty("--accent-shadow", shadow_colors[saved_color]);
  }, []);

  return children;
} 