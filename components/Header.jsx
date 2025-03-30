import Link from "next/link";
import { Button } from "./ui/button";

// components

import Nav from "./Nav";
import MobileNav from "./MobileNav";

// | our header stuff |

const Header = () => {
    return(
    <header className="py-8 xl:py-12 text-white">
        <div className="container mx-auto flex justify-between items-center">
            {/* our logo */}
            <Link href="/"> 
                <h1 className="text-4xl font-semibold">Archie242 <span className="text-accent-default animate-glow">.</span></h1>
            </Link>

            {/* nav + btn hire */}
            <div className="hidden xl:flex items-center gap-8">
                <Nav />
                <Link href="/contacts">
                    <Button className="relative overflow-hidden group bg-transparent transition-colors duration-500 hover:bg-accent-default hover:text-black rounded-full px-6 py-3 border-none flash-animation">Hire Me</Button>
                </Link>
            </div>

            {/* mobile port */}

            <div className="xl:hidden">
                <MobileNav />
            </div>

        </div>
    </header>
    );
};

export default Header;