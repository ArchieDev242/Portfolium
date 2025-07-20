import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaServer, FaDatabase, FaFigma, FaPhotoVideo } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiExpress, SiMongodb } from 'react-icons/si';

const SkillIcon = ({ type, size = 'md', className = '', animate = false }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  };
  
  const getIcon = (type) => {
    switch(type.toLowerCase()) 
    {
      case 'html': return <FaHtml5 className = "text-orange-500" />;
      case 'css': return <FaCss3Alt className = "text-blue-500" />;
      case 'javascript':
      case 'js': return <FaJs className = "text-yellow-400" />;
      case 'react': return <FaReact className = "text-cyan-400" />;
      case 'nextjs':
      case 'next.js': return <SiNextdotjs className = "text-white" />;
      case 'nodejs':
      case 'node.js': return <FaNodeJs className = "text-green-500" />;
      case 'express': return <SiExpress className = "text-gray-300" />;
      case 'mongodb': return <SiMongodb className = "text-green-400" />;
      case 'tailwind':
      case 'tailwindcss': return <SiTailwindcss className = "text-cyan-400" />;
      case 'figma': return <FaFigma className = "text-purple-400" />;
      case 'photoshop': return <FaPhotoVideo className = "text-blue-600" />;
      case 'server': return <FaServer className = "text-gray-400" />;
      case 'database': return <FaDatabase className = "text-blue-400" />;
      default: return null;
    }
  };
  
  const icon = getIcon(type);
  
  if(!icon) return null;
  
  const PixelatedIcon = () => (
    <div className = {`pixelated ${sizeClasses[size]} ${className}`}>
      {icon}
    </div>
  );
  
  if(animate) 
    {
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
  
  return <PixelatedIcon />;
};

export default SkillIcon;
