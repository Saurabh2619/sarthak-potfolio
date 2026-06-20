'use client';

import React from 'react';
import { TubesBackground } from './TubesBackground';
import { ArrowDown, Video, Sparkles, MousePointer2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen">
      <TubesBackground>
        <motion.div 
          className="flex flex-col items-center justify-center w-full h-full gap-8 text-center px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.div className="space-y-4 md:space-y-6 pointer-events-auto cursor-default" variants={itemVariants}>
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] select-none">
              Vistara
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white/90 drop-shadow-[0_0_25px_rgba(0,0,0,0.8)] select-none px-4">
              Where Vision Meets Creativity
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.div className="mt-2 md:mt-4 space-y-4 pointer-events-auto cursor-default" variants={itemVariants}>
            <p className="text-lg md:text-2xl text-white/80 font-light drop-shadow-md px-4">
              Video Editing • Content Creation • Visual Storytelling
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white/70">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="text-sm md:text-base tracking-wide uppercase">VFX Studio</span>
              </div>
              <div className="w-1.5 h-1.5 bg-secondary/50 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="text-sm md:text-base tracking-wide uppercase">Post-Production</span>
              </div>
            </div>
            
            {/* Interactive text from reference prompt */}
            <p className="text-white/60 text-xs md:text-sm max-w-md mx-auto mt-6 drop-shadow-md px-4">
              Move your cursor or drag your finger to interact with the 3D tubes. Click/Tap anywhere to randomize the neon colors.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div className="mt-6 md:mt-8 w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto px-6" variants={itemVariants}>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Scroll & Click Indicator */}
          <motion.div 
            className="absolute bottom-8 flex flex-col items-center gap-2 text-white/50 pointer-events-none"
            variants={itemVariants}
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-2"
            >
              <ArrowDown className="w-6 h-6" />
              <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
            </motion.div>
          </motion.div>

          {/* Interactive Hint from Prompt */}
          <motion.div 
            className="absolute top-8 right-8 flex items-center gap-2 text-white/40 pointer-events-none hidden md:flex"
            variants={itemVariants}
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <MousePointer2 className="w-4 h-4" />
            </motion.div>
            <span className="text-xs uppercase tracking-widest">Click to randomize</span>
          </motion.div>
        </motion.div>
      </TubesBackground>
    </section>
  );
}