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
        name: "Contacts",
        path: "/contacts",
    },
] 

const Nav = () => {

    const navigation = usePathname();
    console.log(navigation);

    return <nav className="flex gap-8">
        {links.map((link, index) => { 
            return <Link href={link.path} key={index} className="{``}">{link.name}</Link>
        })}
    </nav>
}

export default Nav;