"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Windows98Loader from './Windows98Loader';
import Win98_theme_manager from './Windows98ThemeManager';
import Win98_window_manager from './Windows98WindowManager';
import { getWin98Icon, WIN98_ICONS } from '@/lib/win98-icons';
import { play_sound, set_sound_muted, get_sound_muted } from '@/lib/win98-audio';
import Windows98ContextMenu from './Windows98ContextMenu';
import Windows98Screensaver from './Windows98Screensaver';
import Windows98VolumePopup from './Windows98VolumePopup';
import Windows98RunDialog from './Windows98RunDialog';
import Windows98ShutdownDialog from './Windows98ShutdownDialog';
import Windows98DisplayProperties from './Windows98DisplayProperties';

const BIRTHDAY = new Date(2006, 8, 18);

const get_age = () => {
  const today = new Date();
  let age = today.getFullYear() - BIRTHDAY.getFullYear();
  const has_passed = (
    today.getMonth() > BIRTHDAY.getMonth() ||
    (today.getMonth() === BIRTHDAY.getMonth() && today.getDate() >= BIRTHDAY.getDate())
  );
  if(!has_passed) age -= 1;
  return age;
};

const Windows98Home = () => {
  const router = useRouter();
  const window_ref = useRef(null);
  const titlebar_ref = useRef(null);
  const [is_dragging, set_is_dragging] = useState(false);
  const [drag_offset, set_drag_offset] = useState({ x: 0, y: 0 });
  const [window_position, set_window_position] = useState({ x: 0, y: 0 });
  const [is_minimized, set_is_minimized] = useState(false);
  const [is_maximized, set_is_maximized] = useState(false);
  const [previous_position, set_previous_position] = useState({ x: 0, y: 0 });
  const [is_loading, set_is_loading] = useState(true);
  const [theme_manager_open, set_theme_manager_open] = useState(false);
  
  // windows management
  const [active_windows, set_active_windows] = useState([]);
  const [minimized_windows, set_minimized_windows] = useState([]);
  const [window_drag_ghost, set_window_drag_ghost] = useState(null);
  const [is_muted, set_is_muted] = useState(false);
  const [window_z_index, set_window_z_index] = useState(1000);
  const [active_window_id, set_active_window_id] = useState('portfolio');
  const [window_z_indexes, set_window_z_indexes] = useState({
    portfolio: 1000,
    resume: 1000,
    projects: 1000,
    contact: 1000,
    notepad: 1000,
    msdos: 1000
  });
  
  const [icon_fallback, set_icon_fallback] = useState({});
  const [start_menu_open, set_start_menu_open] = useState(false);

  // desktop icons state — icon = filename from WIN98_ICONS, so paths work in prod
  const [desktop_icons, set_desktop_icons] = useState([
    { id: 'theme-manager', name: 'Theme Manager', position: { x: 20, y: 20 }, icon: WIN98_ICONS.themes, type: 'system', action: () => set_theme_manager_open(true) },
    { id: 'resume', name: 'Resume', position: { x: 20, y: 120 }, icon: WIN98_ICONS.users, type: 'app', action: () => open_window('resume') },
    { id: 'projects', name: 'Projects', position: { x: 20, y: 220 }, icon: WIN98_ICONS.directory_open, type: 'app', action: () => open_window('projects') },
    { id: 'contact', name: 'Contact', position: { x: 20, y: 320 }, icon: WIN98_ICONS.envelope, type: 'app', action: () => open_window('contact') },
    { id: 'notepad', name: 'Notepad', position: { x: 20, y: 420 }, icon: WIN98_ICONS.notepad, type: 'app', action: () => open_window('notepad') },
    { id: 'msdos', name: 'MS-DOS Prompt', position: { x: 20, y: 520 }, icon: WIN98_ICONS.cmd, type: 'app', action: () => open_window('msdos') },
    { id: 'recycle-bin', name: 'Recycle Bin', position: { x: 20, y: 620 }, icon: WIN98_ICONS.recycle_empty, type: 'recycle-bin', action: () => {} },
    { id: 'my-computer', name: 'My Computer', position: { x: 20, y: 720 }, icon: WIN98_ICONS.computer, type: 'system', action: () => {} }
  ]);
  const [dragging_icon, set_dragging_icon] = useState(null);
  const [drag_icon_offset, set_drag_icon_offset] = useState({ x: 0, y: 0 });
  
  const [user_files, set_user_files] = useState([]);
  const [recycle_bin_files, set_recycle_bin_files] = useState([]);
  const [file_counter, set_file_counter] = useState(1);
  const [context_menu_data, set_context_menu_data] = useState(null);
  const [screensaver_active, set_screensaver_active] = useState(false);
  const [volume_popup_open, set_volume_popup_open] = useState(false);
  const [run_dialog_open, set_run_dialog_open] = useState(false);
  const [shutdown_dialog_open, set_shutdown_dialog_open] = useState(false);
  const [active_start_submenu, set_active_start_submenu] = useState(null);
  const [current_notepad_file, set_current_notepad_file] = useState(null);
  const [desktop_wallpaper, set_desktop_wallpaper] = useState('#008080');
  const [screensaver_type, set_screensaver_type] = useState('mystify');
  const idle_timer_ref = useRef(null);

  const reset_idle_timer = useCallback(() => {
    if(idle_timer_ref.current) clearTimeout(idle_timer_ref.current);
    idle_timer_ref.current = setTimeout(() => {
      set_screensaver_active(true);
    }, 120000);
  }, []);

  useEffect(() => {
    const handle_user_activity = () => {
      reset_idle_timer();
    };

    window.addEventListener('mousemove', handle_user_activity);
    window.addEventListener('mousedown', handle_user_activity);
    window.addEventListener('keydown', handle_user_activity);
    window.addEventListener('touchstart', handle_user_activity);

    reset_idle_timer();

    return () => {
      if(idle_timer_ref.current) clearTimeout(idle_timer_ref.current);
      window.removeEventListener('mousemove', handle_user_activity);
      window.removeEventListener('mousedown', handle_user_activity);
      window.removeEventListener('keydown', handle_user_activity);
      window.removeEventListener('touchstart', handle_user_activity);
    };
  }, [reset_idle_timer]);
  const [selected_icon_ids, set_selected_icon_ids] = useState([]);
  const [selection_box, set_selection_box] = useState(null);

  const open_window = (windowId) => {
    play_sound('open');
    if(!active_windows.includes(windowId)) 
    {
      set_active_windows(prev => [...prev, windowId]);
    }
    set_minimized_windows(prev => prev.filter(id => id !== windowId));
    set_active_window_id(windowId);

    const new_z_index = window_z_index + 10;

    set_window_z_index(new_z_index);
    set_window_z_indexes(prev => ({
      ...prev,
      [windowId]: new_z_index
    }));
  };

  const closeWindow = (windowId) => {
    play_sound('close');
    set_active_windows(prev => prev.filter(id => id !== windowId));
    set_minimized_windows(prev => prev.filter(id => id !== windowId));
    if(active_window_id === windowId) 
    {
      set_active_window_id('portfolio');
    }
  };

  const focus_window = (windowId) => {
    set_minimized_windows(prev => prev.filter(id => id !== windowId));
    set_active_window_id(windowId);
    const new_z_index = window_z_index + 10;
    set_window_z_index(new_z_index);
    set_window_z_indexes(prev => ({
      ...prev,
      [windowId]: new_z_index
    }));
  };

  const toggle_window = (windowId) => {
    play_sound('click');
    if(windowId === 'portfolio')
    {
      if(active_window_id === 'portfolio' && !is_minimized)
      {
        set_is_minimized(true);
      } else
      {
        set_is_minimized(false);
        focus_window('portfolio');
      }
      return;
    }

    if(active_window_id === windowId && !minimized_windows.includes(windowId))
    {
      set_minimized_windows(prev => [...prev, windowId]);
    } else
    {
      set_minimized_windows(prev => prev.filter(id => id !== windowId));
      focus_window(windowId);
    }
  };

  const minimize_child_window = (windowId) => {
    play_sound('click');
    set_minimized_windows(prev => [...prev, windowId]);
  };

  const handleLoaderComplete = useCallback(() => {
    set_is_loading(false);
    play_sound('startup');
  }, []);

  useEffect(() => {
    document.body.classList.add('win98-mode');

    const base = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_PATH) || '';
    const link_98 = document.createElement('link');
    link_98.rel = 'stylesheet';
    link_98.href = `${base}/win98/98.css`;
    link_98.id = 'win98-98css';
    document.head.appendChild(link_98);

    const link_overlay = document.createElement('link');
    link_overlay.rel = 'stylesheet';
    link_overlay.href = `${base}/win98/win98.css`;
    link_overlay.id = 'win98-custom-css';
    document.head.appendChild(link_overlay);

    return () => {
      document.body.classList.remove('win98-mode');
      document.body.classList.remove('matrix-theme', 'cyber-theme');

      const el_98 = document.getElementById('win98-98css');
      if(el_98) document.head.removeChild(el_98);
      const el_overlay = document.getElementById('win98-custom-css');
      if(el_overlay) document.head.removeChild(el_overlay);

      document.body.style.removeProperty('font-family');
      document.body.style.removeProperty('background');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('margin');
      document.body.style.removeProperty('padding');

      const root = document.documentElement;
      ['--win98-primary', '--win98-secondary', '--win98-accent', '--win98-window', '--win98-text', '--win98-highlight'].forEach(v => root.style.removeProperty(v));
    };
  }, []);

  useEffect(() => {
    if(window_ref.current) 
      {
      const window_el = window_ref.current;
      const rect = window_el.getBoundingClientRect();
      const center_x = (window.innerWidth - rect.width) / 2;
      const center_y = (window.innerHeight - rect.height) / 2;
      set_window_position({ x: center_x, y: center_y });
    }
  }, []);

  useEffect(() => {
    const titlebar = titlebar_ref.current;

    if(titlebar) 
      {
      const prevent_select = (e) => e.preventDefault();
      titlebar.addEventListener('selectstart', prevent_select);
      titlebar.addEventListener('dragstart', prevent_select);
      
      return () => {
        titlebar.removeEventListener('selectstart', prevent_select);
        titlebar.removeEventListener('dragstart', prevent_select);
      };
    }
  }, []);

  const handle_pointer_down = (e) => {
    if(e.target.closest('button')) return;

    e.preventDefault();
    e.stopPropagation();
    
    focus_window('portfolio');
    play_sound('click');
    
    const windowEl = window_ref.current;
    if(!windowEl || is_maximized) return;
    
    const rect = windowEl.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    set_drag_offset({ x: offsetX, y: offsetY });
    set_is_dragging(true);
    set_window_drag_ghost({
      x: window_position.x,
      y: window_position.y,
      width: rect.width,
      height: rect.height
    });
    document.body.style.userSelect = 'none';
    
    let latest_x = window_position.x;
    let latest_y = window_position.y;

    const handle_move = (moveEvent) => {
      moveEvent.preventDefault();
      
      const client_x = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0]?.clientX) || 0;
      const client_y = moveEvent.clientY || (moveEvent.touches && moveEvent.touches[0]?.clientY) || 0;

      const new_x = client_x - offsetX;
      const new_y = client_y - offsetY;
      
      const maxX = window.innerWidth - 200;
      const maxY = window.innerHeight - 100;
      
      latest_x = Math.max(-windowEl.offsetWidth + 200, Math.min(new_x, maxX));
      latest_y = Math.max(0, Math.min(new_y, maxY));
      
      set_window_drag_ghost({
        x: latest_x,
        y: latest_y,
        width: rect.width,
        height: rect.height
      });
    };

    const handle_up = () => {
      set_is_dragging(false);
      set_window_position({ x: latest_x, y: latest_y });
      set_window_drag_ghost(null);
      document.body.style.userSelect = '';
      document.removeEventListener('pointermove', handle_move);
      document.removeEventListener('pointerup', handle_up);
      document.removeEventListener('mousemove', handle_move);
      document.removeEventListener('mouseup', handle_up);
    };

    document.addEventListener('pointermove', handle_move, { passive: false });
    document.addEventListener('pointerup', handle_up);
    document.addEventListener('mousemove', handle_move, { passive: false });
    document.addEventListener('mouseup', handle_up);
  };

  const handle_minimize = () => {
    set_is_minimized(!is_minimized);
  };

  const handle_maximize = () => {
    if(is_maximized) 
      {
      set_window_position(previous_position);
      set_is_maximized(false);
    } else 
    {
      set_previous_position(window_position);
      set_window_position({ x: 0, y: 0 });
      set_is_maximized(true);
    }
  };

  const handle_icon_mouse_down = (e, iconId) => {
    e.preventDefault();
    e.stopPropagation();
    
    const icon = desktop_icons.find(i => i.id === iconId);

    if(!icon) return;
    
    if(!selected_icon_ids.includes(iconId))
    {
      set_selected_icon_ids([iconId]);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    set_drag_icon_offset({
      x: e.clientX - icon.position.x,
      y: e.clientY - icon.position.y
    });
    
    set_dragging_icon(iconId);
    document.body.style.userSelect = 'none';
  };

  const handle_icon_mouse_move = (e) => {
    if(!dragging_icon) return;
    
    e.preventDefault();
    const new_x = e.clientX - drag_icon_offset.x;
    const new_y = e.clientY - drag_icon_offset.y;
    
    const bounded_x = Math.max(0, Math.min(new_x, window.innerWidth - 80));
    const bounded_y = Math.max(0, Math.min(new_y, window.innerHeight - 100));
    
    const draggedIcon = desktop_icons.find(icon => icon.id === dragging_icon);
    
    if(draggedIcon && draggedIcon.type === 'file') 
      {
      const recyclebin = desktop_icons.find(icon => icon.id === 'recycle-bin');
      if(recyclebin) 
        {
        const distance = Math.sqrt(
          Math.pow(bounded_x - recyclebin.position.x, 2) + 
          Math.pow(bounded_y - recyclebin.position.y, 2)
        );
        
        const recycle_bin_element = document.querySelector('[data-id="recycle-bin"]');

        if(recycle_bin_element) 
          {
          if(distance < 80) 
            {
            recycle_bin_element.classList.add('drop-hover');
          } else 
          {
            recycle_bin_element.classList.remove('drop-hover');
          }
        }
      }
    }
    
    set_desktop_icons(prev => prev.map(icon => 
      icon.id === dragging_icon 
        ? { ...icon, position: { x: bounded_x, y: bounded_y }}
        : icon
    ));
  };

  const handle_icon_mouse_up = () => {
    const recycle_bin_element = document.querySelector('[data-id="recycle-bin"]');

    if(recycle_bin_element) 
      {
      recycle_bin_element.classList.remove('drop-hover');
    }
    
    if(dragging_icon) 
      {
      const recycle_bin = desktop_icons.find(icon => icon.id === 'recycle-bin');
      const dragged_icon = desktop_icons.find(icon => icon.id === dragging_icon);
      
      if(recycle_bin && dragged_icon && dragged_icon.type === 'file') 
        {
        const distance = Math.sqrt(
          Math.pow(dragged_icon.position.x - recycle_bin.position.x, 2) + 
          Math.pow(dragged_icon.position.y - recycle_bin.position.y, 2)
        );
        
        if(distance < 80) 
          {
          set_recycle_bin_files(prev => [...prev, dragged_icon]);
          set_desktop_icons(prev => prev.filter(icon => icon.id !== dragging_icon));
          set_user_files(prev => prev.filter(file => file.id !== dragging_icon));
          
          set_desktop_icons(prev => prev.map(icon => 
            icon.id === 'recycle-bin' 
              ? { 
                  ...icon, 
                  icon: WIN98_ICONS.recycle_full
                }
              : icon
          ));
        }
      }
    }
    
    // Snap to desktop grid (80px x 80px)
    if(dragging_icon)
    {
      const GRID_X = 80;
      const GRID_Y = 80;
      const OFFSET_X = 20;
      const OFFSET_Y = 20;

      set_desktop_icons(prev => prev.map(icon => {
        if(icon.id === dragging_icon)
        {
          const snap_x = Math.max(10, Math.min(window.innerWidth - 80, Math.round((icon.position.x - OFFSET_X) / GRID_X) * GRID_X + OFFSET_X));
          const snap_y = Math.max(10, Math.min(window.innerHeight - 100, Math.round((icon.position.y - OFFSET_Y) / GRID_Y) * GRID_Y + OFFSET_Y));
          return {
            ...icon,
            position: { x: snap_x, y: snap_y }
          };
        }
        return icon;
      }));
    }

    set_dragging_icon(null);
    document.body.style.userSelect = '';
  };

  const open_file_in_notepad = (file) => {
    set_current_notepad_file({
      id: file.id,
      name: file.name,
      content: file.content || ''
    });
    play_sound('open');
    open_window('notepad');
  };

  const handle_save_file = (file_id, new_content) => {
    set_user_files(prev => prev.map(f => f.id === file_id ? { ...f, content: new_content } : f));
    set_desktop_icons(prev => prev.map(icon => icon.id === file_id ? { ...icon, content: new_content } : icon));
  };

  const handle_run_command = (cmd_str) => {
    const raw = cmd_str.trim();
    const lower = raw.toLowerCase();

    if(lower === 'calc' || lower === 'calculator')
    {
      open_window('calculator');
    } else if(lower === 'recycle' || lower === 'recycle_bin' || lower === 'trash')
    {
      open_window('recycle_bin');
    } else if(lower === 'notepad')
    {
      set_current_notepad_file(null);
      open_window('notepad');
    } else if(lower === 'cmd' || lower === 'dos' || lower === 'command')
    {
      open_window('msdos');
    } else if(lower === 'resume')
    {
      open_window('resume');
    } else if(lower === 'projects')
    {
      open_window('projects');
    } else if(lower === 'contact')
    {
      open_window('contact');
    } else if(lower === 'portfolio' || lower === 'portfolio.exe')
    {
      focus_window('portfolio');
      set_is_minimized(false);
    } else if(lower === 'theme' || lower === 'themes' || lower === 'control panel')
    {
      set_theme_manager_open(true);
    } else if(lower === 'screensaver')
    {
      set_screensaver_active(true);
    } else if(raw.startsWith('http://') || raw.startsWith('https://'))
    {
      window.open(raw, '_blank');
    } else 
    {
      open_window('msdos');
    }
  };

  const create_new_file = (type, x = 150, y = 150) => {
    const file_types = {
      'text':  { icon: WIN98_ICONS.notepad, extension: '.txt' },
      'folder': { icon: WIN98_ICONS.directory_closed, extension: '' },
      'image': { icon: WIN98_ICONS.image, extension: '.bmp' },
      'exe':  { icon: WIN98_ICONS.executable, extension: '.exe' }
    };

    const file_info = file_types[type] || file_types['text'];
    const file_id = `file-${file_counter}`;
    const file_name = type === 'text' 
      ? `New Document ${file_counter}.txt`
      : `New ${type.charAt(0).toUpperCase() + type.slice(1)} ${file_counter}${file_info.extension}`;

    const new_file = {
      id: file_id,
      name: file_name,
      position: { x, y },
      icon: file_info.icon,
      type: 'file',
      file_type: type,
      content: type === 'text' ? 'Hello from Windows 98!\nType your text here and save.' : '',
      created: new Date()
    };

    if(type === 'text')
    {
      new_file.action = () => open_file_in_notepad(new_file);
    } else if(type === 'folder')
    {
      new_file.action = () => open_window('projects');
    } else if(type === 'exe')
    {
      new_file.action = () => open_window('msdos');
    } else 
    {
      new_file.action = () => alert('Opening ' + file_name);
    }

    set_user_files(prev => [...prev, new_file]);
    set_desktop_icons(prev => [...prev, new_file]);
    set_file_counter(prev => prev + 1);
  };

  const hide_context_menu = () => {
    set_context_menu_data(null);
  };

  const open_desktop_context_menu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    set_context_menu_data({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          label: 'Arrange by Name',
          icon: WIN98_ICONS.directory_open,
          action: () => {
            set_desktop_icons(prev => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
          }
        },
        {
          label: 'Arrange by Type',
          icon: WIN98_ICONS.file_lines,
          action: () => {
            set_desktop_icons(prev => [...prev].sort((a, b) => (a.type || '').localeCompare(b.type || '')));
          }
        },
        {
          label: 'Line up Icons',
          action: () => {
            set_desktop_icons(prev => prev.map((icon, idx) => ({
              ...icon,
              position: {
                x: 20 + Math.floor(idx / 6) * 85,
                y: 20 + (idx % 6) * 80
              }
            })));
          }
        },
        { is_separator: true },
        {
          label: 'Refresh',
          icon: WIN98_ICONS.refresh,
          action: () => {}
        },
        { is_separator: true },
        {
          label: 'Paste',
          disabled: true
        },
        {
          label: 'Paste Shortcut',
          disabled: true
        },
        { is_separator: true },
        {
          label: 'New Folder',
          icon: WIN98_ICONS.directory_closed,
          action: () => create_new_file('folder', e.clientX + 10, e.clientY + 10)
        },
        {
          label: 'New Text Document',
          icon: WIN98_ICONS.notepad_file,
          action: () => create_new_file('text', e.clientX + 10, e.clientY + 10)
        },
        {
          label: 'New Bitmap Image',
          icon: WIN98_ICONS.image,
          action: () => create_new_file('image', e.clientX + 10, e.clientY + 10)
        },
        {
          label: 'New Program',
          icon: WIN98_ICONS.executable,
          action: () => create_new_file('exe', e.clientX + 10, e.clientY + 10)
        },
        { is_separator: true },
        {
          label: 'Screen Saver Preview',
          icon: WIN98_ICONS.monitor,
          action: () => set_screensaver_active(true)
        },
        {
          label: 'Properties',
          icon: WIN98_ICONS.themes,
          action: () => set_theme_manager_open(true)
        }
      ]
    });
  };

  const open_icon_context_menu = (e, icon) => {
    e.preventDefault();
    e.stopPropagation();
    set_selected_icon_ids([icon.id]);

    const items = [
      {
        label: 'Open',
        action: () => {
          play_sound('open');
          icon.action();
        }
      },
      {
        label: 'Explore',
        icon: WIN98_ICONS.directory_open,
        action: () => {
          play_sound('open');
          icon.action();
        }
      },
      { is_separator: true }
    ];

    if(icon.id === 'recycle-bin')
    {
      items.push({
        label: 'Empty Recycle Bin',
        icon: WIN98_ICONS.recycle_empty,
        disabled: recycle_bin_files.length === 0,
        action: () => empty_recycle_bin()
      });
    } else if(icon.type === 'file')
    {
      items.push({
        label: 'Delete',
        icon: WIN98_ICONS.recycle_empty,
        action: () => {
          set_recycle_bin_files(prev => [...prev, icon]);
          set_desktop_icons(prev => prev.filter(i => i.id !== icon.id));
          set_user_files(prev => prev.filter(f => f.id !== icon.id));
          set_desktop_icons(prev => prev.map(i => 
            i.id === 'recycle-bin' 
              ? { ...i, icon: WIN98_ICONS.recycle_full }
              : i
          ));
        }
      });
      items.push({
        label: 'Rename',
        action: () => {
          const new_name = prompt('Enter new file name:', icon.name);
          if(new_name && new_name.trim())
          {
            set_desktop_icons(prev => prev.map(i => i.id === icon.id ? { ...i, name: new_name.trim() } : i));
            set_user_files(prev => prev.map(f => f.id === icon.id ? { ...f, name: new_name.trim() } : f));
          }
        }
      });
    }

    items.push({ is_separator: true });
    items.push({
      label: 'Properties',
      icon: WIN98_ICONS.msg_info,
      action: () => {
        alert('Properties for ' + icon.name + ':\nType: ' + (icon.type === 'file' ? (icon.file_type || 'Document') : 'Application') + '\nLocation: Desktop\nStatus: Ready');
      }
    });

    set_context_menu_data({
      x: e.clientX,
      y: e.clientY,
      items
    });
  };

  const open_portfolio_window_menu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    focus_window('portfolio');
    set_context_menu_data({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          label: 'Restore',
          disabled: !is_maximized && !is_minimized,
          action: () => {
            if(is_minimized) set_is_minimized(false);
            if(is_maximized) handle_maximize();
          }
        },
        {
          label: 'Minimize',
          disabled: is_minimized,
          action: () => handle_minimize()
        },
        {
          label: 'Maximize',
          disabled: is_maximized,
          action: () => handle_maximize()
        },
        { is_separator: true },
        {
          label: 'Close',
          shortcut: 'Alt+F4',
          action: () => router.push('/')
        }
      ]
    });
  };

  const open_child_window_menu = (e, window_id) => {
    e.preventDefault();
    e.stopPropagation();
    focus_window(window_id);
    const is_min = minimized_windows.includes(window_id);
    set_context_menu_data({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          label: 'Restore',
          disabled: !is_min,
          action: () => {
            if(is_min) set_minimized_windows(prev => prev.filter(id => id !== window_id));
          }
        },
        {
          label: 'Minimize',
          disabled: is_min,
          action: () => minimize_child_window(window_id)
        },
        { is_separator: true },
        {
          label: 'Close',
          shortcut: 'Alt+F4',
          action: () => closeWindow(window_id)
        }
      ]
    });
  };

  // empty recycle bin function
  const empty_recycle_bin = () => {
    set_recycle_bin_files([]);
    set_desktop_icons(prev => prev.map(icon => 
      icon.id === 'recycle-bin' 
        ? { ...icon, icon: WIN98_ICONS.recycle_empty }
        : icon
    ));
  };

  // update recycle bin icon action & status
  useEffect(() => {
    set_desktop_icons(prev => prev.map(icon => 
      icon.id === 'recycle-bin' 
        ? { 
            ...icon,
            icon: recycle_bin_files.length > 0 ? WIN98_ICONS.recycle_full : WIN98_ICONS.recycle_empty,
            action: () => open_window('recycle_bin')
          }
        : icon
    ));
  }, [recycle_bin_files]);

  const handle_restore_recycle_item = (file_id) => {
    const file_to_restore = recycle_bin_files.find(f => f.id === file_id);
    if(!file_to_restore) return;

    set_recycle_bin_files(prev => prev.filter(f => f.id !== file_id));
    set_desktop_icons(prev => [...prev, file_to_restore]);
    if(file_to_restore.type === 'file')
    {
      set_user_files(prev => [...prev, file_to_restore]);
    }
  };

  const handle_restore_all_recycle = () => {
    if(recycle_bin_files.length === 0) return;
    set_desktop_icons(prev => [...prev, ...recycle_bin_files]);
    set_user_files(prev => [...prev, ...recycle_bin_files.filter(f => f.type === 'file')]);
    set_recycle_bin_files([]);
  };

  const handle_delete_recycle_forever = (file_id) => {
    set_recycle_bin_files(prev => prev.filter(f => f.id !== file_id));
  };

  useEffect(() => {
    if(dragging_icon) 
      {
      document.addEventListener('mousemove', handle_icon_mouse_move);
      document.addEventListener('mouseup', handle_icon_mouse_up);
      
      return () => {
        document.removeEventListener('mousemove', handle_icon_mouse_move);
        document.removeEventListener('mouseup', handle_icon_mouse_up);
      };
    }
  }, [dragging_icon, drag_icon_offset]);

  // Desktop keyboard navigation (Enter to open, arrow keys to navigate)
  useEffect(() => {
    const handle_key_down = (e) => {
      if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if(e.altKey && e.key === 'F4')
      {
        e.preventDefault();
        set_shutdown_dialog_open(true);
        return;
      }

      if(e.key === 'Enter' && selected_icon_ids.length > 0)
      {
        const target_id = selected_icon_ids[0];
        const icon = desktop_icons.find(i => i.id === target_id);
        if(icon)
        {
          play_sound('open');
          icon.action();
        }
      } else if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key))
      {
        e.preventDefault();
        if(desktop_icons.length === 0) return;

        const current_idx = desktop_icons.findIndex(i => selected_icon_ids.includes(i.id));
        let next_idx = 0;

        if(current_idx === -1)
        {
          next_idx = 0;
        } else if(e.key === 'ArrowDown' || e.key === 'ArrowRight')
        {
          next_idx = (current_idx + 1) % desktop_icons.length;
        } else if(e.key === 'ArrowUp' || e.key === 'ArrowLeft')
        {
          next_idx = (current_idx - 1 + desktop_icons.length) % desktop_icons.length;
        }

        play_sound('click');
        set_selected_icon_ids([desktop_icons[next_idx].id]);
      }
    };

    window.addEventListener('keydown', handle_key_down);
    return () => window.removeEventListener('keydown', handle_key_down);
  }, [desktop_icons, selected_icon_ids]);

  const handle_desktop_mouse_down = (e) => {
    if(e.button !== 0) return;
    if(e.target.closest('.window') || e.target.closest('.status-bar') || e.target.closest('.desktop-icon') || e.target.closest('.context-menu') || e.target.closest('.win98-context-menu')) return;

    hide_context_menu();
    set_start_menu_open(false);
    set_selected_icon_ids([]);

    const start_x = e.clientX;
    const start_y = e.clientY;

    set_selection_box({
      start_x,
      start_y,
      current_x: start_x,
      current_y: start_y
    });

    const handle_selection_move = (move_e) => {
      const cur_x = move_e.clientX;
      const cur_y = move_e.clientY;

      set_selection_box({
        start_x,
        start_y,
        current_x: cur_x,
        current_y: cur_y
      });

      const box_left = Math.min(start_x, cur_x);
      const box_top = Math.min(start_y, cur_y);
      const box_right = Math.max(start_x, cur_x);
      const box_bottom = Math.max(start_y, cur_y);

      const matched_ids = [];
      const icon_elements = document.querySelectorAll('.desktop-icon');

      icon_elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const overlaps = !(
          rect.right < box_left ||
          rect.left > box_right ||
          rect.bottom < box_top ||
          rect.top > box_bottom
        );

        if(overlaps)
        {
          const id = el.getAttribute('data-id');
          if(id) matched_ids.push(id);
        }
      });

      set_selected_icon_ids(matched_ids);
    };

    const handle_selection_up = () => {
      set_selection_box(null);
      document.removeEventListener('mousemove', handle_selection_move);
      document.removeEventListener('mouseup', handle_selection_up);
    };

    document.addEventListener('mousemove', handle_selection_move);
    document.addEventListener('mouseup', handle_selection_up);
  };

  if(is_loading) 
    {
    return <Windows98Loader onComplete = {handleLoaderComplete} />;
  }

  return (
    <div 
      className = {`win98-container ${is_dragging ? 'dragging' : ''}`}
      style = {{ 
        minHeight: '100vh', 
        background: desktop_wallpaper,
        fontFamily: 'MS Sans Serif, sans-serif',
        padding: '20px',
        overflow: 'hidden',
        position: 'relative'
      }}
      onContextMenu = {open_desktop_context_menu}
      onMouseDown = {handle_desktop_mouse_down}
      onClick = {() => { hide_context_menu(); set_start_menu_open(false); }}
    >
            {/* Window Drag Wireframe (Performance mode) */}
      {is_dragging && window_drag_ghost && (
        <div 
          className = "win98-window-wireframe"
          style = {{
            left: `${window_drag_ghost.x}px`,
            top: `${window_drag_ghost.y}px`,
            width: `${window_drag_ghost.width}px`,
            height: `${window_drag_ghost.height}px`
          }}
        />
      )}

      {/* Main Content Window */}
      <div 
        ref = {window_ref}
        className = "window" 
        style = {{
          maxWidth: is_maximized ? '100vw' : '800px',
          width: is_maximized ? '100vw' : 'auto',
          height: is_maximized ? '100vh' : 'auto',
          position: 'absolute',
          left: is_maximized ? '0px' : `${window_position.x}px`,
          top: is_maximized ? '0px' : `${window_position.y}px`,
          cursor: is_dragging ? 'grabbing' : 'default',
          zIndex: window_z_indexes.portfolio,
          display: is_minimized ? 'none' : 'block',
          color: '#000000'
        }}
        onClick = {(e) => {
          e.stopPropagation();
          focus_window('portfolio');
        }}
      >
        <div 
          ref = {titlebar_ref}
          className = {`title-bar ${active_window_id === 'portfolio' ? '' : 'inactive'}`}
          onPointerDown = {handle_pointer_down}
          onMouseDown = {handle_pointer_down}
          onContextMenu = {open_portfolio_window_menu}
          style = {{ 
            cursor: is_dragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            touchAction: 'none'
          }}
        >
          <div className = "title-bar-text" style = {{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Image 
                src = {getWin98Icon(WIN98_ICONS.directory_open)}
                alt = "Portfolio"
                width = {16}
                height = {16}
                unoptimized
                style = {{ imageRendering: 'pixelated', flexShrink: 0 }}
              />
            Maksym Kopychko - Portfolio.exe
          </div>
          <div className = "title-bar-controls">
            <button aria-label = "Minimize" className = "minimize" onClick = {handle_minimize} />
            <button aria-label = {is_maximized ? "Restore" : "Maximize"} className = {is_maximized ? "restore" : "maximize"} onClick = {handle_maximize} />
            <button aria-label = "Close" className = "close" onClick = {() => router.push('/')} title = "Exit Windows 98 Mode" />
          </div>
        </div>

        <div className = "window-body" style = {{ padding: '16px', color: '#000000' }}>
          {/* User Info */}
          <fieldset style = {{ marginBottom: '16px' }}>
            <legend style = {{ display: 'flex', alignItems: 'center', gap: '6px', color: '#000080', fontWeight: 'bold' }}>
              <Image 
                src = {getWin98Icon(WIN98_ICONS.users)} 
                alt = "" 
                width = {16} 
                height = {16} 
                unoptimized 
                style = {{ imageRendering: 'pixelated' }} 
              />
              User Information
            </legend>
            <div style = {{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style = {{
                width: '64px',
                height: '64px',
                background: '#c0c0c0',
                border: '2px inset #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Image 
                  src = {getWin98Icon(WIN98_ICONS.computer)} 
                  alt = "Maksym Kopychko" 
                  width = {44} 
                  height = {44} 
                  unoptimized 
                  style = {{ imageRendering: 'pixelated' }} 
                />
              </div>
              <div>
                <div style = {{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#000000' }}>
                  Maksym Kopychko (Archie242)
                </div>
                <div style = {{ fontSize: '11px', color: '#000080', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Image 
                    src = {getWin98Icon(WIN98_ICONS.cd_audio)} 
                    alt = "" 
                    width = {14} 
                    height = {14} 
                    unoptimized 
                    style = {{ imageRendering: 'pixelated' }} 
                  />
                  Game & Software Developer
                </div>
                <div style = {{ fontSize: '11px', color: '#444444', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Image 
                    src = {getWin98Icon(WIN98_ICONS.globe)} 
                    alt = "" 
                    width = {14} 
                    height = {14} 
                    unoptimized 
                    style = {{ imageRendering: 'pixelated' }} 
                  />
                  Okhtyrka, Ukraine • 
                  <Image 
                    src = {getWin98Icon(WIN98_ICONS.users)} 
                    alt = "" 
                    width = {14} 
                    height = {14} 
                    unoptimized 
                    style = {{ imageRendering: 'pixelated' }} 
                  />
                  {get_age()} years old
                </div>
              </div>
            </div>
          </fieldset>

          {/* About */}
          <fieldset style = {{ marginBottom: '16px' }}>
            <legend style = {{ display: 'flex', alignItems: 'center', gap: '6px', color: '#000080', fontWeight: 'bold' }}>
              <Image 
                src = {getWin98Icon(WIN98_ICONS.notepad_file)} 
                alt = "" 
                width = {16} 
                height = {16} 
                unoptimized 
                style = {{ imageRendering: 'pixelated' }} 
              />
              About
            </legend>
            <div style = {{ fontSize: '11px', lineHeight: '1.4', padding: '8px', color: '#000000' }}>
              Passionate about game development, systems programming, and modern software architecture.
              Building high-performance interactive experiences with Unreal Engine, C++, Lua, Python, React, and Next.js.
            </div>
          </fieldset>

          {/* Skills */}
          <fieldset style = {{ marginBottom: '16px' }}>
            <legend style = {{ display: 'flex', alignItems: 'center', gap: '6px', color: '#000080', fontWeight: 'bold' }}>
              <Image 
                src = {getWin98Icon(WIN98_ICONS.gears)} 
                alt = "" 
                width = {16} 
                height = {16} 
                unoptimized 
                style = {{ imageRendering: 'pixelated' }} 
              />
              Technical Skills
            </legend>
            <div style = {{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '4px' }}>
              <div>
                <div style = {{ fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#000080', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Image 
                    src = {getWin98Icon(WIN98_ICONS.cmd)} 
                    alt = "" 
                    width = {14} 
                    height = {14} 
                    unoptimized 
                    style = {{ imageRendering: 'pixelated' }} 
                  />
                  Programming Languages
                </div>
                <div className = "sunken-panel" style = {{ padding: '8px', fontSize: '11px', lineHeight: '1.5', background: '#ffffff', color: '#000000', border: '2px inset #808080' }}>
                  • C / C++ / C#<br/>
                  • Python<br/>
                  • JavaScript / TypeScript<br/>
                  • Lua
                </div>
              </div>
              <div>
                <div style = {{ fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#000080', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Image 
                    src = {getWin98Icon(WIN98_ICONS.cd_audio)} 
                    alt = "" 
                    width = {14} 
                    height = {14} 
                    unoptimized 
                    style = {{ imageRendering: 'pixelated' }} 
                  />
                  Game Development & Web
                </div>
                <div className = "sunken-panel" style = {{ padding: '8px', fontSize: '11px', lineHeight: '1.5', background: '#ffffff', color: '#000000', border: '2px inset #808080' }}>
                  • Unreal Engine / Unity<br/>
                  • React / Next.js / Tailwind<br/>
                  • Blender / 3D Graphics<br/>
                  • Gameplay Systems & AI
                </div>
              </div>
            </div>
          </fieldset>

          {/* Navigation Buttons */}
          <div style = {{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick = {() => open_window('projects')} 
              style = {{ minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '26px' }}
            >
              <Image 
                src = {getWin98Icon(WIN98_ICONS.directory_open)} 
                alt = "" 
                width = {16} 
                height = {16} 
                unoptimized 
                style = {{ imageRendering: 'pixelated' }} 
              />
              View Projects
            </button>
            <button 
              onClick = {() => open_window('contact')} 
              style = {{ minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '26px' }}
            >
              <Image 
                src = {getWin98Icon(WIN98_ICONS.envelope)} 
                alt = "" 
                width = {16} 
                height = {16} 
                unoptimized 
                style = {{ imageRendering: 'pixelated' }} 
              />
              Contact Me
            </button>
            <button 
              onClick = {() => open_window('resume')} 
              style = {{ minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '26px' }}
            >
              <Image 
                src = {getWin98Icon(WIN98_ICONS.file_lines)} 
                alt = "" 
                width = {16} 
                height = {16} 
                unoptimized 
                style = {{ imageRendering: 'pixelated' }} 
              />
              Resume
            </button>
            <button 
              onClick = {() => router.push('/')}
              style = {{ 
                minWidth: '130px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Image 
                src = {getWin98Icon(WIN98_ICONS.windows)} 
                alt = "" 
                width = {16} 
                height = {16} 
                unoptimized 
                style = {{ imageRendering: 'pixelated' }} 
              />
              Exit Win98
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className = "status-bar">
          <p className = "status-bar-field">Ready</p>
          <p className = "status-bar-field" style = {{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Image 
              src = {getWin98Icon(WIN98_ICONS.windows)} 
              alt = "" 
              width = {12} 
              height = {12} 
              unoptimized 
              style = {{ imageRendering: 'pixelated' }} 
            />
            Windows 98 Mode Active
          </p>
        </div>
      </div>

      {/* Taskbar — 98-style */}
      <div 
        className = "status-bar"
        style = {{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30px',
          background: '#c0c0c0',
          borderTop: '2px solid #dfdfdf',
          borderBottom: '1px solid #000',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2px',
          zIndex: 1000,
          fontSize: '11px',
          gap: '2px'
        }}
      >
        {/* Start Button — opens Start menu */}
        <button 
          onClick = {(e) => { e.stopPropagation(); set_start_menu_open(prev => !prev); }}
          style = {{ 
            height: '24px', 
            fontSize: '11px', 
            fontWeight: 'bold',
            margin: '0 2px 0 0',
            padding: '0 8px',
            background: start_menu_open ? '#808080' : '#c0c0c0',
            border: start_menu_open ? '1px inset #808080' : '1px outset #dfdfdf',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          {!icon_fallback['start'] ? (
            <Image 
              src = {getWin98Icon(WIN98_ICONS.start_menu)}
              alt = "Start"
              width = {16}
              height = {16}
              unoptimized
              style = {{ imageRendering: 'pixelated' }}
              onError = {() => set_icon_fallback(f => ({ ...f, start: true }))}
            />
          ) : null}
          Start
        </button>

        {/* Quick Launch Handle */}
        <div className = "win98-taskbar-handle" />

        {/* Quick Launch Bar */}
        <div className = "win98-quick-launch">
          <button 
            title = "Show Desktop"
            onClick = {() => { set_is_minimized(true); set_start_menu_open(false); }}
          >
            <Image 
              src = {getWin98Icon(WIN98_ICONS.monitor)} 
              alt = "Show Desktop" 
              width = {16} 
              height = {16} 
              unoptimized 
              style = {{ imageRendering: 'pixelated' }} 
            />
          </button>
          <button 
            title = "Internet Explorer / Web"
            onClick = {() => open_window('projects')}
          >
            <Image 
              src = {getWin98Icon(WIN98_ICONS.globe)} 
              alt = "Internet" 
              width = {16} 
              height = {16} 
              unoptimized 
              style = {{ imageRendering: 'pixelated' }} 
            />
          </button>
          <button 
            title = "Notepad"
            onClick = {() => open_window('notepad')}
          >
            <Image 
              src = {getWin98Icon(WIN98_ICONS.notepad)} 
              alt = "Notepad" 
              width = {16} 
              height = {16} 
              unoptimized 
              style = {{ imageRendering: 'pixelated' }} 
            />
          </button>
          <button 
            title = "MS-DOS Prompt"
            onClick = {() => open_window('msdos')}
          >
            <Image 
              src = {getWin98Icon(WIN98_ICONS.cmd)} 
              alt = "MS-DOS Prompt" 
              width = {16} 
              height = {16} 
              unoptimized 
              style = {{ imageRendering: 'pixelated' }} 
            />
          </button>
        </div>

        {/* Divider between Quick Launch and Tasks */}
        <div className = "win98-taskbar-divider" />

        {/* Running Programs */}
        <div style = {{ 
          flex: 1, 
          height: '24px', 
          display: 'flex',
          alignItems: 'center',
          padding: '0 2px',
          gap: '2px',
          overflow: 'hidden'
        }}>
          <button
            onClick = {() => { toggle_window('portfolio'); set_start_menu_open(false); }}
            onContextMenu = {open_portfolio_window_menu}
            className = {`win98-taskbar-item ${active_window_id === 'portfolio' && !is_minimized ? 'active' : ''}`}
          >
            {!icon_fallback['taskbar-portfolio'] ? <Image src = {getWin98Icon(WIN98_ICONS.directory_open)} alt = "Portfolio" width = {16} height = {16} unoptimized style = {{ imageRendering: 'pixelated' }} onError = {() => set_icon_fallback(f => ({ ...f, 'taskbar-portfolio': true }))} /> : null}
            Portfolio
          </button>
          
          {active_windows.map((windowId) => {
            const windowInfo = {
              resume: { title: 'Resume', icon: WIN98_ICONS.users },
              projects: { title: 'Projects', icon: WIN98_ICONS.directory_open },
              contact: { title: 'Contact', icon: WIN98_ICONS.envelope },
              notepad: { title: 'Notepad', icon: WIN98_ICONS.notepad },
              msdos: { title: 'MS-DOS Prompt', icon: WIN98_ICONS.cmd },
              calculator: { title: 'Calculator', icon: WIN98_ICONS.executable },
              recycle_bin: { title: 'Recycle Bin', icon: recycle_bin_files.length > 0 ? WIN98_ICONS.recycle_full : WIN98_ICONS.recycle_empty }
            };
            const info = windowInfo[windowId];
            if(!info) return null;
            const key = `taskbar-${windowId}`;
            const is_win_active = active_window_id === windowId && !minimized_windows.includes(windowId);

            return (
              <button
                key = {windowId}
                onClick = {() => { toggle_window(windowId); set_start_menu_open(false); }}
                onContextMenu = {(e) => open_child_window_menu(e, windowId)}
                className = {`win98-taskbar-item ${is_win_active ? 'active' : ''}`}
              >
                {!icon_fallback[key] ? <Image src = {getWin98Icon(info.icon)} alt = {info.title} width = {16} height = {16} unoptimized style = {{ imageRendering: 'pixelated' }} onError = {() => set_icon_fallback(f => ({ ...f, [key]: true }))} /> : null}
                {info.title}
              </button>
            );
          })}
        </div>

        {/* Divider before System Tray */}
        <div className = "win98-taskbar-divider" />

        {/* System Tray — 98 style */}
        <div 
          className = "win98-system-tray"
          title = {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        >
          <button
            className = {`win98-tray-icon-btn ${is_muted ? 'muted' : ''}`}
            title = "Volume"
            onClick = {() => set_volume_popup_open(v => !v)}
          >
            <Image 
              src = {getWin98Icon(WIN98_ICONS.cd_audio)} 
              alt = "Audio" 
              width = {16} 
              height = {16} 
              unoptimized 
              style = {{ imageRendering: 'pixelated' }} 
            />
          </button>
          <span style = {{ fontSize: '11px', padding: '0 4px', whiteSpace: 'nowrap' }}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Start menu popup — Authentic Windows 98 Nested Menu */}
      {start_menu_open && (
        <>
          <div 
            style = {{ position: 'fixed', inset: 0, zIndex: 10000 }}
            onClick = {() => { set_start_menu_open(false); set_active_start_submenu(null); }}
            aria-hidden = "true"
          />
          <div 
            className = "win98-start-menu"
            onClick = {(e) => e.stopPropagation()}
          >
            {/* Windows 98 Vertical Gradient Banner */}
            <div className = "win98-start-menu-sidebar">
              <span>WINDOWS 98</span>
            </div>

            {/* Menu Items */}
            <div className = "win98-start-menu-content">
              {/* Programs Menu Item */}
              <div 
                className = {`win98-start-menu-item ${active_start_submenu === 'programs' ? 'active' : ''}`}
                onMouseEnter = {() => set_active_start_submenu('programs')}
                onClick = {() => set_active_start_submenu(active_start_submenu === 'programs' ? null : 'programs')}
              >
                <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Image src = {getWin98Icon(WIN98_ICONS.directory_open)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                  <span>Programs</span>
                </div>
                <span style = {{ fontSize: '9px', marginLeft: '12px' }}>▶</span>

                {/* Programs Submenu */}
                {active_start_submenu === 'programs' && (
                  <div className = "win98-start-submenu" onClick = {(e) => e.stopPropagation()}>
                    <div 
                      className = "win98-start-menu-item"
                      onClick = {() => { open_window('notepad'); set_start_menu_open(false); set_active_start_submenu(null); }}
                    >
                      <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image src = {getWin98Icon(WIN98_ICONS.notepad)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                        <span>Notepad</span>
                      </div>
                    </div>
                    <div 
                      className = "win98-start-menu-item"
                      onClick = {() => { open_window('msdos'); set_start_menu_open(false); set_active_start_submenu(null); }}
                    >
                      <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image src = {getWin98Icon(WIN98_ICONS.cmd)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                        <span>MS-DOS Prompt</span>
                      </div>
                    </div>
                    <div 
                      className = "win98-start-menu-item"
                      onClick = {() => { open_window('calculator'); set_start_menu_open(false); set_active_start_submenu(null); }}
                    >
                      <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image src = {getWin98Icon(WIN98_ICONS.executable)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                        <span>Calculator</span>
                      </div>
                    </div>
                    <div className = "win98-start-menu-separator" />
                    <div 
                      className = "win98-start-menu-item"
                      onClick = {() => { focus_window('portfolio'); set_is_minimized(false); set_start_menu_open(false); set_active_start_submenu(null); }}
                    >
                      <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image src = {getWin98Icon(WIN98_ICONS.executable)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                        <span>Portfolio.exe</span>
                      </div>
                    </div>
                    <div 
                      className = "win98-start-menu-item"
                      onClick = {() => { open_window('resume'); set_start_menu_open(false); set_active_start_submenu(null); }}
                    >
                      <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image src = {getWin98Icon(WIN98_ICONS.users)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                        <span>Resume</span>
                      </div>
                    </div>
                    <div 
                      className = "win98-start-menu-item"
                      onClick = {() => { open_window('projects'); set_start_menu_open(false); set_active_start_submenu(null); }}
                    >
                      <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image src = {getWin98Icon(WIN98_ICONS.directory_open)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                        <span>Projects</span>
                      </div>
                    </div>
                    <div 
                      className = "win98-start-menu-item"
                      onClick = {() => { open_window('contact'); set_start_menu_open(false); set_active_start_submenu(null); }}
                    >
                      <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image src = {getWin98Icon(WIN98_ICONS.envelope)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                        <span>Contact</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings Menu Item */}
              <div 
                className = {`win98-start-menu-item ${active_start_submenu === 'settings' ? 'active' : ''}`}
                onMouseEnter = {() => set_active_start_submenu('settings')}
                onClick = {() => set_active_start_submenu(active_start_submenu === 'settings' ? null : 'settings')}
              >
                <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Image src = {getWin98Icon(WIN98_ICONS.gears)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                  <span>Settings</span>
                </div>
                <span style = {{ fontSize: '9px', marginLeft: '12px' }}>▶</span>

                {/* Settings Submenu */}
                {active_start_submenu === 'settings' && (
                  <div className = "win98-start-submenu" onClick = {(e) => e.stopPropagation()}>
                    <div 
                      className = "win98-start-menu-item"
                      onClick = {() => { set_theme_manager_open(true); set_start_menu_open(false); set_active_start_submenu(null); }}
                    >
                      <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image src = {getWin98Icon(WIN98_ICONS.themes)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                        <span>Themes & Display...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className = "win98-start-menu-separator" />

              {/* Run... */}
              <div 
                className = "win98-start-menu-item"
                onMouseEnter = {() => set_active_start_submenu(null)}
                onClick = {() => { set_start_menu_open(false); set_active_start_submenu(null); set_run_dialog_open(true); }}
              >
                <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Image src = {getWin98Icon(WIN98_ICONS.executable)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                  <span>Run...</span>
                </div>
              </div>

              <div className = "win98-start-menu-separator" />

              {/* Shut Down... */}
              <div 
                className = "win98-start-menu-item"
                onMouseEnter = {() => set_active_start_submenu(null)}
                onClick = {() => { set_start_menu_open(false); set_active_start_submenu(null); set_shutdown_dialog_open(true); }}
              >
                <div style = {{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Image src = {getWin98Icon(WIN98_ICONS.computer)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
                  <span>Shut Down...</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop Icons */}
      {desktop_icons.map((icon) => {
        const is_selected = selected_icon_ids.includes(icon.id);

        return (
          <div
            key = {icon.id}
            className = {`desktop-icon ${dragging_icon === icon.id ? 'dragging' : ''} ${is_selected ? 'selected' : ''}`}
            data-id = {icon.id}
            data-type = {icon.type}
            style = {{
              position: 'absolute',
              left: `${icon.position.x}px`,
              top: `${icon.position.y}px`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: dragging_icon === icon.id ? 'grabbing' : 'pointer',
              padding: '8px',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              zIndex: dragging_icon === icon.id ? 51 : 50,
              userSelect: 'none'
            }}
            onMouseDown = {(e) => handle_icon_mouse_down(e, icon.id)}
            onClick = {(e) => {
              e.stopPropagation();
              set_selected_icon_ids([icon.id]);
            }}
            onDoubleClick = {(e) => {
              e.stopPropagation();
              if(!dragging_icon) 
              {
                icon.action();
              }
            }}
            onContextMenu = {(e) => open_icon_context_menu(e, icon)}
          >
            <Image 
              src = {getWin98Icon(icon.icon)}
              alt = {icon.name}
              width = {32}
              height = {32}
              unoptimized
              style = {{ imageRendering: 'pixelated', marginBottom: '4px', pointerEvents: 'none' }}
            />
            <span 
              className = "desktop-icon-label"
              style = {{ 
                fontSize: '10px', 
                color: 'white',
                textAlign: 'center',
                textShadow: is_selected ? 'none' : '1px 1px 2px rgba(0,0,0,0.8)',
                maxWidth: '64px',
                lineHeight: '1.2',
                padding: '1px 2px',
                pointerEvents: 'none'
              }}
            >
              {icon.name}
            </span>
          </div>
        );
      })}

      {/* Desktop Marquee Selection Box */}
      {selection_box && (
        <div 
          className = "desktop-selection-box"
          style = {{
            left: `${Math.min(selection_box.start_x, selection_box.current_x)}px`,
            top: `${Math.min(selection_box.start_y, selection_box.current_y)}px`,
            width: `${Math.abs(selection_box.current_x - selection_box.start_x)}px`,
            height: `${Math.abs(selection_box.current_y - selection_box.start_y)}px`
          }}
        />
      )}

      {/* Retro Windows 98 Context Menu */}
      {context_menu_data && (
        <Windows98ContextMenu
          x = {context_menu_data.x}
          y = {context_menu_data.y}
          items = {context_menu_data.items}
          on_close = {hide_context_menu}
        />
      )}

      {/* Classic Retro Windows 98 Screensaver */}
      {screensaver_active && (
        <Windows98Screensaver
          mode = {screensaver_type}
          on_exit = {() => set_screensaver_active(false)}
        />
      )}

      {/* Display Properties Dialog with mini CRT monitor preview */}
      {theme_manager_open && (
        <Windows98DisplayProperties 
          onClose = {() => set_theme_manager_open(false)}
          current_wallpaper = {desktop_wallpaper}
          on_apply_wallpaper = {(wp) => set_desktop_wallpaper(wp)}
          current_screensaver = {screensaver_type}
          on_apply_screensaver = {(st) => set_screensaver_type(st)}
          on_preview_screensaver = {() => set_screensaver_active(true)}
        />
      )}

      {/* Volume Popup */}
      {volume_popup_open && (
        <Windows98VolumePopup
          on_close = {() => set_volume_popup_open(false)}
        />
      )}

      {/* Run Dialog */}
      {run_dialog_open && (
        <Windows98RunDialog
          on_close = {() => set_run_dialog_open(false)}
          on_run = {handle_run_command}
        />
      )}

      {/* Shutdown Dialog */}
      {shutdown_dialog_open && (
        <Windows98ShutdownDialog
          on_close = {() => set_shutdown_dialog_open(false)}
          on_restart = {() => { set_shutdown_dialog_open(false); set_is_loading(true); }}
          on_dos = {() => { set_shutdown_dialog_open(false); open_window('msdos'); }}
          on_exit_mode = {() => router.push('/')}
        />
      )}

      {/* Window Manager */}
      <Win98_window_manager 
        activeWindows = {active_windows}
        minimizedWindows = {minimized_windows}
        onCloseWindow = {closeWindow}
        onFocusWindow = {focus_window}
        onMinimizeWindow = {minimize_child_window}
        onOpenWindow = {open_window}
        activeWindowId = {active_window_id}
        windowZIndexes = {window_z_indexes}
        notepadFile = {current_notepad_file}
        onSaveFile = {handle_save_file}
        recycleBinFiles = {recycle_bin_files}
        onRestoreRecycleItem = {handle_restore_recycle_item}
        onRestoreAllRecycle = {handle_restore_all_recycle}
        onEmptyRecycleBin = {empty_recycle_bin}
        onDeleteRecycleForever = {handle_delete_recycle_forever}
      />
    </div>
  );
};

export default Windows98Home;