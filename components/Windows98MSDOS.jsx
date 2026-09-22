"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Windows98Window from './Windows98Window';
import { WIN98_ICONS } from '@/lib/win98-icons';

// Virtual MS-DOS 7.10 File System
const VIRTUAL_FS = {
  'C:': {
    'WINDOWS': {
      'SYSTEM': {},
      'COMMAND': {},
      'DESKTOP': {
        'PORTFOLIO.EXE': { size: 32768, date: '09-18-06', time: '12:00a', type: 'exe', window: 'portfolio' },
        'RESUME.TXT': { size: 2048, date: '09-18-06', time: '12:00a', ref: 'C:\\PORTFOLIO\\RESUME.TXT' },
        'PROJECTS.TXT': { size: 1536, date: '09-18-06', time: '12:00a', ref: 'C:\\PORTFOLIO\\PROJECTS.TXT' }
      },
      'NOTEPAD.EXE': { size: 54272, date: '05-11-98', time: '8:01p', type: 'exe', window: 'notepad' },
      'COMMAND.COM': { size: 93890, date: '05-11-98', time: '8:01p', type: 'com' },
      'WIN.COM': { size: 24734, date: '05-11-98', time: '8:01p', type: 'com', window: 'portfolio' },
      'SOL.EXE': { size: 56320, date: '05-11-98', time: '8:01p', type: 'exe' }
    },
    'PORTFOLIO': {
      'ABOUT.TXT': {
        size: 512,
        date: '09-22-26',
        time: '04:20p',
        content: `========================================================\nMAKSYM KOPYCHKO (Archie242)\nSoftware Engineer & Game Developer\nLocation: Okhtyrka, Sumy Region, Ukraine\nBirthday: September 18, 2006 (20 Years Old)\nEmail:    MaxymKopychko@gmail.com\nPhone:    +380669702817\n========================================================`
      },
      'RESUME.TXT': {
        size: 2048,
        date: '09-22-26',
        time: '04:20p',
        content: `========================================================\nRESUME - MAKSYM KOPYCHKO\n========================================================\nEDUCATION:\n* National Technical University "Kharkiv Polytechnic Institute"\n  Bachelor's Degree in Computer Engineering (2023 - 2027)\n* IT Start School (2021 - 2022)\n\nLANGUAGES:\n* Ukrainian (Native), English, German, Russian\n\nCORE SKILLS:\n* Game Development (Unreal Engine, Unity, C++, Lua)\n* Systems Programming (C, C++, C#)\n* Web Development (React, Next.js, Tailwind CSS)\n* Python Automation & Scripting\n========================================================`
      },
      'SKILLS.TXT': {
        size: 1024,
        date: '09-22-26',
        time: '04:20p',
        content: `========================================================\nTECHNICAL SKILLS\n========================================================\n- Game Engines:    Unreal Engine, Unity, Blender, C4D\n- Languages:       C, C++, C#, Python, JavaScript, Lua\n- Web & Tools:     Next.js, React, HTML5, CSS3, Tailwind, Git\n- Systems:         Linux, Windows 98, MS-DOS\n========================================================`
      },
      'PROJECTS.TXT': {
        size: 1536,
        date: '09-22-26',
        time: '04:20p',
        content: `========================================================\nFEATURED PROJECTS\n========================================================\n1. ARKANOID JS\n   Retro Breakout game built in pure Vanilla JS & HTML5 Canvas.\n\n2. SDL GAME PROJECT\n   Custom 2D Action game engine in C++ with SDL2.\n\n3. SHORT-TO-LONG FILENAME TOOL\n   Utility in C# for parsing DOS 8.3 short filename collisions.\n\n4. PORTFOLIUM\n   Interactive retro-modern portfolio built in Next.js 15.\n========================================================`
      },
      'CONTACT.TXT': {
        size: 384,
        date: '09-22-26',
        time: '04:20p',
        content: `EMAIL:    MaxymKopychko@gmail.com\nGITHUB:   github.com/ArchieDev242\nPHONE:    +380669702817\nLOCATION: Okhtyrka, Ukraine`
      }
    },
    'AUTOEXEC.BAT': {
      size: 128,
      date: '05-11-98',
      time: '8:01p',
      content: `@ECHO OFF\nPROMPT $P$G\nPATH C:\\WINDOWS;C:\\PORTFOLIO\nSET TEMP=C:\\WINDOWS\\TEMP\nECHO MS-DOS Version 7.10`
    },
    'CONFIG.SYS': {
      size: 96,
      date: '05-11-98',
      time: '8:01p',
      content: `DEVICE=C:\\WINDOWS\\HIMEM.SYS\nDOS=HIGH,UMB\nFILES=40\nBUFFERS=40`
    }
  }
};

const COLOR_MAP = {
  '0': '#000000', '1': '#000080', '2': '#008000', '3': '#008080',
  '4': '#800000', '5': '#800080', '6': '#808000', '7': '#c0c0c0',
  '8': '#808080', '9': '#0000ff', 'A': '#00ff00', 'B': '#00ffff',
  'C': '#ff0000', 'D': '#ff00ff', 'E': '#ffff00', 'F': '#ffffff'
};

const Win98_msdos = ({ onClose, onFocus, onOpenWindow, isActive, zIndex }) => {
  const [current_path, set_current_path] = useState(['C:', 'WINDOWS']);
  const [output, set_output] = useState([
    { type: 'text', value: 'Microsoft(R) Windows 98\n   (C)Copyright Microsoft Corp 1981-1998.\n\n' }
  ]);
  const [input, set_input] = useState('');
  const [history, set_history] = useState([]);
  const [history_index, set_history_index] = useState(-1);
  const [font_size, set_font_size] = useState('13px');
  const [colors, set_colors] = useState({ bg: '#000000', text: '#ffffff' });
  const [is_matrix, set_is_matrix] = useState(false);

  const input_ref = useRef(null);
  const terminal_ref = useRef(null);

  const prompt_str = useMemo(() => `${current_path.join('\\')}>`, [current_path]);

  // Navigate VFS
  const get_current_dir = useCallback((path_array = current_path) => {
    let cur = VIRTUAL_FS['C:'];
    for(let i = 1; i < path_array.length; i++) 
    {
      const seg = path_array[i];
      if(cur && cur[seg] && !cur[seg].content && !cur[seg].size) 
      {
        cur = cur[seg];
      } else 
      {
        return null;
      }
    }
    return cur;
  }, [current_path]);

  useEffect(() => {
    if(isActive && input_ref.current) 
    {
      input_ref.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if(terminal_ref.current) 
    {
      terminal_ref.current.scrollTop = terminal_ref.current.scrollHeight;
    }
  }, [output, input]);

  // Easter egg Matrix rain timer
  useEffect(() => {
    if(!is_matrix) return;
    const interval = setInterval(() => {
      const chars = '0123456789ABCDEF!@#$%^&*()_+-=[]{}|;:,.<>?';
      let line = '';
      for(let i = 0; i < 60; i++) 
      {
        line += chars[Math.floor(Math.random() * chars.length)] + ' ';
      }
      set_output((prev) => [...prev.slice(-30), { type: 'text', value: line }]);
    }, 120);

    return () => clearInterval(interval);
  }, [is_matrix]);

  const handle_cd = (target_path) => {
    if(!target_path || target_path === '.') return null;

    if(target_path === '\\' || target_path === '/') 
    {
      set_current_path(['C:']);
      return null;
    }

    if(target_path === '..') 
    {
      if(current_path.length > 1) 
      {
        set_current_path(current_path.slice(0, -1));
      }
      return null;
    }

    const clean = target_path.replace(/\\/g, '/').toUpperCase();
    const parts = clean.split('/').filter(Boolean);

    let test_path = clean.startsWith('C:') ? parts : [...current_path, ...parts];

    // Normalize
    const resolved = [];
    for(const seg of test_path) 
    {
      if(seg === '..') 
      {
        if(resolved.length > 1) resolved.pop();
      } else if(seg !== '.') 
      {
        resolved.push(seg);
      }
    }

    const dir = get_current_dir(resolved);
    if(dir && typeof dir === 'object') 
    {
      set_current_path(resolved);
      return null;
    } else 
    {
      return `Invalid directory - ${target_path}`;
    }
  };

  const handle_dir = () => {
    const cur = get_current_dir();
    if(!cur) return 'Directory not found.';

    let lines = [
      ' Volume in drive C is MS-DOS_7',
      ' Volume Serial Number is 1E49-15E2',
      '',
      ` Directory of ${current_path.join('\\')}`,
      ''
    ];

    if(current_path.length > 1) 
    {
      lines.push('.            <DIR>        05-11-98  8:01p');
      lines.push('..           <DIR>        05-11-98  8:01p');
    }

    let file_count = 0;
    let total_bytes = 0;
    let dir_count = current_path.length > 1 ? 2 : 0;

    Object.entries(cur).forEach(([name, item]) => {
      const is_dir = !item.size && !item.content && !item.ref;
      const [base, ext = ''] = name.split('.');
      const formatted_base = base.padEnd(8, ' ');
      const formatted_ext = ext.padEnd(3, ' ');

      if(is_dir) 
      {
        dir_count++;
        lines.push(`${formatted_base} ${formatted_ext}   <DIR>        05-11-98  8:01p`);
      } else 
      {
        file_count++;
        const size = item.size || (item.content ? item.content.length : 1024);
        total_bytes += size;
        const formatted_size = size.toLocaleString().padStart(8, ' ');
        const date = item.date || '05-11-98';
        const time = item.time || '8:01p';
        lines.push(`${formatted_base} ${formatted_ext} ${formatted_size}  ${date}  ${time}`);
      }
    });

    lines.push(`         ${file_count} file(s)     ${total_bytes.toLocaleString()} bytes`);
    lines.push(`         ${dir_count} dir(s)     62,568,448 bytes free`);

    return lines.join('\n');
  };

  const handle_type = (arg) => {
    if(!arg) return 'Required parameter missing';
    const cur = get_current_dir();
    const upper = arg.toUpperCase();
    const file = cur?.[upper];

    if(!file) return `File not found - ${arg}`;
    if(!file.size && !file.content && !file.ref) return `Access denied - ${arg} is a directory`;

    if(file.ref) 
    {
      // follow ref
      const resolved = file.ref.replace('C:\\PORTFOLIO\\', '');
      const target = VIRTUAL_FS['C:']['PORTFOLIO']?.[resolved];
      return target?.content || 'File content unavailable.';
    }

    if(file.content) return file.content;
    if(file.type === 'exe' || file.type === 'com') return 'This program cannot be run in DOS mode.';

    return `Contents of ${arg}`;
  };

  const run_command = (cmd_line) => {
    if(is_matrix) 
    {
      set_is_matrix(false);
      set_colors({ bg: '#000000', text: '#ffffff' });
      return;
    }

    const trimmed = cmd_line.trim();
    if(!trimmed) return;

    set_history((h) => [...h.slice(-49), trimmed]);
    set_history_index(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = (parts[0] || '').toLowerCase();
    const args = parts.slice(1).join(' ').trim();
    const full_prompt = prompt_str;

    let result = null;

    switch(cmd) 
    {
      case 'cls':
        set_output([]);
        return;

      case 'exit':
        onClose?.();
        return;

      case 'ver':
        result = 'Windows 98 [Version 4.10.1998]\n(C) Copyright Microsoft Corp 1981-1998.';
        break;

      case 'dir':
        result = handle_dir();
        break;

      case 'cd':
      case 'chdir':
        result = handle_cd(args);
        break;

      case 'type':
        result = handle_type(args);
        break;

      case 'help':
        result = [
          'For more information on a specific command, type HELP command-name',
          'CD        Displays or changes the current directory.',
          'CLS       Clears the terminal screen.',
          'COLOR     Sets the console background and text colors (e.g. COLOR 0A).',
          'DATE      Displays the current system date.',
          'DIR       Displays a list of files and subdirectories.',
          'ECHO      Displays messages, or turns command-echoing on.',
          'EXIT      Quits the MS-DOS prompt.',
          'HELP      Provides help information for MS-DOS commands.',
          'MATRIX    Toggle Matrix digital rain visual mode.',
          'MEM       Displays the amount of used and free memory.',
          'NOTEPAD   Opens Windows 98 Notepad.',
          'PORTFOLIO Opens the main Portfolio application window.',
          'PROJECTS  Opens the Projects Portfolio window.',
          'RESUME    Opens the Resume window.',
          'CONTACT   Opens the Contact dialog.',
          'TIME      Displays the current system time.',
          'TREE      Graphically displays directory structure of drive C.',
          'TYPE      Displays the contents of a text file.',
          'VER       Displays the Windows 98 version.'
        ].join('\n');
        break;

      case 'date':
        result = `Current date is ${new Date().toLocaleDateString('en-US', { weekday: 'short', month: '2-digit', day: '2-digit', year: 'numeric' })}`;
        break;

      case 'time':
        result = `Current time is ${new Date().toLocaleTimeString('en-US', { hour12: false })}.${Math.floor(Math.random() * 90 + 10)}`;
        break;

      case 'echo':
        result = args || 'ECHO is on.';
        break;

      case 'color':
        if(!args || args.length !== 2) 
        {
          set_colors({ bg: '#000000', text: '#ffffff' });
          result = 'Color reset to default (07). Syntax: COLOR [attr] (e.g. COLOR 0A)';
        } else 
        {
          const bg = COLOR_MAP[args[0].toUpperCase()] || '#000000';
          const fg = COLOR_MAP[args[1].toUpperCase()] || '#ffffff';
          set_colors({ bg, text: fg });
        }
        break;

      case 'mem':
        result = [
          'Memory Type         Total       Used       Free',
          '----------------  --------   --------   --------',
          'Conventional          640K        89K       551K',
          'Upper                   0K         0K         0K',
          'Reserved             384K       384K         0K',
          'Extended (XMS)    65,024K     2,456K    62,568K',
          '----------------  --------   --------   --------',
          'Total memory      65,536K     2,929K    62,607K',
          '',
          'Largest executable program size:       551K (564,224 bytes)',
          'Largest free upper memory block:         0K (0 bytes)',
          'MS-DOS is resident in the high memory area.'
        ].join('\n');
        break;

      case 'tree':
        result = [
          'Directory PATH listing for Volume MS-DOS_7',
          'Volume serial number is 1E49-15E2',
          'C:.',
          '|   AUTOEXEC.BAT',
          '|   CONFIG.SYS',
          '+---WINDOWS',
          '|   |   COMMAND.COM',
          '|   |   NOTEPAD.EXE',
          '|   |   WIN.COM',
          '|   |   SOL.EXE',
          '|   +---SYSTEM',
          '|   +---COMMAND',
          '|   +---DESKTOP',
          '|   |       PORTFOLIO.EXE',
          '|   |       RESUME.TXT',
          '|   |       PROJECTS.TXT',
          '+---PORTFOLIO',
          '        ABOUT.TXT',
          '        RESUME.TXT',
          '        SKILLS.TXT',
          '        PROJECTS.TXT',
          '        CONTACT.TXT'
        ].join('\n');
        break;

      case 'notepad':
        onOpenWindow?.('notepad');
        result = args ? `Opening ${args} in Notepad...` : 'Launching Notepad...';
        break;

      case 'portfolio':
      case 'win':
        onOpenWindow?.('portfolio');
        result = 'Launching Portfolio.exe...';
        break;

      case 'resume':
        onOpenWindow?.('resume');
        result = 'Opening Resume...';
        break;

      case 'projects':
        onOpenWindow?.('projects');
        result = 'Opening Projects Portfolio...';
        break;

      case 'contact':
        onOpenWindow?.('contact');
        result = 'Opening Contact dialog...';
        break;

      case 'matrix':
        set_is_matrix(true);
        set_colors({ bg: '#000000', text: '#00ff00' });
        result = 'Entering Matrix mode... Press any key to stop.';
        break;

      default:
        // check if user ran an executable directly like notepad.exe or portfolio.exe
        const cur = get_current_dir();
        const upper = cmd.toUpperCase();
        if(cur && cur[upper]) 
        {
          const target = cur[upper];
          if(target.window) 
          {
            onOpenWindow?.(target.window);
            result = `Launching ${upper}...`;
            break;
          }
        }
        result = `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`;
        break;
    }

    set_output((prev) => [
      ...prev,
      { type: 'line', prompt: full_prompt, input: trimmed },
      ...(result != null && result !== '' ? [{ type: 'text', value: String(result) }] : [])
    ]);
  };

  // Tab auto-complete
  const handle_tab = (e) => {
    e.preventDefault();
    const cur = get_current_dir();
    if(!cur) return;
    const parts = input.trim().split(/\s+/);
    const last = parts[parts.length - 1] || '';
    if(!last) return;

    const entries = Object.keys(cur);
    const match = entries.find((k) => k.startsWith(last.toUpperCase()));
    if(match) 
    {
      parts[parts.length - 1] = match;
      set_input(parts.join(' '));
    }
  };

  const handle_key_down = (e) => {
    if(e.key === 'Tab') 
    {
      handle_tab(e);
      return;
    }

    if(e.key === 'Enter') 
    {
      e.preventDefault();
      run_command(input);
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
    const sel = window.getSelection()?.toString();
    if(sel) 
    {
      try 
      {
        if(navigator.clipboard) await navigator.clipboard.writeText(sel);
      } catch(_) {}
    }
  };

  const handle_paste = async () => {
    try 
    {
      const t = navigator.clipboard ? await navigator.clipboard.readText() : '';
      if(t) set_input((prev) => prev + t);
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
      width = {660}
      height = {420}
      resizable = {true}
      maximizable = {true}
    >
      <div 
        className = "win98-msdos"
        style = {{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#c0c0c0'
        }}
      >
        {/* Authentic Windows 98 MS-DOS Toolbar */}
        <div className = "msdos-toolbar">
          <select 
            value = {font_size} 
            onChange = {(e) => set_font_size(e.target.value)}
            style = {{ height: '20px', fontSize: '11px' }}
          >
            <option value = "11px">6 x 8</option>
            <option value = "13px">7 x 12</option>
            <option value = "15px">8 x 12</option>
            <option value = "18px">10 x 18</option>
          </select>

          <button 
            className = "msdos-toolbar-btn" 
            title = "Mark"
            onClick = {() => terminal_ref.current?.focus()}
          >
            <svg width = "14" height = "14" viewBox = "0 0 14 14" fill = "currentColor">
              <rect x = "1" y = "1" width = "12" height = "12" fill = "none" stroke = "currentColor" strokeWidth = "1" strokeDasharray = "2 1" />
            </svg>
          </button>

          <button 
            className = "msdos-toolbar-btn" 
            title = "Copy Selection" 
            onClick = {handle_copy}
          >
            <svg width = "14" height = "14" viewBox = "0 0 14 14" fill = "currentColor">
              <rect x = "2" y = "2" width = "8" height = "10" fill = "none" stroke = "currentColor" strokeWidth = "1" />
              <rect x = "4" y = "4" width = "8" height = "10" fill = "none" stroke = "currentColor" strokeWidth = "1" />
            </svg>
          </button>

          <button 
            className = "msdos-toolbar-btn" 
            title = "Paste" 
            onClick = {handle_paste}
          >
            <svg width = "14" height = "14" viewBox = "0 0 14 14" fill = "currentColor">
              <rect x = "2" y = "2" width = "10" height = "12" fill = "none" stroke = "currentColor" strokeWidth = "1" />
              <path d = "M4 4h6v1H4zM4 6h6v1H4zM4 8h4v1H4z" fill = "currentColor" />
            </svg>
          </button>

          <button 
            className = "msdos-toolbar-btn" 
            title = "Clear Screen"
            onClick = {() => set_output([])}
          >
            ⌫
          </button>

          <button 
            className = "msdos-toolbar-btn" 
            title = "Font"
            style = {{ fontWeight: 'bold', fontFamily: 'serif' }}
            onClick = {() => set_font_size((s) => s === '13px' ? '16px' : '13px')}
          >
            A
          </button>
        </div>

        {/* Authentic Black CRT Terminal Body */}
        <div
          ref = {terminal_ref}
          className = "msdos-terminal"
          style = {{
            flex: 1,
            margin: '2px',
            padding: '8px 10px',
            background: colors.bg,
            color: colors.text,
            fontFamily: 'Fixedsys, "Lucida Console", "Courier New", monospace',
            fontSize: font_size,
            lineHeight: '1.25',
            overflow: 'auto',
            cursor: 'text',
            border: '2px inset #404040'
          }}
          onClick = {() => input_ref.current?.focus()}
        >
          {output.map((entry, i) => (
            <div key = {i} style = {{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {entry.type === 'line' && (
                <div>
                  <span>{entry.prompt}</span>
                  <span>{entry.input}</span>
                </div>
              )}
              {entry.type === 'text' && <div>{entry.value}</div>}
            </div>
          ))}

          {/* Active prompt line with blinking block cursor */}
          <div style = {{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>{prompt_str}</span>
            <span style = {{ whiteSpace: 'pre' }}>{input}</span>
            <span 
              className = "dos-cursor" 
              style = {{ 
                display: 'inline-block',
                width: '8px', 
                height: '14px', 
                background: colors.text,
                marginLeft: '1px',
                animation: 'dos-blink 1s step-start infinite'
              }} 
            />
            <input
              ref = {input_ref}
              type = "text"
              value = {input}
              onChange = {(e) => set_input(e.target.value)}
              onKeyDown = {handle_key_down}
              autoComplete = "off"
              spellCheck = {false}
              style = {{
                position: 'absolute',
                opacity: 0,
                pointerEvents: 'none',
                width: 0,
                height: 0
              }}
            />
          </div>
        </div>

        {/* 98.css Status Bar */}
        <div className = "status-bar" style = {{ flexShrink: 0 }}>
          <p className = "status-bar-field">MS-DOS Prompt — {current_path.join('\\')}</p>
          <p className = "status-bar-field" style = {{ textAlign: 'right' }}>80 x 25</p>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Win98_msdos;
