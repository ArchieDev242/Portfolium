"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getWin98Icon, WIN98_ICONS } from '@/lib/win98-icons';
import { play_sound } from '@/lib/win98-audio';

const Windows98RunDialog = ({ on_close, on_run }) => {
  const [command, set_command] = useState('notepad');
  const input_ref = useRef(null);

  useEffect(() => {
    if(input_ref.current)
    {
      input_ref.current.focus();
      input_ref.current.select();
    }
  }, []);

  const handle_submit = (e) => {
    e.preventDefault();
    if(!command || !command.trim()) return;

    play_sound('open');
    if(on_run) on_run(command.trim());
    if(on_close) on_close();
  };

  return (
    <div
      style = {{
        position: 'fixed',
        inset: 0,
        zIndex: 10010,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.2)'
      }}
      onClick = {on_close}
    >
      <div
        className = "window"
        style = {{
          width: '380px',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.5)',
          color: '#000000'
        }}
        onClick = {(e) => e.stopPropagation()}
      >
        <div className = "title-bar">
          <div className = "title-bar-text" style = {{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Image
              src = {getWin98Icon(WIN98_ICONS.executable)}
              alt = ""
              width = {16}
              height = {16}
              unoptimized
              style = {{ imageRendering: 'pixelated' }}
            />
            Run
          </div>
          <div className = "title-bar-controls">
            <button aria-label = "Close" className = "close" onClick = {on_close} />
          </div>
        </div>

        <form onSubmit = {handle_submit} className = "window-body" style = {{ padding: '14px 16px' }}>
          <div style = {{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '14px' }}>
            <Image
              src = {getWin98Icon(WIN98_ICONS.executable)}
              alt = ""
              width = {32}
              height = {32}
              unoptimized
              style = {{ imageRendering: 'pixelated', flexShrink: 0 }}
            />
            <div style = {{ fontSize: '11px', lineHeight: '1.4', color: '#000000' }}>
              Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
            </div>
          </div>

          <div style = {{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <label htmlFor = "run-command-input" style = {{ fontSize: '11px', fontWeight: 'bold' }}>
              Open:
            </label>
            <input
              ref = {input_ref}
              id = "run-command-input"
              type = "text"
              value = {command}
              onChange = {(e) => set_command(e.target.value)}
              style = {{
                flex: 1,
                padding: '3px 6px',
                fontSize: '11px',
                background: '#ffffff',
                color: '#000000',
                border: '2px inset #808080'
              }}
            />
          </div>

          <div style = {{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button type = "submit" style = {{ minWidth: '70px', height: '23px', fontSize: '11px' }}>
              OK
            </button>
            <button type = "button" onClick = {on_close} style = {{ minWidth: '70px', height: '23px', fontSize: '11px' }}>
              Cancel
            </button>
            <button
              type = "button"
              onClick = {() => set_command('cmd')}
              style = {{ minWidth: '70px', height: '23px', fontSize: '11px' }}
            >
              Browse...
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Windows98RunDialog;
