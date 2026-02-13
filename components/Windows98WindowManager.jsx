"use client";

import React from 'react';
import Win98_resume from './Windows98Resume';
import Win98_projects from './Windows98Projects';
import Win98_contact from './Windows98Contact';
import Win98_notepad from './Windows98Notepad';
import Win98_msdos from './Windows98MSDOS';

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
        <Win98_resume onClose = {() => onCloseWindow('resume')} onFocus = {() => onFocusWindow('resume')} isActive = {activeWindowId === 'resume'} zIndex = {windowZIndexes.resume} />
      )}
      {activeWindows.includes('projects') && (
        <Win98_projects onClose = {() => onCloseWindow('projects')} onFocus = {() => onFocusWindow('projects')} isActive = {activeWindowId === 'projects'} zIndex = {windowZIndexes.projects} />
      )}
      {activeWindows.includes('contact') && (
        <Win98_contact onClose = {() => onCloseWindow('contact')} onFocus = {() => onFocusWindow('contact')} isActive = {activeWindowId === 'contact'} zIndex = {windowZIndexes.contact} />
      )}
      {activeWindows.includes('notepad') && (
        <Win98_notepad onClose = {() => onCloseWindow('notepad')} onFocus = {() => onFocusWindow('notepad')} isActive = {activeWindowId === 'notepad'} zIndex = {windowZIndexes.notepad} />
      )}
      {activeWindows.includes('msdos') && (
        <Win98_msdos onClose = {() => onCloseWindow('msdos')} onFocus = {() => onFocusWindow('msdos')} isActive = {activeWindowId === 'msdos'} zIndex = {windowZIndexes.msdos} />
      )}
    </>
  );
};

export default Win98_window_manager;
