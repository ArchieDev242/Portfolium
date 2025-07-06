"use client";

import React, { useState } from 'react';
import Windows98Window from './Windows98Window';
import { projectsData } from '@/data/projects';

const Windows98Projects = ({ onClose, onFocus, isActive, zIndex }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <Windows98Window
      title = "Projects Portfolio"
      icon = "/icons/win98/png/directory_open_file_mydocs-0.png"
      onClose = {onClose}
      onFocus = {onFocus}
      isActive = {isActive}
      zIndex = {zIndex}
      width = {800}
      height = {600}
      resizable = {true}
      maximizable = {true}
    >
      <div style = {{ fontFamily: 'MS Sans Serif, sans-serif', fontSize: '11px', height: '100%' }}>
        {/* Tabs */}
        <div style={{ marginBottom: '10px' }}>
          <menu role = "tablist" style = {{ margin: 0, padding: 0 }}>
            {projectsData.categories.map((category, index) => (
              <li 
                key = {index}
                role = "tab" 
                aria-selected = {selectedCategory === index}
                onClick = {() => setSelectedCategory(index)}
                style = {{ 
                  display: 'inline-block', 
                  padding: '4px 12px', 
                  background: selectedCategory === index ? '#c0c0c0' : '#f0f0f0', 
                  border: '1px solid #808080', 
                  borderBottom: selectedCategory === index ? 'none' : '1px solid #808080',
                  borderTop: selectedCategory === index ? '1px solid #808080' : 'none',
                  marginRight: '2px',
                  cursor: 'pointer'
                }}
              >
                {category.name}
              </li>
            ))}
          </menu>
        </div>

        {/* Tab Content */}
        <div className = "sunken-panel" style = {{ padding: '10px', height: 'calc(100% - 80px)', overflow: 'auto' }}>
          <fieldset style = {{ marginBottom: '15px' }}>
            <legend style = {{ fontWeight: 'bold' }}>
              📁 {projectsData.categories[selectedCategory].name}
            </legend>
            <div style = {{ padding: '10px', fontSize: '11px', fontStyle: 'italic' }}>
              {projectsData.categories[selectedCategory].description}
            </div>
          </fieldset>

          {/* Projects List */}
          <div style = {{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
            {projectsData.categories[selectedCategory].projects.map((project, index) => (
              <div key = {index} className = "sunken-panel" style = {{ padding: '10px', background: 'white' }}>
                <div style = {{ fontWeight: 'bold', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <img 
                    src = "/icons/win98/png/file_lines-0.png" 
                    alt  ="Project"
                    style = {{ width: '16px', height: '16px', marginRight: '5px', imageRendering: 'pixelated' }}
                    onError = {(e) => {
                      e.target.style.display = 'none';
                      e.target.insertAdjacentHTML('afterend', '<span style="margin-right: 5px;">📁</span>');
                    }}
                  />
                  {project.title}
                  {project.year && (
                    <span style = {{ 
                      fontSize: '10px', 
                      background: '#e0e0e0', 
                      padding: '1px 4px', 
                      marginLeft: '8px',
                      border: '1px inset #c0c0c0'
                    }}>
                      {project.year}
                    </span>
                  )}
                </div>
                
                {/* Project Image */}
                {project.image && (
                  <div style = {{ marginBottom: '8px', textAlign: 'center' }}>
                    <img 
                      src = {project.image}
                      alt = {project.title}
                      style = {{ 
                        maxWidth: '100%', 
                        height: '160px', 
                        objectFit: 'contain',
                        border: '1px inset #c0c0c0',
                        backgroundColor: '#f0f0f0'
                      }}
                      onError = {(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
                
                <div style = {{ fontSize: '11px', marginBottom: '10px', lineHeight: '1.4' }}>
                  {project.description.length > 80 
                    ? `${project.description.substring(0, 80)}...` 
                    : project.description
                  }
                </div>

                {/* Features */}
                {project.features && (
                  <fieldset style = {{ marginBottom: '10px' }}>
                    <legend style = {{ fontSize: '10px', fontWeight: 'bold' }}>Features</legend>
                    <div style = {{ padding: '5px', fontSize: '10px' }}>
                      {project.features.slice(0, 3).map((feature, fIndex) => (
                        <div key = {fIndex} style = {{ marginBottom: '2px' }}>
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </fieldset>
                )}

                {/* Technologies */}
                <fieldset style = {{ marginBottom: '10px' }}>
                  <legend style = {{ fontSize: '10px', fontWeight: 'bold' }}>Technologies</legend>
                  <div style = {{ padding: '5px' }}>
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key = {techIndex}
                        style = {{ 
                          display: 'inline-block',
                          background: '#e0e0e0',
                          border: '1px outset #c0c0c0',
                          padding: '2px 6px',
                          fontSize: '10px',
                          marginRight: '4px',
                          marginBottom: '4px'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </fieldset>

                {/* Stats */}
                {project.stats && (
                  <div style = {{ 
                    fontSize: '10px', 
                    color: '#666', 
                    marginBottom: '10px',
                    display: 'flex',
                    gap: '10px'
                  }}>
                    {project.stats.downloads && <span>📥 {project.stats.downloads}</span>}
                    {project.stats.views && <span>👁️ {project.stats.views}</span>}
                    {project.stats.likes && <span>👍 {project.stats.likes}</span>}
                  </div>
                )}

                {/* Project Actions */}
                <div style = {{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {project.links?.gamebanana && (
                    <button 
                      onClick = {() => window.open(project.links.gamebanana, '_blank')}
                      style = {{ 
                        fontSize: '10px', 
                        padding: '2px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <img 
                        src = "/icons/win98/png/globe_map-0.png"
                        alt = "GameBanana"
                        style = {{ width: '12px', height: '12px', imageRendering: 'pixelated' }}
                        onError = {(e) => {
                          e.target.style.display = 'none';
                          e.target.insertAdjacentHTML('afterend', '<span>🌐</span>');
                        }}
                      />
                      GameBanana
                    </button>
                  )}
                  {project.links?.github && (
                    <button 
                      onClick = {() => window.open(project.links.github, '_blank')}
                      style = {{ 
                        fontSize: '10px', 
                        padding: '2px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <img 
                        src = "/icons/win98/png/executable-0.png"
                        alt = "Code"
                        style = {{ width: '12px', height: '12px', imageRendering: 'pixelated' }}
                        onError = {(e) => {
                          e.target.style.display = 'none';
                          e.target.insertAdjacentHTML('afterend', '<span>💻</span>');
                        }}
                      />
                      GitHub
                    </button>
                  )}
                  {project.links?.download && (
                    <button 
                      onClick = {() => window.open(project.links.download, '_blank')}
                      style = {{ 
                        fontSize: '10px', 
                        padding: '2px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <img 
                        src = "/icons/win98/png/download.png"
                        alt = "Download"
                        style = {{ width: '12px', height: '12px', imageRendering: 'pixelated' }}
                        onError = {(e) => {
                          e.target.style.display = 'none';
                          e.target.insertAdjacentHTML('afterend', '<span>📥</span>');
                        }}
                      />
                      Download
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {projectsData.categories[selectedCategory].projects.length === 0 && (
            <div style = {{ 
              textAlign: 'center', 
              padding: '40px', 
              fontStyle: 'italic', 
              color: '#666' 
            }}>
              <img 
                src = "/icons/win98/png/msg_information-0.png"
                alt = "Info"
                style = {{ width: '32px', height: '32px', imageRendering: 'pixelated', marginBottom: '10px' }}
                onError = {(e) => {
                  e.target.style.display = 'none';
                  e.target.insertAdjacentHTML('afterend', '<span style="font-size: 32px; margin-bottom: 10px;">ℹ️</span>');
                }}
              />
              <br />
              No projects in this category yet.
              <br />
              Check back soon for updates!
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className = "status-bar" style={{ marginTop: '10px' }}>
          <div className = "status-bar-field">
            {projectsData.categories[selectedCategory].projects.length} project(s) in {projectsData.categories[selectedCategory].name}
          </div>
          <div className = "status-bar-field">Ready</div>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Windows98Projects;
