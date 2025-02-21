"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Stairs from "@/components/Stairs";

const StairTransition = () => {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key={pathname}>
          {/* stairs component with a high z-index to ensure it appears above everything else */}
          <div className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-50 flex">
            <Stairs />
          </div>

          {/* background fade animation with a slightly lower z-index */}
          <motion.div
            className="h-screen w-screen fixed bg-primary top-0 pointer-events-none z-40 flex"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{
              delay: 0.8, // adjusted to make the background animation match stair animation
              duration: 0.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default StairTransition;
