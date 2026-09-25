"use client";

import React, { useState } from "react";
import Image from "next/image";
import Windows98Window from "./Windows98Window";
import { projectsData } from "@/data/projects";
import { getWin98Icon, WIN98_ICONS } from "@/lib/win98-icons";
import { withBasePath } from "@/lib/asset-path";

const Win98_projects = ({ onClose, onFocus, onMinimize, isMinimized, isActive, zIndex }) => {
  const [selected_category, set_selected_category] = useState(0);

  return (
    <Windows98Window
      title = "Projects Portfolio"
      icon = {WIN98_ICONS.directory_open}
      onClose = {onClose}
      onFocus = {onFocus}
      isActive = {isActive}
      zIndex = {zIndex}
      width = {800}
      height = {600}
      resizable = {true}
      maximizable = {true}
      minimizable = {true}
      onMinimize = {onMinimize}
      isMinimized = {isMinimized}
    >
      <div
        style = {{
          fontFamily: "MS Sans Serif, sans-serif",
          fontSize: "11px",
          height: "100%",
        }}
      >
        {/* 98.css Tabs */}
        <menu role = "tablist">
          {projectsData.categories.map((category, index) => (
            <li
              key = {index}
              role = "tab"
              aria-selected = {selected_category === index}
            >
              <a
                href = "#projects"
                onClick = {(e) => {
                  e.preventDefault();
                  set_selected_category(index);
                }}
              >
                {category.name}
              </a>
            </li>
          ))}
        </menu>

        {/* Tab Content Panel */}
        <div
          className = "window"
          role = "tabpanel"
          style = {{
            height: "calc(100% - 60px)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            className = "window-body"
            style = {{
              padding: "10px",
              height: "100%",
              overflow: "auto",
              margin: 0
            }}
          >
          <fieldset style = {{ marginBottom: "15px" }}>
            <legend style = {{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
              <Image 
                src = {getWin98Icon(WIN98_ICONS.directory_open)} 
                alt = "" 
                width = {16} 
                height = {16} 
                unoptimized 
                style = {{ imageRendering: "pixelated" }} 
              />
              {projectsData.categories[selected_category].name}
            </legend>
            <div
              style = {{ padding: "10px", fontSize: "11px", fontStyle: "italic" }}
            >
              {projectsData.categories[selected_category].description}
            </div>
          </fieldset>

          {/* Projects List */}
          <div
            style = {{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "15px",
            }}
          >
            {projectsData.categories[selected_category].projects.map(
              (project, index) => (
                <div
                  key = {index}
                  className = "sunken-panel"
                  style = {{ padding: "10px", background: "white" }}
                >
                  <div
                    style = {{
                      fontWeight: "bold",
                      fontSize: "12px",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src = {getWin98Icon(WIN98_ICONS.file_lines)}
                      alt = "Project"
                      width = {16}
                      height = {16}
                      unoptimized
                      style = {{
                        marginRight: "5px",
                        imageRendering: "pixelated",
                      }}
                    />
                    {project.title}
                    {project.year && (
                      <span
                        style = {{
                          fontSize: "10px",
                          background: "#e0e0e0",
                          padding: "1px 4px",
                          marginLeft: "8px",
                          border: "1px inset #c0c0c0",
                        }}
                      >
                        {project.year}
                      </span>
                    )}
                  </div>

                  {/* Project Image */}
                  {project.image && (
                    <div style = {{ marginBottom: "8px", textAlign: "center" }}>
                      <img
                        src = {withBasePath(project.image)}
                        alt = {project.title}
                        style = {{
                          maxWidth: "100%",
                          height: "160px",
                          objectFit: "contain",
                          border: "1px inset #c0c0c0",
                          backgroundColor: "#f0f0f0",
                        }}
                        onError = {(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}

                  <div
                    style = {{
                      fontSize: "11px",
                      marginBottom: "10px",
                      lineHeight: "1.4",
                    }}
                  >
                    {project.description.length > 80
                      ? `${project.description.substring(0, 80)}...`
                      : project.description}
                  </div>

                  {/* Features */}
                  {project.features && (
                    <fieldset style = {{ marginBottom: "10px" }}>
                      <legend style = {{ fontSize: "10px", fontWeight: "bold" }}>
                        Features
                      </legend>
                      <div style = {{ padding: "5px", fontSize: "10px" }}>
                        {project.features.slice(0, 3).map((feature, fIndex) => (
                          <div key = {fIndex} style = {{ marginBottom: "2px" }}>
                            • {feature}
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {/* Technologies */}
                  <fieldset style = {{ marginBottom: "10px" }}>
                    <legend style = {{ fontSize: "10px", fontWeight: "bold" }}>
                      Technologies
                    </legend>
                    <div style = {{ padding: "5px" }}>
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key = {techIndex}
                          style = {{
                            display: "inline-block",
                            background: "#e0e0e0",
                            border: "1px outset #c0c0c0",
                            padding: "2px 6px",
                            fontSize: "10px",
                            marginRight: "4px",
                            marginBottom: "4px",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </fieldset>

                  {/* Stats */}
                  {project.stats && (
                    <div
                      style = {{
                        fontSize: "10px",
                        color: "#666",
                        marginBottom: "10px",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      {project.stats.downloads && (
                        <span>Downloads: {project.stats.downloads}</span>
                      )}
                      {project.stats.views && (
                        <span>Views: {project.stats.views}</span>
                      )}
                      {project.stats.likes && (
                        <span>Likes: {project.stats.likes}</span>
                      )}
                    </div>
                  )}

                  {/* Project Actions */}
                  <div
                    style = {{ display: "flex", gap: "5px", flexWrap: "wrap" }}
                  >
                    {project.links?.playGame && (
                      <button
                        onClick = {() =>
                          window.open(project.links.playGame, "_blank")
                        }
                        style = {{
                          fontSize: "10px",
                          padding: "2px 8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <Image
                          src = {getWin98Icon(WIN98_ICONS.media_play)}
                          alt = "Play Game"
                          width = {12}
                          height = {12}
                          unoptimized
                          style = {{ imageRendering: "pixelated" }}
                        />
                        Play Game
                      </button>
                    )}
                    {project.links?.gamebanana && (
                      <button
                        onClick = {() =>
                          window.open(project.links.gamebanana, "_blank")
                        }
                        style = {{
                          fontSize: "10px",
                          padding: "2px 8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <Image
                          src = {getWin98Icon(WIN98_ICONS.globe)}
                          alt = "GameBanana"
                          width = {12}
                          height = {12}
                          unoptimized
                          style = {{ imageRendering: "pixelated" }}
                        />
                        GameBanana
                      </button>
                    )}
                    {project.links?.github && (
                      <button
                        onClick = {() =>
                          window.open(project.links.github, "_blank")
                        }
                        style = {{
                          fontSize: "10px",
                          padding: "2px 8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <Image
                          src = {getWin98Icon(WIN98_ICONS.executable)}
                          alt = "Code"
                          width = {12}
                          height = {12}
                          unoptimized
                          style = {{ imageRendering: "pixelated" }}
                        />
                        GitHub
                      </button>
                    )}
                    {project.links?.download && (
                      <button
                        onClick = {() =>
                          window.open(project.links.download, "_blank")
                        }
                        style = {{
                          fontSize: "10px",
                          padding: "2px 8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <Image
                          src = {getWin98Icon(WIN98_ICONS.download)}
                          alt = "Download"
                          width = {12}
                          height = {12}
                          unoptimized
                          style = {{ imageRendering: "pixelated" }}
                        />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Empty State */}
          {projectsData.categories[selected_category].projects.length === 0 && (
            <div
              style = {{
                textAlign: "center",
                padding: "40px",
                fontStyle: "italic",
                color: "#666",
              }}
            >
              <Image
                src = {getWin98Icon(WIN98_ICONS.msg_info)}
                alt = "Info"
                width = {32}
                height = {32}
                unoptimized
                style = {{ imageRendering: "pixelated", marginBottom: "10px" }}
              />
              <br />
              No projects in this category yet.
              <br />
              Check back soon for updates!
            </div>
          )}
          </div>
        </div>

        {/* 98.css Status Bar */}
        <div className = "status-bar" style = {{ flexShrink: 0, marginTop: "4px" }}>
          <p className = "status-bar-field">
            {projectsData.categories[selected_category].projects.length}{" "}
            project(s) in {projectsData.categories[selected_category].name}
          </p>
          <p className = "status-bar-field" style = {{ textAlign: "right" }}>Ready</p>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Win98_projects;
