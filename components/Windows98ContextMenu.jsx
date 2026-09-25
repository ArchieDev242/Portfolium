"use client";

import { useEffect, useRef } from 'react';
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

  const win_w = typeof window !== 'undefined' ? window.innerWidth : 800;
  const win_h = typeof window !== 'undefined' ? window.innerHeight : 600;
  const adjusted_x = Math.max(0, Math.min(x, win_w - 180));
  const adjusted_y = Math.max(0, Math.min(y, win_h - items.length * 24 - 15));

  return (
    <div 
      ref = {menu_ref}
      className = "win98-context-menu"
      style = {{
        left: `${adjusted_x}px`,
        top: `${adjusted_y}px`
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
