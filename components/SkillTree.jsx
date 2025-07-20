import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component for skill node
const SkillNode = ({ title, level, x, y, onClick, isActive, isUnlocked }) => {
  // Define styles based on state
  const nodeStyles = isUnlocked 
    ? "border-2 border-white bg-slate-800/50" 
    : "border-2 border-gray-600 bg-slate-900/50";
  
  const glowEffect = isActive 
    ? "shadow-[0_0_15px_5px_rgba(255,255,255,0.7)]" 
    : isUnlocked 
      ? "shadow-[0_0_8px_2px_rgba(255,255,255,0.3)]" 
      : "";

  return (
    <motion.div 
      className = "absolute cursor-pointer"
      style = {{ left: `${x}px`, top: `${y}px` }}
      initial = {{ scale: 0 }}
      animate = {{ scale: 1 }}
      whileHover = {{ scale: 1.1 }}
      onClick = {onClick}
    >
      <motion.div 
        className = {`rounded-full w-16 h-16 flex items-center justify-center ${nodeStyles} ${glowEffect}`}
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
          {level > 0 && (
            <div className = "text-[10px] pixel-text text-cyan-400">
              LVL {level}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Component for tree branch
const TreeBranch = ({ path, isActive }) => {
  return (
    <motion.path
      d = {path}
      fill = "none"
      strokeWidth = {isActive ? 3 : 2}
      stroke = {isActive ? "rgba(255, 255, 255, 0.8)" : "rgba(100, 100, 100, 0.3)"}
      initial = {{ pathLength: 0, opacity: 0 }}
      animate = {{ 
        pathLength: 1, 
        opacity: 1,
        stroke: isActive ? "rgba(255, 255, 255, 0.8)" : "rgba(100, 100, 100, 0.3)"
      }}
      transition = {{ duration: 1 }}
    />
  );
};

// Component for glowing effect on active branches
const GlowingEffect = ({ path, isActive }) => {
  if (!isActive) return null;
  
  return (
    <motion.path
      d = {path}
      fill = "none"
      strokeWidth = {6}
      stroke = "rgba(255, 255, 255, 0.2)"
      filter = "blur(4px)"
      initial = {{ pathLength: 0, opacity: 0 }}
      animate = {{ pathLength: 1, opacity: 1 }}
      transition = {{ duration: 1 }}
    />
  );
};

// Component for category label
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

// Component for skill details
const SkillDetails = ({ skill, position }) => {
  if (!skill) return null;

  const { title, level, description, points } = skill;
  
  // Calculate position for the popup
  const popupStyle = {
    left: `${position.x}px`,
    top: skill.id === 'root' ? `${position.y - 100}px` : `${position.y + 40}px`,
  };
  
  return (
    <motion.div 
      className = "absolute z-10 bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 w-64"
      style = {popupStyle}
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

// Main Skill Tree component
const SkillTree = () => {
  // State for tracking active skill
  const [activeSkill, setActiveSkill] = useState(null);
  // State for tracking unlocked skills
  const [unlockedSkills, setUnlockedSkills] = useState(['html', 'css', 'js', 'react', 'nextjs', 'tailwind', 'figma', 'nodejs']);
  // State for available skill points
  const [skillPoints, setSkillPoints] = useState(1);
  // State for tracking popup position
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  
  // Categories for the skill tree
  const categories = [
    { title: "Web Development", x: 150, y: 350, color: "#38bdf8" }, // Tailwind blue
    { title: "Design", x: 250, y: 200, color: "#fb7185" }, // Tailwind rose
    { title: "Backend", x: 650, y: 350, color: "#4ade80" }, // Tailwind green
    { title: "Game Development", x: 150, y: 100, color: "#a78bfa" }, // Tailwind purple
    { title: "Data & API", x: 600, y: 100, color: "#facc15" }, // Tailwind yellow
  ];
  
  // Data for skill tree
  const skillsData = {
    // Root node
    root: { id: 'root', title: 'CORE', level: 10, x: 400, y: 500, description: 'Your core development abilities' },
    
    // Skills arranged in a tree structure
    skills: [
      // Main trunk branches - Level 1
      { 
        id: 'html', 
        title: 'HTML', 
        level: 9, 
        x: 200, 
        y: 400,
        description: 'Semantic markup and accessibility',
        points: 0,
        connections: ['root'],
        category: "Web Development"
      },
      { 
        id: 'css', 
        title: 'CSS', 
        level: 8, 
        x: 400, 
        y: 400,
        description: 'Styling and responsive design',
        points: 0,
        connections: ['root'],
        category: "Web Development"
      },
      { 
        id: 'js', 
        title: 'JavaScript', 
        level: 7, 
        x: 600, 
        y: 400,
        description: 'Dynamic web programming',
        points: 0,
        connections: ['root'],
        category: "Web Development"
      },
      
      // Second level branches - Left side (HTML branch) - Level 2
      { 
        id: 'accessibility', 
        title: 'A11Y', 
        level: 6, 
        x: 150, 
        y: 320,
        description: 'Web accessibility standards',
        points: 1,
        connections: ['html'],
        category: "Web Development"
      },
      { 
        id: 'seo', 
        title: 'SEO', 
        level: 5, 
        x: 250, 
        y: 320,
        description: 'Search engine optimization',
        points: 1,
        connections: ['html'],
        category: "Web Development"
      },
      
      // Second level branches - Middle (CSS branch) - Level 2
      { 
        id: 'tailwind', 
        title: 'Tailwind', 
        level: 8, 
        x: 350, 
        y: 320,
        description: 'Utility-first CSS framework',
        points: 0,
        connections: ['css'],
        category: "Web Development"
      },
      { 
        id: 'sass', 
        title: 'SASS', 
        level: 6, 
        x: 450, 
        y: 320,
        description: 'CSS preprocessor',
        points: 1,
        connections: ['css'],
        category: "Web Development"
      },
      
      // Second level branches - Right side (JS branch) - Level 2
      { 
        id: 'react', 
        title: 'React', 
        level: 8, 
        x: 550, 
        y: 320,
        description: 'Component-based UI library',
        points: 0,
        connections: ['js'],
        category: "Web Development"
      },
      { 
        id: 'nodejs', 
        title: 'Node.js', 
        level: 6, 
        x: 650, 
        y: 320,
        description: 'Server-side JavaScript',
        points: 0,
        connections: ['js'],
        category: "Backend"
      },
      
      // Third level branches - Left side - Level 3
      { 
        id: 'wcag', 
        title: 'WCAG', 
        level: 0, 
        x: 100, 
        y: 240,
        description: 'Web Content Accessibility Guidelines',
        points: 2,
        connections: ['accessibility'],
        category: "Web Development"
      },
      
      // Third level branches - Middle-left - Level 3
      { 
        id: 'figma', 
        title: 'Figma', 
        level: 7, 
        x: 200, 
        y: 240,
        description: 'UI/UX design and prototyping',
        points: 0,
        connections: ['tailwind'],
        category: "Design"
      },
      { 
        id: 'animations', 
        title: 'Animations', 
        level: 5, 
        x: 350, 
        y: 240,
        description: 'CSS and JS animations',
        points: 1,
        connections: ['sass'],
        category: "Design"
      },
      
      // Third level branches - Middle-right - Level 3
      { 
        id: 'nextjs', 
        title: 'Next.js', 
        level: 7, 
        x: 500, 
        y: 240,
        description: 'React framework for production',
        points: 0,
        connections: ['react'],
        category: "Web Development"
      },
      { 
        id: 'redux', 
        title: 'Redux', 
        level: 0, 
        x: 600, 
        y: 240,
        description: 'State management for React',
        points: 2,
        connections: ['react'],
        category: "Web Development"
      },
      
      // Third level branches - Right side - Level 3
      { 
        id: 'express', 
        title: 'Express', 
        level: 5, 
        x: 700, 
        y: 240,
        description: 'Web framework for Node.js',
        points: 1,
        connections: ['nodejs'],
        category: "Backend"
      },
      
      // Fourth level branches - Level 4
      { 
        id: 'gsap', 
        title: 'GSAP', 
        level: 0, 
        x: 150, 
        y: 160,
        description: 'Professional animation library',
        points: 2,
        connections: ['animations'],
        category: "Design"
      },
      { 
        id: 'framermotion', 
        title: 'Framer', 
        level: 4, 
        x: 300, 
        y: 160,
        description: 'Production-ready motion library',
        points: 1,
        connections: ['animations'],
        category: "Design"
      },
      { 
        id: 'typescript', 
        title: 'TypeScript', 
        level: 0, 
        x: 550, 
        y: 160,
        description: 'Typed JavaScript for larger apps',
        points: 2,
        connections: ['nextjs'],
        category: "Web Development"
      },
      { 
        id: 'mongodb', 
        title: 'MongoDB', 
        level: 0, 
        x: 650, 
        y: 160,
        description: 'NoSQL database',
        points: 2,
        connections: ['express'],
        category: "Backend"
      },
      
      // Fifth level branches - Level 5
      { 
        id: 'threejs', 
        title: 'Three.js', 
        level: 0, 
        x: 200, 
        y: 80,
        description: '3D graphics in the browser',
        points: 3,
        connections: ['gsap'],
        category: "Game Development"
      },
      { 
        id: 'graphql', 
        title: 'GraphQL', 
        level: 0, 
        x: 600, 
        y: 80,
        description: 'API query language',
        points: 3,
        connections: ['typescript', 'mongodb'],
        category: "Data & API"
      },
    ]
  };

  const generateBranchPath = (startX, startY, endX, endY) => {
    const midY = (startY + endY) / 2;
    
    return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
  };

  // Function to set active skill
  const setActiveSkillById = (skillId, x, y) => {
    // If clicking the same skill, toggle it off
    if (activeSkill && activeSkill.id === skillId) {
      setActiveSkill(null);
      return;
    }
    
    // Otherwise, set the new active skill
    if (skillId === 'root') {
      setActiveSkill({...skillsData.root, id: 'root'});
      setPopupPosition({ x: skillsData.root.x, y: skillsData.root.y });
    } else {
      const skill = skillsData.skills.find(s => s.id === skillId);
      if (skill) {
        setActiveSkill(skill);
        setPopupPosition({ x, y });
      }
    }
  };

  // Function to unlock a skill
  const unlockSkill = (skillId) => {
    const skill = skillsData.skills.find(s => s.id === skillId);
    
    if (!skill || skill.level > 0) return;
    
    if (skillPoints >= skill.points) {
      // Check if any of the connected skills is unlocked
      const canUnlock = skill.connections.some(connId => {
        if (connId === 'root') return true;
        return unlockedSkills.includes(connId);
      });
      
      if (canUnlock) {
        setSkillPoints(prev => prev - skill.points);
        setUnlockedSkills(prev => [...prev, skillId]);
        
        // Update the skill level
        skill.level = 1;
      }
    }
  };

  // Function to handle node click
  const handleNodeClick = (skillId, x, y) => {
    setActiveSkillById(skillId, x, y);
    
    // If the skill is not unlocked and has a point cost, try to unlock it
    if (!unlockedSkills.includes(skillId)) {
      unlockSkill(skillId);
    }
  };

  // Effect to set initial active skill
  useEffect(() => {
    // Don't set any active skill initially
    // setActiveSkillById('root');
  }, []);

  return (
    <div className = "relative w-full h-[600px] overflow-hidden">
      {/* Background with stars */}
      <div className = "absolute inset-0 bg-[url('/images/stars-bg.png')] opacity-30"></div>
      
      {/* SVG for tree branches */}
      <svg className = "absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Glowing effects for active branches */}
        {skillsData.skills.map(skill => 
          skill.connections.map((connId, idx) => {
            // Get coordinates for both nodes
            let startNode, endNode;
            
            if (connId === 'root') {
              startNode = skillsData.root;
            } else {
              startNode = skillsData.skills.find(s => s.id === connId);
            }
            
            endNode = skill;
            
            if (!startNode || !endNode) return null;
            
            // Check if connection should be active (both nodes unlocked)
            const isActive = 
              (unlockedSkills.includes(startNode.id) || startNode.id === 'root') && 
              unlockedSkills.includes(endNode.id);
            
            const path = generateBranchPath(startNode.x + 8, startNode.y + 8, endNode.x + 8, endNode.y + 8);
            
            return (
              <GlowingEffect 
                key = {`glow-${skill.id}-${connId}-${idx}`}
                path = {path}
                isActive = {isActive}
              />
            );
          })
        )}
        
        {/* Tree branches */}
        {skillsData.skills.map(skill => 
          skill.connections.map((connId, idx) => {
            // Get coordinates for both nodes
            let startNode, endNode;
            
            if (connId === 'root') {
              startNode = skillsData.root;
            } else {
              startNode = skillsData.skills.find(s => s.id === connId);
            }
            
            endNode = skill;
            
            if (!startNode || !endNode) return null;
            
            // Check if connection should be active (both nodes unlocked)
            const isActive = 
              (unlockedSkills.includes(startNode.id) || startNode.id === 'root') && 
              unlockedSkills.includes(endNode.id);
            
            const path = generateBranchPath(startNode.x + 8, startNode.y + 8, endNode.x + 8, endNode.y + 8);
            
            return (
              <TreeBranch 
                key = {`branch-${skill.id}-${connId}-${idx}`}
                path = {path}
                isActive = {isActive}
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
      
      {/* Root node */}
      <SkillNode 
        title = {skillsData.root.title}
        level = {skillsData.root.level}
        x = {skillsData.root.x - 8}
        y = {skillsData.root.y - 8}
        onClick = {() => handleNodeClick('root', skillsData.root.x, skillsData.root.y)}
        isActive = {activeSkill && activeSkill.id === 'root'}
        isUnlocked = {true}
      />
      
      {/* Skill nodes */}
      {skillsData.skills.map(skill => (
        <SkillNode 
          key = {skill.id}
          title = {skill.title}
          level = {skill.level}
          x = {skill.x - 8}
          y = {skill.y - 8}
          onClick = {() => handleNodeClick(skill.id, skill.x, skill.y)}
          isActive = {activeSkill && activeSkill.id === skill.id}
          isUnlocked = {unlockedSkills.includes(skill.id)}
        />
      ))}
      
      {/* Skill details popup - only shows when a skill is active */}
      <AnimatePresence>
        {activeSkill && (
          <SkillDetails 
            skill = {activeSkill} 
            position = {popupPosition}
          />
        )}
      </AnimatePresence>
      
      {/* Skill points indicator - Moved to the top left */}
      <div className = "absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
        <div className = "pixel-text text-amber-400 text-center">
          {skillPoints} SKILL {skillPoints === 1 ? 'POINT' : 'POINTS'} AVAILABLE
        </div>
        <div className = "w-32 h-1 bg-amber-900 mx-auto mt-1 rounded-full overflow-hidden">
          <motion.div 
            className = "h-full bg-amber-500"
            style = {{ width: '100%' }}
          />
        </div>
      </div>
      
      {/* Instructions */}
      <div className = "absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm p-2 rounded-lg border border-white/20">
        <p className = "pixel-text text-xs text-gray-400">Click on nodes to view or unlock skills</p>
      </div>
    </div>
  );
};

export default SkillTree;
