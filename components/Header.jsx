"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

// components

import Nav from "./Nav";
import MobileNav from "./MobileNav";

// | our header stuff |

const Header = () => {
    const router = useRouter();

    const handleWin98Click = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Windows 98 mode clicked!'); // debug log
        router.push('/win98');
    };

    return(
    <header className = "py-8 xl:py-12 text-white">
        <div className = "container mx-auto flex justify-between items-center">
            {/* our logo */}
            <div className = "flex items-center">
                <Link href = "/"> 
                    <h1 className = "text-4xl font-semibold">
                        Archie242
                    </h1>
                </Link>
                <span 
                    className = "text-accent-default animate-glow cursor-pointer hover:scale-125 transition-transform duration-300 ml-2 text-6xl leading-none" 
                    onClick = {handleWin98Click}
                    title = "Enter Windows 98 mode 🪟"
                    style = {{
                        fontSize: '2.5rem',
                        lineHeight: '1',
                        display: 'inline-block',
                        transform: 'translateY(-0.2rem)'
                    }}
                >
                    •
                </span>
            </div>

            {/* nav + btn hire */}
            <div className = "hidden xl:flex items-center gap-8">
                <Nav />
                <Link href = "/contacts">
                    <Button className = "relative overflow-hidden group bg-transparent transition-colors duration-500 hover:bg-accent-default hover:text-black rounded-full px-6 py-3 border-none flash-animation">Hire Me</Button>
                </Link>
            </div>

            {/* mobile port */}

            <div className = "xl:hidden">
                <MobileNav />
            </div>

        </div>
    </header>
    );
};

export default Header;