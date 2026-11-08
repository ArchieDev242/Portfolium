"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getWin98Icon, WIN98_ICONS } from '@/lib/win98-icons';
import { play_sound } from '@/lib/win98-audio';
import { is_mobile_screen, useIsMobile } from '@/lib/win98-mobile';

const CASCADE_START = 100;
const CASCADE_STEP = 24;
const CASCADE_STEPS = 8;
const TASKBAR_HEIGHT = 30;

// each new window opens a step down-right from the last one, like real Win98
let cascade_index = 0;

const next_cascade_position = (width, height) => {
  const offset = CASCADE_START + (cascade_index % CASCADE_STEPS) * CASCADE_STEP;
  cascade_index += 1;

  if(typeof window === 'undefined') return { x: offset, y: offset };

  return {
    x: Math.max(0, Math.min(offset, window.innerWidth - width)),
    y: Math.max(0, Math.min(offset, window.innerHeight - TASKBAR_HEIGHT - height))
  };
};

const Windows98Window = ({
  title = "Windows 98 Application", 
  icon = WIN98_ICONS.default_window,
  children, 
  onClose, 
  onFocus,
  onMinimize,
  isMinimized = false,
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
  const [is_dragging, set_is_dragging] = useState(false);
  const [drag_ghost, set_drag_ghost] = useState(null);
  const [position, set_position] = useState(() => next_cascade_position(width, height));
  const [drag_offset, set_drag_offset] = useState({ x: 0, y: 0 });
  const [is_maximized, set_is_maximized] = useState(false);
  const [previous_position, set_previous_position] = useState({ x: 100, y: 100 });
  const [window_size, set_window_size] = useState({ width, height });
  const is_mobile = useIsMobile();
  const is_full = is_maximized || is_mobile;

  const handle_mouse_down = (e) => {
    if(e.target.closest('button') || e.target.closest('.window-control')) return;
    if(is_full) return;
    
    if(onFocus) onFocus();
    
    const offset_x = e.clientX - position.x;
    const offset_y = e.clientY - position.y;

    set_is_dragging(true);
    set_drag_offset({ x: offset_x, y: offset_y });
    set_drag_ghost({ x: position.x, y: position.y });
    play_sound('click');
  };

  const handle_maximize = () => {
    play_sound('click');
    if(is_maximized) 
    {
      set_is_maximized(false);
      set_position(previous_position);
      set_window_size({ width, height });
    } else 
    {
      set_previous_position(position);
      set_is_maximized(true);
      set_position({ x: 0, y: 0 });
      set_window_size({
        width: window.innerWidth,
        height: window.innerHeight - TASKBAR_HEIGHT
      });
    }
  };

  // fit the window into the screen on open and on every browser resize
  useEffect(() => {
    const fit_to_screen = () => {
      const max_height = window.innerHeight - TASKBAR_HEIGHT;

      // phones always show windows full screen
      if(is_maximized || is_mobile_screen())
      {
        set_window_size({ width: window.innerWidth, height: max_height });
        return;
      }

      const fit_width = Math.min(width, window.innerWidth);
      const fit_height = Math.min(height, max_height);
      set_window_size({ width: fit_width, height: fit_height });
      set_position(prev => ({
        x: Math.max(0, Math.min(prev.x, window.innerWidth - fit_width)),
        y: Math.max(0, Math.min(prev.y, max_height - fit_height))
      }));
    };

    fit_to_screen();
    window.addEventListener('resize', fit_to_screen);
    return () => window.removeEventListener('resize', fit_to_screen);
  }, [is_maximized, is_mobile, width, height]);

  const handle_minimize = () => {
    play_sound('click');
    if(onMinimize) onMinimize();
  };

  const handle_close = () => {
    play_sound('close');
    if(onClose) onClose();
  };

  useEffect(() => {
    if(!is_dragging) return;

    const handle_mouse_move = (e) => {
      if(is_maximized) return;

      const new_x = e.clientX - drag_offset.x;
      const new_y = e.clientY - drag_offset.y;

      const max_x = window.innerWidth - 200;
      const max_y = window.innerHeight - 100;

      const bounded_x = Math.max(-width + 200, Math.min(new_x, max_x));
      const bounded_y = Math.max(0, Math.min(new_y, max_y));

      set_drag_ghost({ x: bounded_x, y: bounded_y });
    };

    const handle_mouse_up = () => {
      if(drag_ghost)
      {
        set_position({ x: drag_ghost.x, y: drag_ghost.y });
        set_drag_ghost(null);
      }
      set_is_dragging(false);
    };

    document.addEventListener('mousemove', handle_mouse_move);
    document.addEventListener('mouseup', handle_mouse_up);

    return () => {
      document.removeEventListener('mousemove', handle_mouse_move);
      document.removeEventListener('mouseup', handle_mouse_up);
    };
  }, [is_dragging, is_maximized, drag_offset, drag_ghost, width]);

  if(isMinimized) return null;

  return (
    <>
      {/* Authentic Wireframe Dotted Drag Bounding Box */}
      {is_dragging && drag_ghost && (
        <div 
          className = "win98-window-wireframe"
          style = {{
            left: `${drag_ghost.x}px`,
            top: `${drag_ghost.y}px`,
            width: `${window_size.width}px`,
            height: `${window_size.height}px`
          }}
        />
      )}

      <div 
        className = "window"
        style = {{
          color: '#000000',
          position: 'fixed',
          left: is_full ? 0 : `${position.x}px`,
          top: is_full ? 0 : `${position.y}px`,
          width: `${window_size.width}px`,
          height: `${window_size.height}px`,
          zIndex: zIndex,
          display: 'flex',
          flexDirection: 'column',
          cursor: is_dragging ? 'grabbing' : 'default',
          maxWidth: is_maximized ? '100vw' : 'none',
          maxHeight: is_maximized ? '100vh' : 'none'
        }}
        onClick = {(e) => {
          e.stopPropagation();
          if(onFocus) onFocus();
        }}
      >
        {/* Title Bar — inactive class when unfocused per 98.css */}
        <div 
          className = {`title-bar ${isActive ? '' : 'inactive'}`}
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
              <Image 
                src = {getWin98Icon(WIN98_ICONS.default_window)} 
                alt = "" 
                width = {16} 
                height = {16} 
                unoptimized 
                style = {{ imageRendering: 'pixelated', flexShrink: 0 }} 
              />
            )}
            {title}
          </div>
          <div className = "title-bar-controls">
            {minimizable && (
              <button 
                aria-label = "Minimize" 
                className = "minimize" 
                onClick = {handle_minimize} 
              />
            )}
            {maximizable && !is_mobile && (
              <button 
                aria-label = {is_maximized ? "Restore" : "Maximize"} 
                className = {is_maximized ? "restore" : "maximize"} 
                onClick = {handle_maximize} 
              />
            )}
            <button 
              aria-label = "Close" 
              className = "close" 
              onClick = {handle_close} 
            />
          </div>
        </div>

        {/* Window Body */}
        <div 
          className = "window-body" 
          style = {{
            flex: 1,
            minHeight: 0,
            overflow: 'auto',
            padding: '8px'
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Windows98Window;
