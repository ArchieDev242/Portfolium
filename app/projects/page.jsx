"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    num: "01",
    name: "GameDev",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "/project1",
    image: "/project1.jpg",
  },
  {
    num: "02",
    name: "SoftDev",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "/project2",
    image: "/project2.jpg",
  },
  {
    num: "03",
    name: "Modding",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "/project3",
    image: "/project3.jpg",
  },
  {
    num: "04",
    name: "Web Developing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "/project4",
    image: "/project4.jpg",
  },
]

const Projects = () => {
  return <section className = "min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
    <div className = "container mx-auto">Projects page</div>

    <motion.div
      initial = {{ opacity: 0 }}
      animate = {{ opacity: 1, transition: { delay: 2.4, duration: 0.5, ease: "easeIn" } }}

      className = "grid grid-cols-1 md:grid-cols-2 gap-[60px]"
    >

    {projects.map((projects, index) => {
      return (
        <div key = {index}
             className = "flex-1 flex flex-col justify-center gap-6 group"
        >

          <div className = "w-full flex justify-between items-center">

            <div className = "text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">{projects.num}</div>
            
            <Link href = {projects.link} className = "w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent-default 
                                                      transition-all duration-500 flex justify-center items-center hover:-rotate-45"
            
            >
              <BsArrowDownRight className = "text-primary text-3xl"/>
            </Link>

          </div>
          <h2 className = "text-[42px] font-bold leading-none text-white group-hover:text-accent-default transition-all duration-500">{projects.name}</h2>
          <p className = "text-white/60">{projects.description}</p>
          <img src = {projects.image} alt = {projects.name} />
          <div className = "border-b border-white/20 w-full"></div>

        </div>
      )
    })}

    </motion.div>

  </section>
}

export default Projects