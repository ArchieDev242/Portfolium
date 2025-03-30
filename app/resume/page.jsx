"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
} from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

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
  items: [
    { title: "HTML5", icon: <FaHtml5 /> },
    { title: "CSS3", icon: <FaCss3 /> },
    { title: "JavaScript", icon: <FaJs /> },
    { title: "React.js", icon: <FaReact /> },
    { title: "Tailwind CSS", icon: <SiTailwindcss /> },
    { title: "Next.js", icon: <SiNextdotjs /> },
    { title: "Figma", icon: <FaFigma /> },
    { title: "Node.js", icon: <FaNodeJs /> },
  ],
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs defaultValue="about" className="flex flex-col xl:flex-row gap-[70px]">
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="about">About Me</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] w-full">
            {/* About Tab */}
            <TabsContent value="about" className="w-full">
              <div className="flex flex-col gap-8 text-center xl:text-left">
                <h3 className="text-4xl font-bold">{About.title}</h3>
                <p className="max-w-[800px] mx-auto xl:mx-0 text-lg">{About.text}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {About.info.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <span className="font-bold min-w-[120px]">{item.fieldName}</span>
                      <span className="text-primary">{item.fieldValue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-8">
                <h3 className="text-4xl font-bold">{Experience.title}</h3>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {Experience.items.map((item, index) => (
                      <li
                        key={index}
                        className="bg-[#232329] h-[184px] py-6 px-4 rounded-xl flex flex-col justify-center items-center gap-1 text-center"
                      >
                        <span className="text-accent-default lg:text-left">{item.duration}</span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center">{item.position}</h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent-default"></span>
                          <p className="text-white/60">{item.company}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-8">
                <h3 className="text-4xl font-bold">{Education.title}</h3>
                <div className="space-y-6">
                  {Education.items.map((item, index) => (
                    <div key={index} className="p-6 bg-muted rounded-xl">
                      <h4 className="text-2xl font-semibold">{item.title}</h4>
                      <p className="text-lg text-primary mt-2">{item.institution}</p>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{item.location}</span>
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-8">
                <h3 className="text-4xl font-bold">{Skills.title}</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <TooltipProvider>
                    {Skills.items.map((skill, index) => (
                      <li key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="group w-full flex flex-col items-center gap-2 p-6 bg-muted rounded-xl hover:bg-primary/10 transition-colors duration-300">
                              <span className="text-6xl text-white group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </span>
                              <span className="font-medium">{skill.title}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{skill.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    ))}
                  </TooltipProvider>
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;