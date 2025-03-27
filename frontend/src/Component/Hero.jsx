import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Voice from '../assets/Voice2.gif';

function Navbar() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-screen h-screen overflow-hidden bg-black text-white font-orbitron"
    >
      <motion.img
        variants={imageVariants}
        src={Voice}
        alt="Voice Animation"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center px-4 gap-4 text-center">
        <motion.h1 
          variants={textVariants}
          className="text-7xl sm:text-8xl md:text-9xl"
        >
          Voxe
        </motion.h1>
        <motion.h2 
          variants={textVariants}
          className="text-lg sm:text-xl md:text-2xl font-medium"
        >
          Your Personal Browsing Assistant
        </motion.h2>
      </div>
    </motion.div>
  );
}

export default Navbar;