import Link from "next/link";
import { Button } from "./ui/button";

// components

import Nav from "./Nav";


const Header = () => {
    return(
    <header className="py-8 xl:py12 text-white bg-pink-50/20">
        <div className="container mx-auto">
            {/* our logo */}
            <Link href="/"> 
                <h1 className="text-4xl font-semibold">Maksym <span className="text-accent">.</span></h1>
            </Link>

            {/* nav + btn hire */}
            <div className="hidden xl:flex">
                <Nav />
                <Link href="/contacts">
                    <Button>Hire Me</Button>
                </Link>
            </div>
        </div>
    </header>
    );
};

export default Header;