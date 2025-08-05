"use client";

import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import Background from "@/components/Background";
import ThemeSettings from "@/components/ThemeSettings";
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
    </>
  );
};

export default ClientLayout; 