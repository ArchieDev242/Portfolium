import React, { useEffect, useRef } from 'react';

const SkillTreeBackground = () => {
  const canvas_ref = useRef(null);
  
  useEffect(() => {
    const canvas = canvas_ref.current;

    if(!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const grid_size = 30;
    const grid_color = 'rgba(6, 182, 212, 0.2)';
    const node_color = 'rgba(6, 182, 212, 0.1)';
    
    const particles = [];
    const particle_count = 30;
    
    for(let i = 0; i < particle_count; i++) 
      {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(6, 182, 212, ${Math.random() * 0.3})`
      });
    }
    
    const draw_grid = () => {
      ctx.strokeStyle = grid_color;
      ctx.lineWidth = 1;
      
      for(let y = 0; y < height; y += grid_size) 
        {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      for(let x = 0; x < width; x += grid_size) 
        {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      for(let x = 0; x < width; x += grid_size) 
        {
        for(let y = 0; y < height; y += grid_size) 
          {
          ctx.fillStyle = node_color;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    
    const update_particles = () => {
      for(let i = 0; i < particles.length; i++) 
        {
        const p = particles[i];
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if(p.x < 0 || p.x > width) p.speedX *= -1;
        if(p.y < 0 || p.y > height) p.speedY *= -1;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      draw_grid();
      update_particles();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);
  
  return (
    <canvas 
      ref = {canvas_ref} 
      className = "absolute inset-0 w-full h-full"
      style = {{ imageRendering: 'pixelated' }}
    />
  );
};

export default SkillTreeBackground;
