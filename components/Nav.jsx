"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

const Nav = () => {

    const navigation = usePathname();
    console.log(navigation);

    return <nav className = "flex gap-8">
        {links.map((link, index) => { 
            // Check if current page matches the link
            const isActive = link.path === "/" 
                ? navigation === "/" 
                : navigation.startsWith(link.path);
                
            return <Link href = {link.path} key = {index} className = {`${isActive && "text-accent-default border-b-2 border-accent-default"
            } capitalize font-medium hover:text-accent-hover transition-all`}>
                {link.name}
                   </Link>
        })}
    </nav>
}

export default Nav;