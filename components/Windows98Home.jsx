"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Windows98Loader from './Windows98Loader';
import Win98_theme_manager from './Windows98ThemeManager';
import Windows98WindowManager from './Windows98WindowManager';

const Windows98Home = () => {
  const router = useRouter();
  const window_ref = useRef(null);
  const titlebar_ref = useRef(null);
  const [is_dragging, setIsDragging] = useState(false);
  const [drag_offset, setDragOffset] = useState({ x: 0, y: 0 });
  const [window_position, setWindowPosition] = useState({ x: 0, y: 0 });
  const [is_minimized, setIsMinimized] = useState(false);
  const [is_maximized, setIsMaximized] = useState(false);
  const [previous_position, setPreviousPosition] = useState({ x: 0, y: 0 });
  const [is_loading, setIsLoading] = useState(true);
  const [theme_manager_open, setThemeManagerOpen] = useState(false);
  
  // windows management
  const [active_windows, setActiveWindows] = useState([]);
  const [window_z_index, setWindowZIndex] = useState(1000);
  const [active_window_id, setActiveWindowId] = useState('portfolio');
  const [window_z_indexes, setWindowZIndexes] = useState({
    portfolio: 1000,
    resume: 1000,
    projects: 1000,
    contact: 1000
  });
  
  // desktop icons state
  const [desktop_icons, setDesktopIcons] = useState([
    { 
      id: 'theme-manager', 
      name: 'Theme Manager', 
      position: { x: 20, y: 20 },
      icon: '/icons/win98/png/themes-0.png',
      fallback: '',
      emoji: '🎨',
      type: 'system',
      action: () => setThemeManagerOpen(true)
    },
    {
      id: 'resume',
      name: 'Resume',
      position: { x: 20, y: 120 },
      icon: '/icons/win98/png/users-0.png',
      fallback: '',
      emoji: '📄',
      type: 'app',
      action: () => openWindow('resume')
    },
    {
      id: 'projects', 
      name: 'Projects',
      position: { x: 20, y: 220 },
      icon: '/icons/win98/png/directory_open_file_mydocs-0.png',
      fallback: '',
      emoji: '📁',
      type: 'app',
      action: () => openWindow('projects')
    },
    {
      id: 'contact',
      name: 'Contact',
      position: { x: 20, y: 320 },
      icon: '/icons/win98/png/envelope_closed-0.png',
      fallback: '',
      emoji: '📧',
      type: 'app',
      action: () => openWindow('contact')
    },
    {
      id: 'recycle-bin',
      name: 'Recycle Bin',
      position: { x: 20, y: 420 },
      icon: '/icons/win98/png/recycle_bin_empty-0.png',
      fallback: '',
      emoji: '🗑️',
      type: 'recycle-bin',
      action: () => {}
    },
    {
      id: 'my-computer',
      name: 'My Computer',
      position: { x: 20, y: 520 },
      icon: '/icons/win98/png/computer-0.png',
      fallback: '',
      emoji: '💻',
      type: 'system',
      action: () => {}
    }
  ]);
  const [dragging_icon, setDraggingIcon] = useState(null);
  const [drag_icon_offset, setDragIconOffset] = useState({ x: 0, y: 0 });
  
  const [user_files, setUserFiles] = useState([]);
  const [recycle_bin_files, setRecycleBinFiles] = useState([]);
  const [file_counter, setFileCounter] = useState(1);
  const [context_menu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const openWindow = (windowId) => {
    if(!active_windows.includes(windowId)) {
      setActiveWindows(prev => [...prev, windowId]);
    }
    setActiveWindowId(windowId);
    const newZIndex = window_z_index + 10;
    setWindowZIndex(newZIndex);
    setWindowZIndexes(prev => ({
      ...prev,
      [windowId]: newZIndex
    }));
  };

  const closeWindow = (windowId) => {
    setActiveWindows(prev => prev.filter(id => id !== windowId));
    if (active_window_id === windowId) {
      setActiveWindowId('portfolio');
    }
  };

  const focusWindow = (windowId) => {
    setActiveWindowId(windowId);
    const newZIndex = window_z_index + 10;
    setWindowZIndex(newZIndex);
    setWindowZIndexes(prev => ({
      ...prev,
      [windowId]: newZIndex
    }));
  };

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    document.body.classList.add('win98-mode');

    const link98 = document.createElement('link');
    link98.rel = 'stylesheet';
    link98.href = 'https://unpkg.com/98.css';
    link98.id = 'win98-css';
    document.head.appendChild(link98);

    const custom_link = document.createElement('link');
    custom_link.rel = 'stylesheet';
    custom_link.href = '/win98/win98.css';
    custom_link.id = 'win98-custom-css';
    document.head.appendChild(custom_link);

    return () => {
      document.body.classList.remove('win98-mode');
      
      const existing98_link = document.getElementById('win98-css');

      if(existing98_link) 
        {
        document.head.removeChild(existing98_link);
      }

      const existing_custom_link = document.getElementById('win98-custom-css');

      if(existing_custom_link) 
        {
        document.head.removeChild(existing_custom_link);
      }

      document.body.style.fontFamily = '';
      document.body.style.background = '';
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  useEffect(() => {
    if(window_ref.current) 
      {
      const window_el = window_ref.current;
      const rect = window_el.getBoundingClientRect();
      const center_x = (window.innerWidth - rect.width) / 2;
      const center_y = (window.innerHeight - rect.height) / 2;
      setWindowPosition({ x: center_x, y: center_y });
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
    if(e.target.closest('button')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    
    focusWindow('portfolio');
    
    const windowEl = window_ref.current;

    if(!windowEl) return;
    
    const rect = windowEl.getBoundingClientRect();
    
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
    document.body.style.userSelect = 'none';
    
    const handle_move = (moveEvent) => {
      moveEvent.preventDefault();
      
      const client_x = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0]?.clientX) || 0;
      const client_y = moveEvent.clientY || (moveEvent.touches && moveEvent.touches[0]?.clientY) || 0;

      const new_x = client_x - offsetX;
      const new_y = client_y - offsetY;
      
      const maxX = window.innerWidth - 200;
      const maxY = window.innerHeight - 100;
      
      const bounded_x = Math.max(-windowEl.offsetWidth + 200, Math.min(new_x, maxX));
      const bounded_y = Math.max(0, Math.min(new_y, maxY));
      
      setWindowPosition({ x: bounded_x, y: bounded_y });
    };

    const handle_up = () => {
      setIsDragging(false);
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
    setIsMinimized(!is_minimized);
  };

  const handle_maximize = () => {
    if(is_maximized) 
      {
      setWindowPosition(previous_position);
      setIsMaximized(false);
    } else 
    {
      setPreviousPosition(window_position);
      setWindowPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  };

  const handle_icon_mouse_down = (e, iconId) => {
    e.preventDefault();
    e.stopPropagation();
    
    const icon = desktop_icons.find(i => i.id === iconId);

    if(!icon) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDragIconOffset({
      x: e.clientX - icon.position.x,
      y: e.clientY - icon.position.y
    });
    
    setDraggingIcon(iconId);
    document.body.style.userSelect = 'none';
  };

  const handleIconMouseMove = (e) => {
    if(!dragging_icon) return;
    
    e.preventDefault();
    const newX = e.clientX - drag_icon_offset.x;
    const newY = e.clientY - drag_icon_offset.y;
    
    const boundedX = Math.max(0, Math.min(newX, window.innerWidth - 80));
    const boundedY = Math.max(0, Math.min(newY, window.innerHeight - 100));
    
    const draggedIcon = desktop_icons.find(icon => icon.id === dragging_icon);
    
    if(draggedIcon && draggedIcon.type === 'file') 
      {
      const recyclebin = desktop_icons.find(icon => icon.id === 'recycle-bin');
      if(recyclebin) 
        {
        const distance = Math.sqrt(
          Math.pow(boundedX - recyclebin.position.x, 2) + 
          Math.pow(boundedY - recyclebin.position.y, 2)
        );
        
        const recycleBinElement = document.querySelector('[data-id="recycle-bin"]');

        if(recycleBinElement) 
          {
          if(distance < 80) 
            {
            recycleBinElement.classList.add('drop-hover');
          } else 
          {
            recycleBinElement.classList.remove('drop-hover');
          }
        }
      }
    }
    
    setDesktopIcons(prev => prev.map(icon => 
      icon.id === dragging_icon 
        ? { ...icon, position: { x: boundedX, y: boundedY }}
        : icon
    ));
  };

  const handleIconMouseUp = () => {
    const recycleBinElement = document.querySelector('[data-id="recycle-bin"]');

    if(recycleBinElement) 
      {
      recycleBinElement.classList.remove('drop-hover');
    }
    
    if(dragging_icon) 
      {
      const recyclebin = desktop_icons.find(icon => icon.id === 'recycle-bin');
      const draggedIcon = desktop_icons.find(icon => icon.id === dragging_icon);
      
      if(recyclebin && draggedIcon && draggedIcon.type === 'file') {
        const distance = Math.sqrt(
          Math.pow(draggedIcon.position.x - recyclebin.position.x, 2) + 
          Math.pow(draggedIcon.position.y - recyclebin.position.y, 2)
        );
        
        if(distance < 80) 
          {
          setRecycleBinFiles(prev => [...prev, draggedIcon]);
          setDesktopIcons(prev => prev.filter(icon => icon.id !== dragging_icon));
          setUserFiles(prev => prev.filter(file => file.id !== dragging_icon));
          
          setDesktopIcons(prev => prev.map(icon => 
            icon.id === 'recycle-bin' 
              ? { 
                  ...icon, 
                  icon: '/icons/win98/png/recycle_bin_full-0.png',
                  emoji: '🗑️'
                }
              : icon
          ));
        }
      }
    }
    
    setDraggingIcon(null);
    document.body.style.userSelect = '';
  };

  const create_new_file = (type, x = 150, y = 150) => {
    const file_types = {
      'text': 
      {
        icon: '/icons/win98/png/notepad-0.png',
        emoji: '📄',
        extension: '.txt'
      },

      'folder': 
      {
        icon: '/icons/win98/png/directory_closed-0.png',
        emoji: '📁',
        extension: ''
      },

      'image': 
      {
        icon: '/icons/win98/png/image_old_gif-0.png',
        emoji: '🖼️',
        extension: '.bmp'
      },

      'exe': 
      {
        icon: '/icons/win98/png/executable-0.png',
        emoji: '⚙️',
        extension: '.exe'
      }
    };

    const file_info = file_types[type] || file_types['text'];
    const new_file = {
      id: `file-${file_counter}`,
      name: `New ${type}${file_info.extension}`,
      position: { x, y },
      icon: file_info.icon,
      emoji: file_info.emoji,
      type: 'file',
      file_type: type,
      created: new Date(),
      action: () => {}
    };

    setUserFiles(prev => [...prev, new_file]);
    setDesktopIcons(prev => [...prev, new_file]);
    setFileCounter(prev => prev + 1);
  };

  // context menu functions
  const handleDesktopRightClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  const hideContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  // empty recycle bin function
  const emptyRecycleBin = () => {
    setRecycleBinFiles([]);
    setDesktopIcons(prev => prev.map(icon => 
      icon.id === 'recycle-bin' 
        ? { 
            ...icon, 
            icon: '/icons/win98/png/recycle_bin_empty-0.png',
            emoji: '🗑️'
          }
        : icon
    ));
  };

  // update recycle bin icon action
  useEffect(() => {
    setDesktopIcons(prev => prev.map(icon => 
      icon.id === 'recycle-bin' 
        ? { 
            ...icon,
            action: () => {
              if(recycle_bin_files.length > 0) {
                alert(`Recycle Bin contains ${recycle_bin_files.length} file(s):\n${recycle_bin_files.map(f => f.name).join('\n')}\n\nRight-click to empty.`);
              } else {
                alert('Recycle Bin is empty');
              }
            }
          }
        : icon
    ));
  }, [recycle_bin_files]);

  useEffect(() => {
    if(dragging_icon) 
      {
      document.addEventListener('mousemove', handleIconMouseMove);
      document.addEventListener('mouseup', handleIconMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleIconMouseMove);
        document.removeEventListener('mouseup', handleIconMouseUp);
      };
    }
  }, [dragging_icon, drag_icon_offset]);

  if(is_loading) 
    {
    return <Windows98Loader onComplete={handleLoaderComplete} />;
  }

  return (
    <div 
      className = {`win98-container ${is_dragging ? 'dragging' : ''}`}
      style = {{ 
        minHeight: '100vh', 
        background: '#008080',
        fontFamily: 'MS Sans Serif, sans-serif',
        padding: '20px',
        color: 'white',
        overflow: 'hidden',
        position: 'relative'
      }}
      onContextMenu = {handleDesktopRightClick}
      onClick = {hideContextMenu}
    >
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
          display: is_minimized ? 'none' : 'block'
        }}
        onClick = {(e) => {
          e.stopPropagation();
          focusWindow('portfolio');
        }}
      >
        <div 
          ref = {titlebar_ref}
          className = "title-bar"
          onPointerDown = {handle_pointer_down}
          onMouseDown = {handle_pointer_down}
          style = {{ 
            cursor: is_dragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            touchAction: 'none'
          }}
        >
          <div className = "title-bar-text">
            <img 
              src = "./icons/win98/png/directory_open_file_mydocs-0.png" 
              alt = "Portfolio"
              style = {{
                width: '16px',
                height: '16px',
                imageRendering: 'pixelated',
                marginRight: '4px',
                verticalAlign: 'middle'
              }}
              onError = {(e) => {
                e.target.style.display = 'none';
                e.target.insertAdjacentHTML('afterend', '<span style="margin-right: 4px;">📁</span>');
              }}
            />
            Maksym Kopychko - Portfolio.exe
          </div>
          <div className = "title-bar-controls">
            <button 
              aria-label = "Minimize" 
              onClick = {handle_minimize}
            >
              <span style = {{ fontFamily: 'Wingdings, monospace', fontSize: '10px' }}>
                {/* Wingdings minimize symbol or fallback */}
                0
              </span>
            </button>
            <button 
              aria-label = {is_maximized ? "Restore" : "Maximize"}
              onClick = {handle_maximize}
            >
              <span style = {{ fontFamily: 'Wingdings, monospace', fontSize: '10px' }}>
                {is_maximized ? '2' : '1'}
              </span>
            </button>
            <button 
              aria-label = "Close"
              onClick = {() => router.push('/')}
              title = "Exit Windows 98 Mode"
            >
              <span style = {{ fontFamily: 'Wingdings, monospace', fontSize: '10px' }}>
                r
              </span>
            </button>
          </div>
        </div>

        <div className = "window-body" style = {{ padding: '20px' }}>
          {/* User Info */}
          <fieldset style = {{ marginBottom: '20px' }}>
            <legend>👤 User Information</legend>
            <div style = {{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style = {{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(45deg, #008080, #00a0a0)',
                border: '2px inset #c0c0c0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px'
              }}>
                🧑‍💻
              </div>
              <div>
                <div style = {{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Maksym Kopychko (Archie242)
                </div>
                <div style = {{ fontSize: '13px', color: '#000080', fontWeight: 'bold' }}>
                  🎮 Game & Software Developer
                </div>
                <div style = {{ fontSize: '11px', color: '#808080', marginTop: '4px' }}>
                  📍 Okhtyrka, Ukraine • 🎂 18 years old
                </div>
              </div>
            </div>
          </fieldset>

          {/* About */}
          <fieldset style = {{ marginBottom: '20px' }}>
            <legend>📝 About</legend>
            <div style = {{ fontSize: '12px', lineHeight: '1.5', padding: '8px' }}>
              Passionate about game development, 3D design, and cutting-edge technology. 
              Skilled in Unreal Engine, C++, Lua, Python, and AI-powered tools to craft immersive digital experiences.
            </div>
          </fieldset>

          {/* Skills */}
          <fieldset style = {{ marginBottom: '20px' }}>
            <legend>🛠️ Technical Skills</legend>
            <div style = {{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '8px' }}>
              <div>
                <div style = {{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#000080' }}>
                  💻 Programming Languages
                </div>
                <div className = "sunken-panel" style = {{ padding: '8px', fontSize: '11px', lineHeight: '1.4' }}>
                  • C++ / C# / C<br/>
                  • Python<br/>
                  • JavaScript / React.js<br/>
                  • Lua
                </div>
              </div>
              <div>
                <div style = {{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#000080' }}>
                  🎮 Game Development
                </div>
                <div className = "sunken-panel" style = {{ padding: '8px', fontSize: '11px', lineHeight: '1.4' }}>
                  • Unreal Engine<br/>
                  • Unity<br/>
                  • Blender / Cinema 4D<br/>
                  • Game Logic & AI
                </div>
              </div>
            </div>
          </fieldset>

          {/* Navigation Buttons */}
          <div style = {{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick = {() => openWindow('projects')} style = {{ minWidth: '120px' }}>
              📁 View Projects
            </button>
            <button onClick = {() => openWindow('contact')} style = {{ minWidth: '120px' }}>
              📧 Contact Me
            </button>
            <button onClick = {() => openWindow('resume')} style = {{ minWidth: '120px' }}>
              📄 Resume
            </button>
            <button 
              onClick = {() => router.push('/')}
              style = {{ 
                minWidth: '120px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              🚪 Exit Win98
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className = "status-bar">
          <p className = "status-bar-field">Ready</p>
          <p className = "status-bar-field">🪟 Windows 98 Mode Active</p>
        </div>
      </div>

      {/* Taskbar */}
      <div style = {{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '32px',
        background: '#c0c0c0',
        border: '1px solid #808080',
        borderTop: '1px solid #dfdfdf',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        zIndex: 1000,
        fontSize: '11px'
      }}>
        {/* Start Button */}
        <button 
          style = {{ 
            height: '26px', 
            fontSize: '11px', 
            fontWeight: 'bold',
            marginRight: '4px',
            padding: '0 8px',
            background: '#c0c0c0',
            border: '1px outset #c0c0c0',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <img 
            src = "./icons/win98/png/start_menu_shortcuts.png" 
            alt = "Start"
            style = {{
              width: '16px',
              height: '16px',
              imageRendering: 'pixelated'
            }}
            onError = {(e) => {
              e.target.style.display = 'none';
              e.target.insertAdjacentHTML('afterend', '<span>🪟</span>');
            }}
          />
          Start
        </button>

        {/* Running Programs */}
        <div style = {{ 
          flex: 1, 
          height: '22px', 
          border: '1px inset #c0c0c0',
          background: '#c0c0c0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px',
          gap: '2px'
        }}>
          <button
            onClick={() => {
              setIsMinimized(false);
              focusWindow('portfolio');
            }}
            style = {{ 
              height: '18px', 
              fontSize: '10px',
              padding: '0 8px',
              background: active_window_id === 'portfolio' ? '#316ac5' : '#c0c0c0',
              color: active_window_id === 'portfolio' ? 'white' : 'black',
              border: active_window_id === 'portfolio' ? '1px inset #316ac5' : '1px outset #c0c0c0',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <img 
              src = "./icons/win98/png/directory_open_file_mydocs-0.png" 
              alt = "Portfolio"
              style = {{
                width: '12px',
                height: '12px',
                imageRendering: 'pixelated'
              }}
              onError = {(e) => {
                e.target.style.display = 'none';
                e.target.insertAdjacentHTML('afterend', '<span>📁</span>');
              }}
            />
            Portfolio
          </button>
          
          {/* Other windows */}
          {active_windows.map((windowId) => {
            const windowInfo = {
              resume: { title: 'Resume', icon: '/icons/win98/png/users-0.png', emoji: '📄' },
              projects: { title: 'Projects', icon: '/icons/win98/png/directory_open_file_mydocs-0.png', emoji: '📁' },
              contact: { title: 'Contact', icon: '/icons/win98/png/envelope_closed-0.png', emoji: '📧' }
            };
            
            const info = windowInfo[windowId];
            if (!info) return null;
            
            return (
              <button
                key={windowId}
                onClick={() => focusWindow(windowId)}
                style = {{ 
                  height: '18px', 
                  fontSize: '10px',
                  padding: '0 8px',
                  background: active_window_id === windowId ? '#316ac5' : '#c0c0c0',
                  color: active_window_id === windowId ? 'white' : 'black',
                  border: active_window_id === windowId ? '1px inset #316ac5' : '1px outset #c0c0c0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src = {info.icon}
                  alt = {info.title}
                  style = {{
                    width: '12px',
                    height: '12px',
                    imageRendering: 'pixelated'
                  }}
                  onError = {(e) => {
                    e.target.style.display = 'none';
                    e.target.insertAdjacentHTML('afterend', `<span>${info.emoji}</span>`);
                  }}
                />
                {info.title}
              </button>
            );
          })}
        </div>

        {/* Clock */}
        <div style = {{ 
          fontSize: '11px', 
          padding: '0 8px',
          border: '1px inset #c0c0c0',
          background: '#c0c0c0',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          minWidth: '60px',
          justifyContent: 'center'
        }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Desktop Icons */}
      {desktop_icons.map((icon) => (
        <div
          key = {icon.id}
          className = {`desktop-icon ${dragging_icon === icon.id ? 'dragging' : ''}`}
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
            if (!dragging_icon && e.detail === 1) {
              // Single click - select icon
            }
          }}
          onDoubleClick = {(e) => {
            e.stopPropagation();
            if (!dragging_icon) {
              icon.action();
            }
          }}
          onContextMenu = {(e) => {
            e.preventDefault();
            e.stopPropagation();
            if(icon.type === 'file') {
              if(confirm(`Delete "${icon.name}"?`)) {
                setRecycleBinFiles(prev => [...prev, icon]);
                setDesktopIcons(prev => prev.filter(i => i.id !== icon.id));
                setUserFiles(prev => prev.filter(f => f.id !== icon.id));
                
                // Update recycle bin icon
                setDesktopIcons(prev => prev.map(i => 
                  i.id === 'recycle-bin' 
                    ? { 
                        ...i, 
                        icon: '/icons/win98/png/recycle_bin_full-0.png'
                      }
                    : i
                ));
              }
            } else if(icon.id === 'recycle-bin' && recycle_bin_files.length > 0) {
              if(confirm('Empty Recycle Bin?')) {
                emptyRecycleBin();
              }
            }
          }}
        >
          <img 
            src = {icon.icon}
            alt = {icon.name}
            style = {{
              width: '32px',
              height: '32px',
              imageRendering: 'pixelated',
              marginBottom: '4px',
              pointerEvents: 'none'
            }}
            onError = {(e) => {
              // Always show emoji as fallback
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div style = {{ 
            display: 'none', 
            fontSize: '32px', 
            pointerEvents: 'none',
            marginBottom: '4px',
            lineHeight: 1
          }}>
            {icon.emoji}
          </div>
          <span style = {{ 
            fontSize: '10px', 
            color: 'white',
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            maxWidth: '60px',
            lineHeight: '1.2',
            pointerEvents: 'none'
          }}>
            {icon.name}
          </span>
        </div>
      ))}

      {/* Context Menu */}
      {context_menu.visible && (
        <div 
          className = "window context-menu"
          style = {{
            position: 'absolute',
            left: `${context_menu.x}px`,
            top: `${context_menu.y}px`,
            zIndex: 10001,
            padding: '2px',
            minWidth: '150px'
          }}
          onClick = {(e) => e.stopPropagation()}
        >
          <div className = "window-body" style = {{ padding: '4px' }}>
            <div 
              style = {{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '2px' 
              }}
            >
              <button 
                onClick = {() => {
                  create_new_file('text', context_menu.x + 20, context_menu.y + 20);
                  hideContextMenu();
                }}
                style = {{ 
                  padding: '4px 8px', 
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📄 New Text File
              </button>
              <button 
                onClick = {() => {
                  create_new_file('folder', context_menu.x + 20, context_menu.y + 20);
                  hideContextMenu();
                }}
                style = {{ 
                  padding: '4px 8px', 
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📁 New Folder
              </button>
              <button 
                onClick = {() => {
                  create_new_file('image', context_menu.x + 20, context_menu.y + 20);
                  hideContextMenu();
                }}
                style = {{ 
                  padding: '4px 8px', 
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🖼️ New Image
              </button>
              <button 
                onClick = {() => {
                  create_new_file('exe', context_menu.x + 20, context_menu.y + 20);
                  hideContextMenu();
                }}
                style = {{ 
                  padding: '4px 8px', 
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ⚙️ New Program
              </button>
              <hr style = {{ margin: '4px 0', borderColor: '#808080' }} />
              <button 
                onClick = {() => {
                  // Refresh desktop
                  hideContextMenu();
                }}
                style = {{ 
                  padding: '4px 8px', 
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Manager Window */}
      {theme_manager_open && (
        <Win98_theme_manager 
          onClose = {() => setThemeManagerOpen(false)}
        />
      )}

      {/* Window Manager */}
      <Windows98WindowManager 
        activeWindows = {active_windows}
        onCloseWindow = {closeWindow}
        onFocusWindow = {focusWindow}
        activeWindowId = {active_window_id}
        windowZIndexes = {window_z_indexes}
      />
    </div>
  );
};

export default Windows98Home;