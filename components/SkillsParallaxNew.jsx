'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SkillBall = ({ skill, index, onClick, onKeyPress, isActive, scrollYProgress }) => {
  // Паралакс ефект з поступовим з'явленням по групах
  const skill_tier_order = {
    'Expert': 0,
    'Experienced': 1, 
    'Beginner': 2
  };
  
  const tier_index = skill_tier_order[skill.skillLevel];
  const appear_start = 0.15 + (tier_index * 0.2); // Кожний рівень з'являється через 0.2
  const appear_end = appear_start + 0.15;
  const fade_start = 0.9;
  
  const opacity = useTransform(
    scrollYProgress,
    [0, appear_start, appear_end, fade_start, 1],
    [0, 0, 1, 1, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, appear_start, appear_end, fade_start, 1],
    [0.2, 0.2, 1, 1, 0.3]
  );
  
  const y = useTransform(
    scrollYProgress,
    [0, appear_start, appear_end, fade_start, 1],
    [100, 100, 0, 0, -100]
  );
  
  // Паралакс для позиції (різні навички рухаються з різною швидкістю)
  const parallax_offset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (tier_index + 1) * 20] // Далі навички рухаються швидше
  );
  
  const get_tier_style = (skillLevel) => {
    switch(skillLevel) 
    {
      case 'Expert': return {
          size: 'w-20 h-20 md:w-24 md:h-24',
          fontSize: 'text-xs md:text-sm',
          levelFontSize: 'text-[10px] md:text-xs',
          glow: '0 0 35px 8px',
          borderWidth: 'border-3',
          pulse: true
        };
      case 'Experienced': return {
          size: 'w-16 h-16 md:w-20 md:h-20',
          fontSize: 'text-[10px] md:text-xs',
          levelFontSize: 'text-[8px] md:text-[10px]',
          glow: '0 0 25px 6px',
          borderWidth: 'border-2',
          pulse: false
        };
      case 'Beginner': return {
          size: 'w-12 h-12 md:w-16 md:h-16',
          fontSize: 'text-[9px] md:text-[10px]',
          levelFontSize: 'text-[7px] md:text-[8px]',
          glow: '0 0 20px 4px',
          borderWidth: 'border-2',
          pulse: false
        };
      default: return {
          size: 'w-16 h-16',
          fontSize: 'text-xs',
          levelFontSize: 'text-[10px]',
          glow: '0 0 20px 4px',
          borderWidth: 'border-2',
          pulse: false
        };
    }
  };
  
  const tier_style = get_tier_style(skill.skillLevel);
  
  return (
    <motion.div
      className = "absolute cursor-pointer z-20"
      style = {{ 
        left: `${skill.x}%`, 
        top: `${skill.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity,
        scale,
        y: useTransform(scrollYProgress, [0, 1], [y.get(), y.get() + parallax_offset.get()])
      }}
      whileHover = {{ 
        scale: 1.15,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      whileTap = {{ scale: 0.9 }}
      onClick = {() => onClick(skill)}
      onKeyDown = {(e) => onKeyPress(e, skill)}
      role = "button"
      tabIndex = {0}
      aria-label = {`${skill.title} skill, level ${skill.level}`}
    >
      <motion.div 
        className = {`${tier_style.size} rounded-full flex items-center justify-center relative group ${tier_style.borderWidth} bg-slate-800/95 backdrop-blur-sm shadow-xl transition-all duration-300 ${tier_style.pulse ? 'animate-pulse' : ''}`}
        style = {{ 
          borderColor: skill.color,
          boxShadow: isActive 
            ? `${tier_style.glow} ${skill.color}60` 
            : `${tier_style.glow} ${skill.color}40`
        }}
        animate = {tier_style.pulse ? { 
          boxShadow: [
            `${tier_style.glow} ${skill.color}40`,
            `${tier_style.glow} ${skill.color}80`,
            `${tier_style.glow} ${skill.color}40`
          ]
        } : {}}
        transition = {tier_style.pulse ? { repeat: Infinity, duration: 2 } : {}}
      >
        <div className = "text-center z-10">
          <div className = {`${tier_style.fontSize} font-bold text-white mb-0.5 leading-tight`}>
            {skill.title}
          </div>
          <div className = {`${tier_style.levelFontSize} font-semibold`} style={{ color: skill.color }}>
            LV {skill.level}
          </div>
        </div>
        
        {/* Tier indicator */}
        <div className = "absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold bg-slate-700 border border-slate-500">
          {skill.skillLevel === 'Expert' ? 'E' : skill.skillLevel === 'Experienced' ? 'X' : 'B'}
        </div>
      </motion.div>
      
      {/* Enhanced Tooltip */}
      {isActive && (
        <motion.div
          initial = {{ opacity: 0, y: 15, scale: 0.8 }}
          animate = {{ opacity: 1, y: 0, scale: 1 }}
          className = "absolute top-full mt-4 bg-slate-800/98 backdrop-blur-md text-white p-5 rounded-2xl text-sm z-30 whitespace-nowrap border-2 shadow-2xl min-w-72"
          style = {{ borderColor: skill.color, boxShadow: `0 15px 35px ${skill.color}25` }}
        >
          <div className = "font-bold mb-3 text-lg" style={{ color: skill.color }}>
            {skill.title}
          </div>
          
          <div className = "flex items-center gap-3 mb-3">
            <div className = "text-gray-300 text-xs bg-slate-700/60 px-3 py-1.5 rounded-full">
              {skill.category}
            </div>
            <div className = "text-gray-300 text-xs bg-slate-700/60 px-3 py-1.5 rounded-full">
              {skill.skillLevel}
            </div>
            <div className = "text-gray-300 text-xs bg-slate-700/60 px-3 py-1.5 rounded-full">
              Level {skill.level}
            </div>
          </div>
          
          <div className = "text-gray-300 text-sm leading-relaxed mb-3">
            {skill.description}
          </div>
          
          {/* Skill level bar */}
          <div className = "w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <motion.div 
              className = "h-full rounded-full"
              style = {{ backgroundColor: skill.color }}
              initial = {{ width: 0 }}
              animate = {{ width: `${skill.level * 10}%` }}
              transition = {{ duration: 1, delay: 0.3 }}
            />
          </div>
          
          {/* Enhanced Tooltip arrow */}
          <div 
            className = "absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rotate-45 border-t-2 border-l-2"
            style = {{ 
              backgroundColor: 'rgb(30 41 59 / 0.98)',
              borderColor: skill.color
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

const Connection = ({ from, to, index, scrollYProgress }) => {
  const container_ref = useRef(null);
  const [dimensions, set_dimensions] = useState({ width: 0, height: 0 });
  
  // Різні лінії з'являються на різних етапах
  const line_start = 0.35 + (index * 0.03);
  const line_end = line_start + 0.15;
  const fade_start = 0.85;
  
  const opacity = useTransform(
    scrollYProgress,
    [0, line_start, line_end, fade_start, 1],
    [0, 0, 0.8, 0.8, 0]
  );
  
  const path_length = useTransform(
    scrollYProgress,
    [0, line_start, line_end, fade_start, 1],
    [0, 0, 1, 1, 0]
  );
  
  // Паралакс ефект для ліній
  const line_offset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (index % 3) * 10]
  );
  
  useEffect(() => {
    if(container_ref.current) 
      {
      const update_dimensions = () => {
        const container = container_ref.current;
        
        if(container) 
          {
          set_dimensions({
            width: container.offsetWidth,
            height: container.offsetHeight
          });
        }
      };
      
      update_dimensions();
      window.addEventListener('resize', update_dimensions);
      
      return () => {
        window.removeEventListener('resize', update_dimensions);
      };
    }
  }, []);
  
  if(dimensions.width === 0 || dimensions.height === 0) 
    {
    return <div ref = {container_ref} className = "absolute top-0 left-0 w-full h-full pointer-events-none" />;
  }
  
  const from_point = {
    x: (from.x / 100) * dimensions.width,
    y: (from.y / 100) * dimensions.height
  };
  
  const to_point = {
    x: (to.x / 100) * dimensions.width,
    y: (to.y / 100) * dimensions.height
  };
  
  const mid_x = (from_point.x + to_point.x) / 2;
  const mid_y = (from_point.y + to_point.y) / 2;
  const control_x = mid_x + (from_point.y - to_point.y) * 0.1;
  const control_y = mid_y + (to_point.x - from_point.x) * 0.1;
  
  const path_data = `M ${from_point.x} ${from_point.y} Q ${control_x} ${control_y} ${to_point.x} ${to_point.y}`;
  
  return (
    <div ref = {container_ref} className = "absolute top-0 left-0 w-full h-full pointer-events-none">
      <svg width = "100%" height = "100%" style = {{ overflow: 'visible' }}>
        <defs>
          <linearGradient id = {`gradient-${from.id}-${to.id}`} x1 = {from_point.x} y1 = {from_point.y} x2 = {to_point.x} y2 = {to_point.y} gradientUnits="userSpaceOnUse">
            <stop offset = "0%" stopColor = {from.color} />
            <stop offset = "100%" stopColor = {to.color} />
          </linearGradient>
        </defs>
        
        <motion.path
          d = {path_data}
          fill = "none"
          stroke = {`url(#gradient-${from.id}-${to.id})`}
          strokeWidth = "2"
          strokeLinecap = "round"
          style = {{ pathLength: path_length, opacity }}
        />
      </svg>
    </div>
  );
};

const SkillsParallaxNew = () => {
  const container_ref = useRef(null);
  const [active_skill, set_active_skill] = useState(null);
  const [is_mounted, set_is_mounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: container_ref,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    set_is_mounted(true);
  }, []);

  const skills = [
    // ============== WEB DEVELOPMENT ==============
    // Expert Level
    { 
      id: 'javascript', 
      title: 'JavaScript', 
      level: 10, 
      x: 20, 
      y: 20,
      color: '#f7df1e',
      category: 'Web Development',
      description: 'Master-level ES6+ development, async programming, and architecture',
      skillLevel: 'Expert'
    },
    { 
      id: 'html', 
      title: 'HTML5', 
      level: 9, 
      x: 35, 
      y: 15,
      color: '#e34c26',
      category: 'Web Development',
      description: 'Semantic markup, accessibility, and web standards',
      skillLevel: 'Expert'
    },
    { 
      id: 'css', 
      title: 'CSS3', 
      level: 9, 
      x: 35, 
      y: 25,
      color: '#1572b6',
      category: 'Web Development',
      description: 'Advanced animations, grid, flexbox, and responsive design',
      skillLevel: 'Expert'
    },
    { 
      id: 'react', 
      title: 'React', 
      level: 8, 
      x: 20, 
      y: 35,
      color: '#61dafb',
      category: 'Web Development',
      description: 'Advanced hooks, context, and performance optimization',
      skillLevel: 'Expert'
    },
    
    // Experienced Level
    { 
      id: 'nextjs', 
      title: 'Next.js', 
      level: 7, 
      x: 5, 
      y: 20,
      color: '#ffffff',
      category: 'Web Development',
      description: 'SSR, SSG, API routes, and performance optimization',
      skillLevel: 'Experienced'
    },
    { 
      id: 'tailwind', 
      title: 'Tailwind CSS', 
      level: 7, 
      x: 5, 
      y: 35,
      color: '#06b6d4',
      category: 'Web Development',
      description: 'Custom components and design systems',
      skillLevel: 'Experienced'
    },
    { 
      id: 'framer', 
      title: 'Framer Motion', 
      level: 6, 
      x: 35, 
      y: 35,
      color: '#0055ff',
      category: 'Web Development',
      description: 'Complex animations and gesture-based interactions',
      skillLevel: 'Experienced'
    },
    
    // Beginner Level
    { 
      id: 'typescript', 
      title: 'TypeScript', 
      level: 5, 
      x: 5, 
      y: 50,
      color: '#3178c6',
      category: 'Web Development',
      description: 'Type definitions, generics, and complex interfaces',
      skillLevel: 'Beginner'
    },

    // ============== SOFTWARE DEVELOPMENT ==============
    // Expert Level
    { 
      id: 'nodejs', 
      title: 'Node.js', 
      level: 8, 
      x: 50, 
      y: 20,
      color: '#339933',
      category: 'Software Development',
      description: 'API development, middleware, and server optimization',
      skillLevel: 'Expert'
    },
    { 
      id: 'git', 
      title: 'Git', 
      level: 8, 
      x: 65, 
      y: 15,
      color: '#f05032',
      category: 'Software Development',
      description: 'Advanced branching, merging, and collaborative workflows',
      skillLevel: 'Expert'
    },
    
    // Experienced Level
    { 
      id: 'python', 
      title: 'Python', 
      level: 6, 
      x: 50, 
      y: 35,
      color: '#3776ab',
      category: 'Software Development',
      description: 'Backend development, automation, and data processing',
      skillLevel: 'Experienced'
    },
    { 
      id: 'mongodb', 
      title: 'MongoDB', 
      level: 6, 
      x: 65, 
      y: 25,
      color: '#47a248',
      category: 'Software Development',
      description: 'NoSQL database design and complex queries',
      skillLevel: 'Experienced'
    },
    { 
      id: 'express', 
      title: 'Express.js', 
      level: 6, 
      x: 65, 
      y: 35,
      color: '#000000',
      category: 'Software Development',
      description: 'RESTful APIs and server architecture',
      skillLevel: 'Experienced'
    },
    
    // Beginner Level
    { 
      id: 'docker', 
      title: 'Docker', 
      level: 4, 
      x: 50, 
      y: 50,
      color: '#2496ed',
      category: 'Software Development',
      description: 'Containerization and deployment',
      skillLevel: 'Beginner'
    },
    { 
      id: 'aws', 
      title: 'AWS', 
      level: 3, 
      x: 65, 
      y: 50,
      color: '#ff9900',
      category: 'Software Development',
      description: 'Cloud services and deployment',
      skillLevel: 'Beginner'
    },

    // ============== GAME DEVELOPMENT ==============
    // Experienced Level
    { 
      id: 'unity', 
      title: 'Unity', 
      level: 7, 
      x: 80, 
      y: 20,
      color: '#000000',
      category: 'Game Development',
      description: '2D/3D game development and physics systems',
      skillLevel: 'Experienced'
    },
    { 
      id: 'csharp', 
      title: 'C#', 
      level: 6, 
      x: 95, 
      y: 15,
      color: '#239120',
      category: 'Game Development',
      description: 'Unity scripting and game logic programming',
      skillLevel: 'Experienced'
    },
    
    // Beginner Level
    { 
      id: 'pixel-art', 
      title: 'Pixel Art', 
      level: 5, 
      x: 80, 
      y: 35,
      color: '#ff69b4',
      category: 'Game Development',
      description: 'Game sprites, animations, and retro-style art',
      skillLevel: 'Beginner'
    },
    { 
      id: 'blender', 
      title: 'Blender', 
      level: 4, 
      x: 95, 
      y: 25,
      color: '#f5792a',
      category: 'Game Development',
      description: '3D modeling and game asset creation',
      skillLevel: 'Beginner'
    },
    { 
      id: 'figma', 
      title: 'Figma', 
      level: 4, 
      x: 80, 
      y: 50,
      color: '#f24e1e',
      category: 'Game Development',
      description: 'UI/UX design and game interface prototyping',
      skillLevel: 'Beginner'
    },
    { 
      id: 'photoshop', 
      title: 'Photoshop', 
      level: 3, 
      x: 95, 
      y: 35,
      color: '#31a8ff',
      category: 'Game Development',
      description: 'Texture creation and digital art for games',
      skillLevel: 'Beginner'
    }
  ];

  const connections = [
    // ============== WEB DEVELOPMENT CONNECTIONS ==============
    // Core connections within category
    { from: 'javascript', to: 'html' },
    { from: 'javascript', to: 'css' },
    { from: 'javascript', to: 'react' },
    { from: 'html', to: 'css' },
    { from: 'react', to: 'nextjs' },
    { from: 'react', to: 'framer' },
    { from: 'css', to: 'tailwind' },
    { from: 'nextjs', to: 'tailwind' },
    { from: 'javascript', to: 'typescript' },
    
    // ============== SOFTWARE DEVELOPMENT CONNECTIONS ==============
    // Backend connections
    { from: 'nodejs', to: 'python' },
    { from: 'nodejs', to: 'express' },
    { from: 'python', to: 'mongodb' },
    { from: 'express', to: 'mongodb' },
    { from: 'git', to: 'docker' },
    { from: 'docker', to: 'aws' },
    
    // ============== GAME DEVELOPMENT CONNECTIONS ==============
    // Game dev pipeline
    { from: 'unity', to: 'csharp' },
    { from: 'unity', to: 'pixel-art' },
    { from: 'blender', to: 'unity' },
    { from: 'pixel-art', to: 'photoshop' },
    { from: 'figma', to: 'pixel-art' },
    
    // ============== CROSS-CATEGORY CONNECTIONS ==============
    // Web to Software
    { from: 'javascript', to: 'nodejs' },
    { from: 'react', to: 'nodejs' },
    { from: 'typescript', to: 'csharp' },
    
    // Software to Game
    { from: 'git', to: 'unity' },
    { from: 'python', to: 'blender' },
    
    // Web to Game
    { from: 'css', to: 'figma' },
    { from: 'html', to: 'figma' }
  ];

  const handle_skill_click = (skill) => {
    set_active_skill(active_skill?.id === skill.id ? null : skill);
  };

  const handle_key_press = (event, skill) => {
    if(event.key === 'Enter' || event.key === ' ') 
      {
      event.preventDefault();
      handle_skill_click(skill);
    }
  };

  const connection_objects = connections.map((conn, index) => {
    const from_skill = skills.find(s => s.id === conn.from);
    const to_skill = skills.find(s => s.id === conn.to);
    
    if(!from_skill || !to_skill) return null;
    
    return {
      id: `${conn.from}-${conn.to}`,
      from: from_skill,
      to: to_skill,
      index
    };
  }).filter(Boolean);

  if(!is_mounted) 
    {
    return (
      <div 
        className = "relative w-full bg-slate-900 text-white"
        style = {{ height: '300vh' }}
      >
        <div className = "sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <div className = "text-white text-xl">Loading Skills...</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref = {container_ref}
      className = "relative w-full bg-slate-900 text-white"
      style = {{ height: '400vh' }}
    >
      <div className = "sticky top-0 h-screen overflow-hidden">
        {/* Animated Background with Parallax */}
        <div className = "absolute inset-0">
          <motion.div 
            className = "absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
            style = {{ 
              y: useTransform(scrollYProgress, [0, 1], [0, -100])
            }}
          />
          
          {/* Moving stars/particles background */}
          <motion.div 
            className = "absolute inset-0 opacity-20"
            style = {{ 
              y: useTransform(scrollYProgress, [0, 1], [0, -200]),
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8])
            }}
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key = {i}
                className = "absolute w-1 h-1 bg-cyan-400 rounded-full"
                style = {{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
                }}
                animate = {{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 1, 0.3]
                }}
                transition = {{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        </div>
        {/* Progress Indicator */}
        <motion.div 
          className = "absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30"
          style = {{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0]) }}
        >
          <div className = "bg-slate-800/90 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-600">
            <div className = "flex items-center space-x-3">
              <span className = "text-sm text-gray-300">Scroll Progress</span>
              <div className = "w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  className = "h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                  style = {{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                />
              </div>
              <motion.span 
                className = "text-sm font-bold text-cyan-400"
                style = {{ 
                  color: useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['#22d3ee', '#a855f7', '#f59e0b', '#ef4444'])
                }}
              >
                {Math.round(scrollYProgress.get() * 100)}%
              </motion.span>
            </div>
          </div>
        </motion.div>
        
        {/* Skill Level Legend with Parallax */}
        <motion.div 
          className = "absolute top-6 left-6 z-30"
          style = {{ 
            y: useTransform(scrollYProgress, [0, 1], [0, -50]),
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [1, 1, 1, 0])
          }}
        >
          <div className = "bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-600">
            <h3 className = "text-lg font-bold text-white mb-3">Skill Levels</h3>
            <div className = "space-y-3">
              <div className = "flex items-center space-x-3">
                <div className = "w-6 h-6 rounded-full bg-gradient-to-r from-red-400 to-orange-500 flex items-center justify-center border-2 border-red-400">
                  <div className = "text-white text-xs font-bold">E</div>
                </div>
                <div>
                  <div className = "text-sm font-semibold text-red-400">Expert</div>
                  <div className = "text-xs text-gray-400">Level 8-10</div>
                </div>
              </div>
              <div className = "flex items-center space-x-3">
                <div className = "w-5 h-5 rounded-full border-2 border-cyan-400 bg-cyan-400/20 flex items-center justify-center">
                  <div className = "text-cyan-400 text-xs font-bold">X</div>
                </div>
                <div>
                  <div className = "text-sm font-semibold text-cyan-400">Experienced</div>
                  <div className = "text-xs text-gray-400">Level 6-7</div>
                </div>
              </div>
              <div className = "flex items-center space-x-3">
                <div className = "w-4 h-4 rounded-full border-2 border-green-400 bg-green-400/20 flex items-center justify-center">
                  <div className = "text-green-400 text-xs font-bold">B</div>
                </div>
                <div>
                  <div className = "text-sm font-semibold text-green-400">Beginner</div>
                  <div className = "text-xs text-gray-400">Level 3-5</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Categories Legend with Parallax */}
        <motion.div 
          className = "absolute top-6 right-6 z-30"
          style = {{ 
            y: useTransform(scrollYProgress, [0, 1], [0, 50]),
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [1, 1, 1, 0])
          }}
        >
          <div className = "bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-600">
            <h3 className = "text-lg font-bold text-white mb-3">Categories</h3>
            <div className = "space-y-3">
              <div className = "border-b border-slate-600 pb-2">
                <div className = "flex items-center space-x-2 mb-2">
                  <div className = "w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className = "text-sm font-semibold text-blue-400">Web Development</span>
                </div>
                <div className = "text-xs text-gray-400 ml-5">Frontend & Full-stack</div>
              </div>
              
              <div className = "border-b border-slate-600 pb-2">
                <div className = "flex items-center space-x-2 mb-2">
                  <div className = "w-3 h-3 rounded-full bg-green-500"></div>
                  <span className = "text-sm font-semibold text-green-400">Software Development</span>
                </div>
                <div className = "text-xs text-gray-400 ml-5">Backend & DevOps</div>
              </div>
              
              <div>
                <div className = "flex items-center space-x-2 mb-2">
                  <div className = "w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className = "text-sm font-semibold text-purple-400">Game Development</span>
                </div>
                <div className = "text-xs text-gray-400 ml-5">Unity & Game Design</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Category Background Areas with Parallax */}
        <motion.div 
          className = "absolute inset-0 z-0 flex items-center justify-center"
          style = {{ 
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 15])
          }}
        >
          {/* Web Development Area - Left */}
          <motion.div 
            className = "absolute left-0 top-0 w-1/3 h-full border border-blue-400/20 bg-blue-400/5 rounded-2xl"
            style = {{ 
              scale: useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1.1]),
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
            }}
          >
            <motion.div 
              className = "absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-4 py-2 rounded-full border border-blue-400/60"
              style = {{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }}
            >
              <span className = "text-blue-400 font-semibold text-sm">Web Development</span>
            </motion.div>
          </motion.div>
          
          {/* Software Development Area - Center */}
          <motion.div 
            className = "absolute left-1/3 top-0 w-1/3 h-full border border-green-400/20 bg-green-400/5 rounded-2xl"
            style = {{ 
              scale: useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1.05]),
              opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
            }}
          >
            <motion.div 
              className = "absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-4 py-2 rounded-full border border-green-400/60"
              style = {{ y: useTransform(scrollYProgress, [0, 1], [0, -15]) }}
            >
              <span className = "text-green-400 font-semibold text-sm">Software Development</span>
            </motion.div>
          </motion.div>
          
          {/* Game Development Area - Right */}
          <motion.div 
            className = "absolute right-0 top-0 w-1/3 h-full border border-purple-400/20 bg-purple-400/5 rounded-2xl"
            style = {{ 
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1.02]),
              opacity: useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0])
            }}
          >
            <motion.div 
              className = "absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-4 py-2 rounded-full border border-purple-400/60"
              style = {{ y: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
            >
              <span className = "text-purple-400 font-semibold text-sm">Game Development</span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Connections */}
        <div className = "absolute top-0 left-0 w-full h-full z-10" aria-hidden = "true">
          {connection_objects.map((connection) => (
            <Connection 
              key = {connection.id}
              from = {connection.from}
              to = {connection.to}
              index = {connection.index}
              scrollYProgress = {scrollYProgress}
            />
          ))}
        </div>
        
        {/* Skills */}
        {skills.map((skill, index) => (
          <SkillBall 
            key = {skill.id}
            skill = {skill}
            index = {index}
            onClick = {handle_skill_click}
            onKeyPress = {handle_key_press}
            isActive = {active_skill?.id === skill.id}
            scrollYProgress = {scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsParallaxNew;
