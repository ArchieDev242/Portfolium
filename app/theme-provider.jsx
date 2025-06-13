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

const shadowColors = {
  green: "rgba(0, 255, 153, 0.1)",
  blue: "rgba(0, 191, 255, 0.1)",
  purple: "rgba(157, 78, 221, 0.1)",
  pink: "rgba(255, 105, 180, 0.1)",
  orange: "rgba(255, 165, 0, 0.1)",
  cyan: "rgba(0, 255, 255, 0.1)",
};

export function ThemeProvider({ children }) {
  useEffect(() => {
    const savedColor = localStorage.getItem("theme-color") || "green";
    document.documentElement.style.setProperty("--accent-default", colors[savedColor]);
    document.documentElement.style.setProperty("--accent-shadow", shadowColors[savedColor]);
  }, []);

  return children;
} 