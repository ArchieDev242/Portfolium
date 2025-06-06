import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaServer, FaDatabase, FaFigma, FaPhotoVideo } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiExpress, SiMongodb } from 'react-icons/si';

// Компонент для піксельної іконки навички
const SkillIcon = ({ type, size = 'md', className = '', animate = false }) => {
  // Визначаємо розміри залежно від параметра size
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  };
  
  // Визначаємо іконку залежно від типу
  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'html':
        return <FaHtml5 className = "text-orange-500" />;
      case 'css':
        return <FaCss3Alt className = "text-blue-500" />;
      case 'javascript':
      case 'js':
        return <FaJs className = "text-yellow-400" />;
      case 'react':
        return <FaReact className = "text-cyan-400" />;
      case 'nextjs':
      case 'next.js':
        return <SiNextdotjs className = "text-white" />;
      case 'nodejs':
      case 'node.js':
        return <FaNodeJs className = "text-green-500" />;
      case 'express':
        return <SiExpress className = "text-gray-300" />;
      case 'mongodb':
        return <SiMongodb className = "text-green-400" />;
      case 'tailwind':
      case 'tailwindcss':
        return <SiTailwindcss className = "text-cyan-400" />;
      case 'figma':
        return <FaFigma className = "text-purple-400" />;
      case 'photoshop':
        return <FaPhotoVideo className = "text-blue-600" />;
      case 'server':
        return <FaServer className = "text-gray-400" />;
      case 'database':
        return <FaDatabase className = "text-blue-400" />;
      default:
        return null;
    }
  };
  
  const icon = getIcon(type);
  
  // Якщо іконка не знайдена, повертаємо null
  if (!icon) return null;
  
  // Створюємо піксельний ефект для іконки
  const PixelatedIcon = () => (
    <div className = {`pixelated ${sizeClasses[size]} ${className}`}>
      {icon}
    </div>
  );
  
  // Якщо потрібна анімація, обгортаємо іконку в motion.div
  if (animate) {
    return (
      <motion.div
        initial = {{ scale: 0 }}
        animate = {{ 
          scale: 1,
          rotate: [0, 5, 0, -5, 0],
        }}
        transition = {{ 
          scale: { duration: 0.3 },
          rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" }
        }}
      >
        <PixelatedIcon />
      </motion.div>
    );
  }
  
  // Інакше повертаємо просто іконку
  return <PixelatedIcon />;
};

export default SkillIcon;
