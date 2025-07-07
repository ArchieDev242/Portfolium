"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaDownload, FaArrowLeft, FaEye, FaStar, FaCalendar, FaTimes, FaSearchPlus, FaSearchMinus, FaCompress } from "react-icons/fa";
import Link from "next/link";
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/projects';
import { useEffect, useState } from 'react';

const ProjectPageClient = ({ params }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox_image, setLightboxImage] = useState(null);
  const [zoom_level, setZoomLevel] = useState(1);
  const [pan_position, setPanPosition] = useState({ x: 0, y: 0 });
  const [is_dragging, setIsDragging] = useState(false);
  const [drag_start, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const load_project = async () => {
      try 
      {
        const resolved_params = await params;
        const found_project = getProjectBySlug(resolved_params.slug);
        setProject(found_project);
      } catch(error) 
      {
        console.error('Error loading project:', error);
      } finally 
      {
        setLoading(false);
      }
    };

    load_project();
  }, [params]);

  const open_light_box = (image) => {
    setLightboxImage(image);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const close_light_box = () => {
    setLightboxImage(null);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'unset';
  };

  const handle_zoom_in = () => { setZoomLevel(prev => Math.min(prev + 0.25, 3)); };

  const handle_zoom_out = () => { setZoomLevel(prev => Math.max(prev - 0.25, 0.5)); };

  const handle_reset_zoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handle_mouse_down = (e) => {
    if(zoom_level > 1) 
      {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - pan_position.x,
        y: e.clientY - pan_position.y
      });
    }
  };

  const handle_touch_start = (e) => {
    if(zoom_level > 1 && e.touches.length === 1) 
      {
      e.preventDefault();
      setIsDragging(true);

      const touch = e.touches[0];

      setDragStart({
        x: touch.clientX - pan_position.x,
        y: touch.clientY - pan_position.y
      });
    }
  };

  const handle_mouse_move = (e) => {
    if(is_dragging && zoom_level > 1) 
      {
      e.preventDefault();
      const new_x = e.clientX - drag_start.x;
      const new_y = e.clientY - drag_start.y;
      
      const max_pan = 200 * zoom_level;
      const bounded_x = Math.max(-max_pan, Math.min(new_x, max_pan));
      const bounded_y = Math.max(-max_pan, Math.min(new_y, max_pan));
      
      setPanPosition({ x: bounded_x, y: bounded_y });
    }
  };

  const handle_touch_move = (e) => {
    if(is_dragging && zoom_level > 1 && e.touches.length === 1) 
      {
      e.preventDefault();
      const touch = e.touches[0];
      const new_x = touch.clientX - drag_start.x;
      const new_y = touch.clientY - drag_start.y;
      
      const max_pan = 200 * zoom_level;
      const bounded_x = Math.max(-max_pan, Math.min(new_x, max_pan));
      const bounded_y = Math.max(-max_pan, Math.min(new_y, max_pan));
      
      setPanPosition({ x: bounded_x, y: bounded_y });
    }
  };

  const handle_mouse_up = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handle_touch_end = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  useEffect(() => {
    const handle_escape = (e) => {
      if(e.key === 'Escape') close_light_box(); 
    };

    const handle_wheel = (e) => {
      if(lightbox_image) 
        {
        e.preventDefault();
        if(e.deltaY < 0) 
          {
          handle_zoom_in();
        } else 
        {
          handle_zoom_out();
        }
      }
    };

    if(lightbox_image) 
      {
      document.addEventListener('keydown', handle_escape);
      document.addEventListener('wheel', handle_wheel, { passive: false });
      
      return () => {
        document.removeEventListener('keydown', handle_escape);
        document.removeEventListener('wheel', handle_wheel);
      };
    }
  }, [lightbox_image]);

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
          {/* Project Images */}
          <div className = "space-y-4">
            {/* Main Image */}
            <div 
              className = "relative overflow-hidden rounded-xl aspect-video cursor-pointer group hover:shadow-2xl transition-all duration-300"
              onClick={() => open_light_box(project.image)}
            >
              <img 
                src = {project.image} 
                alt = {project.title}
                className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className = "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className = "opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold">
                  Click to enlarge
                </div>
              </div>
            </div>
            
            {/* Additional Images */}
            {project.additionalImages && project.additionalImages.map((image, index) => (
              <div 
                key={index} 
                className = "relative overflow-hidden rounded-xl aspect-video cursor-pointer group hover:shadow-2xl transition-all duration-300"
                onClick={() => open_light_box(image)}
              >
                <img 
                  src = {image}
                  alt = {`${project.title} - Additional Image ${index + 1}`}
                  className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold">
                    Click to enlarge
                  </div>
                </div>
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

      {/* Lightbox Modal */}
      {lightbox_image && (
        <motion.div
          initial = {{ opacity: 0 }}
          animate = {{ opacity: 1 }}
          exit = {{ opacity: 0 }}
          className = "fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick = {close_light_box}
        >
          {/* Controls */}
          <div className = "absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick = {(e) => {
                e.stopPropagation();
                handle_zoom_out();
              }}
              className = "bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors duration-200"
              title = "Zoom Out"
            >
              <FaSearchMinus size = {16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handle_zoom_in();
              }}
              className = "bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors duration-200"
              title = "Zoom In"
            >
              <FaSearchPlus size = {16} />
            </button>
            <button
              onClick = {(e) => {
                e.stopPropagation();
                handle_reset_zoom();
              }}
              className = "bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors duration-200"
              title = "Reset Zoom"
            >
              <FaCompress size = {16} />
            </button>
            <button
              onClick = {close_light_box}
              className = "bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors duration-200"
              title = "Close"
            >
              <FaTimes size = {16} />
            </button>
          </div>

          {/* Zoom Level Indicator */}
          <div className = "absolute top-4 left-4 z-10 bg-black/70 text-white px-3 py-2 rounded-full text-sm">
            {Math.round(zoom_level * 100)}%
          </div>

          {/* Image Container */}
          <div 
            className = "relative w-full h-full flex items-center justify-center overflow-hidden"
            onClick = {(e) => e.stopPropagation()}
            onMouseMove = {handle_mouse_move}
            onMouseUp = {handle_mouse_up}
            onMouseLeave = {handle_mouse_up}
            onTouchMove = {handle_touch_move}
            onTouchEnd = {handle_touch_end}
          >
            <img
              src = {lightbox_image}
              alt = "Enlarged view"
              className = {`max-w-[70vw] max-h-[70vh] object-contain select-none ${
                zoom_level > 1 ? (is_dragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
              }`}
              style = {{
                transform: `scale(${zoom_level}) translate(${pan_position.x / zoom_level}px, ${pan_position.y / zoom_level}px)`,
                transformOrigin: 'center center',
                transition: is_dragging ? 'none' : 'transform 0.1s ease-out'
              }}
              onMouseDown = {handle_mouse_down}
              onTouchStart = {handle_touch_start}
              onDragStart = {(e) => e.preventDefault()}
              draggable = {false}
            />
          </div>

          {/* Instructions */}
          <div className = "absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
            Scroll to zoom • Drag to pan • ESC to close
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectPageClient;
