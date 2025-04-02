"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import ThemeSettings from "@/components/ThemeSettings";

const ClientLayout = ({ children }) => {
  return (
    <>
      <PageTransition />
      <ThemeSettings />
      <main className="relative z-10">{children}</main>
    </>
  );
};

export default ClientLayout; 