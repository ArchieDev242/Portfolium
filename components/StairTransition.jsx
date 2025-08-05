"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Stairs from "@/components/Stairs";

const StairTransition = () => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key = {pathname}
        className = "fixed inset-0 z-50 pointer-events-none"
      >
        {/* Stairs animation */}
        <div className = "h-screen w-screen fixed top-0 left-0 right-0 flex">
          <Stairs />
        </div>

        {/* Background fade */}
        <motion.div
          className = "h-screen w-screen fixed bg-primary top-0"
          initial = {{ opacity: 1 }}
          animate = {{ opacity: 0 }}
          exit = {{ opacity: 1 }}
          transition = {{
            duration: 0.5,
            ease: "easeInOut",
            delay: 0.3
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default StairTransition;
