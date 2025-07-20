"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import theme_settings from "@/components/ThemeSettings";

const ClientLayout = ({ children }) => {
  return (
    <>
      <PageTransition />
      <theme_settings />
      <main className = "relative z-10">{children}</main>
    </>
  );
};

export default ClientLayout; 