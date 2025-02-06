import Link from "next/link";
import { Button } from "./ui/button";

// components

import Nav from "./Nav";


const Header = () => {
    return(
    <header className="py-8 xl:py-12 text-white">
        <div className="container mx-auto flex justify-between items-center">
            {/* our logo */}
            <Link href="/"> 
                <h1 className="text-4xl font-semibold">Maksym <span className="text-accent-default">.</span></h1>
            </Link>

            {/* nav + btn hire */}
            <div className="hidden xl:flex items-center gap-8">
                <Nav />
                <Link href="/contacts">
                    <Button>Hire Me</Button>
                </Link>
            </div>

            {/* mobile port */}

            <div className="xl:hidden">Mobile Nav</div>

        </div>
    </header>
    );
};

export default Header;