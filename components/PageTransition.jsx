"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="relative">
      <AnimatePresence>
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1, transition: { duration: 0 } }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-primary z-50 pointer-events-none"
        />
      </AnimatePresence>
      {children}
    </div>
  );
};

export default PageTransition;