"use client";

import React from 'react';
import Windows98Window from './Windows98Window';

const Windows98Resume = ({ onClose, onFocus, isActive, zIndex }) => {
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
    items: [],
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

  return (
    <Windows98Window
      title = "Resume - Maksym Kopychko"
      icon = "https://win98icons.alexmeub.com/icons/png/user-4.png"
      onClose = {onClose}
      onFocus = {onFocus}
      isActive = {isActive}
      zIndex = {zIndex}
      width = {700}
      height = {500}
      resizable = {true}
      maximizable = {true}
    >
      <div style = {{ fontFamily: 'MS Sans Serif, sans-serif', fontSize: '11px' }}>
        {/* Tabs */}
        <div style = {{ marginBottom: '10px' }}>
          <menu role = "tablist" style = {{ margin: 0, padding: 0 }}>
            <li role = "tab" aria-selected = "true" style = {{ display: 'inline-block', padding: '4px 12px', background: '#c0c0c0', border: '1px solid #808080', borderBottom: 'none', marginRight: '2px' }}>
              About
            </li>
            <li role = "tab" style = {{ display: 'inline-block', padding: '4px 12px', background: '#f0f0f0', border: '1px solid #808080', borderTop: 'none', marginRight: '2px' }}>
              Experience
            </li>
            <li role = "tab" style = {{ display: 'inline-block', padding: '4px 12px', background: '#f0f0f0', border: '1px solid #808080', borderTop: 'none' }}>
              Education
            </li>
          </menu>
        </div>

        {/* Tab Content */}
        <div className = "sunken-panel" style = {{ padding: '10px', height: '370px', overflow: 'auto' }}>
          {/* About Tab */}
          <div>
            <fieldset style = {{ marginBottom: '15px' }}>
              <legend style  ={{ fontWeight: 'bold' }}>📋 Personal Information</legend>
              <div style = {{ padding: '10px' }}>
                {About.info.map((item, index) => (
                  <div key = {index} style = {{ display: 'flex', marginBottom: '8px', alignItems: 'center' }}>
                    <label style = {{ 
                      width: '140px', 
                      fontWeight: 'bold', 
                      fontSize: '11px',
                      textAlign: 'right',
                      marginRight: '10px'
                    }}>
                      {item.fieldName}:
                    </label>
                    <div className = "sunken-panel" style={{ 
                      padding: '4px 8px', 
                      background: 'white', 
                      flex: 1,
                      fontSize: '11px'
                    }}>
                      {item.fieldValue}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend style = {{ fontWeight: 'bold' }}>🎓 Education</legend>
              <div style = {{ padding: '10px' }}>
                {Education.items.map((item, index) => (
                  <div key = {index} style = {{ marginBottom: '15px', padding: '8px', background: '#f0f0f0', border: '1px inset #c0c0c0' }}>
                    <div style = {{ fontWeight: 'bold', fontSize: '12px', marginBottom: '5px' }}>
                      {item.title}
                    </div>
                    <div style = {{ fontSize: '11px', marginBottom: '3px' }}>
                      <strong>Institution:</strong> {item.institution}
                    </div>
                    <div style = {{ fontSize: '11px', marginBottom: '3px' }}>
                      <strong>Location:</strong> {item.location}
                    </div>
                    <div style = {{ fontSize: '11px' }}>
                      <strong>Duration:</strong> {item.duration}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            {Experience.items.length === 0 && (
              <fieldset style = {{ marginTop: '15px' }}>
                <legend style = {{ fontWeight: 'bold' }}>💼 Professional Experience</legend>
                <div style = {{ padding: '10px', textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
                  Currently building experience through projects and education.
                  <br />
                  Ready to start my professional journey!
                </div>
              </fieldset>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className = "status-bar" style = {{ marginTop: '10px' }}>
          <div className = "status-bar-field">Resume loaded successfully</div>
          <div className = "status-bar-field">Ready</div>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Windows98Resume;
