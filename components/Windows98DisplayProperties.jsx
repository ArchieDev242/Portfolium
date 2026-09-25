"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Windows98Window from './Windows98Window';
import { getWin98Icon, WIN98_ICONS } from '@/lib/win98-icons';
import { play_sound } from '@/lib/win98-audio';

const WALLPAPERS = [
  { id: 'teal', name: 'Windows 98 Teal', color: '#008080' },
  { id: 'navy', name: 'Setup 98 Navy', color: '#000080' },
  { id: 'forest', name: 'Forest Green', color: '#228B22' },
  { id: 'ocean', name: 'Ocean Blue', color: '#006994' },
  { id: 'sunset', name: 'Sunset Orange', color: '#FF6347' },
  { id: 'matrix', name: 'Matrix Black', color: '#000000' },
  { id: 'cyber', name: 'Cyberpunk Violet', color: '#1a0033' }
];

const SCREENSAVERS = [
  { id: 'mystify', name: 'Mystify Your Mind' },
  { id: 'starfield', name: '3D Flying Windows / Starfield' },
  { id: 'none', name: '(None)' }
];

const Windows98DisplayProperties = ({
  onClose,
  onFocus,
  onMinimize,
  isMinimized,
  isActive,
  zIndex,
  current_wallpaper = '#008080',
  on_apply_wallpaper,
  current_screensaver = 'mystify',
  on_apply_screensaver,
  on_preview_screensaver
}) => {
  const [active_tab, set_active_tab] = useState('background');
  const [selected_wallpaper, set_selected_wallpaper] = useState(current_wallpaper);
  const [selected_screensaver, set_selected_screensaver] = useState(current_screensaver);
  const [idle_minutes, set_idle_minutes] = useState(2);
  const mini_canvas_ref = useRef(null);

  // Mini screensaver animation inside CRT monitor
  useEffect(() => {
    if(active_tab !== 'screensaver' || selected_screensaver === 'none') return;

    const canvas = mini_canvas_ref.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    let anim_id;
    const w = (canvas.width = 152);
    const h = (canvas.height = 112);

    if(selected_screensaver === 'starfield')
    {
      const stars = Array.from({ length: 40 }, () => ({
        x: (Math.random() - 0.5) * w,
        y: (Math.random() - 0.5) * h,
        z: Math.random() * w
      }));

      const loop = () => {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);
        const cx = w / 2;
        const cy = h / 2;

        for(let i = 0; i < stars.length; i++)
        {
          const s = stars[i];
          s.z -= 2;
          if(s.z <= 0)
          {
            s.z = w;
            s.x = (Math.random() - 0.5) * w;
            s.y = (Math.random() - 0.5) * h;
          }
          const k = 60 / s.z;
          const px = s.x * k + cx;
          const py = s.y * k + cy;
          if(px >= 0 && px < w && py >= 0 && py < h)
          {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(px, py, 1.5, 1.5);
          }
        }
        anim_id = requestAnimationFrame(loop);
      };
      anim_id = requestAnimationFrame(loop);
    } else 
    {
      // Mini Mystify
      let pt1 = { x: 20, y: 30, dx: 1.5, dy: 1.2 };
      let pt2 = { x: 120, y: 80, dx: -1.2, dy: 1.5 };
      let pt3 = { x: 60, y: 100, dx: 1.1, dy: -1.4 };
      let hue = 180;

      const loop = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, w, h);

        hue = (hue + 1) % 360;

        [pt1, pt2, pt3].forEach((p) => {
          p.x += p.dx;
          p.y += p.dy;
          if(p.x <= 0 || p.x >= w) p.dx = -p.dx;
          if(p.y <= 0 || p.y >= h) p.dy = -p.dy;
        });

        ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.lineTo(pt3.x, pt3.y);
        ctx.closePath();
        ctx.stroke();

        anim_id = requestAnimationFrame(loop);
      };
      anim_id = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(anim_id);
  }, [active_tab, selected_screensaver]);

  const handle_apply = () => {
    play_sound('click');
    if(on_apply_wallpaper) on_apply_wallpaper(selected_wallpaper);
    if(on_apply_screensaver) on_apply_screensaver(selected_screensaver);
  };

  const handle_ok = () => {
    handle_apply();
    if(onClose) onClose();
  };

  return (
    <Windows98Window
      title = "Display Properties"
      icon = {WIN98_ICONS.monitor}
      onClose = {onClose}
      onFocus = {onFocus}
      onMinimize = {onMinimize}
      isMinimized = {isMinimized}
      isActive = {isActive}
      zIndex = {zIndex}
      width = {410}
      height = {475}
      resizable = {false}
      maximizable = {false}
      minimizable = {true}
    >
      <div 
        style = {{ 
          padding: '4px',
          fontFamily: '"Pixelated MS Sans Serif", Arial, sans-serif',
          fontSize: '11px',
          color: '#000000',
          userSelect: 'none'
        }}
      >
        {/* Tabs */}
        <menu role = "tablist">
          <li role = "tab" aria-selected = {active_tab === 'background'}>
            <a href = "#background" onClick = {(e) => { e.preventDefault(); set_active_tab('background'); }}>
              Background
            </a>
          </li>
          <li role = "tab" aria-selected = {active_tab === 'screensaver'}>
            <a href = "#screensaver" onClick = {(e) => { e.preventDefault(); set_active_tab('screensaver'); }}>
              Screen Saver
            </a>
          </li>
          <li role = "tab" aria-selected = {active_tab === 'appearance'}>
            <a href = "#appearance" onClick = {(e) => { e.preventDefault(); set_active_tab('appearance'); }}>
              Appearance
            </a>
          </li>
        </menu>

        <div className = "window" role = "tabpanel" style = {{ padding: '10px', minHeight: '340px' }}>
          {/* Authentic Mini CRT Monitor Preview Box */}
          <div style = {{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            <div 
              style = {{
                width: '184px',
                height: '144px',
                background: '#d4d0c8',
                border: '3px outset #ffffff',
                borderRadius: '6px',
                padding: '10px 12px 14px 12px',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              {/* Inner CRT Glass Screen */}
              <div 
                style = {{
                  width: '154px',
                  height: '114px',
                  background: active_tab === 'screensaver' ? '#000000' : selected_wallpaper,
                  border: '2px inset #000000',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {active_tab === 'screensaver' ? (
                  selected_screensaver !== 'none' ? (
                    <canvas ref = {mini_canvas_ref} style = {{ display: 'block', width: '152px', height: '112px' }} />
                  ) : (
                    <div style = {{ color: '#888888', fontSize: '9px' }}>(None)</div>
                  )
                ) : (
                  /* Mini Window Preview on Desktop */
                  <div 
                    style = {{
                      width: '110px',
                      height: '75px',
                      background: '#c0c0c0',
                      border: '1px outset #ffffff',
                      boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                      padding: '1px'
                    }}
                  >
                    <div 
                      style = {{
                        background: 'linear-gradient(90deg, #000080, #1084d0)',
                        color: '#ffffff',
                        fontSize: '7px',
                        fontWeight: 'bold',
                        padding: '1px 2px',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>Active Window</span>
                      <span>✕</span>
                    </div>
                    <div style = {{ padding: '4px', fontSize: '7px', color: '#000000' }}>
                      Window Text
                    </div>
                  </div>
                )}
              </div>

              {/* Monitor Stand */}
              <div 
                style = {{
                  position: 'absolute',
                  bottom: '-12px',
                  width: '60px',
                  height: '10px',
                  background: '#c0c0c0',
                  border: '2px outset #ffffff',
                  borderRadius: '2px'
                }}
              />
            </div>
          </div>

          {/* Tab 1: Background */}
          {active_tab === 'background' && (
            <div>
              <fieldset>
                <legend>Wallpaper</legend>
                <div style = {{ display: 'flex', gap: '8px' }}>
                  <div 
                    className = "sunken-panel"
                    style = {{
                      flex: 1,
                      height: '110px',
                      background: '#ffffff',
                      overflowY: 'auto',
                      border: '2px inset #808080'
                    }}
                  >
                    {WALLPAPERS.map((wp) => (
                      <div
                        key = {wp.id}
                        onClick = {() => { play_sound('click'); set_selected_wallpaper(wp.color); }}
                        style = {{
                          padding: '2px 6px',
                          cursor: 'pointer',
                          background: selected_wallpaper === wp.color ? '#000080' : 'transparent',
                          color: selected_wallpaper === wp.color ? '#ffffff' : '#000000',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <div style = {{ width: '12px', height: '12px', background: wp.color, border: '1px solid #000000' }} />
                        <span>{wp.name}</span>
                      </div>
                    ))}
                  </div>

                  <div style = {{ width: '100px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <button style = {{ height: '23px', fontSize: '11px' }} onClick = {() => set_selected_wallpaper('#008080')}>
                      Default
                    </button>
                    <div style = {{ fontSize: '10px', marginTop: '6px' }}>Display:</div>
                    <select style = {{ fontSize: '11px' }}>
                      <option>Stretch</option>
                      <option>Tile</option>
                      <option>Center</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </div>
          )}

          {/* Tab 2: Screen Saver */}
          {active_tab === 'screensaver' && (
            <div>
              <fieldset>
                <legend>Screen Saver</legend>
                <div style = {{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                  <select 
                    value = {selected_screensaver}
                    onChange = {(e) => { play_sound('click'); set_selected_screensaver(e.target.value); }}
                    style = {{ flex: 1, fontSize: '11px', height: '22px' }}
                  >
                    {SCREENSAVERS.map((sc) => (
                      <option key = {sc.id} value = {sc.id}>{sc.name}</option>
                    ))}
                  </select>

                  <button 
                    onClick = {() => { if(on_preview_screensaver) on_preview_screensaver(); }}
                    style = {{ minWidth: '70px', height: '23px', fontSize: '11px' }}
                  >
                    Preview
                  </button>
                </div>

                <div style = {{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Wait:</span>
                  <input 
                    type = "number" 
                    min = "1" 
                    max = "60" 
                    value = {idle_minutes} 
                    onChange = {(e) => set_idle_minutes(parseInt(e.target.value, 10) || 1)}
                    style = {{ width: '45px', padding: '2px', fontSize: '11px' }} 
                  />
                  <span>minutes</span>
                </div>
              </fieldset>
            </div>
          )}

          {/* Tab 3: Appearance */}
          {active_tab === 'appearance' && (
            <div>
              <fieldset>
                <legend>Scheme</legend>
                <div style = {{ marginBottom: '10px' }}>
                  <select style = {{ width: '100%', fontSize: '11px', height: '22px' }}>
                    <option>Windows Standard</option>
                    <option>Windows Classic</option>
                    <option>High Contrast Black</option>
                    <option>Wheat</option>
                    <option>Rainy Day</option>
                    <option>Rose</option>
                  </select>
                </div>
                <div style = {{ fontSize: '11px', color: '#555555' }}>
                  Classic 3D color gradients, scrollbars, and window borders matching authentic Win98 specifications.
                </div>
              </fieldset>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style = {{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
          <button onClick = {handle_ok} style = {{ minWidth: '70px', height: '23px', fontSize: '11px' }}>
            OK
          </button>
          <button onClick = {onClose} style = {{ minWidth: '70px', height: '23px', fontSize: '11px' }}>
            Cancel
          </button>
          <button onClick = {handle_apply} style = {{ minWidth: '70px', height: '23px', fontSize: '11px' }}>
            Apply
          </button>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Windows98DisplayProperties;
