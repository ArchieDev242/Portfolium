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
    
    const set_theme = (color) => {
      const c = colors[color];
      document.documentElement.style.setProperty("--accent-default", c);
      document.documentElement.style.setProperty("--accent-shadow", `${c}33`);
      document.documentElement.style.setProperty("--accent-glow", `${c}66`);
      document.documentElement.style.setProperty("--accent-bg", `${c}20`);
    };
    set_theme("green");
    const saved_color = localStorage.getItem("theme-color");
    if(saved_color && colors[saved_color]) set_theme(saved_color);
  }, []);

  // prevent hydration mismatch by not rendering children until mounted
  if(!is_mounted) return children;

  return children;
} 