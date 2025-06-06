import React from 'react';
import { motion } from 'framer-motion';
import SkillIcon from './SkillIcon';

const Achievement = ({ title, description, icon, unlocked, progress = 100 }) => {
  return (
    <motion.div 
      className = {`relative border-2 rounded-lg p-4 ${unlocked ? 'border-cyan-500 bg-slate-800/50' : 'border-gray-700 bg-slate-900/50 filter grayscale'}`}
      initial = {{ opacity: 0, y: 20 }}
      animate = {{ opacity: 1, y: 0 }}
      transition = {{ duration: 0.3 }}
      whileHover = {{ scale: 1.03 }}
    >
      {/* Lock icon for locked achievements */}
      {!unlocked && (
        <div className = "absolute top-2 right-2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className = "h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      )}
      
      <div className = "flex items-start">
        {/* Achievement icon */}
        <div className = "mr-4 mt-1">
          <div className = {`p-2 rounded-lg ${unlocked ? 'bg-cyan-900/30' : 'bg-gray-800/30'}`}>
            <SkillIcon type = {icon} size = "md" />
          </div>
        </div>
        
        <div className = "flex-1">
          {/* Achievement title */}
          <h4 className = {`pixel-text text-sm mb-1 ${unlocked ? 'text-cyan-400' : 'text-gray-500'}`}>
            {title}
          </h4>
          
          {/* Achievement description */}
          <p className = {`pixel-text text-xs mb-2 ${unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>
          
          {/* Progress bar for in-progress achievements */}
          {progress < 100 && (
            <div className = "w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <motion.div 
                className = "h-full bg-cyan-500"
                initial = {{ width: 0 }}
                animate = {{ width: `${progress}%` }}
                transition = {{ duration: 1 }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SkillAchievements = () => {
  // Achievement data
  const achievements = [
    {
      id: 1,
      title: "HTML Master",
      description: "Created 10+ projects using semantic HTML markup",
      icon: "html",
      unlocked: true,
      progress: 100
    },
    {
      id: 2,
      title: "CSS Wizard",
      description: "Implemented complex animations and responsive interfaces",
      icon: "css",
      unlocked: true,
      progress: 100
    },
    {
      id: 3,
      title: "JavaScript Guru",
      description: "Developed interactive web applications using modern JS",
      icon: "js",
      unlocked: true,
      progress: 100
    },
    {
      id: 4,
      title: "React Architect",
      description: "Created complex component systems using React",
      icon: "react",
      unlocked: true,
      progress: 100
    },
    {
      id: 5,
      title: "Next.js Engineer",
      description: "Developed optimized SSR applications with Next.js",
      icon: "nextjs",
      unlocked: true,
      progress: 100
    },
    {
      id: 6,
      title: "Node.js Expert",
      description: "Created server applications and APIs using Node.js",
      icon: "nodejs",
      unlocked: true,
      progress: 100
    },
    {
      id: 7,
      title: "MongoDB Explorer",
      description: "Developed complex data schemas and queries for MongoDB",
      icon: "mongodb",
      unlocked: false,
      progress: 70
    },
    {
      id: 8,
      title: "Tailwind Artist",
      description: "Created unique design systems using Tailwind CSS",
      icon: "tailwind",
      unlocked: true,
      progress: 100
    },
    {
      id: 9,
      title: "Figma Designer",
      description: "Developed prototypes and design systems in Figma",
      icon: "figma",
      unlocked: true,
      progress: 100
    },
    {
      id: 10,
      title: "Fullstack Legend",
      description: "Independently developed a complete web application from start to finish",
      icon: "server",
      unlocked: false,
      progress: 85
    }
  ];
  
  // Split achievements into unlocked and locked
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  
  return (
    <div className = "w-full">
      <div className = "mb-6">
        <h3 className = "pixel-text text-xl text-cyan-400 mb-4">Unlocked Achievements</h3>
        <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
          {unlockedAchievements.map(achievement => (
            <Achievement 
              key = {achievement.id}
              title = {achievement.title}
              description = {achievement.description}
              icon = {achievement.icon}
              unlocked = {achievement.unlocked}
              progress = {achievement.progress}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className = "pixel-text text-xl text-gray-500 mb-4">Locked Achievements</h3>
        <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
          {lockedAchievements.map(achievement => (
            <Achievement 
              key = {achievement.id}
              title = {achievement.title}
              description = {achievement.description}
              icon = {achievement.icon}
              unlocked = {achievement.unlocked}
              progress = {achievement.progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillAchievements;
