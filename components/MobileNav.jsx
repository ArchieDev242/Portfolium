"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci"

const links = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Skills",
        path: "/skills",
    },
    {
        name: "Projects",
        path: "/projects",
    },
    {
        name: "Resume",
        path: "/resume",
    },
    {
        name: "Contact",
        path: "/contact",
    },
] 

const MobileNav = () => {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

  return <Sheet>
    <SheetTrigger className = "flex justify-center items-center">
        <CiMenuFries className = "text-[32px] text-accent-default" />
    </SheetTrigger>
    <SheetContent className = "flex flex-col">
        
        {/* our logo */}
        <div className = "mt-32 mb-40 text-center text-2xl">
            <Link href = "/">
                <h1 className = "text-2xl font-semibold">Archie242<span className = "text-accent-default">.</span></h1>
            </Link>
        </div>
        
        {/* nav */}
        <nav className = "flex flex-col justify-center items-center gap-8">
            {links.map((link, index) => {
                // Check if current page matches the link - only on client side
                const isActive = isClient && (link.path === "/" 
                    ? pathname === "/" 
                    : pathname.startsWith(link.path));
                
                return <Link 
                href = {link.path} 
                key = {index} 
                className = {`
                    ${isActive ? "text-accent-default border-b-2 border-accent-default" : "text-white"} 
                    text-xl capitalize hover:text-accent-hover transition-all`}
                    >
                {link.name}
              </Link>
              
            })}
            
            {/* Hire Me button for mobile */}
            <Link href = "/hire" className = "mt-4">
                <button className = "px-6 py-3 bg-accent-default text-black font-semibold rounded-full hover:bg-accent-default/80 transition-colors">
                    Hire Me
                </button>
            </Link>
        </nav>

        </SheetContent>
  </Sheet>
}

export default MobileNav