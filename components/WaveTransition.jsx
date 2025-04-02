"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const WaveTransition = () => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode = "wait">
      <motion.div
        key = {pathname}
        className = "fixed inset-0 pointer-events-none"
        style = {{ zIndex: 9999 }}
      >
        {/* Wave effect */}
        <div className = "h-screen w-screen fixed top-0 left-0 right-0 flex">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key = {i}
              className = "h-full w-full bg-accent-default relative"
              initial = {{ 
                y: "-100%"
              }}
              animate = {{ 
                y: ["0%", "100%"]
              }}
              transition = {{
                duration: 0.8,
                ease: "easeInOut",
                delay: i * 0.1,
                times: [0.5, 1]
              }}
            />
          ))}
        </div>

        {/* Background fade */}
        <motion.div
          className = "h-screen w-screen fixed bg-primary top-0"
          initial = {{ opacity: 1 }}
          animate = {{ opacity: 0 }}
          exit = {{ opacity: 1 }}
          transition = {{
            duration: 0.3,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default WaveTransition; 