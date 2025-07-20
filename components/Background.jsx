"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const Background = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      left: `${(i * 37 + 13) % 100}%`,
      top: `${(i * 23 + 7) % 100}%`,
    }));
  }, []);

  return (
    <div className = "fixed inset-0 -z-10">
      <div className = "absolute inset-0 bg-gradient-to-b from-primary via-primary to-black opacity-95" />

      <div 
        className = "absolute inset-0" 
        style = {{
          backgroundImage: `
            linear-gradient(to right, var(--accent-default, rgba(0,255,153,0.1)) 1px, transparent 1px),
            linear-gradient(to bottom, var(--accent-default, rgba(0,255,153,0.1)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className = "absolute inset-0">
        <motion.div
          className = "absolute top-0 left-0 w-full h-full"
          animate = {{
            background: 
            [
              "radial-gradient(circle at 20% 20%, var(--accent-shadow, rgba(0,255,153,0.15)) 0%, rgba(0,0,0,0) 50%)",
              "radial-gradient(circle at 80% 80%, var(--accent-shadow, rgba(0,255,153,0.15)) 0%, rgba(0,0,0,0) 50%)",
              "radial-gradient(circle at 20% 80%, var(--accent-shadow, rgba(0,255,153,0.15)) 0%, rgba(0,0,0,0) 50%)",
              "radial-gradient(circle at 80% 20%, var(--accent-shadow, rgba(0,255,153,0.15)) 0%, rgba(0,0,0,0) 50%)",
              "radial-gradient(circle at 20% 20%, var(--accent-shadow, rgba(0,255,153,0.15)) 0%, rgba(0,0,0,0) 50%)"
            ]
          }}
          transition = {{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className = "absolute inset-0 overflow-hidden">
        {particles.map((position, i) => (
          <motion.div
            key = {i}
            className = "absolute w-1 h-1 bg-accent-default rounded-full"
            style = {position}
            animate = {{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -100, 0],
            }}
            transition = {{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className = "absolute inset-0 backdrop-blur-[100px]" />
    </div>
  );
};

export default Background;