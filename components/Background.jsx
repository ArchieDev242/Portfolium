"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const PARTICLE_COUNT = 18;
const ORB_CONFIG = [
  { left: '15%', top: '20%', size: 320, opacity: 0.6, delay: 0 },
  { left: '75%', top: '60%', size: 280, opacity: 0.5, delay: 1 },
  { left: '50%', top: '85%', size: 400, opacity: 0.4, delay: 2 },
  { left: '85%', top: '15%', size: 200, opacity: 0.35, delay: 0.5 },
  { left: '10%', top: '70%', size: 250, opacity: 0.45, delay: 1.5 },
];

const Background = () => {
  const particles = useMemo(() => 
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      left: `${(i * 37 + 11) % 100}%`,
      top: `${(i * 29 + 7) % 100}%`,
      size: 1.2 + ((i * 7) % 5) * 0.3,
      duration: 5 + (i % 4),
      delay: (i * 0.3) % 3,
    })),
  []);

  return (
    <div className = "fixed inset-0 -z-10 overflow-hidden bg-bg-base" aria-hidden = "true">
      {/* Aurora — uses theme vars */}
      <motion.div
        className = "absolute inset-0 bg-aurora"
        animate = {{ opacity: [0.6, 1, 0.7, 1, 0.6] }}
        transition = {{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting orbs — theme-colored */}
      <div className = "absolute inset-0">
        {ORB_CONFIG.map((orb, i) => (
          <motion.div
            key = {i}
            className = "absolute rounded-full bg-accent-orb"
            style = {{
              left: orb.left,
              top: orb.top,
              width: orb.size,
              height: orb.size,
              opacity: orb.opacity,
            }}
            animate = {{
              x: [0, 40, -30, 0],
              y: [0, -25, 30, 0],
              scale: [1, 1.18, 0.9, 1],
              opacity: [orb.opacity * 0.7, orb.opacity, orb.opacity * 0.8, orb.opacity * 0.7],
            }}
            transition = {{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay,
            }}
          />
        ))}
      </div>

      {/* Grid — theme, subtle pulse */}
      <div className = "absolute inset-0 bg-grid bg-grid-animated" />

      {/* Twinkling particles — float upward */}
      <div className = "absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key = {i}
            className = "absolute rounded-full bg-particle"
            style = {{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate = {{
              opacity: [0, 0.9, 0],
              scale: [0.8, 1.2, 0.8],
              y: [0, -80, 0],
            }}
            transition = {{
              duration: p.duration + 2,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className = "absolute inset-0 pointer-events-none bg-vignette" />

      {/* Top horizon glow — breathing */}
      <div className = "absolute inset-x-0 top-0 h-32 pointer-events-none bg-horizon bg-horizon-animated" />

      <div className = "absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
};

export default Background;
