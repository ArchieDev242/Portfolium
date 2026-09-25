"use client";

import { useState } from 'react';
import Image from 'next/image';
import Windows98Window from './Windows98Window';
import Windows98ContextMenu from './Windows98ContextMenu';
import { getWin98Icon, WIN98_ICONS } from '@/lib/win98-icons';
import { play_sound } from '@/lib/win98-audio';

const Windows98RecycleBin = ({
  onClose,
  onFocus,
  onMinimize,
  isMinimized,
  isActive,
  zIndex,
  files = [],
  onRestoreItem,
  onRestoreAll,
  onEmptyBin,
  onDeleteForever
}) => {
  const [selected_id, set_selected_id] = useState(null);
  const [item_context_menu, set_item_context_menu] = useState(null);

  const handle_restore_selected = () => {
    if(!selected_id) return;
    play_sound('open');
    if(onRestoreItem) onRestoreItem(selected_id);
    set_selected_id(null);
  };

  const handle_empty = () => {
    if(files.length === 0) return;
    if(confirm('Are you sure you want to permanently delete all items in the Recycle Bin?'))
    {
      play_sound('close');
      if(onEmptyBin) onEmptyBin();
      set_selected_id(null);
    }
  };

  const handle_row_context_menu = (e, file) => {
    e.preventDefault();
    e.stopPropagation();
    set_selected_id(file.id);

    set_item_context_menu({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          label: 'Restore',
          action: () => {
            play_sound('open');
            if(onRestoreItem) onRestoreItem(file.id);
          }
        },
        {
          label: 'Delete',
          action: () => {
            if(confirm(`Are you sure you want to permanently delete "${file.name}"?`))
            {
              if(onDeleteForever) onDeleteForever(file.id);
            }
          }
        },
        { is_separator: true },
        {
          label: 'Properties',
          action: () => {
            alert(`File: ${file.name}\nType: ${file.file_type || 'Document'}\nOriginal Location: C:\\WINDOWS\\Desktop`);
          }
        }
      ]
    });
  };

  return (
    <Windows98Window
      title = "Recycle Bin"
      icon = {files.length > 0 ? WIN98_ICONS.recycle_full : WIN98_ICONS.recycle_empty}
      onClose = {onClose}
      onFocus = {onFocus}
      onMinimize = {onMinimize}
      isMinimized = {isMinimized}
      isActive = {isActive}
      zIndex = {zIndex}
      width = {560}
      height = {380}
      resizable = {true}
      maximizable = {true}
      minimizable = {true}
    >
      <div 
        style = {{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          color: '#000000',
          fontFamily: '"Pixelated MS Sans Serif", Arial, sans-serif',
          fontSize: '11px',
          userSelect: 'none'
        }}
      >
        {/* Menu bar */}
        <div style = {{ display: 'flex', gap: '14px', padding: '2px 4px', borderBottom: '1px solid #808080' }}>
          <span style = {{ cursor: 'pointer' }}><u>F</u>ile</span>
          <span style = {{ cursor: 'pointer' }}><u>E</u>dit</span>
          <span style = {{ cursor: 'pointer' }}><u>V</u>iew</span>
          <span style = {{ cursor: 'pointer' }}><u>G</u>o</span>
          <span style = {{ cursor: 'pointer' }}>Fa<u>v</u>orites</span>
          <span style = {{ cursor: 'pointer' }}><u>H</u>elp</span>
        </div>

        {/* Toolbar */}
        <div style = {{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px', borderBottom: '1px solid #808080' }}>
          <button
            onClick = {handle_empty}
            disabled = {files.length === 0}
            style = {{ display: 'flex', alignItems: 'center', gap: '4px', height: '22px', fontSize: '11px' }}
          >
            <Image
              src = {getWin98Icon(WIN98_ICONS.recycle_empty)}
              alt = ""
              width = {16}
              height = {16}
              unoptimized
              style = {{ imageRendering: 'pixelated' }}
            />
            Empty Recycle Bin
          </button>
          <button
            onClick = {() => { play_sound('open'); if(onRestoreAll) onRestoreAll(); }}
            disabled = {files.length === 0}
            style = {{ display: 'flex', alignItems: 'center', gap: '4px', height: '22px', fontSize: '11px' }}
          >
            Restore All Items
          </button>
          {selected_id && (
            <button
              onClick = {handle_restore_selected}
              style = {{ display: 'flex', alignItems: 'center', gap: '4px', height: '22px', fontSize: '11px', fontWeight: 'bold' }}
            >
              Restore Item
            </button>
          )}
        </div>

        {/* Address bar */}
        <div style = {{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 4px', borderBottom: '1px solid #808080' }}>
          <span style = {{ fontSize: '11px' }}>Address</span>
          <div 
            style = {{ 
              flex: 1, 
              background: '#ffffff', 
              border: '2px inset #808080', 
              padding: '1px 6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Image
              src = {getWin98Icon(files.length > 0 ? WIN98_ICONS.recycle_full : WIN98_ICONS.recycle_empty)}
              alt = ""
              width = {14}
              height = {14}
              unoptimized
              style = {{ imageRendering: 'pixelated' }}
            />
            <span>Recycle Bin</span>
          </div>
        </div>

        {/* Main List Area */}
        <div 
          className = "sunken-panel"
          style = {{
            flex: 1,
            background: '#ffffff',
            border: '2px inset #808080',
            overflow: 'auto',
            margin: '4px',
            position: 'relative'
          }}
          onClick = {() => set_selected_id(null)}
        >
          {files.length === 0 ? (
            <div style = {{ padding: '20px', textAlign: 'center', color: '#888888', fontStyle: 'italic' }}>
              The Recycle Bin is empty.
            </div>
          ) : (
            <table style = {{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style = {{ background: '#c0c0c0', borderBottom: '1px solid #808080' }}>
                  <th style = {{ padding: '3px 6px', borderRight: '1px solid #808080', fontWeight: 'normal' }}>Name</th>
                  <th style = {{ padding: '3px 6px', borderRight: '1px solid #808080', fontWeight: 'normal' }}>Original Location</th>
                  <th style = {{ padding: '3px 6px', borderRight: '1px solid #808080', fontWeight: 'normal' }}>Date Deleted</th>
                  <th style = {{ padding: '3px 6px', fontWeight: 'normal' }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => {
                  const is_selected = selected_id === file.id;
                  const date_str = file.created 
                    ? new Date(file.created).toLocaleDateString([], { month: 'numeric', day: 'numeric', year: '2-digit', hour: '2-digit', minute: '2-digit' })
                    : '09/18/98 12:00 PM';

                  return (
                    <tr
                      key = {file.id}
                      onClick = {(e) => {
                        e.stopPropagation();
                        set_selected_id(file.id);
                      }}
                      onDoubleClick = {(e) => {
                        e.stopPropagation();
                        handle_restore_selected();
                      }}
                      onContextMenu = {(e) => handle_row_context_menu(e, file)}
                      style = {{
                        background: is_selected ? '#000080' : 'transparent',
                        color: is_selected ? '#ffffff' : '#000000',
                        cursor: 'default'
                      }}
                    >
                      <td style = {{ padding: '3px 6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Image
                          src = {getWin98Icon(file.icon || WIN98_ICONS.notepad_file)}
                          alt = ""
                          width = {16}
                          height = {16}
                          unoptimized
                          style = {{ imageRendering: 'pixelated' }}
                        />
                        <span>{file.name}</span>
                      </td>
                      <td style = {{ padding: '3px 6px' }}>C:\WINDOWS\Desktop</td>
                      <td style = {{ padding: '3px 6px' }}>{date_str}</td>
                      <td style = {{ padding: '3px 6px' }}>{file.file_type ? file.file_type.toUpperCase() + ' File' : 'Document'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Status bar */}
        <div className = "status-bar" style = {{ display: 'flex', justifyContent: 'space-between', padding: '2px 6px' }}>
          <div>{files.length} object(s)</div>
          <div>{files.length * 2} KB</div>
        </div>

        {/* Item context menu */}
        {item_context_menu && (
          <Windows98ContextMenu
            x = {item_context_menu.x}
            y = {item_context_menu.y}
            items = {item_context_menu.items}
            on_close = {() => set_item_context_menu(null)}
          />
        )}
      </div>
    </Windows98Window>
  );
};

export default Windows98RecycleBin;
