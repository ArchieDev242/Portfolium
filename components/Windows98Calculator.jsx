"use client";

import { useState, useEffect, useCallback } from 'react';
import Windows98Window from './Windows98Window';
import { WIN98_ICONS } from '@/lib/win98-icons';
import { play_sound } from '@/lib/win98-audio';

const Windows98Calculator = ({ onClose, onFocus, onMinimize, isMinimized, isActive, zIndex }) => {
  const [display, set_display] = useState('0');
  const [prev_value, set_prev_value] = useState(null);
  const [operation, set_operation] = useState(null);
  const [waiting_operand, set_waiting_operand] = useState(false);
  const [memory, set_memory] = useState(0);

  const input_digit = useCallback((digit) => {
    play_sound('click');
    if(waiting_operand)
    {
      set_display(String(digit));
      set_waiting_operand(false);
    } else 
    {
      set_display(display === '0' ? String(digit) : display + digit);
    }
  }, [display, waiting_operand]);

  const input_decimal = useCallback(() => {
    play_sound('click');
    if(waiting_operand)
    {
      set_display('0.');
      set_waiting_operand(false);
    } else if(!display.includes('.'))
    {
      set_display(display + '.');
    }
  }, [display, waiting_operand]);

  const clear_all = useCallback(() => {
    play_sound('click');
    set_display('0');
    set_prev_value(null);
    set_operation(null);
    set_waiting_operand(false);
  }, []);

  const clear_entry = useCallback(() => {
    play_sound('click');
    set_display('0');
    set_waiting_operand(false);
  }, []);

  const backspace = useCallback(() => {
    play_sound('click');
    if(waiting_operand) return;
    if(display.length > 1)
    {
      set_display(display.slice(0, -1));
    } else 
    {
      set_display('0');
    }
  }, [display, waiting_operand]);

  const perform_operation = useCallback((next_op) => {
    play_sound('click');
    const input_val = parseFloat(display);

    if(prev_value === null)
    {
      set_prev_value(input_val);
    } else if(operation && !waiting_operand)
    {
      const current_val = prev_value || 0;
      let res = current_val;

      if(operation === '+') res = current_val + input_val;
      else if(operation === '-') res = current_val - input_val;
      else if(operation === '*') res = current_val * input_val;
      else if(operation === '/') res = input_val !== 0 ? current_val / input_val : 'Error';

      set_display(String(res));
      set_prev_value(typeof res === 'number' ? res : null);
    }

    set_waiting_operand(true);
    set_operation(next_op);
  }, [display, prev_value, operation, waiting_operand]);

  const calculate_equals = useCallback(() => {
    play_sound('click');
    if(!operation || prev_value === null) return;

    const input_val = parseFloat(display);
    let res = prev_value;

    if(operation === '+') res = prev_value + input_val;
    else if(operation === '-') res = prev_value - input_val;
    else if(operation === '*') res = prev_value * input_val;
    else if(operation === '/') res = input_val !== 0 ? prev_value / input_val : 'Error';

    set_display(String(res));
    set_prev_value(null);
    set_operation(null);
    set_waiting_operand(true);
  }, [display, operation, prev_value]);

  const perform_unary = useCallback((type) => {
    play_sound('click');
    const val = parseFloat(display);
    let res = val;

    if(type === 'sqrt')
    {
      res = val >= 0 ? Math.sqrt(val) : 'Error';
    } else if(type === 'percent')
    {
      res = val / 100;
    } else if(type === 'reciprocal')
    {
      res = val !== 0 ? 1 / val : 'Error';
    } else if(type === 'negate')
    {
      res = -val;
    }

    set_display(String(res));
    set_waiting_operand(true);
  }, [display]);

  // Memory functions
  const memory_clear = () => { play_sound('click'); set_memory(0); };
  const memory_recall = () => { play_sound('click'); set_display(String(memory)); set_waiting_operand(true); };
  const memory_store = () => { play_sound('click'); set_memory(parseFloat(display) || 0); set_waiting_operand(true); };
  const memory_add = () => { play_sound('click'); set_memory((m) => m + (parseFloat(display) || 0)); set_waiting_operand(true); };

  // Keyboard support when window is active
  useEffect(() => {
    if(!isActive) return;

    const handle_key_down = (e) => {
      if(e.key >= '0' && e.key <= '9') input_digit(e.key);
      else if(e.key === '.') input_decimal();
      else if(e.key === '=' || e.key === 'Enter') calculate_equals();
      else if(e.key === '+') perform_operation('+');
      else if(e.key === '-') perform_operation('-');
      else if(e.key === '*') perform_operation('*');
      else if(e.key === '/') perform_operation('/');
      else if(e.key === 'Backspace') backspace();
      else if(e.key === 'Escape') clear_all();
    };

    window.addEventListener('keydown', handle_key_down);
    return () => window.removeEventListener('keydown', handle_key_down);
  }, [isActive, input_digit, input_decimal, calculate_equals, perform_operation, backspace, clear_all]);

  return (
    <Windows98Window
      title = "Calculator"
      icon = {WIN98_ICONS.executable}
      onClose = {onClose}
      onFocus = {onFocus}
      onMinimize = {onMinimize}
      isMinimized = {isMinimized}
      isActive = {isActive}
      zIndex = {zIndex}
      width = {270}
      height = {310}
      resizable = {false}
      maximizable = {false}
      minimizable = {true}
    >
      <div 
        style = {{ 
          padding: '6px', 
          fontFamily: '"Pixelated MS Sans Serif", Arial, sans-serif',
          fontSize: '11px',
          color: '#000000',
          userSelect: 'none'
        }}
      >
        {/* Menu bar */}
        <div style = {{ display: 'flex', gap: '12px', marginBottom: '8px', fontSize: '11px' }}>
          <span style = {{ cursor: 'pointer' }}><u>E</u>dit</span>
          <span style = {{ cursor: 'pointer' }}><u>V</u>iew</span>
          <span style = {{ cursor: 'pointer' }}><u>H</u>elp</span>
        </div>

        {/* Display Screen */}
        <div 
          className = "sunken-panel"
          style = {{
            background: '#ffffff',
            color: '#000000',
            border: '2px inset #808080',
            padding: '4px 8px',
            textAlign: 'right',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: '"Pixelated MS Sans Serif", Tahoma, monospace',
            minHeight: '28px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginBottom: '8px'
          }}
        >
          {display}
        </div>

        {/* Memory Indicator and Clear Row */}
        <div style = {{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr', gap: '4px', marginBottom: '6px' }}>
          <div 
            style = {{
              border: '2px inset #ffffff',
              background: '#c0c0c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '11px',
              color: memory !== 0 ? '#000080' : 'transparent'
            }}
          >
            M
          </div>
          <button onClick = {backspace} style = {{ height: '26px', fontSize: '11px', color: '#800000' }}>
            Backspace
          </button>
          <button onClick = {clear_entry} style = {{ height: '26px', fontSize: '11px', color: '#800000' }}>
            CE
          </button>
          <button onClick = {clear_all} style = {{ height: '26px', fontSize: '11px', color: '#800000' }}>
            C
          </button>
        </div>

        {/* Main keypad grid */}
        <div style = {{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
          {/* Row 1 */}
          <button onClick = {memory_clear} style = {{ height: '28px', color: '#800000' }}>MC</button>
          <button onClick = {() => input_digit('7')} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>7</button>
          <button onClick = {() => input_digit('8')} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>8</button>
          <button onClick = {() => input_digit('9')} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>9</button>
          <button onClick = {() => perform_operation('/')} style = {{ height: '28px', color: '#800000' }}>/</button>

          {/* Row 2 */}
          <button onClick = {memory_recall} style = {{ height: '28px', color: '#800000' }}>MR</button>
          <button onClick = {() => input_digit('4')} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>4</button>
          <button onClick = {() => input_digit('5')} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>5</button>
          <button onClick = {() => input_digit('6')} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>6</button>
          <button onClick = {() => perform_operation('*')} style = {{ height: '28px', color: '#800000' }}>*</button>

          {/* Row 3 */}
          <button onClick = {memory_store} style = {{ height: '28px', color: '#800000' }}>MS</button>
          <button onClick = {() => input_digit('1')} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>1</button>
          <button onClick = {() => input_digit('2')} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>2</button>
          <button onClick = {() => input_digit('3')} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>3</button>
          <button onClick = {() => perform_operation('-')} style = {{ height: '28px', color: '#800000' }}>-</button>

          {/* Row 4 */}
          <button onClick = {memory_add} style = {{ height: '28px', color: '#800000' }}>M+</button>
          <button onClick = {() => input_digit('0')} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>0</button>
          <button onClick = {() => perform_unary('negate')} style = {{ height: '28px', color: '#000080' }}>+/-</button>
          <button onClick = {input_decimal} style = {{ height: '28px', color: '#000080', fontWeight: 'bold' }}>.</button>
          <button onClick = {() => perform_operation('+')} style = {{ height: '28px', color: '#800000' }}>+</button>

          {/* Row 5 */}
          <button onClick = {() => perform_unary('sqrt')} style = {{ height: '28px', color: '#000080' }}>sqrt</button>
          <button onClick = {() => perform_unary('percent')} style = {{ height: '28px', color: '#000080' }}>%</button>
          <button onClick = {() => perform_unary('reciprocal')} style = {{ height: '28px', color: '#000080' }}>1/x</button>
          <button onClick = {calculate_equals} style = {{ height: '28px', gridColumn: 'span 2', color: '#800000', fontWeight: 'bold' }}>=</button>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Windows98Calculator;
