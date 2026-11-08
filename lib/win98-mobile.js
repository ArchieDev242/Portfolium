import { useEffect, useRef, useState } from 'react';

// phones get full-screen windows; touch screens get tap-to-open and long-press menus
export const MOBILE_QUERY = '(max-width: 768px)';
export const TOUCH_QUERY = '(pointer: coarse)';

const LONG_PRESS_MS = 550;
const LONG_PRESS_MOVE_LIMIT = 10;
const COMPAT_MOUSE_EVENTS = ['mousedown', 'mouseup', 'click'];
const COMPAT_SWALLOW_MS = 400;

const matches = (query) => typeof window !== 'undefined' && window.matchMedia(query).matches;

export const is_mobile_screen = () => matches(MOBILE_QUERY);
export const is_touch_device = () => matches(TOUCH_QUERY);

// hooks keep the camelCase "use" prefix: react-hooks lint only recognizes useX names
export const useIsMobile = () => {
  const [is_mobile, set_is_mobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => set_is_mobile(media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return is_mobile;
};

// returns pointer handlers that call on_long_press(fake_event) after a still touch;
// was_long_press() tells the following click to do nothing
export const useLongPress = (on_long_press) => {
  const timer_ref = useRef(null);
  const start_ref = useRef(null);
  const fired_ref = useRef(false);
  const callback_ref = useRef(on_long_press);
  callback_ref.current = on_long_press;

  const cancel = () => {
    if(timer_ref.current) clearTimeout(timer_ref.current);
    timer_ref.current = null;
  };

  useEffect(() => cancel, []);

  const on_pointer_down = (e, ...args) => {
    fired_ref.current = false;
    if(e.pointerType !== 'touch') return;

    const target = e.target;
    start_ref.current = { x: e.clientX, y: e.clientY };
    cancel();
    timer_ref.current = setTimeout(() => {
      fired_ref.current = true;
      callback_ref.current({
        clientX: start_ref.current.x,
        clientY: start_ref.current.y,
        target,
        preventDefault: () => {},
        stopPropagation: () => {}
      }, ...args);
    }, LONG_PRESS_MS);
  };

  const on_pointer_move = (e) => {
    if(!timer_ref.current || !start_ref.current) return;
    const moved = Math.hypot(e.clientX - start_ref.current.x, e.clientY - start_ref.current.y);
    if(moved > LONG_PRESS_MOVE_LIMIT) cancel();
  };

  // after a long press the browser still sends mousedown/mouseup/click for the touch;
  // swallow them so they don't close the menu that just opened
  const on_pointer_end = () => {
    cancel();
    if(!fired_ref.current) return;

    // each listener eats only the first event of its type; the timeout cleans up if none arrives
    const listeners = COMPAT_MOUSE_EVENTS.map(type => {
      const swallow = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        window.removeEventListener(type, swallow, true);
      };
      window.addEventListener(type, swallow, true);
      return [type, swallow];
    });
    setTimeout(() => {
      listeners.forEach(([type, swallow]) => window.removeEventListener(type, swallow, true));
    }, COMPAT_SWALLOW_MS);
  };

  return {
    on_pointer_down,
    on_pointer_move,
    on_pointer_end,
    was_long_press: () => fired_ref.current
  };
};
