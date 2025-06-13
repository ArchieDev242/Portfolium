"use client";

import { motion } from "framer-motion";
import { FaGithub, FaItchIo, FaGlobe, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const ProjectPageClient = ({ params }) => {
  const project = {
    title: "Project Title",
    description: "Detailed description of the project and its purpose. This section can contain multiple paragraphs explaining the project's goals, challenges, and solutions.",
    longDescription: `This is a more detailed description of the project. It can contain multiple paragraphs and provide in-depth information about:
    
    • The project's background and motivation
    • Key features and functionality
    • Technical challenges and how they were solved
    • The development process and methodology
    • Future improvements and plans`,
    
    features: [
      "Feature 1: Description of the first main feature",
      "Feature 2: Description of the second main feature",
      "Feature 3: Description of the third main feature",
    ],
    
    technologies: [
      { name: "Technology 1", description: "How this technology was used in the project" },
      { name: "Technology 2", description: "How this technology was used in the project" },
      { name: "Technology 3", description: "How this technology was used in the project" },
    ],
    
    links: {
      github: "https://github.com/yourusername/project",
      itch: "https://yourusername.itch.io/project",
      website: "https://project-website.com",
    },
    
    images: [
      "/projects/project1.jpg",
      "/projects/project2.jpg",
      "/projects/project3.jpg",
    ],
  };

  return (
    <motion.div
      initial = {{ opacity: 0 }}
      animate = {{ opacity: 1 }}
      exit = {{ opacity: 0 }}
      transition = {{ duration: 0.5 }}
      className = "min-h-screen bg-background-default text-foreground-default py-12"
    >
      <div className = "container mx-auto px-4">
        
        {/* Back Button */}
        
        <Link 
          href = "/projects"
          className = "inline-flex items-center gap-2 text-accent-default hover:text-accent-default/80 transition-colors duration-300 mb-8"
        >
          <FaArrowLeft />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className = "flex flex-col gap-6 mb-12">
          <h1 className = "text-4xl font-bold">{project.title}</h1>
          <p className = "text-white/60 text-lg max-w-3xl">{project.description}</p>
        </div>

        {/* Project Links */}
        <div className = "flex flex-wrap gap-4 mb-12">
          {project.links.github && (
            <a
              href={project.links.github}
              target = "_blank"
              rel = "noopener noreferrer"
              className = "flex items-center gap-2 px-6 py-3 bg-[#232329] rounded-lg hover:bg-[#2a2a31] transition-colors duration-300"
            >
              <FaGithub className = "text-xl" />
              View on GitHub
            </a>
          )}
          {project.links.itch && (
            <a
              href={project.links.itch}
              target = "_blank"
              rel = "noopener noreferrer"
              className = "flex items-center gap-2 px-6 py-3 bg-[#232329] rounded-lg hover:bg-[#2a2a31] transition-colors duration-300"
            >
              <FaItchIo className = "text-xl" />
              View on Itch.io
            </a>
          )}
          {project.links.website && (
            <a
              href={project.links.website}
              target = "_blank"
              rel = "noopener noreferrer"
              className = "flex items-center gap-2 px-6 py-3 bg-[#232329] rounded-lg hover:bg-[#2a2a31] transition-colors duration-300"
            >
              <FaGlobe className = "text-xl" />
              Visit Website
            </a>
          )}
        </div>

        {/* Project Images */}
        <div className = "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {project.images.map((image, index) => (
            <motion.div
              key = {index}
              initial = {{ opacity: 0, y: 20 }}
              animate = {{ opacity: 1, y: 0 }}
              transition = {{ duration: 0.5, delay: index * 0.1 }}
              className = "relative aspect-video rounded-xl overflow-hidden group"
            >
              <img
                src = {image}
                alt = {`${project.title} screenshot ${index + 1}`}
                className = "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className = "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Project Details */}
        
        <div className = "grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Features Section */}
          
          <div>
            <h2 className = "text-2xl font-bold mb-6">Key Features</h2>
            <ul className = "space-y-4">
              {project.features.map((feature, index) => (
                <li key = {index} className = "flex items-start gap-3">
                  <span className = "text-accent-default mt-1">•</span>
                  <span className = "text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Section */}
          <div>
            <h2 className = "text-2xl font-bold mb-6">Technologies Used</h2>
            <div className = "space-y-4">
              {project.technologies.map((tech, index) => (
                <div key={index} className = "bg-[#232329] p-4 rounded-lg">
                  <h3 className = "font-semibold mb-2">{tech.name}</h3>
                  <p className = "text-white/60 text-sm">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className = "mt-12">
          <h2 className = "text-2xl font-bold mb-6">Project Details</h2>
          <div className = "prose prose-invert max-w-none">
            {project.longDescription.split('\n').map((paragraph, index) => (
              <p key = {index} className = "text-white/80 mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectPageClient;
