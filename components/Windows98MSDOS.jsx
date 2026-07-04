"use client";

import React, { useState, useRef, useEffect } from 'react';
import Windows98Window from './Windows98Window';
import { WIN98_ICONS } from '@/lib/win98-icons';

const PROMPT = 'C:\\WINDOWS\\Desktop>';

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
  };

  return (
    <Windows98Window
      title = "MS-DOS Prompt"
      icon = {WIN98_ICONS.cmd}
      onClose = {onClose}
      onFocus = {onFocus}
      isActive = {isActive}
      zIndex = {zIndex}
      width = {640}
      height = {400}
      maximizable = {true}
    >
      <div className = "win98-msdos">
        {/* Toolbar — Auto dropdown + icon buttons */}
        <div className = "msdos-toolbar">
          <select defaultValue = "Auto">
            <option>Auto</option>
            <option>Manual</option>
          </select>
          <button className = "msdos-toolbar-btn" title = "Mark" onClick = {() => output_ref.current?.focus()}>
            <svg width = "14" height = "14" viewBox = "0 0 14 14" fill = "currentColor"><rect x = "1" y = "1" width = "12" height = "12" fill = "none" stroke = "currentColor" strokeWidth = "1" strokeDasharray = "2 1" /></svg>
          </button>
          <button className = "msdos-toolbar-btn" title = "Copy" onClick = {handle_copy}>
            <svg width = "14" height = "14" viewBox = "0 0 14 14" fill = "currentColor"><rect x = "2" y = "2" width = "8" height = "10" fill = "none" stroke = "currentColor" strokeWidth = "1" /><rect x = "4" y = "4" width = "8" height = "10" fill = "none" stroke = "currentColor" strokeWidth = "1" /></svg>
          </button>
          <button className = "msdos-toolbar-btn" title = "Paste" onClick = {async () => {
            let t = '';
            try { t = navigator.clipboard ? await navigator.clipboard.readText() : ''; } catch(_) { t = prompt('Paste:') || ''; }
            if(t) set_input((prev) => prev + t);
          }}>
            <svg width = "14" height = "14" viewBox = "0 0 14 14" fill = "currentColor"><rect x = "2" y = "2" width = "10" height = "12" fill = "none" stroke = "currentColor" strokeWidth = "1" /><path d = "M4 4h6v1H4zM4 6h6v1H4zM4 8h4v1H4z" fill = "currentColor" /></svg>
          </button>
          <button className = "msdos-toolbar-btn" title = "Scroll">↕</button>
          <button className = "msdos-toolbar-btn" title = "Find">◉</button>
          <button className = "msdos-toolbar-btn" title = "Properties">⚙</button>
          <button className = "msdos-toolbar-btn" title = "Font" style = {{ fontWeight: 'bold', fontFamily: 'serif' }}>A</button>
        </div>

        {/* Terminal */}
        <div
          className = "msdos-terminal"
          ref = {output_ref}
          tabIndex = {0}
          onClick = {() => input_ref.current?.focus()}
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
            />
          </div>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Win98_msdos;
