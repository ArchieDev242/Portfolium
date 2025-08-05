"use client";

import { useEffect, useState } from "react";

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
  const [is_mounted, set_is_mounted] = useState(false);

  useEffect(() => {
    set_is_mounted(true);
    
    // Set default theme first
    document.documentElement.style.setProperty("--accent-default", colors.green);
    document.documentElement.style.setProperty("--accent-shadow", shadow_colors.green);
    
    // Then check for saved theme
    const saved_color = localStorage.getItem("theme-color");
    if (saved_color && colors[saved_color]) {
      document.documentElement.style.setProperty("--accent-default", colors[saved_color]);
      document.documentElement.style.setProperty("--accent-shadow", shadow_colors[saved_color]);
    }
  }, []);

  // Prevent hydration mismatch by not rendering children until mounted
  if (!is_mounted) {
    return children;
  }

  return children;
} 