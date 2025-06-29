"use client";

import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import Background from "@/components/Background";
import ThemeSettings from "@/components/ThemeSettings";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const ClientLayout = ({ children }) => {
  const pathname = usePathname();

  const isWin98Mode = pathname === '/win98' || pathname.startsWith('/win98/');
  
  console.log('Current pathname:', pathname, 'isWin98Mode:', isWin98Mode);

  if(isWin98Mode) 
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