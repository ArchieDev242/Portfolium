"use client";

import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import Background from "@/components/Background";
import ThemeSettings from "@/components/ThemeSettings";
import FlyingKitty from "@/components/FlyingKitty";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const is_Win98_mode = isClient && (pathname === '/win98' || pathname.startsWith('/win98/'));

  // сleanup Win98 styles when leaving win98
  useEffect(() => {
    if(!isClient || is_Win98_mode) return;
    document.body.classList.remove('win98-mode', 'matrix-theme', 'cyber-theme');
    ['win98-custom-css', 'win98-loader-custom-css'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.remove();
    });
    document.body.style.removeProperty('font-family');
    document.body.style.removeProperty('background');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('margin');
    document.body.style.removeProperty('padding');
    const root = document.documentElement;
    ['--win98-primary', '--win98-secondary', '--win98-accent', '--win98-window', '--win98-text', '--win98-highlight'].forEach(v => root.style.removeProperty(v));
    
    // override 98.css
    document.body.style.fontFamily = "var(--font-press-start), 'Press Start 2P', 'Courier New', monospace";
    document.body.style.fontSize = "16px";
    document.body.style.webkitFontSmoothing = "";
  }, [isClient, is_Win98_mode]);

  if(is_Win98_mode) 
    {
    return (
      <>
        <main>
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <Background />
      <Header />
      <main>
        {children}
      </main>
      <PageTransition />
      <ThemeSettings />
      <FlyingKitty />
    </>
  );
};

export default ClientLayout; 