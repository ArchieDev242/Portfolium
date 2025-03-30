"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Transition effects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`transition-${pathname}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 pointer-events-none"
        >
          {/* Vortex effect */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            exit={{ scale: 0, rotate: -360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, transparent 0%, rgba(0,255,153,0.1) 100%)",
              transformOrigin: "center"
            }}
          />

          {/* Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              initial={{ 
                scale: 0,
                rotate: 0,
                x: "50vw",
                y: "50vh"
              }}
              animate={{ 
                scale: [0, 1, 0],
                rotate: 360,
                x: ["50vw", `${Math.random() * 100}vw`, "50vw"],
                y: ["50vh", `${Math.random() * 100}vh`, "50vh"]
              }}
              exit={{ 
                scale: 0,
                rotate: -360,
                x: "50vw",
                y: "50vh"
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeInOut",
                delay: i * 0.1
              }}
              className="absolute w-2 h-2 bg-accent-default rounded-full"
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;