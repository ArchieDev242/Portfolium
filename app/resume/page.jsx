"use client";

import React, { useState } from 'react';
import {
  FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs, FaUnity, FaPython, FaGit, FaCode,
} from "react-icons/fa";
import {
  SiTailwindcss, SiNextdotjs, SiUnrealengine, SiCplusplus, SiLua, SiBlender,
  SiAdobephotoshop, SiC, SiCinema4D,
} from "react-icons/si";
import { DiCsharp } from "react-icons/di";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

const About = {
  info: [
    { fieldName: "Name", fieldNameHR: "Name", fieldValue: "Maksym Kopychko", icon: "👤" },
    { fieldName: "Level", fieldNameHR: "Age", fieldValue: "19", icon: "⭐" },
    { fieldName: "HP", fieldNameHR: "Phone", fieldValue: "+380669702817", icon: "📞" },
    { fieldName: "Class", fieldNameHR: "Education", fieldValue: "Computer Engineering", icon: "🎓" },
    { fieldName: "Guild", fieldNameHR: "University", fieldValue: "National Technical University «Kharkiv Polytechnic Institute»", icon: "🏛️" },
    { fieldName: "Email", fieldNameHR: "Email", fieldValue: "MaxymKopychko@gmail.com", icon: "✉️" },
    { fieldName: "Spawn Point", fieldNameHR: "Location", fieldValue: "Okhtyrka, Sumy Region, Ukraine", icon: "📍" },
    { fieldName: "Nationality", fieldNameHR: "Nationality", fieldValue: "Ukrainian", icon: "🇺🇦" },
    { fieldName: "GameDev XP", fieldNameHR: "Game Dev Experience", fieldValue: "1 Year", icon: "🎮" },
    { fieldName: "Languages", fieldNameHR: "Languages", fieldValue: "Ukrainian, English, German, Russian", icon: "🗣️" },
  ],
};

const Experience = {
  categories: [
    {
      name: "Software Development",
      icon: "💻",
      items: [
        { title: "C / C++ / C# Development", description: "Systems programming, algorithms, OOP. University projects & personal tools.", level: "Intermediate", duration: "2021 — present" },
        { title: "Python", description: "Scripting, automation, data processing.", level: "Intermediate", duration: "2021 — present" },
      ],
    },
    {
      name: "Web Development",
      icon: "🌐",
      items: [
        { title: "Frontend (React, Next.js)", description: "Portfolios, SPAs, responsive UIs. This site built with Next.js.", level: "Intermediate", duration: "2023 — present" },
        { title: "JavaScript / HTML5 / CSS", description: "Vanilla JS games (Arkanoid), Canvas, Tailwind.", level: "Intermediate", duration: "2020 — present" },
      ],
    },
    {
      name: "Game Development & Modding",
      icon: "🎮",
      items: [
        { title: "Unreal Engine / Unity", description: "Game projects, blueprints, C++. Learning level design & gameplay systems.", level: "Beginner–Intermediate", duration: "2024 — present" },
        { title: "Modding (Lua, scripting)", description: "Game modifications, addons, scripting for game engines.", level: "Intermediate", duration: "2022 — present" },
      ],
    },
  ],
};

const Education = {
  items: [
    { title: "Bachelor's Degree in Computer Engineering", institution: "Kharkiv Polytechnic Institute", location: "Kharkiv, Ukraine", duration: "2023 - 2027", xp: "⚡ 4 Years XP" },
    { title: "IT Courses", institution: "IT Start School", location: "Okhtyrka, Ukraine", duration: "2021 - 2022", xp: "⚡ 1 Year XP" },
  ],
};

const Skills = {
  categories: [
    { name: "Software Dev", items: [{ title: "C", icon: <SiC /> }, { title: "C++", icon: <SiCplusplus /> }, { title: "C#", icon: <FaCode /> }, { title: "Python", icon: <FaPython /> }, { title: "Git", icon: <FaGit /> }] },
    { name: "Web Dev", items: [{ title: "JavaScript", icon: <FaJs /> }, { title: "React.js", icon: <FaReact /> }, { title: "Next.js", icon: <SiNextdotjs /> }, { title: "Node.js", icon: <FaNodeJs /> }] },
    { name: "Game Dev", items: [{ title: "Unreal Engine", icon: <SiUnrealengine /> }, { title: "Unity", icon: <FaUnity /> }, { title: "C++", icon: <SiCplusplus /> }, { title: "C#", icon: <FaCode /> }, { title: "Lua", icon: <SiLua /> }] },
    { name: "Design", items: [{ title: "HTML5", icon: <FaHtml5 /> }, { title: "CSS3", icon: <FaCss3 /> }, { title: "Tailwind", icon: <SiTailwindcss /> }] },
    { name: "Tools", items: [{ title: "Figma", icon: <FaFigma /> }, { title: "Blender", icon: <SiBlender /> }, { title: "Cinema 4D", icon: <SiCinema4D /> }, { title: "Photoshop", icon: <SiAdobephotoshop /> }] },
  ],
};

const Resume = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] relative py-12 xl:py-16 overflow-hidden"
    >
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Header — PLAYER PROFILE */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="pixel-text text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 mb-2">
            ▶ PLAYER PROFILE ◀
          </h1>
          <p className="text-cyan-400/70 text-xs mt-1">Resume — Maksym Kopychko</p>
          <div className="h-[2px] w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <p className="text-white/50 text-sm mt-2 pixel-text">RESUME • ArchieDev242</p>
        </motion.div>

        <Tabs defaultValue="about" className="flex flex-col xl:flex-row gap-8 xl:gap-12">
          {/* Tabs — Game menu style */}
          <TabsList className="flex flex-row xl:flex-col flex-wrap justify-center xl:justify-start w-full xl:w-[280px] gap-3 p-2 bg-black/40 rounded-lg border border-cyan-500/30">
            <TabsTrigger 
              value="about" 
              className="pixel-text data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 data-[state=active]:border-cyan-400/50 border border-transparent px-4 py-3 rounded"
              title="Personal Info"
            >
              <span className="block">📊 Stats</span>
              <span className="text-[10px] text-white/50 normal-case">Personal Info</span>
            </TabsTrigger>
            <TabsTrigger 
              value="experience" 
              className="pixel-text data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 data-[state=active]:border-cyan-400/50 border border-transparent px-4 py-3 rounded"
              title="Experience"
            >
              <span className="block">📜 Quest Log</span>
              <span className="text-[10px] text-white/50 normal-case">Experience</span>
            </TabsTrigger>
            <TabsTrigger 
              value="education" 
              className="pixel-text data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 data-[state=active]:border-cyan-400/50 border border-transparent px-4 py-3 rounded"
              title="Education"
            >
              <span className="block">🏆 Quests</span>
              <span className="text-[10px] text-white/50 normal-case">Education</span>
            </TabsTrigger>
            <TabsTrigger 
              value="skills" 
              className="pixel-text data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 data-[state=active]:border-cyan-400/50 border border-transparent px-4 py-3 rounded"
              title="Skills"
            >
              <span className="block">⚔️ Abilities</span>
              <span className="text-[10px] text-white/50 normal-case">Skills</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-[60vh]">
            {/* About — Character stats panel */}
            <TabsContent value="about" className="mt-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="rounded-xl border-2 border-cyan-500/40 bg-black/50 backdrop-blur-sm p-6 md:p-8 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                  <h3 className="pixel-text text-cyan-400 text-xl mb-1">▶ CHARACTER INFO</h3>
                  <p className="text-white/40 text-xs mb-6">Personal Information</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {About.info.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-cyan-400/80 pixel-text block mb-1">
                            {item.fieldName} <span className="text-white/40 font-normal">({item.fieldNameHR})</span>
                          </span>
                          {item.fieldName === 'Email' || item.fieldNameHR === 'Email' ? (
                            <a href={`mailto:${item.fieldValue}`} className="text-cyan-300 hover:text-cyan-200 break-all">
                              {item.fieldValue}
                            </a>
                          ) : (
                            <span className="text-white/90">{item.fieldValue}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Experience — Quest log with categories */}
            <TabsContent value="experience" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="mb-4">
                  <h3 className="pixel-text text-amber-400 text-xl">📜 QUEST LOG</h3>
                  <p className="text-white/40 text-xs">Work & Project Experience by Category</p>
                </div>
                {Experience.categories.map((cat, catIndex) => (
                  <motion.div
                    key={catIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIndex * 0.1 }}
                    className="rounded-xl border-2 border-amber-500/30 bg-black/50 backdrop-blur-sm p-6 hover:border-amber-500/50 transition-all"
                  >
                    <h4 className="pixel-text text-amber-400 mb-4 flex items-center gap-2">
                      <span>{cat.icon}</span> {cat.name}
                    </h4>
                    <div className="space-y-4">
                      {cat.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div>
                            <h5 className="text-white font-medium">{item.title}</h5>
                            <p className="text-white/60 text-sm mt-1">{item.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end shrink-0">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/40 pixel-text">
                              {item.level}
                            </span>
                            <span className="text-white/50 text-xs">{item.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Education — Quest completed cards */}
            <TabsContent value="education" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="mb-4">
                  <h3 className="pixel-text text-green-400 text-xl">🏆 QUESTS COMPLETED</h3>
                  <p className="text-white/40 text-xs">Education</p>
                </div>
                {Education.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border-2 border-green-500/30 bg-black/50 backdrop-blur-sm p-6 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <span className="text-green-400 pixel-text text-xs block mb-1">✓ QUEST COMPLETE</span>
                        <h4 className="text-xl font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-white/60 text-sm">{item.institution} • {item.location}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-cyan-400 text-sm pixel-text">{item.duration}</span>
                        <span className="text-green-400/80 text-xs pixel-text">{item.xp}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Skills — Unlocked abilities */}
            <TabsContent value="skills" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex flex-wrap gap-2">
                  {Skills.categories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCategory(i)}
                      className={`px-4 py-2 rounded pixel-text text-sm transition-all ${
                        activeCategory === i
                          ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:border-cyan-500/30'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-xl border-2 border-cyan-500/30 bg-black/50 backdrop-blur-sm p-6"
                  >
                    <div className="mb-6">
                      <h4 className="pixel-text text-cyan-400">⚔️ {Skills.categories[activeCategory].name} — UNLOCKED</h4>
                      <p className="text-white/40 text-xs">Technical Skills</p>
                    </div>
                    <TooltipProvider>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Skills.categories[activeCategory].items.map((skill, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-pointer group">
                                  <div className="text-4xl text-cyan-400/80 group-hover:text-cyan-300 group-hover:scale-110 transition-transform">
                                    {React.cloneElement(skill.icon, {})}
                                  </div>
                                  <span className="text-sm text-white/80 group-hover:text-cyan-300 pixel-text text-center">
                                    {skill.title}
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="pixel-text">{skill.title} — Mastered</p>
                              </TooltipContent>
                            </Tooltip>
                          </motion.div>
                        ))}
                      </div>
                    </TooltipProvider>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
