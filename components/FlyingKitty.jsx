"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const base = (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH) || "";

const TRAJECTORIES = [
  { from: { x: "-15%", y: "25%" }, to: { x: "115%", y: "75%" } },
  { from: { x: "115%", y: "35%" }, to: { x: "-15%", y: "65%" } },
  { from: { x: "45%", y: "-20%" }, to: { x: "55%", y: "120%" } },
  { from: { x: "75%", y: "120%" }, to: { x: "25%", y: "-20%" } },
  { from: { x: "-20%", y: "45%" }, to: { x: "120%", y: "55%" } },
  { from: { x: "110%", y: "80%" }, to: { x: "-10%", y: "20%" } },
];

const rand = (min, max) => Math.random() * (max - min) + min;

const FlyingKitty = () => {
  const [visible, set_visible] = useState(false);
  const [config, set_config] = useState(null);
  const cleanup_ref = useRef(null);

  const schedule_next = useCallback(() => {
    const delay_ms = rand(40000, 100000);
    const timer = setTimeout(() => {
      const idx = Math.floor(Math.random() * TRAJECTORIES.length);
      const t = TRAJECTORIES[idx];
      set_config({
        from: t.from,
        to: t.to,
        duration: rand(4.5, 7),
        size: Math.round(rand(70, 130)),
        rotate: rand(-180, 180),
      });
      set_visible(true);
    }, delay_ms);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    cleanup_ref.current?.();
    cleanup_ref.current = schedule_next();
    return () => {
      cleanup_ref.current?.();
      cleanup_ref.current = null;
    };
  }, [schedule_next]);

  const handle_complete = () => {
    set_visible(false);
    cleanup_ref.current?.();
    const t = setTimeout(() => {
      cleanup_ref.current = schedule_next();
    }, 100);
    cleanup_ref.current = () => clearTimeout(t);
  };

  if(!config) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className = "fixed inset-0 pointer-events-none z-[9998]"
          aria-hidden = "true"
        >
          <motion.div
            className = "absolute rounded-full overflow-hidden shadow-xl"
            style = {{
              left: config.from.x,
              top: config.from.y,
              width: config.size,
              height: config.size,
              transform: "translate(-50%, -50%)",
            }}
            initial = {{ opacity: 0.5 }}
            animate = {{
              left: config.to.x,
              top: config.to.y,
              rotate: config.rotate + 360,
              opacity: [0.6, 0.95, 0.7],
            }}
            exit = {{ opacity: 0 }}
            transition = {{
              left: { duration: config.duration, ease: "linear" },
              top: { duration: config.duration, ease: "linear" },
              rotate: { duration: config.duration, ease: "linear" },
              opacity: { duration: config.duration * 0.3, ease: "easeInOut" },
            }}
            onAnimationComplete = {handle_complete}
          >
            <Image
              src = {`${base}/assets/kitty.jpg`}
              alt = ""
              width = {config.size}
              height = {config.size}
              className = "object-cover w-full h-full"
              style = {{ border: "3px solid var(--accent-default)" }}
              unoptimized
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlyingKitty;
