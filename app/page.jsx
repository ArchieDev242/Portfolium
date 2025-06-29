"use client";

import { Button } from "@/components/ui/button"
import { FiDownload } from "react-icons/fi"

// | components |

import Socials from "@/components/Socials"
import Photo from "@/components/Photo"
import Stats from "@/components/Stats"

const Home = () => {
  return (
    <section className = "h-full">
      <div className = "container mx-auto h-full px-2 xl:px-4">
        <div className = "flex flex-col xl:flex-row items-center justify-between xl:pt-4 xl:pb-16">
          
          {/* TEXT + PHOTO */}
          
          <div className = "text-center xl:text-left order-2 xl:order-none">
            <span className = "text-xl">Game & Software Developer</span>
            <h1 className = "h1 mb-4">
              Hello, I'm <br /> 
              <span className = "text-accent-default">Maksym Kopychko</span>
            </h1>
            <p className = "prose prose-invert max-w-[500px] mb-6 text-white/80">
              Passionate about game development, 3D design, and cutting-edge technology. 
              Skilled in Unreal Engine, C++, Lua, Python, and AI-powered tools to craft immersive digital experiences.
            </p>

          {/* btn + socials */}
          <div className = "flex flex-col xl:flex-row items-center gap-8">
            <Button variant = "outline" size = "lg" className = "uppercase flex items-center gap-2 text-accent-default relative overflow-hidden group bg-transparent transition-colors duration-500 hover:bg-accent-default hover:text-black rounded-full px-6 py-3 border-none flash-animation">
              <span>Download CV</span>
              <FiDownload className = "text-xl" />
            </Button>

            <div className = "mb-8 xl:mb-0">
              <Socials containerStyles = "flex gap-6" iconStyles = "w-9 h-9 border border-accent-default rounded-full flex justify-center items-center text-accent-default text-base hover:bg-accent-default hover:text-black transition-all duration-500" />
            </div>

          </div>
          </div>

          {/* photo4ka */}
          <div className = "order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>

        </div>
      </div>

      <Stats />

    </section>
  )
}

export default Home
