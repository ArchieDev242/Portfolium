"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaUnity,
  FaPython,
  FaGit,
} from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiUnrealengine,
  SiCplusplus,
  SiLua,
  SiBlender,
  SiAdobephotoshop,
} from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useState } from "react";

const About = {
  title: "About Me",
  text: "Hello, my name is Maksym. I'm a software engineer with a passion for creating engaging and user-friendly web applications. I recently graduated from the prestigious University of Helsinki with a degree in Computer Science and Engineering. I have a strong foundation in HTML, CSS, JavaScript, and React.js, alongside my knowledge of various front-end libraries such as Tailwind CSS and Next.js.",
  info: [
    { fieldName: "Name", fieldValue: "Maksym Kopychko" },
    { fieldName: "Age", fieldValue: "18" },
    { fieldName: "Phone", fieldValue: "+380669702817" },
    { fieldName: "Education", fieldValue: "University of Helsinki, Computer Science and Engineering" },
    { fieldName: "Email", fieldValue: "maksym.kopychko@gmail.com" },
    { fieldName: "Location", fieldValue: "Okhtyrka, Ukraine" },
    { fieldName: "Nationality", fieldValue: "Ukrainian" },
    { fieldName: "GameDev Experience", fieldValue: "2 Years" },
    { fieldName: "Languages", fieldValue: "English, German, Russian, Ukrainian" },
  ],
};

const Experience = {
  title: "My Experience",
  description: "Professional journey and accomplishments",
  items: [
    {
      position: "Software Engineer",
      company: "XYZ Corp.",
      location: "Remote",
      duration: "October 2021 - Present",
      description: "Developed and maintained web applications using modern technologies.",
    },
  ],
};

const Education = {
  title: "My Education",
  description: "Academic background and qualifications",
  items: [
    {
      title: "Bachelor's Degree in Computer Science",
      institution: "University of Helsinki",
      location: "Helsinki, Finland",
      duration: "2018 - 2022",
    },
    {
      title: "IT Courses",
      institution: "IT Start School",
      location: "Online",
      duration: "2018 - 2022",
    },
  ],
};

const Skills = {
  title: "My Skills",
  description: "Technical proficiencies and tools",
  categories: [
    {
      name: "Software Development",
      items: [
        { title: "JavaScript", icon: <FaJs /> },
        { title: "React.js", icon: <FaReact /> },
        { title: "Next.js", icon: <SiNextdotjs /> },
        { title: "Node.js", icon: <FaNodeJs /> },
        { title: "Python", icon: <FaPython /> },
        { title: "Git", icon: <FaGit /> },
      ],
    },
    {
      name: "Game Development",
      items: [
        { title: "Unreal Engine", icon: <SiUnrealengine /> },
        { title: "Unity", icon: <FaUnity /> },
        { title: "C++", icon: <SiCplusplus /> },
        { title: "Lua", icon: <SiLua /> },
      ],
    },
    {
      name: "Web Design",
      items: [
        { title: "HTML5", icon: <FaHtml5 /> },
        { title: "CSS3", icon: <FaCss3 /> },
        { title: "Tailwind CSS", icon: <SiTailwindcss /> },
      ],
    },
    {
      name: "Design Tools",
      items: [
        { title: "Figma", icon: <FaFigma /> },
        { title: "Blender", icon: <SiBlender /> },
        { title: "Photoshop", icon: <SiAdobephotoshop /> },
      ],
    },
  ],
};

const Resume = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
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
              <div className = "flex flex-col gap-8">
                <div className = "flex flex-col gap-6 max-w-[800px] mx-auto xl:mx-0">
                  <h3 className = "text-4xl font-bold text-center xl:text-left">{About.title}</h3>
                  <p className = "text-lg text-center xl:text-left leading-relaxed text-white/80">{About.text}</p>
                </div>
                
                <ScrollArea className = "h-[400px] w-full">
                  <div className = "grid grid-cols-1 md:grid-cols-2 gap-6">
                    {About.info.map((item, index) => (
                      <div 
                        key = {index} 
                        className = "flex flex-col md:flex-row items-start gap-3 p-6 bg-[#232329] rounded-xl group hover:bg-[#2a2a31] transition-colors duration-300"
                      >
                        <span className = "font-medium text-accent-default shrink-0 min-w-[120px] text-base">{item.fieldName}</span>
                        <span className = "text-white/80 text-base leading-relaxed break-words w-full">{item.fieldValue}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value = "experience" className = "w-full">
              <div className = "flex flex-col gap-8">
                <h3 className = "text-4xl font-bold">{Experience.title}</h3>
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
                                  <div className = "group h-full w-full flex flex-col items-center gap-4 p-6 bg-muted rounded-xl hover:bg-primary/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,255,153,0.2)] relative overflow-hidden">
                                    <div className = "absolute inset-0 bg-gradient-to-br from-accent-default/0 to-accent-default/0 group-hover:from-accent-default/5 group-hover:to-accent-default/5 transition-all duration-300"></div>
                                    <span className = "text-6xl text-white group-hover:text-accent-default group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">
                                      {skill.icon}
                                    </span>
                                    <span className = "font-medium text-base group-hover:text-accent-default transition-colors duration-300 relative z-10">
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