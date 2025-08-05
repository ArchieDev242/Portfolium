import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillNode = ({ title, level, skillLevel, x, y, onClick, isActive, isUnlocked, onMouseDown }) => {
  const node_styles = isUnlocked 
    ? "border-2 border-white bg-slate-800/50" 
    : "border-2 border-gray-600 bg-slate-900/50";
  
  const glow_effect = isActive 
    ? "shadow-[0_0_15px_5px_rgba(255,255,255,0.7)]" 
    : isUnlocked 
      ? "shadow-[0_0_8px_2px_rgba(255,255,255,0.3)]" 
      : "";

  const get_skill_level_info = (skill_level) => {
    switch(skill_level) 
    {
      case 'Beginner': return { color: '#94a3b8', short: 'BEG' };
      case 'Basic': return { color: '#22c55e', short: 'BAS' };
      case 'Advanced': return { color: '#f59e0b', short: 'ADV' };
      case 'Professional': return { color: '#ef4444', short: 'PRO' };
      case 'Core': return { color: '#8b5cf6', short: 'CORE' };
      case 'Legacy': return { color: '#64748b', short: 'LEG' };
      default: return { color: '#64748b', short: '' };
    }
  };

  const level_info = get_skill_level_info(skillLevel);

  return (
    <motion.div 
      className = "absolute cursor-pointer"
      style = {{ left: `${x}px`, top: `${y}px` }}
      initial = {{ scale: 0 }}
      animate = {{ scale: 1 }}
      whileHover = {{ scale: 1.1 }}
      onClick = {(e) => onClick(e)}
      onMouseDown = {onMouseDown}
    >
      <motion.div 
        className = {`rounded-full w-16 h-16 flex items-center justify-center ${node_styles} ${glow_effect}`}
        animate = {{ 
          boxShadow: isActive 
            ? ['0 0 15px 5px rgba(255,255,255,0.7)', '0 0 20px 8px rgba(255,255,255,0.9)', '0 0 15px 5px rgba(255,255,255,0.7)'] 
            : isUnlocked 
              ? ['0 0 8px 2px rgba(255,255,255,0.3)', '0 0 12px 4px rgba(255,255,255,0.5)', '0 0 8px 2px rgba(255,255,255,0.3)']
              : 'none'
        }}
        transition = {{ duration: 2, repeat: Infinity }}
      >
        <div className = "text-center">
          <div className = {`text-xs ${isUnlocked ? 'text-white' : 'text-gray-500'} pixel-text`}>
            {title}
          </div>
          {skillLevel && (
            <div 
              className = "text-[9px] pixel-text font-bold"
              style = {{ color: level_info.color }}
            >
              {level_info.short}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const TreeBranch = ({ path, isActive, color = "rgba(100, 100, 100, 0.3)" }) => {
  const active_color = color.replace('0.3)', '0.8)');
  
  return (
    <motion.path
      d = {path}
      fill = "none"
      strokeWidth = {isActive ? 3 : 2}
      stroke = {isActive ? active_color : color}
      initial = {{ pathLength: 0, opacity: 0 }}
      animate = {{ 
        pathLength: 1, 
        opacity: 1,
        stroke: isActive ? active_color : color
      }}
      transition = {{ duration: 1 }}
    />
  );
};

const GlowingEffect = ({ path, isActive, color = "rgba(255, 255, 255, 0.2)" }) => {
  if(!isActive) return null;
  
  return (
    <motion.path
      d = {path}
      fill = "none"
      strokeWidth = {6}
      stroke = {color}
      filter = "blur(4px)"
      initial = {{ pathLength: 0, opacity: 0 }}
      animate = {{ pathLength: 1, opacity: 1 }}
      transition = {{ duration: 1 }}
    />
  );
};

const TimelineEvent = ({ year, title, x, y, color, description, isCritical = false }) => {
  return (
    <motion.div
      className = "absolute"
      style = {{ left: `${x}px`, top: `${y}px` }}
      initial = {{ opacity: 0, scale: 0.8 }}
      animate = {{ opacity: 1, scale: 1 }}
      transition = {{ delay: 0.3, duration: 0.5 }}
    >
      <div className = "flex items-start gap-3">
        <div 
          className = {`${isCritical ? 'w-6 h-6' : 'w-4 h-4'} rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${isCritical ? 'animate-pulse' : ''}`}
          style = {{ 
            borderColor: color,
            backgroundColor: `${color}30`,
            boxShadow: isCritical ? `0 0 15px ${color}80` : 'none'
          }}
        >
          <div 
            className = {`${isCritical ? 'w-3 h-3' : 'w-2 h-2'} rounded-full`}
            style = {{ backgroundColor: color }}
          ></div>
        </div>
        <div className = {isCritical ? "max-w-40" : "max-w-32"}>
          <div 
            className = {`pixel-text ${isCritical ? 'text-base font-black' : 'text-sm font-bold'} mb-1`}
            style = {{ 
              color: color,
              textShadow: isCritical ? `2px 2px 8px ${color}80` : 'none'
            }}
          >
            {year}
          </div>
          <div 
            className = {`pixel-text ${isCritical ? 'text-sm font-bold' : 'text-xs font-semibold'} leading-relaxed mb-1`}
            style = {{
              color: '#f8fafc',
              textShadow: isCritical ? '3px 3px 6px rgba(0, 0, 0, 0.9)' : '2px 2px 4px rgba(0, 0, 0, 0.9)'
            }}
          >
            {title}
          </div>
          {description && (
            <div 
              className = {`pixel-text ${isCritical ? 'text-xs' : 'text-[10px]'} leading-relaxed px-2 py-1 rounded border`}
              style = {{ 
                color: '#e2e8f0',
                backgroundColor: isCritical ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.9)',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.9)',
                borderColor: isCritical ? `${color}60` : 'rgba(71, 85, 105, 0.5)',
                backdropFilter: 'blur(4px)',
                boxShadow: isCritical ? `0 0 10px ${color}40` : 'none'
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TimelineLine = ({ startX, startY, endX, endY }) => {
  return (
    <motion.line
      x1 = {startX}
      y1 = {startY}
      x2 = {endX}
      y2 = {endY}
      stroke = "rgba(100, 116, 139, 0.5)"
      strokeWidth = "2"
      strokeDasharray = "5,5"
      initial = {{ pathLength: 0, opacity: 0 }}
      animate = {{ pathLength: 1, opacity: 1 }}
      transition = {{ delay: 0.5, duration: 2 }}
    />
  );
};

const SkillLevelLabel = ({ title, x, y, color }) => {
  return (
    <motion.div
      className = "absolute"
      style = {{ left: `${x}px`, top: `${y}px` }}
      initial = {{ opacity: 0 }}
      animate = {{ opacity: 1 }}
      transition = {{ delay: 0.7, duration: 0.5 }}
    >
      <div 
        className = "pixel-text text-xs px-2 py-1 rounded-md border backdrop-blur-sm"
        style = {{ 
          color: color, 
          borderColor: `${color}50`,
          backgroundColor: `${color}15`
        }}
      >
        {title}
      </div>
    </motion.div>
  );
};

const CategoryLabel = ({ title, x, y, color }) => {
  return (
    <motion.div
      className = "absolute"
      style = {{ left: `${x}px`, top: `${y}px` }}
      initial = {{ opacity: 0 }}
      animate = {{ opacity: 1 }}
      transition = {{ delay: 0.5, duration: 0.5 }}
    >
      <div 
        className = "pixel-text text-sm px-3 py-1 rounded-md border backdrop-blur-sm"
        style = {{ 
          color: color, 
          borderColor: `${color}50`,
          backgroundColor: `${color}15`
        }}
      >
        {title}
      </div>
    </motion.div>
  );
};

const SkillDetails = ({ skill, position }) => {
  if(!skill) return null;

  const { title, level, description, points, category, skillLevel } = skill;
  
  const get_level_color = (skill_level) => {
    switch(skill_level) 
    {
      case 'Beginner': return '#94a3b8';
      case 'Basic': return '#22c55e';
      case 'Advanced': return '#f59e0b';
      case 'Professional': return '#ef4444';
      case 'Core': return '#8b5cf6';
      case 'Legacy': return '#64748b';
      default: return '#64748b';
    }
  };
  
  const popup_style = {
    left: `${position.x}px`,
    top: skill.id === 'root' ? `${position.y - 120}px` : `${position.y + 40}px`,
  };
  
  return (
    <motion.div 
      className = "absolute z-10 bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 w-72"
      style = {popup_style}
      initial = {{ opacity: 0, y: -10 }}
      animate = {{ opacity: 1, y: 0 }}
      exit = {{ opacity: 0, y: -10 }}
    >
      <div className = "flex items-center justify-between mb-2">
        <h3 className = "pixel-text text-xl text-white">{title}</h3>
        {points > 0 && (
          <div className = "pixel-text text-sm text-amber-400">
            {points} {points === 1 ? 'point' : 'points'}
          </div>
        )}
      </div>
      
      {/* Category and Skill Level */}
      {category && (
        <div className = "flex gap-2 mb-2">
          <div className = "pixel-text text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {category}
          </div>
          {skillLevel && (
            <div 
              className = "pixel-text text-xs px-2 py-1 rounded border"
              style = {{ 
                backgroundColor: `${get_level_color(skillLevel)}20`,
                color: get_level_color(skillLevel),
                borderColor: `${get_level_color(skillLevel)}50`
              }}
            >
              {skillLevel}
            </div>
          )}
        </div>
      )}
      
      {level > 0 && (
        <div className = "mb-2">
          <div className = "flex items-center">
            <div className = "text-xs mr-2 pixel-text text-gray-400">Level {level}</div>
            <div className = "w-32 bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                className = "h-full bg-white"
                initial = {{ width: 0 }}
                animate = {{ width: `${level * 10}%` }}
                transition = {{ duration: 1 }}
              />
            </div>
          </div>
        </div>
      )}
      
      <p className = "pixel-text text-sm text-gray-300">{description}</p>
    </motion.div>
  );
};

const SkillTree = () => {
  
  const ENABLE_NODE_DRAG = false; // dev-only: should be enabled for node drag mode

  const [is_client, set_is_client] = useState(false);

  const [active_skill, set_active_skill] = useState(null);
  const [unlocked_skills, set_unlocked_skills] = useState(['html', 'css', 'js', 'react', 'nextjs', 'nodejs_web', 'tailwind', 'vue', 'typescript', 'angular', 'git', 'python_dev', 'cpp_dev', 'csharp_dev', 'java_dev', 'lua_modding', 'csharp_modding', 'python_modding', 'java_modding', 'lua_game', 'cpp_game', 'csharp_game', 'python_game', 'unity', 'unreal', 'raylib', 'java_legacy', 'haxe', 'haxeflixel', 'selenium', 'postman', 'turbo_c', 'holy_c', 'pascal']);
  const [skill_points, set_skill_points] = useState(1);
  const [popup_position, set_popup_position] = useState({ x: 0, y: 0 });
  
  const [is_dragging, set_is_dragging] = useState(false);
  const [has_dragged, set_has_dragged] = useState(false);
  const [drag_start, set_drag_start] = useState({ x: 0, y: 0 });
  const [offset, set_offset] = useState({ x: 0, y: 0 });
  const [last_offset, set_last_offset] = useState({ x: 0, y: 0 });
  const [scale, set_scale] = useState(1);
  const [zoom_center, set_zoom_center] = useState({ x: 500, y: 400 });
  
  const [custom_node_positions, set_custom_node_positions] = useState({});
  const [dragged_node_id, set_dragged_node_id] = useState(null);
  const [drag_offset, set_drag_offset] = useState({ x: 0, y: 0 });
  const [is_node_dragging, set_is_node_dragging] = useState(false);
  
  const categories = [
    { title: "Web Development", x: 30, y: 30, color: "#38bdf8" }, // left top
    { title: "Software Development", x: 900, y: 30, color: "#4ade80" }, // right top
    { title: "Game Development", x: -190, y: 600, color: "#e879f9" }, // left bottom
    { title: "Modding", x: 450, y: 30, color: "#f97316" }, // center top
    { title: "Legacy Skills", x: 1000, y: 600, color: "#64748b" }, // right bottom
  ];

  const timeline_events = [
    {
      year: "2018",
      title: "First Interest in Minecraft Modding",
      description: "Started exploring Minecraft mods and learning Java basics",
      x: 120,
      y: 950,
      color: "#f97316"
    },
    {
      year: "2020",
      title: "IT-Start Evolution Courses",
      description: "Started offline IT courses: Web Development (HTML, CSS, JavaScript, Angular, React, Vue.js, TypeScript), 3D design (Cinema 4D), UI/UX design (Figma, Photoshop)",
      x: 320,
      y: 950,
      color: "#38bdf8"
    },
    {
      year: "2021",
      title: "Modern JavaScript & React",
      description: "Transitioned to React and modern JavaScript frameworks",
      x: 520,
      y: 950,
      color: "#38bdf8"
    },
    {
      year: "2022",
      title: "GameDev & Unity at IT-Start Evolution",
      description: "Started learning Game Development and Unity in IT-Start Evolution courses",
      x: 720,
      y: 950,
      color: "#e879f9"
    },
    {
      year: "Feb 24, 2022",
      title: "Life Changed Forever",
      description: "Full-scale war began in Ukraine. Everything split into 'before' and 'after' this moment. Despite everything, continued learning and growing.",
      x: 920,
      y: 950,
      color: "#dc2626"
    },
    {
      year: "2023",
      title: "New Chapter: University & Game Development continuing",
      description: "Completed my journey as a Friday Night Funkin' (FNF) mod maker and started learning Unreal Engine with C/C++. Also entered university to further my education.",
      x: 1120,
      y: 950,
      color: "#4ade80"
    },

  ];
  
  const skills_data = {
    root: { id: 'root', title: 'CORE', level: 10, x: 500, y: 400, description: 'Your core development abilities' },
    
    skills: 
    [
      // ===== WEB DEVELOPMENT BRANCH =====
      { 
        id: 'html', 
        title: 'HTML', 
        level: 9, 
        x: 80, 
        y: 320,
        description: 'Semantic markup and accessibility (2019)',
        points: 0,
        connections: ['root'],
        category: "Web Development",
        skillLevel: "Advanced"
      },
      
      // CSS branch
      { 
        id: 'css', 
        title: 'CSS', 
        level: 8, 
        x: 180, 
        y: 280,
        description: 'Styling and responsive design (2019)',
        points: 0,
        connections: ['root'],
        category: "Web Development",
        skillLevel: "Advanced"
      },
      { 
        id: 'tailwind', 
        title: 'Tailwind', 
        level: 8, 
        x: 180, 
        y: 200,
        description: 'Utility-first CSS framework (2023)',
        points: 0,
        connections: ['css'],
        category: "Web Development",
        skillLevel: "Advanced"
      },
      
      // JavaScript branch
      { 
        id: 'js', 
        title: 'JavaScript', 
        level: 9, 
        x: 300, 
        y: 320,
        description: 'Dynamic web programming (2019)',
        points: 0,
        connections: ['root'],
        category: "Web Development",
        skillLevel: "Advanced"
      },
      
      { 
        id: 'react', 
        title: 'React', 
        level: 6, 
        x: 250, 
        y: 240,
        description: 'Component-based UI library (2021)',
        points: 0,
        connections: ['js'],
        category: "Web Development",
        skillLevel: "Basic"
      },
      { 
        id: 'nextjs', 
        title: 'Next.js', 
        level: 5, 
        x: 200, 
        y: 160,
        description: 'React framework for production (2023)',
        points: 0,
        connections: ['react'],
        category: "Web Development",
        skillLevel: "Basic"
      },
      
      { 
        id: 'nodejs_web', 
        title: 'Node.js', 
        level: 5, 
        x: 350, 
        y: 240,
        description: 'Server-side JavaScript for web development (2022)',
        points: 0,
        connections: ['js'],
        category: "Web Development",
        skillLevel: "Basic"
      },
      
      { 
        id: 'vue', 
        title: 'Vue', 
        level: 4, 
        x: 280, 
        y: 160,
        description: 'Vue.js framework (used until 2020, no longer active)',
        points: 1,
        connections: ['js'],
        category: "Web Development",
        skillLevel: "Basic"
      },
      { 
        id: 'typescript', 
        title: 'TypeScript', 
        level: 2, 
        x: 320, 
        y: 100,
        description: 'Typed JavaScript (used until 2020, no longer active)',
        points: 1,
        connections: ['js'],
        category: "Web Development",
        skillLevel: "Beginner"
      },
      { 
        id: 'angular', 
        title: 'Angular', 
        level: 1, 
        x: 360, 
        y: 160,
        description: 'Angular framework (used until 2020, no longer active)',
        points: 2,
        connections: ['typescript'],
        category: "Web Development",
        skillLevel: "Beginner"
      },
      
      // ===== SOFTWARE DEVELOPMENT BRANCH =====
      { 
        id: 'git', 
        title: 'Git', 
        level: 8, 
        x: 800, 
        y: 280,
        description: 'Version control system (2021)',
        points: 0,
        connections: ['root'],
        category: "Software Development",
        skillLevel: "Advanced"
      },
      { 
        id: 'python_dev', 
        title: 'Python', 
        level: 4, 
        x: 900, 
        y: 240,
        description: 'General purpose programming and scripting (2022)',
        points: 0,
        connections: ['root'],
        category: "Software Development",
        skillLevel: "Basic"
      },
      { 
        id: 'cpp_dev', 
        title: 'C/C++', 
        level: 6, 
        x: 850, 
        y: 180,
        description: 'Systems programming and performance optimization (2023)',
        points: 1,
        connections: ['git'],
        category: "Software Development",
        skillLevel: "Advanced"
      },
      { 
        id: 'csharp_dev', 
        title: 'C#', 
        level: 2, 
        x: 920, 
        y: 320,
        description: 'Object-oriented programming with .NET ecosystem (2023)',
        points: 1,
        connections: ['python_dev'],
        category: "Software Development",
        skillLevel: "Beginner"
      },
      { 
        id: 'java_dev', 
        title: 'Java', 
        level: 1, 
        x: 1000, 
        y: 280,
        description: 'Explored Java development in the past, but no longer actively using (2019)',
        points: 2,
        connections: ['csharp_dev'],
        category: "Software Development",
        skillLevel: "Beginner"
      },

      // ===== MODDING BRANCH =====
      { 
        id: 'lua_modding', 
        title: 'Lua', 
        level: 3, 
        x: 450, 
        y: 220,
        description: 'Lua scripting for game modifications (2021)',
        points: 0,
        connections: ['root'],
        category: "Modding",
        skillLevel: "Basic"
      },
      { 
        id: 'csharp_modding', 
        title: 'C#', 
        level: 3, 
        x: 520, 
        y: 180,
        description: 'C# for game modding and Unity scripting (2023)',
        points: 1,
        connections: ['lua_modding'],
        category: "Modding",
        skillLevel: "Basic"
      },
      { 
        id: 'python_modding', 
        title: 'Python', 
        level: 3, 
        x: 480, 
        y: 280,
        description: 'Python scripting for game automation and tools (2022)',
        points: 1,
        connections: ['lua_modding'],
        category: "Modding",
        skillLevel: "Basic"
      },
      { 
        id: 'java_modding', 
        title: 'Java', 
        level: 2, 
        x: 550, 
        y: 240,
        description: 'Java for Minecraft mod development (2018)',
        points: 2,
        connections: ['csharp_modding'],
        category: "Modding",
        skillLevel: "Beginner"
      },
      
      // ===== GAME DEVELOPMENT BRANCH =====
      { 
        id: 'lua_game', 
        title: 'Lua', 
        level: 3, 
        x: 100, 
        y: 620,
        description: 'Scripting for game engines and mods (2020)',
        points: 0,
        connections: ['root'],
        category: "Game Development",
        skillLevel: "Basic"
      },
      { 
        id: 'cpp_game', 
        title: 'C/C++', 
        level: 4, 
        x: 200, 
        y: 660,
        description: 'Low-level game programming and engine development (2023)',
        points: 1,
        connections: ['lua_game'],
        category: "Game Development",
        skillLevel: "Advanced"
      },
      { 
        id: 'csharp_game', 
        title: 'C#', 
        level: 2, 
        x: 280, 
        y: 620,
        description: 'Object-oriented programming for Unity game development (2023)',
        points: 1,
        connections: ['lua_game'],
        category: "Game Development",
        skillLevel: "Basic"
      },
      { 
        id: 'python_game', 
        title: 'Python', 
        level: 2, 
        x: 30, 
        y: 720,
        description: 'Game scripting and rapid prototyping (2022)',
        points: 1,
        connections: ['lua_game'],
        category: "Game Development",
        skillLevel: "Basic"
      },
      
      // Game Engines
      { 
        id: 'unity', 
        title: 'Unity', 
        level: 1, 
        x: 320, 
        y: 680,
        description: '3D game engine with C# scripting (2023)',
        points: 2,
        connections: ['csharp_game'],
        category: "Game Development",
        skillLevel: "Beginner"
      },
      { 
        id: 'unreal', 
        title: 'Unreal Engine', 
        level: 1, 
        x: 240, 
        y: 760,
        description: 'AAA game engine with visual scripting (2023)',
        points: 2,
        connections: ['cpp_game'],
        category: "Game Development",
        skillLevel: "Basic"
      },
      { 
        id: 'raylib', 
        title: 'Raylib', 
        level: 0, 
        x: 120, 
        y: 760,
        description: 'Simple and easy-to-use library for game programming (2024)',
        points: 2,
        connections: ['cpp_game'],
        category: "Game Development",
        skillLevel: "Beginner"
      },
      
      // ===== LEGACY SKILLS BRANCH =====
      { 
        id: 'java_legacy', 
        title: 'Java', 
        level: 2, 
        x: 800, 
        y: 620,
        description: 'Object-oriented programming language (explored in the past)',
        points: 0,
        connections: ['root'],
        category: "Legacy Skills",
        skillLevel: "Beginner"
      },
      { 
        id: 'haxe', 
        title: 'Haxe', 
        level: 1, 
        x: 900, 
        y: 650,
        description: 'Cross-platform programming language',
        points: 1,
        connections: ['java_legacy'],
        category: "Legacy Skills",
        skillLevel: "Beginner"
      },
      { 
        id: 'haxeflixel', 
        title: 'HaxeFlixel', 
        level: 1, 
        x: 950, 
        y: 700,
        description: '2D game framework for Haxe',
        points: 1,
        connections: ['haxe'],
        category: "Legacy Skills",
        skillLevel: "Beginner"
      },
      { 
        id: 'selenium', 
        title: 'Selenium', 
        level: 1, 
        x: 850, 
        y: 720,
        description: 'Web browser automation tool',
        points: 1,
        connections: ['java_legacy'],
        category: "Legacy Skills",
        skillLevel: "Beginner"
      },
      { 
        id: 'postman', 
        title: 'Postman', 
        level: 1, 
        x: 750, 
        y: 680,
        description: 'API development and testing tool',
        points: 1,
        connections: ['java_legacy'],
        category: "Legacy Skills",
        skillLevel: "Beginner"
      },
      { 
        id: 'turbo_c', 
        title: 'Turbo C', 
        level: 2, 
        x: 800, 
        y: 760,
        description: 'Classic C compiler and IDE',
        points: 0,
        connections: ['root'],
        category: "Legacy Skills",
        skillLevel: "Basic"
      },
      { 
        id: 'holy_c', 
        title: 'Holy C', 
        level: 1, 
        x: 900, 
        y: 780,
        description: 'Programming language for TempleOS (just for fun!)',
        points: 2,
        connections: ['turbo_c'],
        category: "Legacy Skills",
        skillLevel: "Beginner"
      },
      { 
        id: 'pascal', 
        title: 'Pascal', 
        level: 2, 
        x: 750, 
        y: 750,
        description: 'Structured programming language, great for learning fundamentals',
        points: 0,
        connections: ['root'],
        category: "Legacy Skills",
        skillLevel: "Basic"
      },
    ]
  };

  const generate_branch_path = (startX, startY, endX, endY) => {
    const mid_y = (startY + endY) / 2;
    
    return `M ${startX} ${startY} C ${startX} ${mid_y}, ${endX} ${mid_y}, ${endX} ${endY}`;
  };

  const get_category_color = (category) => {
    switch(category) 
    {
      case "Web Development": return "#38bdf8";
      case "Software Development": return "#4ade80";
      case "Game Development": return "#e879f9";
      case "Modding": return "#f97316";
      case "Legacy Skills": return "#64748b";
      default: return "rgba(100, 100, 100, 0.3)";
    }
  };

  const set_active_skill_by_id = (skillId, x, y) => {
    if(active_skill && active_skill.id === skillId) 
      {
      set_active_skill(null);
      return;
    }
    
    if(skillId === 'root') 
      {
      set_active_skill({...skills_data.root, id: 'root'});
      set_popup_position({ x: skills_data.root.x, y: skills_data.root.y });
    } else 
    {
      const skill = skills_data.skills.find(s => s.id === skillId);

      if(skill) 
        {
        set_active_skill(skill);
        set_popup_position({ x, y });
      }
    }
  };

  const unlock_skill = (skillId) => {
    const skill = skills_data.skills.find(s => s.id === skillId);
    
    if(!skill || skill.level > 0) return;
    
    if(skill_points >= skill.points) 
      {
      const can_unlock = skill.connections.some(connId => {
        if(connId === 'root') return true;
      
        return unlocked_skills.includes(connId);
      });
      
      if(can_unlock) 
        {
        set_skill_points(prev => prev - skill.points);
        set_unlocked_skills(prev => [...prev, skillId]);
        
        skill.level = 1;
      }
    }
  };

  const handle_node_click = (skillId, x, y, e) => {
    if(has_dragged || is_node_dragging) 
      {
      e.stopPropagation();
      return;
    }
    
    e.stopPropagation();
    set_active_skill_by_id(skillId, x, y);
    
    if(!unlocked_skills.includes(skillId)) 
      {
      unlock_skill(skillId);
    }
  };

  const handle_mouse_down = (e) => {
    if(dragged_node_id) return;
    
    e.preventDefault();
    set_is_dragging(true);
    set_has_dragged(false);
    set_drag_start({ 
      x: e.clientX - offset.x, 
      y: e.clientY - offset.y 
    });
  };

  const handle_background_click = (e) => {
    if(!has_dragged && !is_node_dragging && active_skill) 
      {
      set_active_skill(null);
    }
  };

  const handle_mouse_move = (e) => {
    if(!is_dragging) return;
    
    e.preventDefault();
    set_has_dragged(true);
    set_offset({
      x: e.clientX - drag_start.x,
      y: e.clientY - drag_start.y
    });
  };

  const handle_mouse_up = (e) => {
    if(is_dragging) 
      {
      if(e) e.preventDefault();
      set_is_dragging(false);
      // reset has_dragged after a short delay to allow click handlers to check it
      setTimeout(() => set_has_dragged(false), 10);
    }
  };

  const handle_wheel = (e) => {
    e.preventDefault();
    
    const zoom_factor = 0.1;
    const zoom_delta = e.deltaY > 0 ? -zoom_factor : zoom_factor;
    const new_scale = Math.max(0.5, Math.min(3, scale + zoom_delta));
    
    if(new_scale !== scale) 
      {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouse_x = e.clientX - rect.left;
      const mouse_y = e.clientY - rect.top;
      
      const zoom_point_x = (mouse_x - offset.x) / scale;
      const zoom_point_y = (mouse_y - offset.y) / scale;
      
      const new_offset_x = mouse_x - zoom_point_x * new_scale;
      const new_offset_y = mouse_y - zoom_point_y * new_scale;
      
      set_scale(new_scale);
      set_offset({ x: new_offset_x, y: new_offset_y });
    }
  };

  const get_node_position = (skill) => {
    if(custom_node_positions[skill.id]) 
      {
      return custom_node_positions[skill.id];
    }

    return { x: skill.x, y: skill.y };
  };

  const get_root_position = () => {
    if(custom_node_positions['root']) 
      {
      return custom_node_positions['root'];
    }

    return { x: skills_data.root.x, y: skills_data.root.y };
  };

  const handle_node_drag_start = (skill, e) => {
    if(!ENABLE_NODE_DRAG) return;

    e.stopPropagation();
    e.preventDefault();
    
    set_is_dragging(false);
    set_is_node_dragging(true);
    
    set_dragged_node_id(skill.id);
    const pos = get_node_position(skill);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const container_rect = e.currentTarget.closest('.skill-tree-container').getBoundingClientRect();
    
    set_drag_offset({
      x: (e.clientX - container_rect.left - offset.x) / scale - pos.x,
      y: (e.clientY - container_rect.top - offset.y) / scale - pos.y
    });
  };

  const handle_node_drag = (e) => {
    if(!ENABLE_NODE_DRAG || !dragged_node_id) return;
    e.preventDefault();
    
    const container_rect = document.querySelector('.skill-tree-container').getBoundingClientRect();
    
    const new_positions = {
      ...custom_node_positions,
      [dragged_node_id]: {
        x: (e.clientX - container_rect.left - offset.x) / scale - drag_offset.x,
        y: (e.clientY - container_rect.top - offset.y) / scale - drag_offset.y
      }
    };
    
    set_custom_node_positions(new_positions);
  };

  const handle_node_drag_end = () => {
    if(!ENABLE_NODE_DRAG) return;

    set_dragged_node_id(null);
    set_is_node_dragging(false);
    
    if(typeof window !== 'undefined' && Object.keys(custom_node_positions).length > 0) 
      {
      localStorage.setItem('skillTree_nodePositions', JSON.stringify(custom_node_positions));
      console.log('Saved node positions to localStorage:', custom_node_positions);
    }
  };

  useEffect(() => {
    if(!ENABLE_NODE_DRAG) return;

    if(dragged_node_id) 
      {
      window.addEventListener('mousemove', handle_node_drag);
      window.addEventListener('mouseup', handle_node_drag_end);
    } else 
    {
      window.removeEventListener('mousemove', handle_node_drag);
      window.removeEventListener('mouseup', handle_node_drag_end);
      setTimeout(() => set_is_node_dragging(false), 10);
    }
    return () => {
      window.removeEventListener('mousemove', handle_node_drag);
      window.removeEventListener('mouseup', handle_node_drag_end);
    };
  }, [dragged_node_id, drag_offset]);

  useEffect(() => {
    const handle_global_mouse_move = (e) => handle_mouse_move(e);
    const handle_global_mouse_up = (e) => handle_mouse_up(e);

    if(is_dragging) 
      {
      document.addEventListener('mousemove', handle_global_mouse_move);
      document.addEventListener('mouseup', handle_global_mouse_up);
    }

    return () => {
      document.removeEventListener('mousemove', handle_global_mouse_move);
      document.removeEventListener('mouseup', handle_global_mouse_up);
    };
  }, [is_dragging, drag_start, last_offset]);

  useEffect(() => {
    const prevent_scroll = (e) => {
      const skill_tree_container = e.target.closest('.skill-tree-container');

      if(skill_tree_container) 
        {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', prevent_scroll, { passive: false });

    return () => {
      document.removeEventListener('wheel', prevent_scroll);
    };
  }, []);

  // SSR/CSR compatibility: isClient -> true after mount
  useEffect(() => {
    set_is_client(true);
  }, []);

  useEffect(() => {
    if(!is_client) return;
    
    const saved = localStorage.getItem('skillTree_nodePositions');

    if(saved) 
      {
      try 
      {
        const parsed = JSON.parse(saved);
        console.log('Loaded node positions from localStorage:', parsed);
        set_custom_node_positions(parsed);
      } catch(e) 
      {
        console.error('Error parsing saved node positions:', e);
      }
    }
  }, [is_client]);

  useEffect(() => {
    // don't set any active skill initially
    // setActiveSkillById('root');
    
    // debug: log initial state
    console.log('SkillTree component mounted');
    console.log('ENABLE_NODE_DRAG:', ENABLE_NODE_DRAG);
    console.log('Initial custom_node_positions:', custom_node_positions);
  }, []);

  // debug: custom_node_positions change effect
  useEffect(() => {
    if(ENABLE_NODE_DRAG) 
      {
      console.log('custom_node_positions changed:', custom_node_positions);
    }
  }, [custom_node_positions]);

  useEffect(() => {
    if(is_client && Object.keys(custom_node_positions).length > 0) 
      {
      localStorage.setItem('skillTree_nodePositions', JSON.stringify(custom_node_positions));
      console.log('Auto-saved node positions to localStorage:', custom_node_positions);
    }
  }, [custom_node_positions, is_client]);

  return (
    <div 
      className = "skill-tree-container relative w-full h-[1600px] overflow-hidden select-none"
      onMouseDown = {handle_mouse_down}
      onWheel = {handle_wheel}
      onClick = {handle_background_click}
      style = {{ cursor: is_dragging ? 'grabbing' : 'grab' }}
    >
      {/* Background with stars */}
      <div className = "absolute inset-0 bg-[url('/images/stars-bg.png')] opacity-30"></div>
      
      {/* Draggable and zoomable content container */}
      <div 
        className = "absolute inset-0"
        style = {{ 
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          transition: is_dragging ? 'none' : 'transform 0.1s ease-out'
        }}
        onClick = {(e) => e.stopPropagation()}
      >
      
      {/* SVG for tree branches */}
      <svg className = "absolute inset-0 w-full h-full" xmlns = "http://www.w3.org/2000/svg">
        {/* Glowing effects for active branches */}
        {skills_data.skills.map(skill => 
          skill.connections.map((connId, idx) => {
            let start_node, end_node;
            
            if(connId === 'root') 
              {
              const root_pos = get_root_position();
              
              start_node = {...skills_data.root, x: root_pos.x, y: root_pos.y};
            } else 
            {
              const start_skill = skills_data.skills.find(s => s.id === connId);
              if(start_skill) 
                {
                const start_pos = get_node_position(start_skill);

                start_node = {...start_skill, x: start_pos.x, y: start_pos.y};
              }
            }
            
            const end_pos = get_node_position(skill);
            end_node = {...skill, x: end_pos.x, y: end_pos.y};
            
            if(!start_node || !end_node) return null;
            
            const is_active = 
              (unlocked_skills.includes(start_node.id) || start_node.id === 'root') && 
              unlocked_skills.includes(end_node.id);
            
            const path = generate_branch_path(start_node.x + 8, start_node.y + 8, end_node.x + 8, end_node.y + 8);
            const category_color = get_category_color(end_node.category);
            const glow_color = category_color.replace('rgb(', 'rgba(').replace(')', ', 0.4)');
            
            return (
              <GlowingEffect 
                key = {`glow-${skill.id}-${connId}-${idx}`}
                path = {path}
                isActive = {is_active}
                color = {glow_color}
              />
            );
          })
        )}
        
        {/* Tree branches */}
        {skills_data.skills.map(skill => 
          skill.connections.map((connId, idx) => {
            let start_node, end_node;
            
            if(connId === 'root') 
              {
              const root_pos = get_root_position();
              start_node = {...skills_data.root, x: root_pos.x, y: root_pos.y};
            } else 
            {
              const start_skill = skills_data.skills.find(s => s.id === connId);

              if(start_skill) 
                {
                const start_pos = get_node_position(start_skill);

                start_node = {...start_skill, x: start_pos.x, y: start_pos.y};
              }
            }
            
            const end_pos = get_node_position(skill);
            end_node = {...skill, x: end_pos.x, y: end_pos.y};
            
            if(!start_node || !end_node) return null;
            
            const is_active = 
              (unlocked_skills.includes(start_node.id) || start_node.id === 'root') && 
              unlocked_skills.includes(end_node.id);
            
            const path = generate_branch_path(start_node.x + 8, start_node.y + 8, end_node.x + 8, end_node.y + 8);
            const category_color = get_category_color(end_node.category);
            const line_color = category_color.replace('rgb(', 'rgba(').replace(')', ', 0.5)');
            
            return (
              <TreeBranch 
                key = {`branch-${skill.id}-${connId}-${idx}`}
                path = {path}
                isActive = {is_active}
                color = {line_color}
              />
            );
          })
        )}
      </svg>
      
      {/* Category labels */}
      {categories.map((category, idx) => (
        <CategoryLabel 
          key = {`category-${idx}`}
          title = {category.title}
          x = {category.x}
          y = {category.y}
          color = {category.color}
        />
      ))}
      
      {/* Timeline Section */}
      <div className = "absolute" style = {{ left: "50px", top: "900px" }}>
        <div className = "pixel-text text-lg font-bold text-white mb-6">
          Journey Timeline
        </div>
      </div>
      
      {/* Timeline Lines */}
      <svg className = "absolute inset-0 w-full h-full" xmlns = "http://www.w3.org/2000/svg">
        {/* Single timeline line from 2018 to 2023 */}
        <TimelineLine 
          startX = {120}
          startY = {960}
          endX = {1120}
          endY = {960}
        />
      </svg>
      
      {/* Timeline Events */}
      {timeline_events.map((event, idx) => (
        <TimelineEvent 
          key = {`timeline-${idx}`}
          year = {event.year}
          title = {event.title}
          description = {event.description}
          x = {event.x}
          y = {event.y}
          color = {event.color}
          isCritical = {event.year === "Feb 24, 2022"}
        />
      ))}
      

      
      {/* Root node */}
      <SkillNode 
        title = {skills_data.root.title}
        level = {skills_data.root.level}
        skillLevel = "Core"
        x = {get_root_position().x - 8}
        y = {get_root_position().y - 8}
        onClick = {(e) => handle_node_click('root', get_root_position().x, get_root_position().y, e)}
        isActive = {active_skill && active_skill.id === 'root'}
        isUnlocked = {true}
        onMouseDown = {ENABLE_NODE_DRAG ? (e) => handle_node_drag_start({...skills_data.root, id: 'root'}, e) : undefined}
      />
      
      {/* Skill nodes */}
      {skills_data.skills.map(skill => {
        const pos = get_node_position(skill);
        return (
          <SkillNode 
            key = {skill.id}
            title = {skill.title}
            level = {skill.level}
            skillLevel = {skill.skillLevel}
            x = {pos.x - 8}
            y = {pos.y - 8}
            onClick = {(e) => handle_node_click(skill.id, pos.x, pos.y, e)}
            isActive = {active_skill && active_skill.id === skill.id}
            isUnlocked = {unlocked_skills.includes(skill.id)}
            onMouseDown = {ENABLE_NODE_DRAG ? (e) => handle_node_drag_start(skill, e) : undefined}
          />
        );
      })}

      {/* Skill details popup - only shows when a skill is active - Moves and scales with tree */}
      <AnimatePresence>
        {active_skill && (
          <div 
            className = "absolute"
            style = {{ 
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transformOrigin: '0 0',
              transition: is_dragging ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            <SkillDetails 
              skill = {active_skill} 
              position = {popup_position}
            />
          </div>
        )}
      </AnimatePresence>
      </div>
      
      {/* Fixed UI elements that don't move with panning */}
      {/* Skill levels legend - Fixed on the left side */}
      <div 
        className = "absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 z-20"
        onClick = {(e) => e.stopPropagation()}
      >
        <div className = "pixel-text text-sm font-bold text-white mb-3">
          Skill Levels:
        </div>
        <div className = "space-y-1">
          <div className = "flex items-center gap-2">
            <div className = "w-3 h-3 rounded" style = {{ backgroundColor: "#94a3b8" }}></div>
            <span className = "pixel-text text-xs text-gray-300">BEG - Beginner</span>
          </div>
          <div className = "flex items-center gap-2">
            <div className = "w-3 h-3 rounded" style = {{ backgroundColor: "#22c55e" }}></div>
            <span className = "pixel-text text-xs text-gray-300">BAS - Basic</span>
          </div>
          <div className = "flex items-center gap-2">
            <div className = "w-3 h-3 rounded" style = {{ backgroundColor: "#f59e0b" }}></div>
            <span className = "pixel-text text-xs text-gray-300">ADV - Advanced</span>
          </div>
          <div className = "flex items-center gap-2">
            <div className = "w-3 h-3 rounded" style = {{ backgroundColor: "#ef4444" }}></div>
            <span className = "pixel-text text-xs text-gray-300">PRO - Professional</span>
          </div>
          <div className = "flex items-center gap-2">
            <div className = "w-3 h-3 rounded" style = {{ backgroundColor: "#8b5cf6" }}></div>
            <span className = "pixel-text text-xs text-gray-300">CORE - Core Skills</span>
          </div>
          <div className = "flex items-center gap-2">
            <div className = "w-3 h-3 rounded" style = {{ backgroundColor: "#64748b" }}></div>
            <span className = "pixel-text text-xs text-gray-300">LEG - Legacy</span>
          </div>
        </div>
      </div>
      
      {/* Skill points indicator - Moved to the bottom left */}
      <div 
        className = "absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 z-20"
        onClick = {(e) => e.stopPropagation()}
      >
        <div className = "pixel-text text-amber-400 text-center">
          {skill_points} SKILL {skill_points === 1 ? 'POINT' : 'POINTS'} AVAILABLE
        </div>
        <div className = "w-32 h-1 bg-amber-900 mx-auto mt-1 rounded-full overflow-hidden">
          <motion.div 
            className = "h-full bg-amber-500"
            style = {{ width: '100%' }}
          />
        </div>
      </div>
      
      {/* Zoom and Reset Controls */}
      <div 
        className = "absolute bottom-4 right-4 bg-slate-800/80 backdrop-blur-sm border border-white/20 rounded-lg p-2 z-20"
        onClick = {(e) => e.stopPropagation()}
      >
        <div className = "flex gap-2 mb-2">
          <button 
            className = "pixel-text text-xs px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded hover:bg-blue-500/30 transition-colors"
            onClick = {() => {
              set_scale(1);
              set_offset({ x: 0, y: 0 });
            }}
          >
            Reset View
          </button>
          <button 
            className = "pixel-text text-xs px-2 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded hover:bg-green-500/30 transition-colors"
            onClick = {() => {
              set_offset({ x: -200, y: -100 });
            }}
          >
            Center
          </button>
        </div>
        
        {/* Node Position Controls */}
        <div className = "flex gap-2">
          <button 
            className = "pixel-text text-xs px-2 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded hover:bg-yellow-500/30 transition-colors"
            onClick = {() => {
              if(Object.keys(custom_node_positions).length > 0) 
                {
                if(confirm('Reset all node positions to default? This cannot be undone.')) 
                  {
                  set_custom_node_positions({});

                  if(typeof window !== 'undefined') 
                    {
                    localStorage.removeItem('skillTree_nodePositions');
                    console.log('Node positions reset and localStorage cleared');
                  }
                }
              } else 
              {
                alert('No custom positions to reset');
              }
            }}
          >
            Reset Nodes
          </button>
          <button 
            className = "pixel-text text-xs px-2 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded hover:bg-purple-500/30 transition-colors"
            onClick = {async () => {
              if(Object.keys(custom_node_positions).length > 0) 
                {
                const json_data = JSON.stringify(custom_node_positions, null, 2);
                console.log('Node positions JSON:', json_data);
                
                try 
                {
                  await navigator.clipboard.writeText(json_data);
                  alert('Coordinates copied to clipboard!');
                } catch(err) 
                {
                  console.error('Failed to copy to clipboard:', err);
                  alert('Coordinates logged to console (clipboard access denied)');
                }
              } else 
              {
                console.log('No custom positions to export');
                alert('No custom positions to export');
              }
            }}
          >
            Export
          </button>
        </div>
      </div>
      
      {/* Instructions */}
      <div 
        className = "absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm p-2 rounded-lg border border-white/20 z-20"
        onClick = {(e) => e.stopPropagation()}
      >
        <p className = "pixel-text text-xs text-gray-400 mb-1">Click and drag to pan • Scroll to zoom</p>
        <p className = "pixel-text text-xs text-gray-500">Zoom: {(scale * 100).toFixed(0)}%</p>
      </div>

      {/* debug drag mode */}
      {ENABLE_NODE_DRAG && (
        <div 
          className = "fixed top-2 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-yellow-500 text-black font-bold rounded shadow-lg border border-yellow-700"
          onClick = {(e) => e.stopPropagation()}
        >
          <div className = "text-center">
            <div>DRAG MODE: Move nodes with mouse (DEV ONLY)</div>
            <div className = "text-xs mt-1">
              Positions auto-saved to localStorage • {Object.keys(custom_node_positions).length} nodes moved
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillTree;
