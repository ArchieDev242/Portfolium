"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
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

  return <Sheet>
    <SheetTrigger className = "flex justify-center items-center">
        <CiMenuFries className = "text-[32px] text-accent-default" />
    </SheetTrigger>
    <SheetContent className = "flex flex-col">
        
        {/* our logo */}
        <div className = "mt-32 mb-40 text-center text-2xl">
            <Link href="/">
                <h1 className = "text-2xl font-semibold">Archie242<span className = "text-accent-default">.</span></h1>
            </Link>
        </div>
        
        {/* nav */}
        <nav className = "flex flex-col justify-center items-center gap-8">
            {links.map((link, index) => {
                return <Link 
                href = {link.path} 
                key = {index} 
                className = {`
                    ${link.path === pathname ? "text-accent-default border-b-2 border-accent-default" : "text-white"} 
                    text-xl capitalize hover:text-accent-hover transition-all`}
                    >
                {link.name}
              </Link>
              
            })}
        </nav>

        </SheetContent>
  </Sheet>
}

export default MobileNav