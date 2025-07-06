"use client";

import React, { useState } from 'react';
import Windows98Resume from './Windows98Resume';
import Windows98Projects from './Windows98Projects';
import Windows98Contact from './Windows98Contact';

const Windows98WindowManager = ({ 
  activeWindows, 
  onCloseWindow, 
  onFocusWindow,
  activeWindowId,
  windowZIndexes 
}) => {
  return (
    <>
      {activeWindows.includes('resume') && (
        <Windows98Resume 
          onClose = {() => onCloseWindow('resume')}
          onFocus = {() => onFocusWindow('resume')}
          isActive = {activeWindowId === 'resume'}
          zIndex = {windowZIndexes.resume}
        />
      )}
      {activeWindows.includes('projects') && (
        <Windows98Projects 
          onClose = {() => onCloseWindow('projects')}
          onFocus = {() => onFocusWindow('projects')}
          isActive = {activeWindowId === 'projects'}
          zIndex = {windowZIndexes.projects}
        />
      )}
      {activeWindows.includes('contact') && (
        <Windows98Contact 
          onClose = {() => onCloseWindow('contact')}
          onFocus = {() => onFocusWindow('contact')}
          isActive = {activeWindowId === 'contact'}
          zIndex = {windowZIndexes.contact}
        />
      )}
    </>
  );
};

export default Windows98WindowManager;
