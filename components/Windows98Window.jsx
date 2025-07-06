"use client";

import { useState, useEffect } from 'react';

const Windows98Window = ({ 
  title = "Windows 98 Application", 
  icon = "https://win98icons.alexmeub.com/icons/png/window-4.png",
  children, 
  onClose, 
  onFocus,
  isActive = false,
  zIndex = 1000,
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

  const handle_mouse_down = (e) => {
    if(e.target.closest('button') || e.target.closest('.window-control')) return;
    if(is_maximized) return;
    
    if(onFocus) onFocus();
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handle_mouse_move = (e) => {
    if(!is_dragging || is_maximized) return;
    
    const newX = e.clientX - drag_offset.x;
    const newY = e.clientY - drag_offset.y;
    
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;
    
    const bounded_x = Math.max(-width + 200, Math.min(newX, maxX));
    const bounded_y = Math.max(0, Math.min(newY, maxY));
    
    setPosition({ x: bounded_x, y: bounded_y });
  };

  const handle_mouse_up = () => {
    setIsDragging(false);
  };

  const handle_maximize = () => {
    if(is_maximized) 
      {
      setIsMaximized(false);
      setPosition(previous_position);
      setWindowSize({ width, height });
    } else 
    {
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
    if(is_dragging) 
      {
      document.addEventListener('mousemove', handle_mouse_move);
      document.addEventListener('mouseup', handle_mouse_up);
      
      return () => {
        document.removeEventListener('mousemove', handle_mouse_move);
        document.removeEventListener('mouseup', handle_mouse_up);
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
        zIndex: zIndex,
        cursor: is_dragging ? 'grabbing' : 'default',
        maxWidth: is_maximized ? '100vw' : 'none',
        maxHeight: is_maximized ? '100vh' : 'none'
      }}
      onClick = {(e) => {
        e.stopPropagation();
        if(onFocus) onFocus();
      }}
    >
      {/* Title Bar */}
      <div 
        className = "title-bar"
        onMouseDown = {handle_mouse_down}
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
              onClick = {handle_maximize}
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
