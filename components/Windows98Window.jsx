"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getWin98Icon, WIN98_ICONS } from '@/lib/win98-icons';

const Windows98Window = ({ 
  title = "Windows 98 Application", 
  icon = WIN98_ICONS.default_window,
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
  const [icon_error, set_icon_error] = useState(false);
  const icon_src = typeof icon === 'string' && (icon.startsWith('data:') || icon.startsWith('http')) ? icon : getWin98Icon(icon);
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
    
    const new_x = e.clientX - drag_offset.x;
    const new_y = e.clientY - drag_offset.y;
    
    const max_x = window.innerWidth - 200;
    const max_y = window.innerHeight - 100;
    
    const bounded_x = Math.max(-width + 200, Math.min(new_x, max_x));
    const bounded_y = Math.max(0, Math.min(new_y, max_y));
    
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
        <div className = "title-bar-text" style = {{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {!icon_error ? (
            <Image 
              src = {icon_src}
              alt = ""
              width = {16}
              height = {16}
              unoptimized
              style = {{ imageRendering: 'pixelated', flexShrink: 0 }}
              onError = {() => set_icon_error(true)}
            />
          ) : (
            <span style = {{ marginRight: '2px' }}>{title.includes('Resume') ? '📄' : title.includes('Projects') ? '📁' : title.includes('Contact') ? '📧' : '💼'}</span>
          )}
          {title}
        </div>
        <div className = "title-bar-controls">
          {minimizable && <button aria-label = "Minimize" className = "minimize" onClick = {() => {}} />}
          {maximizable && <button aria-label = {is_maximized ? "Restore" : "Maximize"} className = {is_maximized ? "restore" : "maximize"} onClick = {handle_maximize} />}
          <button aria-label = "Close" className = "close" onClick = {onClose} />
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
