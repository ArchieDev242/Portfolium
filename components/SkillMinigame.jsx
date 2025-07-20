import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SkillIcon from './SkillIcon';

const SkillMinigame = ({ onComplete }) => {
  const [game_started, setGameStarted] = useState(false);
  const [game_over, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState([]);
  const game_area_ref = useRef(null);
  
  // list of possible skills
  const skills = [
    'html', 'css', 'js', 'react', 'nextjs', 
    'nodejs', 'express', 'mongodb', 'tailwind', 'figma'
  ];
  
  const create_target = () => {
    if(!game_area_ref.current) return null;
    
    const gameArea = game_area_ref.current.getBoundingClientRect();
    const size = Math.floor(Math.random() * 30) + 40; // Size from 40 to 70px
    
    const x = Math.floor(Math.random() * (gameArea.width - size));
    const y = Math.floor(Math.random() * (gameArea.height - size));
    
    const skill = skills[Math.floor(Math.random() * skills.length)];
    
    const speed_x = (Math.random() - 0.5) * 4;
    const speed_y = (Math.random() - 0.5) * 4;
    
    const points = Math.floor(Math.random() * 3) + 1;
    
    return {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
      skill,
      speedX: speed_x,
      speedY: speed_y,
      points,
      clicked: false
    };
  };
  
  const update_targets = () => {
    if(!game_area_ref.current) return;
    
    const game_area = game_area_ref.current.getBoundingClientRect();
    
    setTargets(prevTargets => {
      return prevTargets.map(target => {
        if(target.clicked) return target;
        
        let new_x = target.x + target.speedX;
        let new_y = target.y + target.speedY;
        let newSpeedX = target.speedX;
        let newSpeedY = target.speedY;
        
        // wall collisions check
        if(new_x <= 0 || new_x + target.size >= game_area.width) 
          {
          newSpeedX = -newSpeedX;
          new_x = new_x <= 0 ? 0 : game_area.width - target.size;
        }
        
        if(new_y <= 0 || new_y + target.size >= game_area.height) 
          {
          newSpeedY = -newSpeedY;
          new_y = new_y <= 0 ? 0 : game_area.height - target.size;
        }
        
        return {
          ...target,
          x: new_x,
          y: new_y,
          speedX: newSpeedX,
          speedY: newSpeedY
        };
      });
    });
  };
  
  const handle_target_click = (targetId) => {
    setTargets(prevTargets => {
      const updatedTargets = prevTargets.map(target => {
        if(target.id === targetId && !target.clicked) 
          {
          setScore(prevScore => prevScore + target.points);
          return { ...target, clicked: true };
        }
        return target;
      });
      
      setTimeout(() => {
        setTargets(prev => prev.filter(t => t.id !== targetId));
      }, 300);
      
      return updatedTargets;
    });
  };
  
  const start_game = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
  };
  
  const end_game = () => {
    setGameStarted(false);
    setGameOver(true);
    
    if(onComplete) 
      {
      onComplete(score);
    }
  };
  
  useEffect(() => {
    if(!game_started || game_over) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if(prevTime <= 1) 
          {
          clearInterval(timer);
          end_game();

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [game_started, game_over]);
  
  useEffect(() => {
    if(!game_started || game_over) return;
    
    const interval = setInterval(() => {
      if(targets.length < 10) 
        {
        const new_target = create_target();

        if(new_target) 
          {
          setTargets(prev => [...prev, new_target]);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [game_started, game_over, targets.length]);
  
  useEffect(() => {
    if(!game_started || game_over) return;
    
    const animation_frame = requestAnimationFrame(function animate() 
    {
      update_targets();
      requestAnimationFrame(animate);
    });
    
    return () => cancelAnimationFrame(animation_frame);
  }, [game_started, game_over]);
  
  return (
    <div className = "w-full max-w-2xl mx-auto">
      {/* Game title */}
      <div className = "text-center mb-4">
        <h3 className = "pixel-text text-xl text-cyan-400 mb-2">Skill Hunter</h3>
        <p className = "pixel-text text-sm text-gray-300">Collect skill icons to earn bonus points!</p>
      </div>
      
      {/* Stats panel */}
      <div className = "flex justify-between items-center mb-4 p-2 bg-slate-800 rounded-lg">
        <div className = "pixel-text text-sm">
          <span className = "text-gray-400">Time: </span>
          <span className = {`${timeLeft <= 10 ? 'text-red-500' : 'text-white'}`}>{timeLeft}s</span>
        </div>
        <div className = "pixel-text text-sm">
          <span className = "text-gray-400">Score: </span>
          <span className = "text-cyan-400">{score}</span>
        </div>
      </div>
      
      {/* Game area */}
      <div 
        ref = {game_area_ref}
        className = "relative w-full h-[300px] bg-slate-900 border-2 border-slate-700 rounded-lg overflow-hidden"
      >
        {!game_started && !game_over && (
          <div className = "absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80">
            <h3 className = "pixel-text text-xl text-cyan-400 mb-4">Ready to play?</h3>
            <motion.button
              className = "pixel-text px-6 py-2 bg-cyan-600 text-white rounded-lg"
              whileHover = {{ scale: 1.05 }}
              whileTap = {{ scale: 0.95 }}
              onClick = {start_game}
            >
              Start Game
            </motion.button>
          </div>
        )}
        
        {game_over && (
          <div className = "absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80">
            <h3 className = "pixel-text text-xl text-cyan-400 mb-2">Game Over!</h3>
            <p className = "pixel-text text-lg text-white mb-4">Your score: {score}</p>
            <motion.button
              className = "pixel-text px-6 py-2 bg-cyan-600 text-white rounded-lg"
              whileHover = {{ scale: 1.05 }}
              whileTap = {{ scale: 0.95 }}
              onClick = {start_game}
            >
              Play Again
            </motion.button>
          </div>
        )}
        
        {/* Targets */}
        {targets.map(target => (
          <motion.div
            key = {target.id}
            className = "absolute cursor-pointer"
            style = {{ 
              left: `${target.x}px`, 
              top: `${target.y}px`,
              width: `${target.size}px`,
              height: `${target.size}px`,
            }}
            animate = {target.clicked ? { scale: 0, opacity: 0 } : {}}
            onClick = {() => handle_target_click(target.id)}
          >
            <div className = "w-full h-full flex items-center justify-center">
              <div className = "relative">
                <SkillIcon type = {target.skill} size = "md" animate = {!target.clicked} />
                <div className = "absolute -top-2 -right-2 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center pixel-text text-xs">
                  {target.points}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Instructions */}
      <div className = "mt-4 text-center">
        <p className = "pixel-text text-xs text-gray-400">Click on skill icons to collect points. The more points you collect, the higher your level!</p>
      </div>
    </div>
  );
};

export default SkillMinigame;
