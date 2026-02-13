"use client";

import React, { useState, useRef, useEffect } from 'react';
import Windows98Window from './Windows98Window';
import { WIN98_ICONS } from '@/lib/win98-icons';

const PROMPT = 'C:\\WINDOWS>';

const COMMANDS = {
  help: () =>
    'For more information on a specific command, type HELP command-name\n' +
    'CD       Displays the name of or changes the current directory.\n' +
    'CLS      Clears the screen.\n' +
    'DIR      Displays a list of files and subdirectories.\n' +
    'ECHO     Displays messages, or turns command-echoing on or off.\n' +
    'EXIT     Quits the CMD.EXE program.\n' +
    'MEM      Displays the amount of used and free memory.\n' +
    'TREE     Graphically displays the directory structure.\n' +
    'TYPE     Displays the contents of a text file.\n' +
    'VER      Displays the Windows version.',
  dir: () =>
    ' Volume in drive C is MS-DOS_6\n Volume Serial Number is 1E49-15E2\n\n Directory of C:\\WINDOWS\n\n' +
    '.            <DIR>        01-04-98  12:00a\n' +
    '..           <DIR>        01-04-98  12:00a\n' +
    'SYSTEM       <DIR>        01-04-98  12:00a\n' +
    'COMMAND      <DIR>        01-04-98  12:00a\n' +
    'TEMP         <DIR>        01-04-98  12:00a\n' +
    'NOTEPAD  EXE       32,256  01-04-98  12:00a\n' +
    'SOL      EXE       45,120  01-04-98  12:00a\n' +
    'COMMAND  COM       93,040  01-04-98  12:00a\n' +
    '        8 file(s)        170,416 bytes\n' +
    '                        12,345,678 bytes free',
  cls: () => null,
  ver: () =>
    'Windows 98 [Version 4.10.1998]\n(C) Copyright Microsoft Corp 1981-1998.',
  exit: () => null,
  cd: (args) => (args ? `Invalid path - ${args}` : 'C:\\WINDOWS'),
  echo: (args) => args || '',
  mem: () =>
    'Memory Type         Total   Used    Free\n' +
    '----------------  -------- -------- --------\n' +
    'Conventional        640K     89K    551K\n' +
    'Upper                 0K      0K      0K\n' +
    'Reserved           384K    384K      0K\n' +
    'Extended (XMS)   65,024K  2,456K 62,568K\n' +
    '----------------  -------- -------- --------\n' +
    'Total memory      65,536K  2,929K 62,607K',
  tree: () =>
    'C:\\WINDOWS\n' +
    '|   SYSTEM\n' +
    '|   COMMAND\n' +
    '|   TEMP\n' +
    '|\n' +
    '+---WIN98\n' +
    '|   +---Desktop\n' +
    '|   +---Start Menu\n',
  type: (args) => (args ? `File not found - ${args}` : 'Required parameter missing')
};

const Win98_msdos = ({ onClose, onFocus, isActive, zIndex }) => {
  const [output, set_output] = useState([
    { type: 'text', value: 'Microsoft(R) Windows 98\n(C)Copyright Microsoft Corp 1981-1998.\n\n' }
  ]);
  const [input, set_input] = useState('');
  const [history, set_history] = useState([]);
  const [history_index, set_history_index] = useState(-1);
  const input_ref = useRef(null);
  const output_ref = useRef(null);
  const [menu_open, set_menu_open] = useState(false);

  useEffect(() => {
    if(isActive && input_ref.current) input_ref.current.focus();
  }, [isActive]);

  useEffect(() => {
    if(output_ref.current) output_ref.current.scrollTop = output_ref.current.scrollHeight;
  }, [output]);

  const run_command = (cmd_line) => {
    const trimmed = cmd_line.trim();
    const parts = trimmed.split(/\s+/);
    const cmd = (parts[0] || '').toLowerCase();
    const args = parts.slice(1).join(' ').trim();

    if(trimmed) 
      {
      set_history((h) => [...h.slice(-49), trimmed]);
      set_history_index(-1);
    }

    if(cmd === 'cls') 
      {
      set_output([{ type: 'text', value: '' }]);
      return;
    }
    if(cmd === 'exit') {
      onClose?.();
      return;
    }

    const handler = COMMANDS[cmd];
    let result;

    if(handler) result = typeof handler === 'function' ? handler(args) : handler;
    else result = `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`;

    set_output((prev) => [
      ...prev,
      { type: 'input', value: trimmed },
      ...(result != null && result !== '' ? [{ type: 'text', value: String(result) }] : []),
      { type: 'prompt', value: PROMPT }
    ]);
  };

  const handle_key_down = (e) => {
    if(e.key === 'Enter') 
      {
      e.preventDefault();
      if(input.trim()) run_command(input);
      set_input('');
    } else if(e.key === 'ArrowUp') 
      {
      e.preventDefault();
      if(history.length > 0) 
        {
        const idx = history_index < 0 ? history.length - 1 : Math.max(0, history_index - 1);
        set_history_index(idx);
        set_input(history[idx]);
      }
    } else if(e.key === 'ArrowDown') 
      {
      e.preventDefault();
      if(history_index >= 0) 
        {
        const idx = history_index + 1;
        if(idx >= history.length) 
          {
          set_history_index(-1);
          set_input('');
        } else 
        {
          set_history_index(idx);
          set_input(history[idx]);
        }
      }
    }
  };

  const handle_copy = async () => {
    const sel = window.getSelection();
    const txt = sel?.toString() || '';
    try 
    {
      if(txt && navigator.clipboard) await navigator.clipboard.writeText(txt);
    } catch(_) {}
    set_menu_open(false);
  };

  return (
    <Windows98Window
      title = "MS-DOS Prompt"
      icon = {WIN98_ICONS.cmd}
      onClose = {onClose}
      onFocus = {onFocus}
      isActive = {isActive}
      zIndex = {zIndex}
      width = {668}
      height = {432}
      maximizable = {true}
    >
      <div
        style = {{
          fontFamily: '"Lucida Console", "Courier New", Consolas, monospace',
          fontSize: '14px',
          lineHeight: 1.2,
          background: '#000',
          color: '#00ff00',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Edit menu bar — like real CMD */}
        <div
          style = {{
            display: 'flex',
            alignItems: 'center',
            padding: '2px 4px',
            background: '#000',
            borderBottom: '1px solid #00ff00',
            minHeight: '20px'
          }}
        >
          <div style = {{ position: 'relative' }}>
            <button
              onMouseDown = {(e) => {
                e.preventDefault();
                set_menu_open(!menu_open);
              }}
              style = {{
                padding: '2px 8px',
                fontSize: '11px',
                background: 'transparent',
                color: '#00ff00',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              &nbsp;Edit&nbsp;
            </button>
            {menu_open && (
              <>
                <div
                  style = {{ position: 'fixed', inset: 0, zIndex: 9998 }}
                  onClick = {() => set_menu_open(false)}
                />
                <div
                  className = "window"
                  style = {{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 9999,
                    minWidth: '120px',
                    padding: '2px'
                  }}
                >
                  <div className = "window-body" style = {{ padding: '2px' }}>
                    <button
                      className = "field-row"
                      style = {{
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '4px 8px',
                        fontSize: '11px'
                      }}
                      onClick = {handle_copy}
                    >
                      Mark
                    </button>
                    <button
                      className = "field-row"
                      style = {{
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '4px 8px',
                        fontSize: '11px'
                      }}
                      onClick = {handle_copy}
                    >
                      Copy
                    </button>
                    <button
                      className = "field-row"
                      style = {{
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '4px 8px',
                        fontSize: '11px'
                      }}
                      onClick = {async () => {
                        set_menu_open(false);
                        let t = '';
                        try {
                          t = navigator.clipboard ? await navigator.clipboard.readText() : '';
                        } catch(_) {
                          t = prompt('Paste text (Ctrl+V):') || '';
                        }
                        if(t) set_input((prev) => prev + t);
                      }}
                    >
                      Paste
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Terminal area — 80x25 character grid feel (640x400 classic size) */}
        <div
          ref = {output_ref}
          onClick = {() => input_ref.current?.focus()}
          style = {{
            flex: 1,
            padding: '8px',
            overflow: 'auto',
            cursor: 'text',
            minHeight: 0
          }}
        >
          {output.map((line, i) => (
            <div key = {i} style = {{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {line.type === 'input' && PROMPT}
              {line.value}
              {line.type === 'text' || line.type === 'input' ? '\n' : ''}
            </div>
          ))}
          <div style = {{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <span>{PROMPT}</span>
            <input
              ref = {input_ref}
              type = "text"
              value = {input}
              onChange = {(e) => set_input(e.target.value)}
              onKeyDown = {handle_key_down}
              autoComplete = "off"
              spellCheck = {false}
              style = {{
                flex: 1,
                minWidth: 0,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#00ff00',
                fontFamily: 'inherit',
                fontSize: 'inherit'
              }}
            />
          </div>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Win98_msdos;
