'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillTree from '@/components/SkillTree';
import SkillAchievements from '@/components/SkillAchievements';
import SkillMinigame from '@/components/SkillMinigame';
import SkillTreeBackground from '@/components/SkillTreeBackground';

const Skills = () => {
  const [minigame_score, set_minigame_score] = useState(0);
  const [show_confetti, set_show_confetti] = useState(false);
  
  const handleMinigameComplete = (score) => {
    set_minigame_score(score);
    
    if(score > 20) 
      {
      set_show_confetti(true);
      setTimeout(() => set_show_confetti(false), 3000);
    }
  };
  
  return (
    <motion.div 
      className = "container mx-auto py-12 px-4"
      initial = {{ opacity: 0 }}
      animate = {{ opacity: 1 }}
      exit = {{ opacity: 0 }}
    >
      {/* Page header */}
      <div className = "text-center mb-12">
        <motion.h1 
          className = "pixel-text text-4xl text-cyan-400 mb-4"
          initial = {{ y: -50 }}
          animate = {{ y: 0 }}
          transition = {{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          SKILL QUEST
        </motion.h1>
        <p className = "pixel-text text-gray-300 max-w-2xl mx-auto">
          Welcome to my interactive skill tree! Explore my technical abilities, 
          unlock achievements, and test your skills in the mini-game.
        </p>
      </div>
      
      {/* Main content */}
      <div className = "max-w-5xl mx-auto">
        <Tabs defaultValue = "tree" className = "w-full">
          <TabsList className = "grid w-full grid-cols-3 mb-8">
            <TabsTrigger 
              value = "tree" 
              className = "pixel-text"
            >
              Skill Tree
            </TabsTrigger>
            <TabsTrigger 
              value = "achievements" 
              className = "pixel-text"
            >
              Achievements
            </TabsTrigger>
            <TabsTrigger 
              value = "minigame" 
              className = "pixel-text"
            >
              Mini-Game
            </TabsTrigger>
          </TabsList>
          
          {/* Skill tree tab */}
          <TabsContent value = "tree" className = "relative">
            <div className = "relative rounded-xl overflow-hidden">
              <div className = "absolute inset-0 z-0">
                <SkillTreeBackground />
              </div>
              <div className = "relative z-10">
                <SkillTree />
              </div>
            </div>
          </TabsContent>
          
          {/* Achievements tab */}
          <TabsContent value = "achievements">
            <div className = "bg-slate-900 rounded-xl border border-slate-700 p-6">
              <SkillAchievements />
            </div>
          </TabsContent>
          
          {/* Mini-game tab */}
          <TabsContent value = "minigame">
            <div className = "bg-slate-900 rounded-xl border border-slate-700 p-6">
              <SkillMinigame onComplete = { handleMinigameComplete } />
              
              {/* Show result after game */}
              {minigame_score > 0 && (
                <div className = "mt-6 text-center">
                  <h3 className = "pixel-text text-lg text-cyan-400 mb-2">
                    {minigame_score > 20 
                      ? "IMPRESSIVE!" 
                      : minigame_score > 10 
                        ? "WELL DONE!" 
                        : "NOT BAD!"}
                  </h3>
                  <p className = "pixel-text text-sm text-gray-300">
                    You scored {minigame_score} points! 
                    {minigame_score > 20 && " You're a true skill hunter!"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Confetti for high score celebration */}
      {show_confetti && (
        <div className = "fixed inset-0 pointer-events-none z-50">

          <div className = "absolute inset-0 flex items-center justify-center">
            <motion.div 
              className = "text-6xl"
              animate = {{ 
                scale: [1, 1.5, 1],
                rotate: [0, 15, -15, 0]
              }}
              transition = {{ duration: 1, repeat: 3 }}
            >
              🎮 🏆 🎮
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Skills;