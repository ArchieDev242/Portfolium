"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaGamepad, FaCode, FaPuzzlePiece, FaGlobe } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { projectsData } from "@/data/projects";

const IconComponent = ({ name }) => {
  switch(name) 
  {
    case 'FaGamepad': return <FaGamepad className = "text-2xl" />;
    case 'FaCode': return <FaCode className = "text-2xl" />;
    case 'FaPuzzlePiece': return <FaPuzzlePiece className = "text-2xl" />;
    case 'FaGlobe': return <FaGlobe className = "text-2xl" />;
    default: return <FaCode className = "text-2xl" />;
  }
};

// icons for categorys
const categoryIcons = {
  'Game Development': 'FaGamepad',
  'Software Development': 'FaCode',
  'Game Modding': 'FaPuzzlePiece',
  'Web Development': 'FaGlobe'
};

const Projects = {
  categories: projectsData.categories.map(category => ({
    ...category,
    icon: categoryIcons[category.name] || 'FaCode'
  })),

};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial = {{ opacity: 0, y: 20 }}
      animate = {{ opacity: 1, y: 0 }}
      transition = {{ duration: 0.5, delay: index * 0.1 }}
      className = "group relative bg-[#232329] rounded-xl overflow-hidden"
    >
      <div className = "aspect-video relative overflow-hidden">
        <div className ="absolute inset-0 bg-gradient-to-br from-accent-default/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src = {project.image}
          alt = {project.title}
          className = "w-full h-full object-contain bg-gray-800 transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className = "p-6">
        <h3 className ="text-xl font-semibold mb-2 group-hover:text-accent-default transition-colors duration-300">
          {project.title}
        </h3>
        <p className = "text-white/60 mb-4">
          {project.description.length > 100 
            ? `${project.description.substring(0, 100)}...` 
            : project.description
          }
        </p>
        <div className = "flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key = {i}
              className = "px-3 py-1 bg-accent-default/10 text-accent-default rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href = {`/projects/${project.slug}`}
          className = "inline-flex items-center gap-2 text-accent-default hover:text-accent-default/80 transition-colors duration-300"
        >
          View Project
          <svg
            xmlns = "http://www.w3.org/2000/svg"
            className = "h-5 w-5"
            viewBox = "0 0 20 20"
            fill = "currentColor"
          >
            <path
              fillRule = "evenodd"
              d ="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule = "evenodd"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(Projects.categories[0]?.name || '');
  
  const currentCategory = Projects.categories.find(cat => cat.name === selectedCategory) || Projects.categories[0];

  if(Projects.categories.length === 0) 
    {
    return (
      <div className = "min-h-screen flex items-center justify-center">
        <p className = "text-foreground-muted">No projects found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial = {{ opacity: 0 }}
      animate = {{ opacity: 1 }}
      exit = {{ opacity: 0 }}
      transition = {{ duration: 0.5 }}
      className = "min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className = "container mx-auto">
        <div className = "flex flex-col gap-8">
          <div className = "text-center">
            <h1 className = "text-4xl font-bold mb-4">My Projects</h1>
            <p className = "text-white/60 max-w-2xl mx-auto">
              Explore my diverse portfolio of projects across different domains
            </p>
          </div>

          {/* Category Navigation */}
          <div className = "flex flex-wrap justify-center gap-4">
            {Projects.categories.map((category, index) => (
              <button
                key = {index}
                onClick = {() => setSelectedCategory(category.name)}
                className = {`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-accent-default text-black"
                    : "bg-muted hover:bg-primary/10"
                }`}
              >
                <IconComponent name = {category.icon} />
                {category.name}
              </button>
            ))}
          </div>

          {/* Category Description */}
          <motion.div
            key = {selectedCategory}
            initial = {{ opacity: 0, y: 20 }}
            animate = {{ opacity: 1, y: 0 }}
            exit = {{ opacity: 0, y: -20 }}
            className = "text-center text-white/60"
          >
            {currentCategory?.description || 'No description available'}
          </motion.div>

          {/* Projects Grid */}
          <ScrollArea className = "h-[600px] w-full">
            <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
              <AnimatePresence mode = "wait">
                {currentCategory?.projects?.length > 0 ? (
                  currentCategory.projects.map((project, index) => (
                    <ProjectCard key = {project.slug || index} project = {project} index = {index} />
                  ))
                ) : (
                  <div className = "col-span-full text-center py-12">
                    <p className = "text-foreground-muted">No projects found in this category</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsPage;