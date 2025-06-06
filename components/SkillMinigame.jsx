import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SkillIcon from './SkillIcon';

const SkillMinigame = ({ onComplete }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState([]);
  const gameAreaRef = useRef(null);
  
  // List of possible skills for the game
  const skills = [
    'html', 'css', 'js', 'react', 'nextjs', 
    'nodejs', 'express', 'mongodb', 'tailwind', 'figma'
  ];
  
  // Function to create a new target
  const createTarget = () => {
    if (!gameAreaRef.current) return null;
    
    const gameArea = gameAreaRef.current.getBoundingClientRect();
    const size = Math.floor(Math.random() * 30) + 40; // Size from 40 to 70px
    
    // Determine random position within game area
    const x = Math.floor(Math.random() * (gameArea.width - size));
    const y = Math.floor(Math.random() * (gameArea.height - size));
    
    // Select random skill
    const skill = skills[Math.floor(Math.random() * skills.length)];
    
    // Determine random speed
    const speedX = (Math.random() - 0.5) * 4;
    const speedY = (Math.random() - 0.5) * 4;
    
    // Determine random point value (1-3)
    const points = Math.floor(Math.random() * 3) + 1;
    
    return {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
      skill,
      speedX,
      speedY,
      points,
      clicked: false
    };
  };
  
  // Function to update target positions
  const updateTargets = () => {
    if (!gameAreaRef.current) return;
    
    const gameArea = gameAreaRef.current.getBoundingClientRect();
    
    setTargets(prevTargets => {
      return prevTargets.map(target => {
        if (target.clicked) return target;
        
        let newX = target.x + target.speedX;
        let newY = target.y + target.speedY;
        let newSpeedX = target.speedX;
        let newSpeedY = target.speedY;
        
        // Check for collisions with edges
        if (newX <= 0 || newX + target.size >= gameArea.width) {
          newSpeedX = -newSpeedX;
          newX = newX <= 0 ? 0 : gameArea.width - target.size;
        }
        
        if (newY <= 0 || newY + target.size >= gameArea.height) {
          newSpeedY = -newSpeedY;
          newY = newY <= 0 ? 0 : gameArea.height - target.size;
        }
        
        return {
          ...target,
          x: newX,
          y: newY,
          speedX: newSpeedX,
          speedY: newSpeedY
        };
      });
    });
  };
  
  // Function to handle clicking on a target
  const handleTargetClick = (targetId) => {
    setTargets(prevTargets => {
      const updatedTargets = prevTargets.map(target => {
        if (target.id === targetId && !target.clicked) {
          // Increase score
          setScore(prevScore => prevScore + target.points);
          // Mark target as clicked
          return { ...target, clicked: true };
        }
        return target;
      });
      
      // Remove clicked targets after 300ms
      setTimeout(() => {
        setTargets(prev => prev.filter(t => t.id !== targetId));
      }, 300);
      
      return updatedTargets;
    });
  };
  
  // Function to start the game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
  };
  
  // Function to end the game
  const endGame = () => {
    setGameStarted(false);
    setGameOver(true);
    
    // Call callback with result
    if (onComplete) {
      onComplete(score);
    }
  };
  
  // Effect for updating timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);
  
  // Effect for creating new targets
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const interval = setInterval(() => {
      if (targets.length < 10) {
        const newTarget = createTarget();
        if (newTarget) {
          setTargets(prev => [...prev, newTarget]);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, targets.length]);
  
  // Effect for updating target positions
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const animationFrame = requestAnimationFrame(function animate() {
      updateTargets();
      requestAnimationFrame(animate);
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [gameStarted, gameOver]);
  
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
        ref = {gameAreaRef}
        className = "relative w-full h-[300px] bg-slate-900 border-2 border-slate-700 rounded-lg overflow-hidden"
      >
        {!gameStarted && !gameOver && (
          <div className = "absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80">
            <h3 className = "pixel-text text-xl text-cyan-400 mb-4">Ready to play?</h3>
            <motion.button
              className = "pixel-text px-6 py-2 bg-cyan-600 text-white rounded-lg"
              whileHover = {{ scale: 1.05 }}
              whileTap = {{ scale: 0.95 }}
              onClick = {startGame}
            >
              Start Game
            </motion.button>
          </div>
        )}
        
        {gameOver && (
          <div className = "absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80">
            <h3 className = "pixel-text text-xl text-cyan-400 mb-2">Game Over!</h3>
            <p className = "pixel-text text-lg text-white mb-4">Your score: {score}</p>
            <motion.button
              className = "pixel-text px-6 py-2 bg-cyan-600 text-white rounded-lg"
              whileHover = {{ scale: 1.05 }}
              whileTap = {{ scale: 0.95 }}
              onClick = {startGame}
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
            onClick = {() => handleTargetClick(target.id)}
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
