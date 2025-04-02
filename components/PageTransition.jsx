"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = () => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="fixed inset-0 z-[9999] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent-default/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.5,
            times: [0, 0.5, 1],
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-primary/50 backdrop-blur-sm rounded-lg border border-accent-default/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: [0, 1, 0]
          }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            duration: 1.5,
            times: [0, 0.5, 1],
            ease: "easeInOut"
          }}
        />

        <div className="absolute inset-0 flex flex-col">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="h-full w-full bg-accent-default origin-left"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: [0, 1, 1, 0],
                transition: {
                  duration: 1.5,
                  times: [0, 0.4, 0.6, 1],
                  ease: "easeInOut",
                  delay: i * 0.1,
                },
              }}
            />
          ))}
        </div>

        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            background: [
              "radial-gradient(circle at center, rgba(0,255,153,0) 0%, rgba(0,255,153,0) 100%)",
              "radial-gradient(circle at center, rgba(0,255,153,0.2) 0%, rgba(0,255,153,0) 100%)",
              "radial-gradient(circle at center, rgba(0,255,153,0) 0%, rgba(0,255,153,0) 100%)"
            ]
          }}
          transition={{
            duration: 1.5,
            times: [0, 0.5, 1],
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;