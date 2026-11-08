"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Windows98Loader from './Windows98Loader';
import Win98_window_manager from './Windows98WindowManager';
import { getWin98Icon, WIN98_ICONS } from '@/lib/win98-icons';
import { play_sound, get_sound_muted } from '@/lib/win98-audio';
import Windows98ContextMenu from './Windows98ContextMenu';
import Windows98Screensaver from './Windows98Screensaver';
import Windows98VolumePopup from './Windows98VolumePopup';
import Windows98RunDialog from './Windows98RunDialog';
import Windows98ShutdownDialog from './Windows98ShutdownDialog';
import Windows98DisplayProperties from './Windows98DisplayProperties';
import Windows98DialogHost, { show_win98_alert, show_win98_prompt } from './Windows98Dialog';
import { get_desktop_background, get_scheme_vars, normalize_display } from '@/lib/win98-display';
import { is_touch_device, useIsMobile, useLongPress } from '@/lib/win98-mobile';

const BIRTHDAY = new Date(2006, 8, 18);
const TASKBAR_HEIGHT = 30;
const ICON_GRID_X = 85;
const ICON_GRID_Y = 80;
const ICON_OFFSET = 20;
const ICON_BOTTOM_MARGIN = 110;
const ICON_DRAG_THRESHOLD = 4;
const RECYCLE_DROP_DISTANCE = 80;
const Z_BASE = 1000;
const Z_LIMIT = 9000; // stay under taskbar (9999) and menus/dialogs (10000+)
const DESKTOP_STORAGE_KEY = 'win98-desktop';
const DISPLAY_STORAGE_KEY = 'win98-display';
const NON_DESKTOP_SELECTOR = '.window, .status-bar, .desktop-icon, .context-menu, .win98-context-menu, .win98-start-menu';

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

const read_storage = (key) => {
  if(typeof window === 'undefined') return null;
  try
  {
    return JSON.parse(localStorage.getItem(key));
  } catch(_)
  {
    return null;
  }
};

const write_storage = (key, value) => {
  try
  {
    localStorage.setItem(key, JSON.stringify(value));
  } catch(_) {}
};

const clamp_icon_position = (position) => ({
  x: Math.max(0, Math.min(position.x, window.innerWidth - 80)),
  y: Math.max(0, Math.min(position.y, window.innerHeight - ICON_BOTTOM_MARGIN))
});

// clamp every icon into the screen, then move any icon that now overlaps another into the next free grid cell
const clamp_icons = (icons) => {
  const max_x = Math.max(ICON_OFFSET, window.innerWidth - 80);
  const max_y = Math.max(ICON_OFFSET, window.innerHeight - ICON_BOTTOM_MARGIN);
  const placed = [];
  const overlaps = (position) => placed.some(other =>
    Math.abs(other.x - position.x) < ICON_GRID_X - 10 && Math.abs(other.y - position.y) < ICON_GRID_Y - 10
  );

  const find_free_cell = () => {
    for(let x = ICON_OFFSET; x <= max_x; x += ICON_GRID_X)
    {
      for(let y = ICON_OFFSET; y <= max_y; y += ICON_GRID_Y)
      {
        if(!overlaps({ x, y })) return { x, y };
      }
    }
    return null;
  };

  return icons.map(icon => {
    let position = clamp_icon_position(icon.position);
    if(overlaps(position)) position = find_free_cell() || position;
    placed.push(position);
    return position.x === icon.position.x && position.y === icon.position.y ? icon : { ...icon, position };
  });
};

// functions can't be stored, so files are saved without `action` and get it back on load
const strip_action = ({ action, ...rest }) => rest;

const line_up_icons = (icons) => {
  const rows = Math.max(1, Math.floor((window.innerHeight - ICON_BOTTOM_MARGIN - ICON_OFFSET) / ICON_GRID_Y) + 1);

  return icons.map((icon, idx) => ({
    ...icon,
    position: {
      x: ICON_OFFSET + Math.floor(idx / rows) * ICON_GRID_X,
      y: ICON_OFFSET + (idx % rows) * ICON_GRID_Y
    }
  }));
};

// 16x16 pixel speaker like the Win98 volume tray icon; muted adds the red "no" sign
const TraySpeakerIcon = ({ muted }) => (
  <svg width = "16" height = "16" viewBox = "0 0 16 16" shapeRendering = "crispEdges" aria-hidden = "true">
    <path d = "M2 6h3l4-4h1v12H9l-4-4H2z" fill = "#c0c0c0" stroke = "#000000" />
    <path d = "M3 7h2v2H3z" fill = "#808080" />
    <path d = "M9 4h1v8H9z" fill = "#ffffff" />
    {!muted && (
      <path d = "M12 5v6M14 3v10" stroke = "#000000" />
    )}
    {muted && (
      <>
        <circle cx = "11.5" cy = "11.5" r = "3.5" fill = "#ffffff" stroke = "#ff0000" strokeWidth = "1.5" />
        <path d = "M9 14L14 9" stroke = "#ff0000" strokeWidth = "1.5" />
      </>
    )}
  </svg>
);

const TaskbarClock = () => {
  const [now, set_now] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => set_now(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      title = {now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      style = {{ fontSize: '11px', padding: '0 4px', whiteSpace: 'nowrap' }}
    >
      {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
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
  const is_mobile = useIsMobile();
  const portfolio_full = is_maximized || is_mobile;
  // long press on touch screens opens the same menus as a right-click
  const desktop_long_press = useLongPress((e) => open_desktop_context_menu(e));
  const icon_long_press = useLongPress((e, icon) => open_icon_context_menu(e, icon));
  const [previous_position, set_previous_position] = useState({ x: 0, y: 0 });
  const [is_loading, set_is_loading] = useState(true);
  
  // windows management
  const [active_windows, set_active_windows] = useState([]);
  const [minimized_windows, set_minimized_windows] = useState([]);
  const [window_drag_ghost, set_window_drag_ghost] = useState(null);
  const [is_muted, set_is_muted] = useState(get_sound_muted);
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
    { id: 'my-computer', name: 'My Computer', position: { x: 20, y: 20 }, icon: WIN98_ICONS.computer, type: 'system', action: () => { set_is_minimized(false); focus_window('portfolio'); } },
    { id: 'recycle-bin', name: 'Recycle Bin', position: { x: 20, y: 100 }, icon: WIN98_ICONS.recycle_empty, type: 'recycle-bin', action: () => open_window('recycle_bin') },
    { id: 'resume', name: 'Resume', position: { x: 20, y: 180 }, icon: WIN98_ICONS.file_lines, type: 'app', action: () => open_window('resume') },
    { id: 'projects', name: 'Projects', position: { x: 20, y: 260 }, icon: WIN98_ICONS.directory_open, type: 'app', action: () => open_window('projects') },
    { id: 'contact', name: 'Contact', position: { x: 20, y: 340 }, icon: WIN98_ICONS.envelope, type: 'app', action: () => open_window('contact') },
    { id: 'notepad', name: 'Notepad', position: { x: 20, y: 420 }, icon: WIN98_ICONS.notepad, type: 'app', action: () => open_window('notepad') },
    { id: 'msdos', name: 'MS-DOS Prompt', position: { x: 20, y: 500 }, icon: WIN98_ICONS.cmd, type: 'app', action: () => open_window('msdos') },
    { id: 'theme-manager', name: 'Theme Manager', position: { x: 20, y: 580 }, icon: WIN98_ICONS.themes, type: 'system', action: () => open_window('display') },
  ]);
  const [dragging_icon, set_dragging_icon] = useState(null);
  const [drag_icon_offset, set_drag_icon_offset] = useState({ x: 0, y: 0 });
  const drag_start_ref = useRef({ x: 0, y: 0 });
  const drag_origin_ref = useRef({ x: 0, y: 0 });
  const drag_position_ref = useRef(null);
  
  const [user_files, set_user_files] = useState([]);
  const [recycle_bin_files, set_recycle_bin_files] = useState([]);
  const [file_counter, set_file_counter] = useState(1);
  const [desktop_ready, set_desktop_ready] = useState(false);
  const [context_menu_data, set_context_menu_data] = useState(null);
  const [screensaver_active, set_screensaver_active] = useState(false);
  const [volume_popup_open, set_volume_popup_open] = useState(false);
  const [run_dialog_open, set_run_dialog_open] = useState(false);
  const [shutdown_dialog_open, set_shutdown_dialog_open] = useState(false);
  const [active_start_submenu, set_active_start_submenu] = useState(null);
  const [current_notepad_file, set_current_notepad_file] = useState(null);
  const [display_settings, set_display_settings] = useState(() => normalize_display(read_storage(DISPLAY_STORAGE_KEY)));
  const [screensaver_preview, set_screensaver_preview] = useState(null);
  const idle_timer_ref = useRef(null);
  const display_settings_ref = useRef(display_settings);
  display_settings_ref.current = display_settings;

  // idle timer reads the latest settings through a ref, so changing them never re-binds the listeners
  const reset_idle_timer = useCallback(() => {
    if(idle_timer_ref.current) clearTimeout(idle_timer_ref.current);
    const { screensaver, idle_minutes } = display_settings_ref.current;
    if(screensaver === 'none') return;
    idle_timer_ref.current = setTimeout(() => {
      set_screensaver_active(true);
    }, idle_minutes * 60000);
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

  // refs and functional updates only: desktop icon actions keep the first-render closure
  const bring_to_front = (windowId) => {
    set_active_window_id(windowId);
    set_selected_icon_ids([]);
    set_window_z_indexes(prev => {
      const top = Math.max(Z_BASE, ...Object.values(prev));
      if(top + 10 < Z_LIMIT) return { ...prev, [windowId]: top + 10 };

      // renumber in current stacking order so z-index never climbs over the taskbar
      const order = Object.keys(prev).filter(id => id !== windowId).sort((a, b) => prev[a] - prev[b]);
      const renumbered = {};
      order.forEach((id, idx) => { renumbered[id] = Z_BASE + idx * 10; });
      renumbered[windowId] = Z_BASE + order.length * 10;
      return renumbered;
    });
  };

  const open_window = (windowId) => {
    play_sound('open');
    set_active_windows(prev => prev.includes(windowId) ? prev : [...prev, windowId]);
    set_minimized_windows(prev => prev.filter(id => id !== windowId));
    bring_to_front(windowId);
  };

  const closeWindow = (windowId) => {
    play_sound('close');
    set_active_windows(prev => prev.filter(id => id !== windowId));
    set_minimized_windows(prev => prev.filter(id => id !== windowId));
    if(windowId === 'notepad') set_current_notepad_file(null);
    if(active_window_id === windowId)
    {
      set_active_window_id('portfolio');
    }
  };

  const focus_window = (windowId) => {
    set_minimized_windows(prev => prev.filter(id => id !== windowId));
    bring_to_front(windowId);
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

  const get_file_action = (file_type) => {
    if(file_type === 'text') return (self) => open_file_in_notepad(self);
    if(file_type === 'folder') return () => open_window('projects');
    if(file_type === 'exe') return () => open_window('msdos');
    return (self) => show_win98_alert(`Cannot open '${self.name}'.\n\nPaint is not installed on this computer.`, { title: self.name, icon: 'error' });
  };

  // the load effect runs once; the ref hands it this render's helper without re-running it
  const get_file_action_ref = useRef(get_file_action);
  get_file_action_ref.current = get_file_action;

  // restore saved desktop (files, recycle bin, icon positions) or lay out a fresh one
  useEffect(() => {
    const saved = read_storage(DESKTOP_STORAGE_KEY);
    const is_valid = saved && Array.isArray(saved.files) && Array.isArray(saved.recycle) && Array.isArray(saved.positions);

    if(!is_valid)
    {
      set_desktop_icons(prev => line_up_icons(prev));
    } else
    {
      const restore = (file) => ({ ...file, action: get_file_action_ref.current(file.file_type) });
      const files = saved.files.map(restore);
      const positions = new Map(saved.positions);

      set_desktop_icons(prev => clamp_icons([...prev, ...files].map(icon => (
        positions.has(icon.id) ? { ...icon, position: positions.get(icon.id) } : icon
      ))));
      set_user_files(files);
      set_recycle_bin_files(saved.recycle.map(restore));
      set_file_counter(Number(saved.counter) || 1);
    }
    set_desktop_ready(true);
  }, []);

  // save after load finished, and not on every mousemove of a drag
  useEffect(() => {
    if(!desktop_ready || dragging_icon) return;

    write_storage(DESKTOP_STORAGE_KEY, {
      files: desktop_icons.filter(icon => icon.type === 'file').map(strip_action),
      recycle: recycle_bin_files.map(strip_action),
      positions: desktop_icons.map(icon => [icon.id, icon.position]),
      counter: file_counter
    });
  }, [desktop_ready, dragging_icon, desktop_icons, recycle_bin_files, file_counter]);

  useEffect(() => {
    write_storage(DISPLAY_STORAGE_KEY, display_settings);
    reset_idle_timer();
  }, [display_settings, reset_idle_timer]);

  // keep icons and the portfolio title bar reachable when the browser gets smaller
  useEffect(() => {
    const handle_resize = () => {
      set_desktop_icons(prev => clamp_icons(prev));
      set_window_position(prev => ({
        x: Math.max(0, Math.min(prev.x, window.innerWidth - 200)),
        y: Math.max(0, Math.min(prev.y, window.innerHeight - 100))
      }));
    };

    window.addEventListener('resize', handle_resize);
    return () => window.removeEventListener('resize', handle_resize);
  }, []);

  // portfolio window only exists once the loader is gone
  useLayoutEffect(() => {
    if(is_loading || !window_ref.current) return;

    const rect = window_ref.current.getBoundingClientRect();
    const center_x = Math.max(0, (window.innerWidth - rect.width) / 2);
    const center_y = Math.max(0, (window.innerHeight - TASKBAR_HEIGHT - rect.height) / 2);
    set_window_position({ x: center_x, y: center_y });
  }, [is_loading]);

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
  }, [is_loading]);

  const handle_pointer_down = (e) => {
    if(e.target.closest('button')) return;

    e.preventDefault();
    e.stopPropagation();
    
    focus_window('portfolio');
    play_sound('click');
    
    const windowEl = window_ref.current;
    if(!windowEl || portfolio_full) return;
    
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

    if(e.button !== 0) return;

    const icon = desktop_icons.find(i => i.id === iconId);

    if(!icon) return;
    
    if(!selected_icon_ids.includes(iconId))
    {
      set_selected_icon_ids([iconId]);
    }

    set_drag_icon_offset({
      x: e.clientX - icon.position.x,
      y: e.clientY - icon.position.y
    });

    drag_start_ref.current = { x: e.clientX, y: e.clientY };
    drag_origin_ref.current = icon.position;
    drag_position_ref.current = null;
    set_dragging_icon(iconId);
    document.body.style.userSelect = 'none';
  };

  const handle_icon_mouse_move = (e) => {
    if(!dragging_icon) return;
    
    e.preventDefault();

    const moved_distance = Math.hypot(e.clientX - drag_start_ref.current.x, e.clientY - drag_start_ref.current.y);
    if(!drag_position_ref.current && moved_distance < ICON_DRAG_THRESHOLD) return;

    const new_x = e.clientX - drag_icon_offset.x;
    const new_y = e.clientY - drag_icon_offset.y;

    const bounded_x = Math.max(0, Math.min(new_x, window.innerWidth - 80));
    const bounded_y = Math.max(0, Math.min(new_y, window.innerHeight - ICON_BOTTOM_MARGIN));

    drag_position_ref.current = { x: bounded_x, y: bounded_y };

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
          if(distance < RECYCLE_DROP_DISTANCE)
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

    // no position in the ref means the mouse never passed the drag threshold (plain click)
    const drop_position = drag_position_ref.current;
    const dropped_id = dragging_icon;

    drag_position_ref.current = null;
    set_dragging_icon(null);
    document.body.style.userSelect = '';

    if(!dropped_id || !drop_position) return;

    const recycle_bin = desktop_icons.find(icon => icon.id === 'recycle-bin');
    const dragged_icon = desktop_icons.find(icon => icon.id === dropped_id);

    if(recycle_bin && dragged_icon && dragged_icon.type === 'file')
    {
      const distance = Math.hypot(drop_position.x - recycle_bin.position.x, drop_position.y - recycle_bin.position.y);

      if(distance < RECYCLE_DROP_DISTANCE)
      {
        // restore puts the file back where the drag started, not on top of the bin
        set_recycle_bin_files(prev => [...prev, { ...dragged_icon, position: drag_origin_ref.current }]);
        set_desktop_icons(prev => prev.filter(icon => icon.id !== dropped_id));
        set_user_files(prev => prev.filter(file => file.id !== dropped_id));
        return;
      }
    }

    // Snap to desktop grid
    const snap_x = Math.min(window.innerWidth - 80, Math.round((drop_position.x - ICON_OFFSET) / ICON_GRID_X) * ICON_GRID_X + ICON_OFFSET);
    const snap_y = Math.min(window.innerHeight - ICON_BOTTOM_MARGIN, Math.round((drop_position.y - ICON_OFFSET) / ICON_GRID_Y) * ICON_GRID_Y + ICON_OFFSET);

    set_desktop_icons(prev => prev.map(icon => (
      icon.id === dropped_id ? { ...icon, position: { x: snap_x, y: snap_y }} : icon
    )));
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
      open_window('display');
    } else if(lower === 'screensaver')
    {
      set_screensaver_active(true);
    } else if(raw.startsWith('http://') || raw.startsWith('https://'))
    {
      window.open(raw, '_blank');
    } else
    {
      show_win98_alert(`Cannot find the file '${raw}' (or one of its components). Make sure the path and filename are correct and that all required libraries are available.`, {
        title: raw,
        icon: 'error'
      });
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

    new_file.action = get_file_action(type);

    set_user_files(prev => [...prev, new_file]);
    set_desktop_icons(prev => [...prev, new_file]);
    set_file_counter(prev => prev + 1);
  };

  const hide_context_menu = () => {
    set_context_menu_data(null);
  };

  const open_desktop_context_menu = (e) => {
    if(e.target.closest(NON_DESKTOP_SELECTOR)) return;

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
            set_desktop_icons(prev => line_up_icons([...prev].sort((a, b) => a.name.localeCompare(b.name))));
          }
        },
        {
          label: 'Arrange by Type',
          icon: WIN98_ICONS.file_lines,
          action: () => {
            set_desktop_icons(prev => line_up_icons([...prev].sort((a, b) => (a.type || '').localeCompare(b.type || ''))));
          }
        },
        {
          label: 'Line up Icons',
          action: () => {
            set_desktop_icons(prev => line_up_icons(prev));
          }
        },
        { is_separator: true },
        {
          label: 'Refresh',
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
          action: () => open_window('display')
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
          icon.action(icon);
        }
      },
      {
        label: 'Explore',
        icon: WIN98_ICONS.directory_open,
        action: () => {
          play_sound('open');
          icon.action(icon);
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
        action: async () => {
          const new_name = await show_win98_prompt('Enter new file name:', icon.name, { title: 'Rename' });
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
        show_win98_alert(`Type: ${icon.type === 'file' ? (icon.file_type || 'Document') : 'Application'}\nLocation: Desktop\nStatus: Ready`, {
          title: `${icon.name} Properties`
        });
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

  // update recycle bin icon status
  useEffect(() => {
    set_desktop_icons(prev => prev.map(icon =>
      icon.id === 'recycle-bin'
        ? {
            ...icon,
            icon: recycle_bin_files.length > 0 ? WIN98_ICONS.recycle_full : WIN98_ICONS.recycle_empty
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

  // listeners stay attached for the whole drag; the ref always points at this render's handlers
  const icon_drag_handlers_ref = useRef(null);
  icon_drag_handlers_ref.current = { move: handle_icon_mouse_move, up: handle_icon_mouse_up };

  useEffect(() => {
    if(!dragging_icon) return;

    const handle_move = (e) => icon_drag_handlers_ref.current.move(e);
    const handle_up = () => icon_drag_handlers_ref.current.up();

    document.addEventListener('mousemove', handle_move);
    document.addEventListener('mouseup', handle_up);

    return () => {
      document.removeEventListener('mousemove', handle_move);
      document.removeEventListener('mouseup', handle_up);
    };
  }, [dragging_icon]);

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

      if(e.target.closest('.window')) return;

      if(e.key === 'Enter' && selected_icon_ids.length > 0)
      {
        const target_id = selected_icon_ids[0];
        const icon = desktop_icons.find(i => i.id === target_id);
        if(icon)
        {
          play_sound('open');
          icon.action(icon);
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

  // like a real reboot: programs close, files on the desktop stay
  const handle_restart = () => {
    set_shutdown_dialog_open(false);
    set_run_dialog_open(false);
    set_volume_popup_open(false);
    set_start_menu_open(false);
    set_context_menu_data(null);
    set_active_windows([]);
    set_minimized_windows([]);
    set_current_notepad_file(null);
    set_is_minimized(false);
    set_is_maximized(false);
    set_active_window_id('portfolio');
    set_is_loading(true);
  };

  const handle_desktop_mouse_down = (e) => {
    if(e.button !== 0) return;
    if(e.target.closest(NON_DESKTOP_SELECTOR)) return;

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
      className = {`win98-container scheme-${display_settings.scheme} ${is_dragging ? 'dragging' : ''}`}
      style = {{
        minHeight: '100vh',
        ...get_desktop_background(display_settings.wallpaper, display_settings.pattern),
        ...get_scheme_vars(display_settings.scheme),
        fontFamily: 'MS Sans Serif, sans-serif',
        padding: '20px',
        overflow: 'hidden',
        position: 'relative'
      }}
      onContextMenu = {open_desktop_context_menu}
      onMouseDown = {handle_desktop_mouse_down}
      onPointerDown = {desktop_long_press.on_pointer_down}
      onPointerMove = {desktop_long_press.on_pointer_move}
      onPointerUp = {desktop_long_press.on_pointer_end}
      onPointerCancel = {desktop_long_press.on_pointer_end}
      onClick = {() => {
        if(desktop_long_press.was_long_press()) return;
        hide_context_menu();
        set_start_menu_open(false);
      }}
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
          maxWidth: portfolio_full ? '100vw' : '800px',
          width: portfolio_full ? '100vw' : 'auto',
          height: portfolio_full ? 'calc(100dvh - 30px)' : 'auto',
          flexDirection: 'column',
          position: portfolio_full ? 'fixed' : 'absolute',
          left: portfolio_full ? '0px' : `${window_position.x}px`,
          top: portfolio_full ? '0px' : `${window_position.y}px`,
          cursor: is_dragging ? 'grabbing' : 'default',
          zIndex: window_z_indexes.portfolio,
          display: is_minimized ? 'none' : 'flex',
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
            {!is_mobile && (
              <button aria-label = {is_maximized ? "Restore" : "Maximize"} className = {is_maximized ? "restore" : "maximize"} onClick = {handle_maximize} />
            )}
            <button aria-label = "Close" className = "close" onClick = {() => router.push('/')} title = "Exit Windows 98 Mode" />
          </div>
        </div>

        <div className = "window-body" style = {{ padding: is_mobile ? '10px' : '16px', color: '#000000', flex: 1, minHeight: 0, overflow: 'auto' }}>
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
            onClick = {() => { set_is_minimized(true); set_minimized_windows(active_windows); set_start_menu_open(false); }}
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
              resume: { title: 'Resume', icon: WIN98_ICONS.file_lines },
              projects: { title: 'Projects', icon: WIN98_ICONS.directory_open },
              contact: { title: 'Contact', icon: WIN98_ICONS.envelope },
              notepad: { title: 'Notepad', icon: WIN98_ICONS.notepad },
              msdos: { title: 'MS-DOS Prompt', icon: WIN98_ICONS.cmd },
              calculator: { title: 'Calculator', icon: WIN98_ICONS.executable },
              display: { title: 'Display Properties', icon: WIN98_ICONS.monitor },
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
        <div className = "win98-system-tray">
          <button
            className = {`win98-tray-icon-btn ${is_muted ? 'muted' : ''}`}
            title = "Volume"
            onClick = {() => set_volume_popup_open(v => !v)}
          >
            <TraySpeakerIcon muted = {is_muted} />
          </button>
          <TaskbarClock />
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
              <span><b>Windows</b>98</span>
            </div>

            {/* Menu Items */}
            <div className = "win98-start-menu-content">
              {/* Programs Menu Item */}
              <div 
                className = {`win98-start-menu-item ${active_start_submenu === 'programs' ? 'active' : ''}`}
                onMouseEnter = {() => set_active_start_submenu('programs')}
                onClick = {() => set_active_start_submenu('programs')}
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
                        <Image src = {getWin98Icon(WIN98_ICONS.file_lines)} width = {16} height = {16} alt = "" unoptimized style = {{ imageRendering: 'pixelated' }} />
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
                onClick = {() => set_active_start_submenu('settings')}
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
                      onClick = {() => { open_window('display'); set_start_menu_open(false); set_active_start_submenu(null); }}
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
              left: `${icon.position.x}px`,
              top: `${icon.position.y}px`,
              cursor: dragging_icon === icon.id ? 'grabbing' : 'pointer',
              zIndex: dragging_icon === icon.id ? 51 : 50
            }}
            onMouseDown = {(e) => handle_icon_mouse_down(e, icon.id)}
            onPointerDown = {(e) => icon_long_press.on_pointer_down(e, icon)}
            onPointerMove = {icon_long_press.on_pointer_move}
            onPointerUp = {icon_long_press.on_pointer_end}
            onPointerCancel = {icon_long_press.on_pointer_end}
            onClick = {(e) => {
              e.stopPropagation();
              set_selected_icon_ids([icon.id]);
              // touch screens open on a single tap, like a phone home screen
              if(is_touch_device() && !icon_long_press.was_long_press() && !dragging_icon)
              {
                icon.action(icon);
              }
            }}
            onDoubleClick = {(e) => {
              e.stopPropagation();
              if(!dragging_icon && !is_touch_device())
              {
                icon.action(icon);
              }
            }}
            onContextMenu = {(e) => open_icon_context_menu(e, icon)}
          >
            <span
              className = "desktop-icon-image"
              style = {{ '--icon-url': `url("${getWin98Icon(icon.icon)}")` }}
            >
              <Image
                src = {getWin98Icon(icon.icon)}
                alt = {icon.name}
                width = {32}
                height = {32}
                unoptimized
                draggable = {false}
              />
            </span>
            <span className = "desktop-icon-label">
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
          mode = {screensaver_preview || (display_settings.screensaver === 'none' ? 'mystify' : display_settings.screensaver)}
          on_exit = {() => { set_screensaver_active(false); set_screensaver_preview(null); }}
        />
      )}

      {/* Display Properties Dialog with mini CRT monitor preview */}
      {active_windows.includes('display') && (
        <Windows98DisplayProperties 
          onClose = {() => closeWindow('display')}
          onFocus = {() => bring_to_front('display')}
          onMinimize = {() => minimize_child_window('display')}
          isMinimized = {minimized_windows.includes('display')}
          isActive = {active_window_id === 'display'}
          zIndex = {window_z_indexes.display || Z_BASE}
          current_settings = {display_settings}
          on_apply = {(settings) => set_display_settings(normalize_display(settings))}
          on_preview_screensaver = {(mode) => { set_screensaver_preview(mode); set_screensaver_active(true); }}
        />
      )}

      {/* Volume Popup */}
      {volume_popup_open && (
        <Windows98VolumePopup
          on_close = {() => set_volume_popup_open(false)}
          on_mute_change = {set_is_muted}
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
          on_restart = {handle_restart}
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

      {/* Win98-style message boxes (replace browser alert/confirm/prompt) */}
      <Windows98DialogHost />
    </div>
  );
};

export default Windows98Home;