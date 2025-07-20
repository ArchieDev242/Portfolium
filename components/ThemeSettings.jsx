"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPalette, FaTimes } from "react-icons/fa";

const colors = [
  { name: "green", value: "#00ff99" },
  { name: "blue", value: "#00bfff" },
  { name: "purple", value: "#9d4edd" },
  { name: "pink", value: "#ff69b4" },
  { name: "orange", value: "#ffa500" },
  { name: "cyan", value: "#00ffff" },
];

const theme_settings = () => {
  const [is_open, setIsOpen] = useState(false);
  const [current_color, setCurrentColor] = useState("green");

  useEffect(() => {
    const saved_color = localStorage.getItem("theme-color") || "green";
    setCurrentColor(saved_color);
    update_theme_colors(colors.find(c => c.name === saved_color)?.value || "#00ff99");
  }, []);

  const update_theme_colors = (color) => {
    document.documentElement.style.setProperty("--accent-default", color);
    document.documentElement.style.setProperty("--accent-hover", `${color}dd`);
    document.documentElement.style.setProperty("--accent-active", `${color}aa`);
    
    document.documentElement.style.setProperty("--accent-shadow", `${color}33`);
    document.documentElement.style.setProperty("--accent-glow", `${color}66`);
    
    document.documentElement.style.setProperty("--accent-gradient-start", `${color}22`);
    document.documentElement.style.setProperty("--accent-gradient-end", `${color}11`);
  };

  const handle_color_change = (color) => {
    setCurrentColor(color.name);
    update_theme_colors(color.value);
    localStorage.setItem("theme-color", color.name);
  };

  return (
    <>
      <button
        onClick = {() => setIsOpen(true)}
        className = "fixed bottom-6 right-6 z-50 p-3 bg-accent-default/10 hover:bg-accent-default/20 rounded-full transition-colors duration-300"
      >
        <FaPalette className = "w-6 h-6 text-accent-default" />
      </button>

      <AnimatePresence>
        {is_open && (
          <>
            <motion.div
              initial = {{ opacity: 0 }}
              animate = {{ opacity: 1 }}
              exit = {{ opacity: 0 }}
              className = "fixed inset-0 bg-black/50 z-50"
              onClick = {() => setIsOpen(false)}
            />
            <motion.div
              initial = {{ x: "100%" }}
              animate = {{ x: 0 }}
              exit = {{ x: "100%" }}
              transition = {{ type: "spring", damping: 20 }}
              className = "fixed right-0 top-0 h-full w-80 bg-background border-l border-accent-default/20 p-6 z-50"
            >
              <div className = "flex justify-between items-center mb-6">
                <h3 className = "text-xl font-bold">Theme Settings</h3>
                <button
                  onClick = {() => setIsOpen(false)}
                  className = "p-2 hover:bg-accent-default/10 rounded-full transition-colors duration-300"
                >
                  <FaTimes className = "w-5 h-5" />
                </button>
              </div>

              <div className = "space-y-4">
                <h4 className = "text-lg font-medium">Accent Color</h4>
                <div className = "grid grid-cols-3 gap-3">
                  {colors.map((color) => (
                    <div key = {color.name} className = "flex flex-col items-center">
                      <button
                        onClick = {() => handle_color_change(color)}
                        className = {`w-full p-3 rounded-lg transition-all duration-300 flex flex-col items-center ${
                          current_color === color.name
                            ? "bg-accent-default/20 ring-2 ring-accent-default"
                            : "bg-accent-default/10 hover:bg-accent-default/20"
                        }`}
                      >
                        <div
                          className = "w-full h-8 rounded-md mb-2"
                          style = {{ backgroundColor: color.value }}
                        />
                      </button>
                      <span className = "text-xs text-center mt-1 text-white/80 whitespace-nowrap">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default theme_settings; 