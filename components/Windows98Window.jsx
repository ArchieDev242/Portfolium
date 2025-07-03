"use client";

import { useState, useEffect } from 'react';

const Windows98Window = ({ 
  title = "Windows 98 Application", 
  icon = "https://win98icons.alexmeub.com/icons/png/window-4.png",
  children, 
  onClose, 
  width = 600, 
  height = 400,
  resizable = false,
  maximizable = false,
  minimizable = false 
}) => {
  const [is_dragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [drag_offset, setDragOffset] = useState({ x: 0, y: 0 });
  const [is_maximized, setIsMaximized] = useState(false);
  const [previous_position, setPreviousPosition] = useState({ x: 100, y: 100 });
  const [window_size, setWindowSize] = useState({ width, height });

  const handleMouseDown = (e) => {
    if(e.target.closest('button') || e.target.closest('.window-control')) return;
    if(is_maximized) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if(!is_dragging || is_maximized) return;
    
    setPosition({
      x: e.clientX - drag_offset.x,
      y: e.clientY - drag_offset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMaximize = () => {
    if(is_maximized) {
      setIsMaximized(false);
      setPosition(previous_position);
      setWindowSize({ width, height });
    } else {
      setPreviousPosition(position);
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
      setWindowSize({ 
        width: window.innerWidth - 8, 
        height: window.innerHeight - 40 
      });
    }
  };

  useEffect(() => {
    if(is_dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [is_dragging, drag_offset]);

  return (
    <div 
      className = "window"
      style = {{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${window_size.width}px`,
        height: `${window_size.height}px`,
        zIndex: 10000,
        cursor: is_dragging ? 'grabbing' : 'default',
        maxWidth: is_maximized ? '100vw' : 'none',
        maxHeight: is_maximized ? '100vh' : 'none'
      }}
    >
      {/* Title Bar */}
      <div 
        className = "title-bar"
        onMouseDown = {handleMouseDown}
        style = {{ cursor: is_dragging ? 'grabbing' : 'grab' }}
      >
        <div className = "title-bar-text" style = {{ display: 'flex', alignItems: 'center' }}>
          <img 
            src = {icon}
            alt = "Icon"
            style = {{
              width: '16px',
              height: '16px',
              imageRendering: 'pixelated',
              marginRight: '6px'
            }}
            onError = {(e) => e.target.style.display = 'none'}
          />
          {title}
        </div>
        <div className = "title-bar-controls">
          {minimizable && (
            <button aria-label = "Minimize" onClick = {() => {}}></button>
          )}
          {maximizable && (
            <button 
              aria-label = {is_maximized ? "Restore" : "Maximize"} 
              onClick = {handleMaximize}
            ></button>
          )}
          <button aria-label = "Close" onClick = {onClose}></button>
        </div>
      </div>

      {/* Window Body */}
      <div 
        className = "window-body" 
        style = {{ 
          height: 'calc(100% - 18px)', 
          overflow: 'auto',
          padding: '8px'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Windows98Window;
