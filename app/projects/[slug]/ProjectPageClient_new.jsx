"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaDownload, FaArrowLeft, FaEye, FaStar, FaCalendar } from "react-icons/fa";
import Link from "next/link";
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/projects';
import { useEffect, useState } from 'react';

const ProjectPageClient = ({ params }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try 
      {
        const resolvedParams = await params;
        const foundProject = getProjectBySlug(resolvedParams.slug);
        setProject(foundProject);
      } catch(error) 
      {
        console.error('Error loading project:', error);
      } finally 
      {
        setLoading(false);
      }
    };

    loadProject();
  }, [params]);

  if(loading) 
    {
    return (
      <div className="min-h-screen bg-background-default text-foreground-default py-12 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }
  
  if(!project) notFound();

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

        <div className = "grid lg:grid-cols-2 gap-8 mb-12">
          {/* Project Image */}
          <div className = "space-y-4">
            <div className = "relative overflow-hidden rounded-xl aspect-video">
              <img 
                src = {project.image} 
                alt = {project.title}
                className = "w-full h-full object-cover"
              />
            </div>
            
            {/* Additional Image for FNF project */}
            {project.slug === 'fnf-cutscene-lua-script' && (
              <div className = "relative overflow-hidden rounded-xl aspect-video">
                <img 
                  src = "https://images.gamebanana.com/img/ss/tools/6286a4b363346.jpg"
                  alt = "FNF Cutscene Script - Interface"
                  className = "w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Additional Images for all projects */}
            {project.additionalImages && project.additionalImages.map((image, index) => (
              <div key={index} className = "relative overflow-hidden rounded-xl aspect-video">
                <img 
                  src = {image}
                  alt = {`${project.title} - Additional Image ${index + 1}`}
                  className = "w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Project Info */}
          <div className = "space-y-6">
            <div>
              <h1 className = "text-4xl font-bold mb-2">{project.title}</h1>
              <div className = "flex items-center gap-4 text-sm text-white/70 mb-4">
                {project.year && (
                  <span className = "flex items-center gap-1">
                    <FaCalendar />
                    {project.year}
                  </span>
                )}
                {project.status && (
                  <span className = "bg-accent-default/20 px-2 py-1 rounded text-accent-default">
                    {project.status}
                  </span>
                )}
              </div>
              <p className = "text-white/80 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Stats */}
            {project.stats && (
              <div className = "grid grid-cols-3 gap-4">
                {project.stats.downloads && (
                  <div className = "text-center p-4 bg-[#232329] rounded-lg">
                    <FaDownload className = "mx-auto mb-2 text-accent-default" />
                    <div className = "text-2xl font-bold">{project.stats.downloads}</div>
                    <div className = "text-sm text-white/70">Downloads</div>
                  </div>
                )}
                {project.stats.views && (
                  <div className = "text-center p-4 bg-[#232329] rounded-lg">
                    <FaEye className = "mx-auto mb-2 text-accent-default" />
                    <div className = "text-2xl font-bold">{project.stats.views}</div>
                    <div className = "text-sm text-white/70">Views</div>
                  </div>
                )}
                {project.stats.likes && (
                  <div className = "text-center p-4 bg-[#232329] rounded-lg">
                    <FaStar className = "mx-auto mb-2 text-accent-default" />
                    <div className = "text-2xl font-bold">{project.stats.likes}</div>
                    <div className = "text-sm text-white/70">Likes</div>
                  </div>
                )}
              </div>
            )}

            {/* Technologies */}
            <div>
              <h3 className = "text-xl font-semibold mb-3">Technologies Used</h3>
              <div className = "flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key = {index}
                    className = "px-3 py-1 bg-accent-default/20 text-accent-default rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            {project.features && (
              <div>
                <h3 className = "text-xl font-semibold mb-3">Key Features</h3>
                <ul className = "space-y-2">
                  {project.features.map((feature, index) => (
                    <li key = {index} className = "flex items-start gap-2 text-white/80">
                      <span className = "text-accent-default mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className = "flex flex-wrap gap-4">
              {project.links?.github && (
                <a
                  href = {project.links.github}
                  target = "_blank"
                  rel = "noopener noreferrer"
                  className = "inline-flex items-center gap-2 px-6 py-3 bg-[#232329] hover:bg-[#2a2a31] rounded-lg transition-colors"
                >
                  <FaGithub />
                  View Code
                </a>
              )}
              {project.links?.demo && (
                <a
                  href = {project.links.demo}
                  target = "_blank"
                  rel = "noopener noreferrer"
                  className = "inline-flex items-center gap-2 px-6 py-3 bg-accent-default hover:bg-accent-default/80 rounded-lg transition-colors"
                >
                  <FaExternalLinkAlt />
                  GameBanana Page
                </a>
              )}
              {project.links?.download && (
                <a
                  href = {project.links.download}
                  target = "_blank"
                  rel = "noopener noreferrer"
                  className = "inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <FaDownload />
                  Download
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Description for FNF Project */}
        {project.slug === 'fnf-cutscene-lua-script' && (
          <div className = "mb-12">
            <h2 className = "text-2xl font-bold mb-6">About This Project</h2>
            <div className = "bg-[#232329] rounded-xl p-6 space-y-4">
              <p className = "text-white/80 leading-relaxed">
                This was my first Lua script uploaded to both GitHub and GameBanana. I created this tool because 
                I believe cutscenes are one of the main components of FNF mods, and while experienced modders 
                know how to write such code, many people who want to create mods might not have programming experience.
              </p>
              
              <h3 className = "text-xl font-semibold">How to Use</h3>
              <ol className = "list-decimal list-inside space-y-2 text-white/80">
                <li>Upload your video into the "videos" folder in Psych Engine</li>
                <li>Ensure your video is sized at 1280x720 resolution</li>
                <li>Add the Lua script to your mod</li>
                <li>Enjoy your custom cutscenes!</li>
              </ol>
              
              <div className = "bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <h4 className = "text-yellow-400 font-semibold mb-2">Note:</h4>
                <p className = "text-white/80 text-sm">
                  You may encounter a "return value not supported" message when playing songs with cutscenes. 
                  This doesn't affect gameplay or the mod's functionality, so it can be safely ignored.
                </p>
              </div>

              <h3 className = "text-xl font-semibold">Impact</h3>
              <p className = "text-white/80 leading-relaxed">
                This simple tool has helped over 3,000 modders easily add cutscenes to their Friday Night Funkin' 
                mods without needing to learn Lua programming. It demonstrates how small utilities can have a 
                significant impact on the modding community.
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectPageClient;
