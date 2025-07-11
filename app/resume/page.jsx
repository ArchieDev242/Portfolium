"use client";

import React from 'react';

import 
{
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaUnity,
  FaPython,
  FaGit,
  FaCode,
} from "react-icons/fa";

import 
{
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import 
{
  SiTailwindcss,
  SiNextdotjs,
  SiUnrealengine,
  SiCplusplus,
  SiLua,
  SiBlender,
  SiAdobephotoshop,
  SiC,
  SiCinema4D,
} from "react-icons/si";

import { DiCsharp } from "react-icons/di";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useState } from "react";

const About = {
  title: "About Me",
  info: 
  [
    { fieldName: "Name", fieldValue: "Maksym Kopychko" },
    { fieldName: "Age", fieldValue: "18" },
    { fieldName: "Phone", fieldValue: "+380669702817" },
    { fieldName: "Education", fieldValue: "National Technical University «Kharkiv Polytechnic Institute», Computer Engineering" },
    { fieldName: "Email", fieldValue: "maksym.kopychko@gmail.com" },
    { fieldName: "Location", fieldValue: "Okhtyrka, Sumy Region, Ukraine" },
    { fieldName: "Nationality", fieldValue: "Ukrainian" },
    { fieldName: "GameDev Experience", fieldValue: "1 Year" },
    { fieldName: "Languages", fieldValue: "Ukrainian, English, German, Russian" },
  ],
};

const Experience = {
  title: "My Experience",
  description: "Professional journey and accomplishments",
  items: 
  [
    // no experience yet
  ],
};

const Education = {
  title: "My Education",
  description: "Academic background and qualifications",
  items: 
  [
    {
      title: "Bachelor's Degree in Computer Engineering",
      institution: "National Technical University «Kharkiv Polytechnic Institute»",
      location: "Kharkiv, Ukraine",
      duration: "2023 - 2027",
    },
    {
      title: "IT Courses",
      institution: "IT Start School",
      location: "Okhtyrka, Ukraine",
      duration: "2021 - 2022",
    },
  ],
};

const Skills = {
  title: "My Skills",
  description: "Technical proficiencies and tools",
  categories: 
  [
    {
      name: "Software Development",
      items: 
      [
        { title: "C", icon: <SiC /> },
        { title: "C++", icon: <SiCplusplus /> },
        { title: "C#", icon: <FaCode /> },
        { title: "Python", icon: <FaPython /> },
        { title: "Git", icon: <FaGit /> },
      ],
    },
    {
      name: "Web Development",
      items: 
      [
        { title: "JavaScript", icon: <FaJs /> },
        { title: "React.js", icon: <FaReact /> },
        { title: "Next.js", icon: <SiNextdotjs /> },
        { title: "Node.js", icon: <FaNodeJs /> },
      ],
    },
    {
      name: "Game Development",
      items: 
      [
        { title: "Unreal Engine", icon: <SiUnrealengine /> },
        { title: "Unity", icon: <FaUnity /> },
        { title: "C++", icon: <SiCplusplus /> },
        { title: "C", icon: <SiC /> },
        { title: "C#", icon: <FaCode /> },
        { title: "Lua", icon: <SiLua /> },
      ],
    },
    {
      name: "Web Design",
      items: 
      [
        { title: "HTML5", icon: <FaHtml5 /> },
        { title: "CSS3", icon: <FaCss3 /> },
        { title: "Tailwind CSS", icon: <SiTailwindcss /> },
      ],
    },
    {
      name: "Design Tools",
      items: 
      [
        { title: "Figma", icon: <FaFigma /> },
        { title: "Blender", icon: <SiBlender /> },
        { title: "Cinema 4D", icon: <SiCinema4D /> },
        { title: "Photoshop", icon: <SiAdobephotoshop /> },
      ],
    },
  ],
};

const Resume = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <motion.div
      initial = {{ opacity: 0 }}
      animate = {{ opacity: 1 }}
      exit = {{ opacity: 0 }}
      transition = {{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
      className = "min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className = "container mx-auto">
        <Tabs defaultValue = "about" className = "flex flex-col xl:flex-row gap-[70px]">
          <TabsList className = "flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value = "about">About Me</TabsTrigger>
            <TabsTrigger value = "experience">Experience</TabsTrigger>
            <TabsTrigger value = "education">Education</TabsTrigger>
            <TabsTrigger value = "skills">Skills</TabsTrigger>
          </TabsList>

          <div className = "min-h-[70vh] w-full">
            {/* About Tab */}
            <TabsContent value = "about" className = "w-full">
              <div className = "flex flex-col items-center w-full max-w-4xl mx-auto">
                <div className = "w-full text-center mb-12">
                  <h3 className = "text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent-default to-blue-400">
                    {About.title}
                  </h3>
                  <div className = "h-1 w-24 bg-accent-default mx-auto mb-8 rounded-full" />
                  <p className = "text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                    Passionate software engineer with expertise in game development and web technologies.
                    Currently pursuing Computer Engineering at National Technical University «Kharkiv Polytechnic Institute».
                  </p>
                </div>
                
                <div className = "w-full">
                  <h4 className = "text-2xl font-semibold mb-6 text-center text-white/90">
                    Personal Information
                  </h4>
                  <div className = "grid grid-cols-1 md:grid-cols-2 gap-6">
                    {About.info.map((item, index) => (
                      <motion.div 
                        key = {index}
                        initial = {{ opacity: 0, y: 20 }}
                        animate = {{ opacity: 1, y: 0 }}
                        transition = {{ duration: 0.3, delay: index * 0.05 }}
                        className = "flex flex-col p-6 bg-[#1e1e24] rounded-xl border border-white/5 hover:border-accent-default/30 transition-all duration-300"
                      >
                        <span className = "text-sm font-medium text-accent-default mb-1">
                          {item.fieldName}
                        </span>
                        <span className = "text-white/90 text-base leading-relaxed break-words w-full overflow-hidden">
                          {item.fieldName === 'Email' ? (
                            <a 
                              href = {`mailto:${item.fieldValue}`}
                              className = "text-accent-default hover:underline break-all inline-block w-full"
                            >
                              {item.fieldValue}
                            </a>
                          ) : (
                            item.fieldValue
                          )}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value = "experience" className = "w-full">
              <div className = "flex flex-col gap-8">
                <h3 className = "text-4xl font-bold">{Experience.title}</h3>
                {Experience.items.length > 0 ? (
                  <ScrollArea className = "h-[400px]">
                    <ul className = "grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                      {Experience.items.map((item, index) => (
                        <li
                          key = {index}
                          className = "bg-[#232329] w-full p-6 rounded-xl flex flex-col justify-center items-center gap-4 text-center group hover:bg-[#2a2a31] transition-colors duration-300"
                        >
                          <span className = "text-accent-default lg:text-left">{item.duration}</span>
                          <h3 className = "text-xl text-center">{item.position}</h3>
                          <div className = "flex items-center gap-3">
                            <span className = "w-[6px] h-[6px] rounded-full bg-accent-default"></span>
                            <p className = "text-white/60">{item.company}</p>
                          </div>
                          <p className = "text-white/60 text-sm">{item.description}</p>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                ) : (
                  <motion.div 
                    initial = {{ opacity: 0, y: 30 }}
                    animate = {{ opacity: 1, y: 0 }}
                    transition = {{ duration: 0.6, ease: "easeOut" }}
                    className = "flex flex-col items-center justify-center min-h-[400px] text-center"
                  >
                    <motion.div 
                      initial = {{ scale: 0 }}
                      animate = {{ scale: 1 }}
                      transition = {{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.4 }}
                      className = "text-9xl mb-8"
                    >
                      😔
                    </motion.div>
                    <motion.h4 
                      initial = {{ opacity: 0 }}
                      animate = {{ opacity: 1 }}
                      transition = {{ duration: 0.5, delay: 0.4 }}
                      className = "text-3xl font-bold text-white/90 mb-4"
                    >
                      No Professional Experience Yet
                    </motion.h4>
                    <motion.p 
                      initial = {{ opacity: 0 }}
                      animate = {{ opacity: 1 }}
                      transition = {{ duration: 0.5, delay: 0.6 }}
                      className = "text-lg text-white/70 max-w-lg mb-8 leading-relaxed"
                    >
                      But I'm actively learning, working on projects and developing my skills! 
                      Every day is a new step towards my dream of becoming a professional developer.
                    </motion.p>
                    <motion.div 
                      initial = {{ opacity: 0, y: 20 }}
                      animate = {{ opacity: 1, y: 0 }}
                      transition = {{ duration: 0.5, delay: 0.8 }}
                      className = "flex flex-col gap-4"
                    >
                      <div className = "flex items-center gap-3 text-accent-default bg-accent-default/10 px-6 py-3 rounded-lg">
                        <span className = "text-2xl">🚀</span>
                        <span className = "font-semibold">Ready for new challenges</span>
                      </div>
                      <div className = "flex items-center gap-3 text-blue-400 bg-blue-400/10 px-6 py-3 rounded-lg">
                        <span className = "text-2xl">💡</span>
                        <span className = "font-semibold">Quick learner and adaptable</span>
                      </div>
                      <div className = "flex items-center gap-3 text-green-400 bg-green-400/10 px-6 py-3 rounded-lg">
                        <span className = "text-2xl">⭐</span>
                        <span className = "font-semibold">Motivated to achieve goals</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value = "education" className = "w-full">
              <div className = "flex flex-col gap-8">
                <h3 className = "text-4xl font-bold">{Education.title}</h3>
                <ScrollArea className = "h-[400px]">
                  <ul className = "grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {Education.items.map((item, index) => (
                      <li
                        key = {index}
                        className = "bg-[#232329] w-full p-6 rounded-xl flex flex-col justify-center items-center gap-4 text-center group hover:bg-[#2a2a31] transition-colors duration-300"
                      >
                        <span className = "text-accent-default text-sm lg:text-left">{item.duration}</span>
                        <h3 className = "text-lg xl:text-xl text-center">{item.title}</h3>
                        <div className = "flex items-center gap-3">
                          <span className = "w-[6px] h-[6px] rounded-full bg-accent-default"></span>
                          <p className = "text-white/60">{item.institution}</p>
                        </div>
                        <p className = "text-sm text-white/40">{item.location}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value = "skills" className = "w-full">
              <div className = "flex flex-col gap-8">
                <h3 className = "text-4xl font-bold">{Skills.title}</h3>
                <div className = "flex flex-col gap-8">
                  {/* Category Navigation */}
                  <div className = "flex flex-wrap gap-4">
                    {Skills.categories.map((category, index) => (
                      <button
                        key = {index}
                        onClick = {() => setActiveCategory(index)}
                        className = {`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                          activeCategory === index
                            ? "bg-accent-default text-black"
                            : "bg-muted hover:bg-primary/10"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>

                  {/* Skills Display */}
                  <motion.div
                    key = {activeCategory}
                    initial = {{ opacity: 0, y: 20 }}
                    animate = {{ opacity: 1, y: 0 }}
                    exit = {{ opacity: 0, y: -20 }}
                    transition = {{ duration: 0.3 }}
                    className = "min-h-[300px]"
                  >
                    <div className = "flex flex-col gap-8">
                      <h4 className = "text-2xl font-semibold text-accent-default">
                        {Skills.categories[activeCategory].name}
                      </h4>
                      <TooltipProvider>
                        <ul className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 xl:gap-12">
                          {Skills.categories[activeCategory].items.map((skill, index) => (
                            <motion.li
                              key = {index}
                              initial = {{ opacity: 0, scale: 0.8 }}
                              animate = {{ opacity: 1, scale: 1 }}
                              transition = {{ duration: 0.3, delay: index * 0.1 }}
                              className = "h-full"
                            >
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className = "group w-full flex flex-col items-center gap-2 p-4 bg-muted rounded-xl hover:bg-primary/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_var(--accent-shadow)] relative overflow-hidden">
                                    <div 
                                      className = "absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-accent-default/10 group-hover:to-accent-default/5 transition-all duration-300"
                                    ></div>
                                    {React.cloneElement(skill.icon, {
                                      className: "skill-icon"
                                    })}
                                    <span className = "font-medium text-base group-hover:text-accent-default transition-colors duration-300 relative z-10 text-center">
                                      {skill.title}
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{skill.title}</p>
                                </TooltipContent>
                              </Tooltip>
                            </motion.li>
                          ))}
                        </ul>
                      </TooltipProvider>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;