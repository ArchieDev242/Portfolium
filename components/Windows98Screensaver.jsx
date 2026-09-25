"use client";

import { useEffect, useRef, useState } from 'react';

const STAR_COUNT = 300;
const SPEED = 4;

const Windows98Screensaver = ({ on_exit, mode = 'mystify' }) => {
  const canvas_ref = useRef(null);
  const [current_mode, set_current_mode] = useState(mode);

  useEffect(() => {
    const handle_user_input = () => {
      if(on_exit) on_exit();
    };

    window.addEventListener('mousemove', handle_user_input);
    window.addEventListener('mousedown', handle_user_input);
    window.addEventListener('keydown', handle_user_input);
    window.addEventListener('touchstart', handle_user_input);

    return () => {
      window.removeEventListener('mousemove', handle_user_input);
      window.removeEventListener('mousedown', handle_user_input);
      window.removeEventListener('keydown', handle_user_input);
      window.removeEventListener('touchstart', handle_user_input);
    };
  }, [on_exit]);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    let anim_id;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handle_resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handle_resize);

    if(current_mode === 'starfield')
    {
      const stars = Array.from({ length: STAR_COUNT }, () => ({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: Math.random() * width
      }));

      const render_starfield = () => {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;

        for(let i = 0; i < stars.length; i++)
        {
          const star = stars[i];
          star.pz = star.z;
          star.z -= SPEED;

          if(star.z <= 0)
          {
            star.z = width;
            star.pz = width;
            star.x = (Math.random() - 0.5) * width * 2;
            star.y = (Math.random() - 0.5) * height * 2;
          }

          const k = 250 / star.z;
          const px = star.x * k + cx;
          const py = star.y * k + cy;

          if(px < 0 || px >= width || py < 0 || py >= height) continue;

          const pk = 250 / star.pz;
          const prev_x = star.x * pk + cx;
          const prev_y = star.y * pk + cy;

          const shade = Math.min(255, Math.floor((1 - star.z / width) * 255));
          ctx.strokeStyle = `rgb(${shade}, ${shade}, ${shade})`;
          ctx.lineWidth = Math.max(1, (1 - star.z / width) * 2.5);

          ctx.beginPath();
          ctx.moveTo(prev_x, prev_y);
          ctx.lineTo(px, py);
          ctx.stroke();
        }

        // Draw classic Windows 98 flying logo in center
        ctx.font = '16px "MS Sans Serif", Tahoma, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'center';
        ctx.fillText('Microsoft Windows 98', cx, height - 30);

        anim_id = requestAnimationFrame(render_starfield);
      };

      anim_id = requestAnimationFrame(render_starfield);
    } else
    {
      // Mystify Your Mind: iconic bouncing polygon ribbons
      const NUM_POINTS = 5;
      const NUM_LINES = 12;
      
      const create_polygon = (color_hue) => {
        const points = [];
        for(let i = 0; i < NUM_POINTS; i++)
        {
          points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            dx: (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1),
            dy: (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1)
          });
        }
        return { points, history: [], hue: color_hue };
      };

      const shapes = [
        create_polygon(180), // cyan ribbon
        create_polygon(300)  // magenta ribbon
      ];

      const render_mystify = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, width, height);

        shapes.forEach((shape) => {
          shape.hue = (shape.hue + 0.3) % 360;

          // Update current polygon points
          shape.points.forEach((pt) => {
            pt.x += pt.dx;
            pt.y += pt.dy;

            if(pt.x <= 0)
            {
              pt.x = 0;
              pt.dx = Math.abs(pt.dx);
            } else if(pt.x >= width)
            {
              pt.x = width;
              pt.dx = -Math.abs(pt.dx);
            }

            if(pt.y <= 0)
            {
              pt.y = 0;
              pt.dy = Math.abs(pt.dy);
            } else if(pt.y >= height)
            {
              pt.y = height;
              pt.dy = -Math.abs(pt.dy);
            }
          });

          // Push snapshot to history
          shape.history.unshift(shape.points.map((p) => ({ x: p.x, y: p.y })));
          if(shape.history.length > NUM_LINES)
          {
            shape.history.pop();
          }

          // Draw trailing ribbons
          shape.history.forEach((pts, idx) => {
            const alpha = 1 - (idx / NUM_LINES) * 0.8;
            ctx.strokeStyle = `hsla(${shape.hue}, 100%, 55%, ${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for(let i = 1; i < pts.length; i++)
            {
              ctx.lineTo(pts[i].x, pts[i].y);
            }
            ctx.closePath();
            ctx.stroke();
          });
        });

        anim_id = requestAnimationFrame(render_mystify);
      };

      anim_id = requestAnimationFrame(render_mystify);
    }

    return () => {
      window.removeEventListener('resize', handle_resize);
      cancelAnimationFrame(anim_id);
    };
  }, [current_mode]);

  return (
    <div 
      className = "win98-screensaver"
      style = {{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#000000',
        cursor: 'none'
      }}
    >
      <canvas 
        ref = {canvas_ref} 
        style = {{ display: 'block', width: '100%', height: '100%' }} 
      />
    </div>
  );
};

export default Windows98Screensaver;
