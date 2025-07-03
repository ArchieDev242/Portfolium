"use client";

import React, { useState } from 'react';
import Windows98Resume from './Windows98Resume';
import Windows98Projects from './Windows98Projects';
import Windows98Contact from './Windows98Contact';

const Windows98WindowManager = ({ activeWindows, onCloseWindow }) => {
  return (
    <>
      {activeWindows.includes('resume') && (
        <Windows98Resume onClose={() => onCloseWindow('resume')} />
      )}
      {activeWindows.includes('projects') && (
        <Windows98Projects onClose={() => onCloseWindow('projects')} />
      )}
      {activeWindows.includes('contact') && (
        <Windows98Contact onClose={() => onCloseWindow('contact')} />
      )}
    </>
  );
};

export default Windows98WindowManager;
