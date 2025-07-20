"use client";

import React, { useState } from 'react';
import Win98_resume from './Windows98Resume';
import Win98_projects from './Windows98Projects';
import Win98_contact from './Windows98Contact';

const Win98_window_manager = ({ 
  activeWindows, 
  onCloseWindow, 
  onFocusWindow,
  activeWindowId,
  windowZIndexes 
}) => {
  return (
    <>
      {activeWindows.includes('resume') && (
        <Win98_resume 
          onClose = {() => onCloseWindow('resume')}
          onFocus = {() => onFocusWindow('resume')}
          isActive = {activeWindowId === 'resume'}
          zIndex = {windowZIndexes.resume}
        />
      )}
      {activeWindows.includes('projects') && (
        <Win98_projects 
          onClose = {() => onCloseWindow('projects')}
          onFocus = {() => onFocusWindow('projects')}
          isActive = {activeWindowId === 'projects'}
          zIndex = {windowZIndexes.projects}
        />
      )}
      {activeWindows.includes('contact') && (
        <Win98_contact 
          onClose = {() => onCloseWindow('contact')}
          onFocus = {() => onFocusWindow('contact')}
          isActive = {activeWindowId === 'contact'}
          zIndex = {windowZIndexes.contact}
        />
      )}
    </>
  );
};

export default Win98_window_manager;
