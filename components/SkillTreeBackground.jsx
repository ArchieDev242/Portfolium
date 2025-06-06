import React, { useEffect, useRef } from 'react';

const SkillTreeBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Параметри для сітки
    const gridSize = 30;
    const gridColor = 'rgba(6, 182, 212, 0.2)';
    const nodeColor = 'rgba(6, 182, 212, 0.1)';
    
    // Параметри для частинок
    const particles = [];
    const particleCount = 30;
    
    // Створюємо частинки
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(6, 182, 212, ${Math.random() * 0.3})`
      });
    }
    
    // Функція для малювання сітки
    const drawGrid = () => {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      
      // Малюємо горизонтальні лінії
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Малюємо вертикальні лінії
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Малюємо вузли на перетинах
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.fillStyle = nodeColor;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    
    // Функція для оновлення та малювання частинок
    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Оновлюємо позицію
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Перевіряємо межі
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
        
        // Малюємо частинку
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    // Функція анімації
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      drawGrid();
      updateParticles();
      
      requestAnimationFrame(animate);
    };
    
    // Запускаємо анімацію
    animate();
    
    // Очищення при розмонтуванні
    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);
  
  return (
    <canvas 
      ref = {canvasRef} 
      className = "absolute inset-0 w-full h-full"
      style = {{ imageRendering: 'pixelated' }}
    />
  );
};

export default SkillTreeBackground;
