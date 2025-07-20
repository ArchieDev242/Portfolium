"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PixelTransition = () => {
  const pathname = usePathname();
  
  const pixels = [];
  const grid_size = 12;
  
  for(let y = 0; y < grid_size; y++) 
    {
    for(let x = 0; x < grid_size; x++) 
      {
      pixels.push({
        x,
        y,
        delay: (x + y) * 0.02
      });
    }
  }

  return (
    <AnimatePresence mode = "wait">
      <motion.div
        key = {pathname}
        className = "fixed inset-0 pointer-events-none"
        style = {{ zIndex: 9999 }}
      >
        <div className = "h-screen w-screen fixed top-0 left-0 right-0 flex flex-wrap">
          {pixels.map((pixel, i) => (
            <motion.div
              key = {i}
              className = "bg-accent-default"
              style = {{
                width: `${100 / grid_size}%`,
                height: `${100 / grid_size}%`
              }}
              initial = {{
                opacity: 0,
                scale: 0,
                rotate: -180
              }}
              animate = {{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                rotate: [-180, 0, 0, 180]
              }}
              transition = {{
                duration: 1.2,
                delay: pixel.delay,
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1]
              }}
            >
              <motion.div
                className = "w-full h-full bg-accent-default"
                initial = {{ opacity: 0.5 }}
                animate = {{
                  opacity: [0.5, 1, 1, 0.5],
                  boxShadow: [
                    "0 0 10px rgba(0,255,153,0.3)",
                    "0 0 20px rgba(0,255,153,0.6)",
                    "0 0 20px rgba(0,255,153,0.6)",
                    "0 0 10px rgba(0,255,153,0.3)"
                  ]
                }}
                transition = {{
                  duration: 1.2,
                  delay: pixel.delay,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.7, 1]
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PixelTransition; 