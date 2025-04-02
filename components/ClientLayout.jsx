"use client";

import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import Background from "@/components/Background";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const ClientLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      <Background />
      <Header />
      <main>
        {children}
      </main>
      <PageTransition />
    </>
  );
};

export default ClientLayout; 