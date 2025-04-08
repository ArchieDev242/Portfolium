"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Компонент для створення блоків Minecraft
export const MinecraftBlock = ({ type = "stone", className = "", children, onClick }) => {
  // Кольори та текстури для різних типів блоків
  const blockStyles = {
    stone: "bg-gray-500 border-gray-400 border-b-gray-700 border-r-gray-700",
    dirt: "bg-amber-800 border-amber-700 border-b-amber-900 border-r-amber-900",
    grass: "grass-bg border-green-700 border-b-amber-900 border-r-amber-900",
    wood: "bg-amber-600 border-amber-700 border-b-amber-900 border-r-amber-900",
    leaves: "bg-green-600 border-green-700 border-b-green-900 border-r-green-900",
    diamond: "bg-cyan-500 border-cyan-400 border-b-cyan-700 border-r-cyan-700",
    gold: "bg-yellow-500 border-yellow-400 border-b-yellow-700 border-r-yellow-700",
    redstone: "bg-red-600 border-red-500 border-b-red-800 border-r-red-800",
    obsidian: "bg-purple-900 border-purple-800 border-b-purple-950 border-r-purple-950",
    bookshelf: "bg-amber-600 border-amber-700 border-b-amber-900 border-r-amber-900",
    lava: "bg-orange-600 border-orange-500 border-b-red-700 border-r-red-700",
    bedrock: "bg-gray-800 border-gray-700 border-b-gray-900 border-r-gray-900",
  };

  return (
    <motion.div
      className = {`pixelated border-4 relative ${blockStyles[type]} ${className}`}
      whileHover = {{ scale: 1.05 }}
      whileTap = {{ scale: 0.95 }}
      onClick = {onClick}
    >
      {children}
    </motion.div>
  );
};

// Компонент для створення текстурованих блоків з зображеннями
export const TexturedBlock = ({ type = "stone", className = "", children, onClick }) => {
  // Замість зображень використовуємо кольори
  const blockStyles = {
    stone: "bg-gray-500",
    dirt: "bg-amber-800",
    grass: "bg-green-600",
    wood: "bg-amber-600",
    diamond: "bg-cyan-500",
    gold: "bg-yellow-500",
  };

  return (
    <motion.div
      className = {`pixelated relative overflow-hidden ${blockStyles[type] || blockStyles.stone} border-4 border-gray-700 ${className}`}
      whileHover = {{ scale: 1.05 }}
      whileTap = {{ scale: 0.95 }}
      onClick = {onClick}
    >
      {children}
    </motion.div>
  );
};

// Компонент для створення крафтінг-столу
export const CraftingTable = ({ children, className = "" }) => {
  return (
    <div className = {`bg-amber-800 border-4 border-amber-900 p-4 pixelated ${className}`}>
      <div className = "text-center mb-4">
        <h3 className = "text-xl text-yellow-300 minecraft-font">CRAFTING TABLE</h3>
      </div>
      <div className = "grid grid-cols-3 gap-2 mb-4">
        {Array(9).fill(0).map((_, index) => (
          <div key = {index} className = "bg-gray-800 border-2 border-gray-700 aspect-square"></div>
        ))}
      </div>
      <div className = "flex justify-center">
        <div className = "bg-gray-800 border-2 border-gray-700 w-16 h-16"></div>
      </div>
      {children}
    </div>
  );
};

// Компонент для створення інвентарю
export const Inventory = ({ children, className = "" }) => {
  return (
    <div className = {`bg-gray-900/80 border-4 border-gray-800 p-6 pixelated ${className}`}>
      {children}
    </div>
  );
};

// Компонент для створення кнопки в стилі Minecraft
export const MinecraftButton = ({ text, onClick, type = "button", disabled = false, className = "" }) => {
  return (
    <motion.button
      type = {type}
      onClick = {onClick}
      disabled = {disabled}
      className = {`px-6 py-3 bg-gray-700 border-b-4 border-t-2 border-l-2 border-r-4 border-t-gray-500 border-l-gray-500 border-r-gray-900 border-b-gray-900 text-white minecraft-font transition-all pixelated ${disabled ? 'opacity-50' : 'hover:bg-gray-600'} ${className}`}
      whileHover = {disabled ? {} : { y: -2 }}
      whileTap = {disabled ? {} : { y: 2, borderBottomWidth: '2px', borderRightWidth: '2px', borderTopWidth: '4px', borderLeftWidth: '4px' }}
    >
      {text}
    </motion.button>
  );
};

// Компонент для створення поля вводу в стилі Minecraft
export const MinecraftInput = ({ type = "text", name, value, onChange, placeholder, required = false, rows = "1", className = "" }) => {
  if (type === "textarea") {
    return (
      <textarea
        name = {name}
        value = {value}
        onChange = {onChange}
        placeholder = {placeholder}
        required = {required}
        rows = {rows}
        className = {`w-full bg-gray-800 border-2 border-gray-700 p-3 text-white focus:border-yellow-500 outline-none minecraft-font pixelated ${className}`}
      />
    );
  }

  return (
    <input
      type = {type}
      name = {name}
      value = {value}
      onChange = {onChange}
      placeholder = {placeholder}
      required = {required}
      className = {`w-full bg-gray-800 border-2 border-gray-700 p-3 text-white focus:border-yellow-500 outline-none minecraft-font pixelated ${className}`}
    />
  );
};

// Компонент для створення предметів Minecraft (кирка, меч, сокира)
export const MinecraftItem = ({ type = "pickaxe", animate = false, className = "" }) => {
  const itemStyles = {
    pickaxe: "border-l-transparent border-r-transparent border-b-transparent border-t-8 border-l-8 border-r-8 border-b-8 border-t-gray-500 border-l-gray-500 border-r-gray-700 border-b-gray-700 after:content-[''] after:absolute after:w-4 after:h-12 after:bg-amber-800 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:translate-y-1",
    sword: "border-l-transparent border-r-transparent border-b-transparent border-t-8 border-l-8 border-r-8 border-b-8 border-t-gray-500 border-l-gray-500 border-r-gray-700 border-b-gray-700 after:content-[''] after:absolute after:w-2 after:h-12 after:bg-amber-800 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:translate-y-1",
    axe: "border-l-transparent border-r-transparent border-b-transparent border-t-8 border-l-8 border-r-8 border-b-8 border-t-gray-500 border-l-gray-500 border-r-gray-700 border-b-gray-700 after:content-[''] after:absolute after:w-3 after:h-12 after:bg-amber-800 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:translate-y-1",
  };

  return (
    <motion.div
      className = {`relative w-12 h-12 bg-cyan-500 pixelated ${itemStyles[type]} ${className}`}
      animate = {animate ? { 
        rotate: [0, -20, 0, 20, 0],
        y: [0, -5, 0]
      } : {}}
      transition = {animate ? { repeat: Infinity, duration: 0.5 } : {}}
    />
  );
};

// Компонент для відображення інтерфейсу гравця (здоров'я, голод, досвід)
export const PlayerInterface = ({ health = 10, hunger = 10, xp = 0, className = "" }) => {
  // Максимальні значення
  const maxHealth = 10;
  const maxHunger = 10;
  const maxXp = 100;

  return (
    <div className = {`bg-gray-900/60 p-4 border-2 border-gray-800 pixelated ${className}`}>
      <div className = "flex justify-between items-center">
        {/* Здоров'я */}
        <div className = "flex items-center">
          <span className = "text-white minecraft-font mr-2">HP:</span>
          <div className = "flex">
            {Array(maxHealth).fill(0).map((_, index) => (
              <div key = {`health-${index}`} className = {`w-5 h-5 mx-0.5 ${index < health ? 'bg-red-600' : 'bg-gray-700'}`}></div>
            ))}
          </div>
        </div>

        {/* Голод */}
        <div className = "flex items-center">
          <span className = "text-white minecraft-font mr-2">Hunger:</span>
          <div className = "flex">
            {Array(maxHunger).fill(0).map((_, index) => (
              <div key = {`hunger-${index}`} className = {`w-5 h-5 mx-0.5 ${index < hunger ? 'bg-yellow-600' : 'bg-gray-700'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Досвід */}
      <div className = "mt-4">
        <div className = "flex items-center">
          <span className = "text-white minecraft-font mr-2">XP:</span>
          <div className = "flex-1 bg-gray-800 h-4">
            <div 
              className = "h-full bg-green-500" 
              style = {{ width: `${xp}%` }}
            ></div>
          </div>
          <span className = "text-white minecraft-font ml-2">{xp}%</span>
        </div>
      </div>
    </div>
  );
};

// Компонент для анімації розбивання блоку
export const BreakingBlock = ({ type = "stone", stage = 0, onComplete, className = "" }) => {
  const maxStage = 10;
  const [currentStage, setCurrentStage] = useState(stage);

  useEffect(() => {
    if (stage > 0 && currentStage < maxStage) {
      const timer = setTimeout(() => {
        setCurrentStage(prev => {
          const newStage = prev + 1;
          if (newStage >= maxStage && onComplete) {
            onComplete();
          }
          return newStage;
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentStage, stage, onComplete]);

  useEffect(() => {
    setCurrentStage(stage);
  }, [stage]);

  // Стилі для різних стадій розбивання (використовуємо CSS замість зображень)
  const breakingStyles = [
    "", // 0 - немає тріщин
    "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-10",
    "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-20",
    "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-30",
    "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-40",
    "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-50",
    "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-60",
    "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-70",
    "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-80",
    "after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-90",
    "mining-effect", // 10 - блок розбитий
  ];

  return (
    <MinecraftBlock
      type = {type}
      className = {`w-16 h-16 ${breakingStyles[Math.min(currentStage, maxStage)]} ${className}`}
    />
  );
};

// Компонент для створення зоряного фону
export const StarField = ({ count = 100, className = "" }) => {
  const stars = Array(count).fill(0).map((_, index) => {
    const size = Math.random() * 3 + 1; // від 1px до 4px
    const x = Math.random() * 100; // позиція по X (0-100%)
    const y = Math.random() * 100; // позиція по Y (0-100%)
    const opacity = Math.random() * 0.5 + 0.5; // прозорість (0.5-1)
    const animationDelay = Math.random() * 5; // затримка анімації (0-5s)
    
    return { size, x, y, opacity, animationDelay, id: index };
  });

  return (
    <div className = {`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map(star => (
        <motion.div
          key = {star.id}
          className = "absolute bg-white rounded-full"
          style = {{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
          }}
          animate = {{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition = {{
            repeat: Infinity,
            duration: 2 + Math.random() * 3,
            delay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
};
