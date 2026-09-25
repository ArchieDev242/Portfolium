"use client";

import React from 'react';
import Win98_resume from './Windows98Resume';
import Win98_projects from './Windows98Projects';
import Win98_contact from './Windows98Contact';
import Win98_notepad from './Windows98Notepad';
import Win98_msdos from './Windows98MSDOS';
import Windows98Calculator from './Windows98Calculator';
import Windows98RecycleBin from './Windows98RecycleBin';

const Win98_window_manager = ({
  activeWindows,
  minimizedWindows = [],
  onCloseWindow,
  onFocusWindow,
  onMinimizeWindow,
  onOpenWindow,
  activeWindowId,
  windowZIndexes,
  notepadFile = null,
  onSaveFile = null,
  recycleBinFiles = [],
  onRestoreRecycleItem = null,
  onRestoreAllRecycle = null,
  onEmptyRecycleBin = null,
  onDeleteRecycleForever = null
}) => {
  return (
    <>
      {activeWindows.includes('resume') && (
        <Win98_resume 
          onClose = {() => onCloseWindow('resume')} 
          onFocus = {() => onFocusWindow('resume')} 
          onMinimize = {() => onMinimizeWindow('resume')}
          isMinimized = {minimizedWindows.includes('resume')}
          isActive = {activeWindowId === 'resume'} 
          zIndex = {windowZIndexes.resume} 
        />
      )}
      {activeWindows.includes('projects') && (
        <Win98_projects 
          onClose = {() => onCloseWindow('projects')} 
          onFocus = {() => onFocusWindow('projects')} 
          onMinimize = {() => onMinimizeWindow('projects')}
          isMinimized = {minimizedWindows.includes('projects')}
          isActive = {activeWindowId === 'projects'} 
          zIndex = {windowZIndexes.projects} 
        />
      )}
      {activeWindows.includes('contact') && (
        <Win98_contact 
          onClose = {() => onCloseWindow('contact')} 
          onFocus = {() => onFocusWindow('contact')} 
          onMinimize = {() => onMinimizeWindow('contact')}
          isMinimized = {minimizedWindows.includes('contact')}
          isActive = {activeWindowId === 'contact'} 
          zIndex = {windowZIndexes.contact} 
        />
      )}
      {activeWindows.includes('notepad') && (
        <Win98_notepad 
          onClose = {() => onCloseWindow('notepad')} 
          onFocus = {() => onFocusWindow('notepad')} 
          onMinimize = {() => onMinimizeWindow('notepad')}
          isMinimized = {minimizedWindows.includes('notepad')}
          isActive = {activeWindowId === 'notepad'} 
          zIndex = {windowZIndexes.notepad}
          initialFile = {notepadFile}
          onSaveFile = {onSaveFile}
        />
      )}
      {activeWindows.includes('msdos') && (
        <Win98_msdos 
          onClose = {() => onCloseWindow('msdos')} 
          onFocus = {() => onFocusWindow('msdos')} 
          onMinimize = {() => onMinimizeWindow('msdos')}
          isMinimized = {minimizedWindows.includes('msdos')}
          onOpenWindow = {onOpenWindow}
          isActive = {activeWindowId === 'msdos'} 
          zIndex = {windowZIndexes.msdos} 
        />
      )}
      {activeWindows.includes('calculator') && (
        <Windows98Calculator
          onClose = {() => onCloseWindow('calculator')}
          onFocus = {() => onFocusWindow('calculator')}
          onMinimize = {() => onMinimizeWindow('calculator')}
          isMinimized = {minimizedWindows.includes('calculator')}
          isActive = {activeWindowId === 'calculator'}
          zIndex = {windowZIndexes.calculator || 1000}
        />
      )}
      {activeWindows.includes('recycle_bin') && (
        <Windows98RecycleBin
          onClose = {() => onCloseWindow('recycle_bin')}
          onFocus = {() => onFocusWindow('recycle_bin')}
          onMinimize = {() => onMinimizeWindow('recycle_bin')}
          isMinimized = {minimizedWindows.includes('recycle_bin')}
          isActive = {activeWindowId === 'recycle_bin'}
          zIndex = {windowZIndexes.recycle_bin || 1000}
          files = {recycleBinFiles}
          onRestoreItem = {onRestoreRecycleItem}
          onRestoreAll = {onRestoreAllRecycle}
          onEmptyBin = {onEmptyRecycleBin}
          onDeleteForever = {onDeleteRecycleForever}
        />
      )}
    </>
  );
};

export default Win98_window_manager;
