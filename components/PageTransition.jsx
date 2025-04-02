"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const PageTransition = () => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Створюємо масив для 8 сходинок
  const steps = Array.from({ length: 8 });

  return (
    <AnimatePresence mode="wait">
      {isAnimating && (
        <motion.div
          key={pathname}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className="absolute left-0 w-full h-[12.5%] bg-accent-default"
              style={{ top: `${index * 12.5}%` }}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;