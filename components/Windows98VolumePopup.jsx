"use client";

import { useEffect, useRef, useState } from 'react';
import { get_master_volume, set_master_volume, get_sound_muted, set_sound_muted, play_sound } from '@/lib/win98-audio';

const Windows98VolumePopup = ({ on_close, on_mute_change }) => {
  const popup_ref = useRef(null);
  const [volume, set_volume] = useState(Math.round(get_master_volume() * 100));
  const [muted, set_muted] = useState(get_sound_muted());

  useEffect(() => {
    const handle_click_outside = (e) => {
      if(popup_ref.current && !popup_ref.current.contains(e.target))
      {
        if(on_close) on_close();
      }
    };
    const handle_escape = (e) => {
      if(e.key === 'Escape')
      {
        if(on_close) on_close();
      }
    };

    window.addEventListener('mousedown', handle_click_outside);
    window.addEventListener('keydown', handle_escape);

    return () => {
      window.removeEventListener('mousedown', handle_click_outside);
      window.removeEventListener('keydown', handle_escape);
    };
  }, [on_close]);

  const handle_volume_change = (e) => {
    const val = parseInt(e.target.value, 10);
    set_volume(val);
    set_master_volume(val / 100);
  };

  const handle_volume_release = () => {
    play_sound('click');
  };

  const handle_mute_toggle = (e) => {
    const is_m = e.target.checked;
    set_muted(is_m);
    set_sound_muted(is_m);
    if(on_mute_change) on_mute_change(is_m);
    if(!is_m) play_sound('click');
  };

  return (
    <div
      ref = {popup_ref}
      className = "window win98-volume-popup"
      style = {{
        position: 'fixed',
        bottom: '34px',
        right: '10px',
        width: '90px',
        zIndex: 10005,
        boxShadow: '2px 2px 5px rgba(0,0,0,0.4)',
        padding: '2px',
        color: '#000000'
      }}
      onClick = {(e) => e.stopPropagation()}
    >
      <div className = "title-bar" style = {{ padding: '1px 3px' }}>
        <div className = "title-bar-text" style = {{ fontSize: '10px' }}>Volume</div>
      </div>
      <div className = "window-body" style = {{ margin: '4px', textAlign: 'center' }}>
        <div style = {{ fontSize: '10px', marginBottom: '4px', color: '#000000' }}>Master</div>
        
        {/* Vertical range container */}
        <div style = {{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <input
            type = "range"
            min = "0"
            max = "100"
            value = {muted ? 0 : volume}
            onChange = {handle_volume_change}
            onMouseUp = {handle_volume_release}
            disabled = {muted}
            style = {{
              writingMode: 'vertical-lr',
              direction: 'rtl',
              height: '95px',
              cursor: muted ? 'default' : 'pointer'
            }}
          />
        </div>

        <div style = {{ marginTop: '6px', borderTop: '1px solid #808080', paddingTop: '4px' }}>
          <label style = {{ fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}>
            <input
              type = "checkbox"
              checked = {muted}
              onChange = {handle_mute_toggle}
            />
            Mute
          </label>
        </div>
      </div>
    </div>
  );
};

export default Windows98VolumePopup;
