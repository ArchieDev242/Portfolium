"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import kittyImage from "@/public/assets/kitty.jpg";

const Photo = () => {
  return (
    <div className = "w-full h-full flex justify-center items-center relative">
      {/* Image */}
      <motion.div
        initial = {{ opacity: 0 }}
        animate = {{
          opacity: 1,
          transition: { delay: 2, duration: 0.2, ease: "easeInOut" },
        }}
        className = "w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] rounded-full overflow-hidden absolute"
      >
        <Image
          src = {kittyImage}
          priority
          quality = {100}
          fill
          alt = "kitty image"
          className = "object-cover"
        />
      </motion.div>

      {/* Circle animation */}
      <motion.svg
        className = "w-[320px] xl:w-[520px] h-[320px] xl:h-[520px]"
        fill = "transparent"
        viewBox = "0 0 520 520"
        xmlns = "http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx = "260"
          cy = "260"
          r = "250"
          stroke = "var(--accent-default)"
          strokeWidth = "4"
          strokeLinecap = "round"
          strokeLinejoin = "round"
          initial = {{ strokeDasharray: "30 20", strokeDashoffset: 0 }}
          animate = {{
            strokeDashoffset: [-200, 0],
            rotate: [0, 360],
          }}
          transition = {{
            ease: "linear",
            duration: 4,
            repeat: Infinity,
          }}
        />
      </motion.svg>
    </div>
  );
};

export default Photo;
