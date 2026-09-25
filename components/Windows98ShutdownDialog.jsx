"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getWin98Icon, WIN98_ICONS } from '@/lib/win98-icons';
import { play_sound } from '@/lib/win98-audio';

const Windows98ShutdownDialog = ({ on_close, on_restart, on_dos, on_exit_mode }) => {
  const [selected_action, set_selected_action] = useState('shutdown');
  const [is_shut_down, set_is_shut_down] = useState(false);

  useEffect(() => {
    if(!is_shut_down) return;

    const handle_wake = () => {
      set_is_shut_down(false);
      if(on_restart) on_restart();
    };

    window.addEventListener('mousedown', handle_wake);
    window.addEventListener('keydown', handle_wake);

    return () => {
      window.removeEventListener('mousedown', handle_wake);
      window.removeEventListener('keydown', handle_wake);
    };
  }, [is_shut_down, on_restart]);

  const handle_confirm = (e) => {
    e.preventDefault();
    play_sound('click');

    if(selected_action === 'shutdown')
    {
      set_is_shut_down(true);
    } else if(selected_action === 'restart')
    {
      if(on_restart) on_restart();
      if(on_close) on_close();
    } else if(selected_action === 'dos')
    {
      if(on_dos) on_dos();
      if(on_close) on_close();
    }
  };

  if(is_shut_down)
  {
    return (
      <div
        style = {{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <div
          style = {{
            color: '#ff8c00',
            fontFamily: '"Fixedsys Excelsior", "Pixelated MS Sans Serif", monospace',
            fontSize: '32px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textShadow: '0 0 10px rgba(255, 140, 0, 0.6)',
            marginBottom: '20px'
          }}
        >
          It&apos;s now safe to turn off your computer.
        </div>
        <div
          style = {{
            color: '#888888',
            fontFamily: '"Pixelated MS Sans Serif", Tahoma, sans-serif',
            fontSize: '13px'
          }}
        >
          Click anywhere or press any key to restart Windows 98
        </div>
      </div>
    );
  }

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
          width: '360px',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.5)',
          color: '#000000'
        }}
        onClick = {(e) => e.stopPropagation()}
      >
        <div className = "title-bar">
          <div className = "title-bar-text" style = {{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Image
              src = {getWin98Icon(WIN98_ICONS.computer)}
              alt = ""
              width = {16}
              height = {16}
              unoptimized
              style = {{ imageRendering: 'pixelated' }}
            />
            Shut Down Windows
          </div>
          <div className = "title-bar-controls">
            <button aria-label = "Close" className = "close" onClick = {on_close} />
          </div>
        </div>

        <form onSubmit = {handle_confirm} className = "window-body" style = {{ padding: '14px 16px' }}>
          <div style = {{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '14px' }}>
            <Image
              src = {getWin98Icon(WIN98_ICONS.computer)}
              alt = ""
              width = {32}
              height = {32}
              unoptimized
              style = {{ imageRendering: 'pixelated', flexShrink: 0 }}
            />
            <div style = {{ fontSize: '11px', color: '#000000', lineHeight: '1.4' }}>
              <div style = {{ fontWeight: 'bold', marginBottom: '6px' }}>
                What do you want the computer to do?
              </div>
              <div style = {{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style = {{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type = "radio"
                    name = "shutdown-action"
                    value = "shutdown"
                    checked = {selected_action === 'shutdown'}
                    onChange = {(e) => set_selected_action(e.target.value)}
                  />
                  Shut down
                </label>
                <label style = {{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type = "radio"
                    name = "shutdown-action"
                    value = "restart"
                    checked = {selected_action === 'restart'}
                    onChange = {(e) => set_selected_action(e.target.value)}
                  />
                  Restart
                </label>
                <label style = {{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type = "radio"
                    name = "shutdown-action"
                    value = "dos"
                    checked = {selected_action === 'dos'}
                    onChange = {(e) => set_selected_action(e.target.value)}
                  />
                  Restart in MS-DOS mode
                </label>
              </div>
            </div>
          </div>

          <div style = {{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '14px' }}>
            <button type = "submit" style = {{ minWidth: '70px', height: '23px', fontSize: '11px' }}>
              OK
            </button>
            <button type = "button" onClick = {on_close} style = {{ minWidth: '70px', height: '23px', fontSize: '11px' }}>
              Cancel
            </button>
            <button type = "button" onClick = {on_exit_mode} style = {{ minWidth: '70px', height: '23px', fontSize: '11px' }}>
              Exit 98
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Windows98ShutdownDialog;
