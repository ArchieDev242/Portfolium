"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { getWin98Icon, WIN98_ICONS } from '@/lib/win98-icons';
import { play_sound } from '@/lib/win98-audio';

// one host is mounted by Windows98Home; any Win98 component can open a dialog through the helpers below
let host_set_dialog = null;

const native_fallback = (options) => {
  if(options.kind === 'prompt') return window.prompt(options.message, options.default_value || '');
  if(options.buttons.length > 1) return window.confirm(options.message) ? options.buttons[0].value : options.cancel_value;
  window.alert(options.message);
  return options.buttons[0].value;
};

export const show_win98_dialog = (options) => {
  const dialog = {
    title: 'Windows',
    icon: 'info',
    kind: 'message',
    buttons: [{ label: 'OK', value: true }],
    cancel_value: null,
    ...options
  };

  if(!host_set_dialog) return Promise.resolve(native_fallback(dialog));

  return new Promise((resolve) => {
    host_set_dialog((prev) => {
      if(prev) prev.resolve(prev.cancel_value);
      return { ...dialog, resolve };
    });
  });
};

export const show_win98_alert = (message, options = {}) => show_win98_dialog({ ...options, message });

export const show_win98_confirm = (message, options = {}) => show_win98_dialog({
  icon: 'question',
  buttons: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
  cancel_value: false,
  ...options,
  message
});

export const show_win98_prompt = (message, default_value = '', options = {}) => show_win98_dialog({
  icon: 'none',
  kind: 'prompt',
  buttons: [{ label: 'OK', value: 'ok' }, { label: 'Cancel', value: null }],
  ...options,
  message,
  default_value
});

const DialogIcon = ({ icon }) => {
  if(icon === 'none') return null;

  if(icon === 'info')
  {
    return (
      <Image
        src = {getWin98Icon(WIN98_ICONS.msg_info)}
        alt = ""
        width = {32}
        height = {32}
        unoptimized
        style = {{ imageRendering: 'pixelated', flexShrink: 0 }}
      />
    );
  }

  return (
    <svg
      width = "32"
      height = "32"
      viewBox = "0 0 32 32"
      shapeRendering = "crispEdges"
      style = {{ flexShrink: 0 }}
      aria-hidden = "true"
    >
      {icon === 'error' && (
        <>
          <circle cx = "16" cy = "16" r = "14" fill = "#ff0000" stroke = "#800000" strokeWidth = "2" />
          <path d = "M10 10 L22 22 M22 10 L10 22" stroke = "#ffffff" strokeWidth = "4" />
        </>
      )}
      {icon === 'warning' && (
        <>
          <path d = "M16 2 L31 29 L1 29 Z" fill = "#ffff00" stroke = "#000000" strokeWidth = "2" />
          <rect x = "14" y = "10" width = "4" height = "11" fill = "#000000" />
          <rect x = "14" y = "23" width = "4" height = "3" fill = "#000000" />
        </>
      )}
      {icon === 'question' && (
        <>
          <circle cx = "16" cy = "15" r = "13" fill = "#ffffff" stroke = "#000000" strokeWidth = "2" />
          <text
            x = "16"
            y = "22"
            textAnchor = "middle"
            fontSize = "20"
            fontWeight = "bold"
            fontFamily = "Arial, sans-serif"
            fill = "#000080"
          >
            ?
          </text>
        </>
      )}
    </svg>
  );
};

const Windows98DialogHost = () => {
  const [dialog, set_dialog] = useState(null);
  const [input_value, set_input_value] = useState('');
  const input_ref = useRef(null);
  const first_button_ref = useRef(null);

  useEffect(() => {
    host_set_dialog = set_dialog;
    return () => {
      host_set_dialog = null;
    };
  }, []);

  useEffect(() => {
    if(!dialog) return;

    set_input_value(dialog.default_value || '');
    play_sound(dialog.kind === 'prompt' ? 'open' : 'chord');

    const focus_timer = setTimeout(() => {
      if(input_ref.current)
      {
        input_ref.current.focus();
        input_ref.current.select();
      } else if(first_button_ref.current)
      {
        first_button_ref.current.focus();
      }
    }, 0);

    return () => clearTimeout(focus_timer);
  }, [dialog]);

  useEffect(() => {
    if(!dialog) return;

    const handle_escape = (e) => {
      if(e.key !== 'Escape') return;
      e.preventDefault();
      e.stopPropagation();
      dialog.resolve(dialog.cancel_value);
      set_dialog(null);
    };

    window.addEventListener('keydown', handle_escape, true);
    return () => window.removeEventListener('keydown', handle_escape, true);
  }, [dialog]);

  if(!dialog) return null;

  const close_with = (value) => {
    dialog.resolve(value);
    set_dialog(null);
  };

  const resolve_button = (button) => {
    if(dialog.kind === 'prompt') close_with(button.value === null ? null : input_value);
    else close_with(button.value);
  };

  const handle_submit = (e) => {
    e.preventDefault();
    resolve_button(dialog.buttons[0]);
  };

  return (
    <div
      style = {{
        position: 'fixed',
        inset: 0,
        zIndex: 10030,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.15)'
      }}
      onMouseDown = {(e) => e.stopPropagation()}
      onContextMenu = {(e) => e.preventDefault()}
    >
      <div
        className = "window"
        role = "dialog"
        aria-modal = "true"
        aria-label = {dialog.title}
        style = {{
          minWidth: 'min(280px, calc(100vw - 16px))',
          maxWidth: 'min(420px, calc(100vw - 16px))',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.5)',
          color: '#000000'
        }}
      >
        <div className = "title-bar">
          <div className = "title-bar-text">{dialog.title}</div>
          <div className = "title-bar-controls">
            <button
              aria-label = "Close"
              className = "close"
              onClick = {() => close_with(dialog.cancel_value)}
            />
          </div>
        </div>

        <form onSubmit = {handle_submit} className = "window-body" style = {{ padding: '14px 16px' }}>
          <div style = {{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '14px' }}>
            <DialogIcon icon = {dialog.icon} />
            <div style = {{ flex: 1, fontSize: '11px', lineHeight: '1.5', whiteSpace: 'pre-wrap', paddingTop: '4px' }}>
              {dialog.message}
              {dialog.kind === 'prompt' && (
                <input
                  ref = {input_ref}
                  type = "text"
                  value = {input_value}
                  onChange = {(e) => set_input_value(e.target.value)}
                  style = {{
                    display: 'block',
                    width: '100%',
                    marginTop: '8px',
                    padding: '3px 6px',
                    fontSize: '11px',
                    background: '#ffffff',
                    color: '#000000'
                  }}
                />
              )}
            </div>
          </div>

          <div style = {{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {dialog.buttons.map((button, idx) => (
              <button
                key = {button.label}
                ref = {idx === 0 ? first_button_ref : null}
                type = {idx === 0 ? 'submit' : 'button'}
                onClick = {idx === 0 ? undefined : () => resolve_button(button)}
                style = {{ minWidth: '75px', height: '23px', fontSize: '11px' }}
              >
                {button.label}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Windows98DialogHost;
