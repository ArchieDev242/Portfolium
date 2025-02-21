import { motion } from "framer-motion";

const stairs_animation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"], // Smoother exit transition for the stairs
  },
};

// Function to calculate the reversed index for staggered effect
const reversedIndex = (index) => {
  const total_steps = 6; // Total number of steps
  return total_steps - index - 1; // Reverse the index
};

const Stairs = () => {
  return (
    <>
      {/* Rendering 6 motion.div elements, each representing a step */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          variants={stairs_animation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            delay: reversedIndex(index) * 0.1, // Delay increases for each step
          }}
          className="h-full w-full bg-white relative z-50"
        />
      ))}
    </>
  );
};

export default Stairs;
