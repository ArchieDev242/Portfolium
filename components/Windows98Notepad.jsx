"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Windows98Window from './Windows98Window';
import { WIN98_ICONS } from '@/lib/win98-icons';

const STORAGE_KEY = 'win98-notepad-content';

const Win98_notepad = ({ onClose, onFocus, isActive, zIndex }) => {
  const [text, set_text] = useState('');
  const [filename, set_filename] = useState('Untitled');
  const [saved_msg, set_saved_msg] = useState('Ready');
  const [word_wrap, set_word_wrap] = useState(false);
  const [menu_open, set_menu_open] = useState(null);
  const [find_text, set_find_text] = useState('');
  const [find_index, set_find_index] = useState(-1);
  const [cursor_pos, set_cursor_pos] = useState({ line: 1, col: 1 });
  const [prev_text, set_prev_text] = useState('');
  const textarea_ref = useRef(null);

  useEffect(() => {
    try 
    {

      // get saved text from localStorage

      const saved = localStorage.getItem(STORAGE_KEY);

      if(saved) set_text(saved);
    } catch(_) {}
  }, []);

  const get_line_col = useCallback(() => {
    const el = textarea_ref.current;
    if(!el) return { line: 1, col: 1 };
    const val = el.value;
    const pos = el.selectionStart;
    const lines = val.substring(0, pos).split('\n');
    return { line: lines.length, col: lines[lines.length - 1].length + 1 };
  }, []);

  const update_cursor = useCallback(() => {
    set_cursor_pos(get_line_col());
  }, [get_line_col]);

  const handle_save = () => {
    try 
    {
      localStorage.setItem(STORAGE_KEY, text);
      set_saved_msg('Saved');
      setTimeout(() => set_saved_msg('Ready'), 1500);
    } catch(_) {}
    set_menu_open(null);
  };

  const handle_new = () => {
    if(text && !confirm('Save changes to Untitled?')) return;
    set_text('');
    set_filename('Untitled');
    set_menu_open(null);
  };

  const handle_time_date = () => {
    const now = new Date();
    const s = now.toLocaleString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    set_text((prev) => prev + s);
    set_menu_open(null);
  };

  const handle_select_all = () => {
    textarea_ref.current?.select();
    set_menu_open(null);
  };

  const handle_find = () => {
    const t = prompt('Find what:', find_text);
    if(t != null) 
      {
      set_find_text(t);
      const idx = text.toLowerCase().indexOf(t.toLowerCase());
      set_find_index(idx >= 0 ? idx : -1);
      if(idx >= 0 && textarea_ref.current) 
        {
        textarea_ref.current.focus();
        textarea_ref.current.setSelectionRange(idx, idx + t.length);
      }
    }
    set_menu_open(null);
  };

  const handle_find_next = () => {
    if(!find_text) return handle_find();
    const start = find_index >= 0 ? find_index + 1 : 0;
    const idx = text.toLowerCase().indexOf(find_text.toLowerCase(), start);
    if(idx >= 0) 
      {
      set_find_index(idx);
      textarea_ref.current?.focus();
      textarea_ref.current?.setSelectionRange(idx, idx + find_text.length);
    } else set_find_index(-1);
    set_menu_open(null);
  };

  const handle_cut = async () => {
    const el = textarea_ref.current;
    if(!el) return set_menu_open(null);
    const start = el.selectionStart, end = el.selectionEnd;
    const sel = text.substring(start, end);
    if(sel) 
      {
      try 
      {
        if(navigator.clipboard) await navigator.clipboard.writeText(sel);
      } catch(_) {}
      set_prev_text(text);
      set_text(text.substring(0, start) + text.substring(end));
    }
    set_menu_open(null);
  };

  const handle_copy = async () => {
    const el = textarea_ref.current;
    if(!el) return set_menu_open(null);
    const sel = text.substring(el.selectionStart, el.selectionEnd);
    try 
    {
      if(sel && navigator.clipboard) await navigator.clipboard.writeText(sel);
    } catch(_) {}
    set_menu_open(null);
  };

  const handle_paste = async () => {
    set_menu_open(null);
    let t = '';
    try 
    {
      t = navigator.clipboard ? await navigator.clipboard.readText() : '';
    } catch(_) 
    {
      t = prompt('Paste text (Ctrl+V):') || '';
    }
    if(!t) return;
    const el = textarea_ref.current;
    if(!el) return;
    const start = el.selectionStart, end = el.selectionEnd;
    set_prev_text(text);
    set_text(text.substring(0, start) + t + text.substring(end));
  };

  const handle_delete = () => {
    const el = textarea_ref.current;
    if(!el) return set_menu_open(null);
    const start = el.selectionStart, end = el.selectionEnd;
    if(start === end && end < text.length) {
      set_prev_text(text);
      set_text(text.substring(0, start) + text.substring(end + 1));
    } else if(start !== end) {
      set_prev_text(text);
      set_text(text.substring(0, start) + text.substring(end));
    }
    set_menu_open(null);
  };

  const handle_undo = () => {
    if(prev_text !== '') {
      set_text(prev_text);
      set_prev_text('');
    }
    set_menu_open(null);
  };

  const menu_items = [
    {
      name: 'File',
      items: [
        { label: 'New', shortcut: 'Ctrl+N', action: handle_new },
        { label: 'Open...', shortcut: 'Ctrl+O', action: () => { /* file picker */ set_menu_open(null); } },
        { label: 'Save', shortcut: 'Ctrl+S', action: handle_save },
        { type: 'divider' },
        { label: 'Exit', action: onClose }
      ]
    },
    {
      name: 'Edit',
      items: [
        { label: 'Undo', shortcut: 'Ctrl+Z', action: handle_undo },
        { type: 'divider' },
        { label: 'Cut', shortcut: 'Ctrl+X', action: handle_cut },
        { label: 'Copy', shortcut: 'Ctrl+C', action: handle_copy },
        { label: 'Paste', shortcut: 'Ctrl+V', action: handle_paste },
        { label: 'Delete', shortcut: 'Del', action: handle_delete },
        { type: 'divider' },
        { label: 'Select All', shortcut: 'Ctrl+A', action: handle_select_all },
        { label: 'Time/Date', shortcut: 'F5', action: handle_time_date }
      ]
    },
    {
      name: 'Search',
      items: [
        { label: 'Find...', shortcut: 'Ctrl+F', action: handle_find },
        { label: 'Find Next', shortcut: 'F3', action: handle_find_next }
      ]
    },
    {
      name: 'Format',
      items: [
        { label: 'Word Wrap', checked: word_wrap, action: () => { set_word_wrap((w) => !w); set_menu_open(null); } }
      ]
    },
    {
      name: 'Help',
      items: [
        { label: 'About Notepad', action: () => { alert('Notepad\nVersion 4.10.1998\n\nWindows 98'); set_menu_open(null); } }
      ]
    }
  ];

  return (
    <Windows98Window
      title = {`${filename} - Notepad`}
      icon = {WIN98_ICONS.notepad}
      onClose = {onClose}
      onFocus = {onFocus}
      isActive = {isActive}
      zIndex = {zIndex}
      width = {540}
      height = {400}
      maximizable = {true}
    >
      <div
        className = "win98-notepad"
        style = {{
          fontFamily: 'MS Sans Serif, sans-serif',
          fontSize: '11px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#c0c0c0'
        }}
      >
        {/* Menu bar — Win98 style */}
        <div
          style = {{
            display: 'flex',
            alignItems: 'stretch',
            background: '#c0c0c0',
            borderBottom: '1px solid #808080',
            padding: '1px 0'
          }}
        >
          {menu_items.map((menu) => (
            <div key = {menu.name} style = {{ position: 'relative' }}>
              <button
                onMouseDown = {(e) => {
                  e.preventDefault();
                  set_menu_open(menu_open === menu.name ? null : menu.name);
                }}
                style = {{
                  padding: '2px 8px',
                  fontSize: '11px',
                  background: menu_open === menu.name ? '#000080' : 'transparent',
                  color: menu_open === menu.name ? '#fff' : '#000',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {menu.name}
              </button>
              {menu_open === menu.name && (
                <>
                  <div
                    style = {{ position: 'fixed', inset: 0, zIndex: 9998 }}
                    onClick = {() => set_menu_open(null)}
                  />
                  <div
                    className = "window"
                    style = {{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      zIndex: 9999,
                      minWidth: '160px',
                      padding: '2px'
                    }}
                  >
                    <div className = "window-body" style = {{ padding: '2px' }}>
                      {menu.items.map((item, i) =>
                        item.type === 'divider' ? (
                          <div key = {i} style = {{ height: '1px', background: '#808080', margin: '2px 0' }} />
                        ) : (
                          <button
                            key = {i}
                            className = "field-row"
                            style = {{
                              width: '100%',
                              justifyContent: 'flex-start',
                              padding: '4px 20px 4px 8px',
                              fontSize: '11px',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            onClick = {() => item.action?.()}
                          >
                            {item.label}
                            {item.shortcut && (
                              <span style={{ marginLeft: 'auto', color: '#808080' }}>{item.shortcut}</span>
                            )}
                            {item.checked && ' ✓'}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Text area — Fixedsys style like 98.js */}
        <textarea
          ref = {textarea_ref}
          className = "win98-notepad-textarea"
          value = {text}
          onChange = {(e) => set_text(e.target.value)}
          onSelect = {update_cursor}
          onKeyUp = {update_cursor}
          onClick = {update_cursor}
          onKeyDown = {(e) => {
            if(e.ctrlKey && e.key === 'n') { e.preventDefault(); handle_new(); }
            if(e.ctrlKey && e.key === 's') { e.preventDefault(); handle_save(); }
            if(e.ctrlKey && e.key === 'f') { e.preventDefault(); handle_find(); }
            if(e.key === 'F3') { e.preventDefault(); handle_find_next(); }
            if(e.ctrlKey && e.key === 'a') { e.preventDefault(); handle_select_all(); }
            if(e.key === 'F5') { e.preventDefault(); handle_time_date(); }
            if(e.ctrlKey && e.key === 'z') { e.preventDefault(); handle_undo(); }
            if(e.ctrlKey && e.key === 'x') { e.preventDefault(); handle_cut(); }
            if(e.ctrlKey && e.key === 'c') { e.preventDefault(); handle_copy(); }
            if(e.ctrlKey && e.key === 'v') { e.preventDefault(); handle_paste(); }
          }}
          style = {{
            flex: 1,
            width: '100%',
            minHeight: 0,
            padding: '2px',
            margin: 0,
            lineHeight: 1.25,
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            resize: 'none',
            outline: 'none',
            whiteSpace: word_wrap ? 'pre-wrap' : 'pre',
            wordWrap: word_wrap ? 'break-word' : 'normal'
          }}
        />

        <div className = "status-bar" style = {{ flexShrink: 0 }}>
          <span className="status-bar-field">Ln {cursor_pos.line}, Col {cursor_pos.col}</span>
          <span className="status-bar-field">{saved_msg}</span>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Win98_notepad;
