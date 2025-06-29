"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const Windows98Home = () => {
  const router = useRouter();
  const windowRef = useRef(null);
  const titlebarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.body.classList.add('win98-mode');

    const link98 = document.createElement('link');
    link98.rel = 'stylesheet';
    link98.href = 'https://unpkg.com/98.css';
    link98.id = 'win98-css';
    document.head.appendChild(link98);

    const customLink = document.createElement('link');
    customLink.rel = 'stylesheet';
    customLink.href = '/win98/win98.css';
    customLink.id = 'win98-custom-css';
    document.head.appendChild(customLink);

    return () => {
      document.body.classList.remove('win98-mode');
      
      const existing98Link = document.getElementById('win98-css');
      if(existing98Link) 
        {
        document.head.removeChild(existing98Link);
      }

      const existingCustomLink = document.getElementById('win98-custom-css');
      if(existingCustomLink) 
        {
        document.head.removeChild(existingCustomLink);
      }

      document.body.style.fontFamily = '';
      document.body.style.background = '';
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  useEffect(() => {
    if(windowRef.current) 
      {
      const windowEl = windowRef.current;
      const rect = windowEl.getBoundingClientRect();
      const centerX = (window.innerWidth - rect.width) / 2;
      const centerY = (window.innerHeight - rect.height) / 2;
      setWindowPosition({ x: centerX, y: centerY });
    }
  }, []);

  useEffect(() => {
    const titlebar = titlebarRef.current;
    if(titlebar) 
      {
      const preventSelect = (e) => e.preventDefault();
      titlebar.addEventListener('selectstart', preventSelect);
      titlebar.addEventListener('dragstart', preventSelect);
      
      return () => {
        titlebar.removeEventListener('selectstart', preventSelect);
        titlebar.removeEventListener('dragstart', preventSelect);
      };
    }
  }, []);

  const handlePointerDown = (e) => {
    if(e.target.closest('button')) 
      {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    
    const windowEl = windowRef.current;
    const rect = windowEl.getBoundingClientRect();
    
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    setIsDragging(true);
    document.body.style.userSelect = 'none';
    
    const handleMove = (moveEvent) => {
      moveEvent.preventDefault();
      
      const clientX = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0]?.clientX) || 0;
      const clientY = moveEvent.clientY || (moveEvent.touches && moveEvent.touches[0]?.clientY) || 0;

      const newX = clientX - (e.clientX - rect.left);
      const newY = Math.max(0, clientY - (e.clientY - rect.top));
      setWindowPosition({ x: newX, y: newY });
    };

    const handleUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };

    document.addEventListener('pointermove', handleMove, { passive: false });
    document.addEventListener('pointerup', handleUp);
    document.addEventListener('mousemove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleUp);
    
    if(titlebarRef.current && titlebarRef.current.setPointerCapture && e.pointerId) 
      {
      try 
      {
        titlebarRef.current.setPointerCapture(e.pointerId);
      } catch(err) 
      {
        console.warn('Could not capture pointer:', err);
      }
    }
  };

  return (
    <div 
      className = {`win98-container ${isDragging ? 'dragging' : ''}`}
      style = {{ 
        minHeight: '100vh', 
        background: '#008080',
        fontFamily: 'MS Sans Serif, sans-serif',
        padding: '20px',
        color: 'white',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Main Content Window */}
      <div 
        ref={windowRef}
        className = "window" 
        style = {{
          maxWidth: '800px',
          position: 'absolute',
          left: `${windowPosition.x}px`,
          top: `${windowPosition.y}px`,
          cursor: isDragging ? 'grabbing' : 'default',
          zIndex: isDragging ? 1000 : 'auto'
        }}
      >
        <div 
          ref={titlebarRef}
          className = "title-bar"
          onPointerDown={handlePointerDown}
          onMouseDown={handlePointerDown}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            touchAction: 'none'
          }}
        >
          <div className = "title-bar-text">💻 Maksym Kopychko - Portfolio.exe</div>
          <div className = "title-bar-controls">
            <button aria-label = "Minimize"></button>
            <button aria-label = "Maximize"></button>
            <button 
              aria-label = "Close"
              onClick = {() => router.push('/')}
              title = "Exit Windows 98 Mode"
            ></button>
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
            <button onClick = {() => router.push('/projects')} style = {{ minWidth: '120px' }}>
              📁 View Projects
            </button>
            <button onClick = {() => router.push('/contact')} style = {{ minWidth: '120px' }}>
              📧 Contact Me
            </button>
            <button onClick = {() => router.push('/resume')} style = {{ minWidth: '120px' }}>
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
            padding: '0 12px',
            background: '#c0c0c0',
            border: '1px outset #c0c0c0'
          }}
        >
          🪟 Start
        </button>

        {/* Running Programs */}
        <div style = {{ 
          flex: 1, 
          height: '22px', 
          border: '1px inset #c0c0c0',
          background: '#c0c0c0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px'
        }}>
          <div style = {{ 
            height: '18px', 
            fontSize: '10px',
            padding: '0 8px',
            background: '#c0c0c0',
            border: '1px outset #c0c0c0',
            display: 'flex',
            alignItems: 'center'
          }}>
            💻 Portfolio.exe
          </div>
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
    </div>
  );
};

export default Windows98Home;