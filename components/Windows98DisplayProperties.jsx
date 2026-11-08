"use client";

import { useState, useEffect, useRef } from 'react';
import Windows98Window from './Windows98Window';
import { WIN98_ICONS } from '@/lib/win98-icons';
import { play_sound } from '@/lib/win98-audio';
import {
  WALLPAPERS,
  PATTERNS,
  SCHEMES,
  SCREENSAVERS,
  DEFAULT_DISPLAY,
  get_desktop_background,
  get_scheme
} from '@/lib/win98-display';

const LIST_ITEM_STYLE = {
  padding: '2px 6px',
  cursor: 'default',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const BUTTON_STYLE = { minWidth: '70px', height: '23px', fontSize: '11px' };

const Windows98DisplayProperties = ({
  onClose,
  onFocus,
  onMinimize,
  isMinimized,
  isActive,
  zIndex,
  current_settings = DEFAULT_DISPLAY,
  on_apply,
  on_preview_screensaver
}) => {
  const [active_tab, set_active_tab] = useState('background');
  const [draft, set_draft] = useState(current_settings);
  const mini_canvas_ref = useRef(null);

  const is_dirty = JSON.stringify(draft) !== JSON.stringify(current_settings);
  const scheme = get_scheme(draft.scheme);

  const update_draft = (changes) => {
    play_sound('click');
    set_draft(prev => ({ ...prev, ...changes }));
  };

  // Mini screensaver animation inside CRT monitor
  useEffect(() => {
    if(active_tab !== 'screensaver' || draft.screensaver === 'none') return;

    const canvas = mini_canvas_ref.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    let anim_id;
    const w = (canvas.width = 152);
    const h = (canvas.height = 112);

    if(draft.screensaver === 'starfield')
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
  }, [active_tab, draft.screensaver]);

  const handle_apply = () => {
    play_sound('click');
    if(on_apply) on_apply(draft);
  };

  const handle_ok = () => {
    if(is_dirty && on_apply) on_apply(draft);
    if(onClose) onClose();
  };

  const tab = (id, label) => (
    <li role = "tab" aria-selected = {active_tab === id}>
      <a href = {`#${id}`} onClick = {(e) => { e.preventDefault(); set_active_tab(id); }}>
        {label}
      </a>
    </li>
  );

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
      height = {500}
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
        <menu role = "tablist">
          {tab('background', 'Background')}
          {tab('screensaver', 'Screen Saver')}
          {tab('appearance', 'Appearance')}
        </menu>

        <div className = "window" role = "tabpanel" style = {{ padding: '10px', minHeight: '360px' }}>
          {/* mini CRT monitor preview */}
          <div style = {{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
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
              <div
                data-testid = "display-preview"
                style = {{
                  width: '154px',
                  height: '114px',
                  ...(active_tab === 'screensaver'
                    ? { background: '#000000' }
                    : get_desktop_background(draft.wallpaper, draft.pattern)),
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
                  draft.screensaver !== 'none' ? (
                    <canvas ref = {mini_canvas_ref} style = {{ display: 'block', width: '152px', height: '112px' }} />
                  ) : (
                    <div style = {{ color: '#888888', fontSize: '9px' }}>(None)</div>
                  )
                ) : (
                  <div
                    style = {{
                      width: '110px',
                      height: '75px',
                      background: scheme.face,
                      border: '1px outset #ffffff',
                      boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                      padding: '1px'
                    }}
                  >
                    <div
                      style = {{
                        background: `linear-gradient(90deg, ${scheme.title_a}, ${scheme.title_b})`,
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
                      <div style = {{ marginTop: '4px', background: scheme.highlight, color: '#ffffff', padding: '0 2px' }}>
                        Selected
                      </div>
                    </div>
                  </div>
                )}
              </div>

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

          {active_tab === 'background' && (
            <fieldset>
              <legend>Wallpaper</legend>
              <div style = {{ display: 'flex', gap: '8px' }}>
                <div
                  role = "listbox"
                  aria-label = "Wallpaper"
                  style = {{
                    flex: 1,
                    height: '132px',
                    background: '#ffffff',
                    overflowY: 'auto',
                    border: '2px inset #808080'
                  }}
                >
                  {WALLPAPERS.map((wp) => {
                    const is_selected = draft.wallpaper === wp.color;
                    return (
                      <div
                        key = {wp.id}
                        role = "option"
                        aria-selected = {is_selected}
                        onClick = {() => update_draft({ wallpaper: wp.color })}
                        style = {{
                          ...LIST_ITEM_STYLE,
                          background: is_selected ? '#000080' : 'transparent',
                          color: is_selected ? '#ffffff' : '#000000'
                        }}
                      >
                        <div style = {{ width: '12px', height: '12px', background: wp.color, border: '1px solid #000000' }} />
                        <span>{wp.name}</span>
                      </div>
                    );
                  })}
                </div>

                <div style = {{ width: '100px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    style = {{ height: '23px', fontSize: '11px' }}
                    onClick = {() => update_draft({ wallpaper: DEFAULT_DISPLAY.wallpaper, pattern: DEFAULT_DISPLAY.pattern })}
                  >
                    Default
                  </button>
                  <label htmlFor = "display-pattern" style = {{ fontSize: '11px', marginTop: '6px' }}>Pattern:</label>
                  <select
                    id = "display-pattern"
                    value = {draft.pattern}
                    onChange = {(e) => update_draft({ pattern: e.target.value })}
                    style = {{ fontSize: '11px' }}
                  >
                    {PATTERNS.map((pattern) => (
                      <option key = {pattern.id} value = {pattern.id}>{pattern.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>
          )}

          {active_tab === 'screensaver' && (
            <fieldset>
              <legend>Screen Saver</legend>
              <div style = {{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                <select
                  aria-label = "Screen Saver"
                  value = {draft.screensaver}
                  onChange = {(e) => update_draft({ screensaver: e.target.value })}
                  style = {{ flex: 1, fontSize: '11px', height: '22px' }}
                >
                  {SCREENSAVERS.map((sc) => (
                    <option key = {sc.id} value = {sc.id}>{sc.name}</option>
                  ))}
                </select>

                <button
                  disabled = {draft.screensaver === 'none'}
                  onClick = {() => { if(on_preview_screensaver) on_preview_screensaver(draft.screensaver); }}
                  style = {BUTTON_STYLE}
                >
                  Preview
                </button>
              </div>

              <div style = {{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <label htmlFor = "display-wait">Wait:</label>
                <input
                  id = "display-wait"
                  type = "number"
                  min = "1"
                  max = "60"
                  disabled = {draft.screensaver === 'none'}
                  value = {draft.idle_minutes}
                  onChange = {(e) => set_draft(prev => ({
                    ...prev,
                    idle_minutes: Math.min(60, Math.max(1, parseInt(e.target.value, 10) || 1))
                  }))}
                  style = {{ width: '45px', padding: '2px', fontSize: '11px' }}
                />
                <span>minutes</span>
              </div>
            </fieldset>
          )}

          {active_tab === 'appearance' && (
            <fieldset>
              <legend>Scheme</legend>
              <select
                aria-label = "Scheme"
                value = {draft.scheme}
                onChange = {(e) => update_draft({ scheme: e.target.value })}
                style = {{ width: '100%', fontSize: '11px', height: '22px', marginBottom: '10px' }}
              >
                {SCHEMES.map((item) => (
                  <option key = {item.id} value = {item.id}>{item.name}</option>
                ))}
              </select>
              <div style = {{ fontSize: '11px', color: '#555555' }}>
                Changes window, menu and title bar colors for the whole desktop.
              </div>
            </fieldset>
          )}
        </div>

        <div style = {{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
          <button onClick = {handle_ok} style = {BUTTON_STYLE}>OK</button>
          <button onClick = {onClose} style = {BUTTON_STYLE}>Cancel</button>
          <button onClick = {handle_apply} disabled = {!is_dirty} style = {BUTTON_STYLE}>Apply</button>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Windows98DisplayProperties;
