"use client";

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getWin98Icon } from '@/lib/win98-icons';
import { play_sound } from '@/lib/win98-audio';

const Windows98ContextMenu = ({ x, y, items = [], on_close }) => {
  const menu_ref = useRef(null);

  useEffect(() => {
    const handle_click_outside = (e) => {
      if(menu_ref.current && !menu_ref.current.contains(e.target))
      {
        if(on_close) on_close();
      }
    };
    const handle_key = (e) => {
      if(e.key === 'Escape')
      {
        if(on_close) on_close();
      }
    };

    window.addEventListener('mousedown', handle_click_outside);
    window.addEventListener('keydown', handle_key);

    return () => {
      window.removeEventListener('mousedown', handle_click_outside);
      window.removeEventListener('keydown', handle_key);
    };
  }, [on_close]);

  const [position, set_position] = useState({ x, y });

  // measure the real menu, then open it up/left of the pointer when it would leave the screen, like Win98
  useLayoutEffect(() => {
    const menu = menu_ref.current;
    if(!menu) return;

    const { width, height } = menu.getBoundingClientRect();
    const flip_x = x + width > window.innerWidth ? x - width : x;
    const flip_y = y + height > window.innerHeight ? y - height : y;
    set_position({
      x: Math.max(0, Math.min(flip_x, window.innerWidth - width)),
      y: Math.max(0, Math.min(flip_y, window.innerHeight - height))
    });
  }, [x, y, items.length]);

  return (
    <div 
      ref = {menu_ref}
      className = "win98-context-menu"
      style = {{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      onClick = {(e) => e.stopPropagation()}
      onContextMenu = {(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      {items.map((item, idx) => {
        if(item.is_separator)
        {
          return <div key = {`sep-${idx}`} className = "win98-context-menu-separator" />;
        }

        const handle_item_click = (e) => {
          e.stopPropagation();
          if(item.disabled) return;
          play_sound('click');
          if(item.action) item.action();
          if(on_close) on_close();
        };

        return (
          <div
            key = {`item-${idx}`}
            className = {`win98-context-menu-item ${item.disabled ? 'disabled' : ''}`}
            onClick = {handle_item_click}
          >
            <div style = {{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {item.icon ? (
                <Image 
                  src = {getWin98Icon(item.icon)} 
                  width = {16} 
                  height = {16} 
                  alt = "" 
                  unoptimized 
                  style = {{ imageRendering: 'pixelated', flexShrink: 0 }} 
                />
              ) : (
                <div style = {{ width: 16, height: 16 }} />
              )}
              <span>{item.label}</span>
            </div>
            {item.shortcut && (
              <span style = {{ marginLeft: '16px', fontSize: '10px', opacity: 0.8 }}>
                {item.shortcut}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Windows98ContextMenu;
