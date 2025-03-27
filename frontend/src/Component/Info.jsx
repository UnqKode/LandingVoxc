import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Mic, Brain } from "lucide-react";

function Info() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    {
      icon: Mic,
      title: "Seamless Voice Control",
      description:
        "No need to type. Just speak your commands and Voxc will take care of it instantly.",
      color: "text-blue-400",
    },
    {
      icon: Brain,
      title: "Smart Suggestions",
      description:
        "Get AI-powered responses, auto-complete actions, and search hints based on your voice.",
      color: "text-purple-400",
    },
    {
      icon: Zap,
      title: "Screen Awareness",
      description:
        "Voxc understands your current screen to assist better. Whether it's a form or a video, it adapts.",
      color: "text-green-400",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your commands stay with you. All data processing is done with security in mind.",
      color: "text-red-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: i * 0.1,
      },
    }),
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-black text-white py-16 px-4 overflow-hidden"
    >
      {/* Background Blobs with animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 opacity-70"></div>
      </div>

      <motion.div
        initial={isInView ? "visible" : "hidden"}
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >
        {/* Hero Text */}
        <motion.div variants={titleVariants} className="mb-16">
          <motion.h2
            variants={titleVariants}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-widest 
              bg-gradient-to-r from-white via-blue-200 to-white 
              bg-clip-text text-transparent font-or"
          >
            Meet Voxc
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Voxc is a powerful Chrome extension that redefines how you browse.
            It listens to your voice, understands your screen, guides your
            actions, and eliminates the need to type. From searching the web to
            filling forms, or navigating pages — just speak, and
            Voxc makes it happen.
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          className="grid sm:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureVariants}
              custom={index}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.15)",
              }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 
                rounded-3xl p-8 
                shadow-xl 
                group transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                className={`mb-6 flex items-center justify-center 
                  ${feature.color} text-opacity-80 
                  group-hover:text-opacity-100 
                  transition-all duration-300 
                  animate-float`}
              >
                <feature.icon size={48} strokeWidth={1.5} />
              </motion.div>

              {/* Title */}
              <motion.h3
                className={`text-2xl font-semibold mb-4 
                  ${feature.color} 
                  group-hover:text-opacity-100 
                  transition-all`}
              >
                {feature.title}
              </motion.h3>

              {/* Description */}
              <motion.p className="text-gray-300 group-hover:text-white transition-all">
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Info;
