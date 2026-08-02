'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Camera, Zap, ArrowDown, Sparkles } from 'lucide-react';

export default function CameraScrollTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generous 300vh scroll height for an unhurried, luxurious Apple-level cinematic journey
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Silky smooth spring physics for 60fps scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.4,
  });

  // PHASE 1: APERTURE BLADES ROTATE & OPEN (0% to 40% scroll)
  const apertureRotate = useTransform(smoothProgress, [0, 0.4], [0, 85]);
  const apertureOpenScale = useTransform(smoothProgress, [0, 0.4], [0.25, 1.35]);
  const lensOpacity = useTransform(smoothProgress, [0.72, 0.88], [1, 0]);

  // PHASE 2: CINEMATIC FLASH STROBE BURST (35% to 65% scroll)
  const flashOpacity = useTransform(
    smoothProgress, 
    [0.32, 0.45, 0.58, 0.72], 
    [0, 1, 0.7, 0]
  );
  const flashScale = useTransform(smoothProgress, [0.35, 0.65, 0.9], [0.5, 18, 50]);

  // PHASE 3: ZOOMING INTO THE HEART OF THE LENS (40% to 85% scroll)
  const cameraZoomScale = useTransform(smoothProgress, [0, 0.4, 0.85], [1, 1.2, 45]);
  const textOpacity = useTransform(smoothProgress, [0, 0.28], [1, 0]);
  const welcomeOpacity = useTransform(smoothProgress, [0.48, 0.68, 0.85], [0, 1, 0]);

  // PHASE 4: MASTER STAGE OPACITY (80% to 94% scroll)
  // Perfectly centered until completely invisible so it NEVER scrolls upwards!
  const masterStageOpacity = useTransform(smoothProgress, [0.8, 0.94], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black select-none">
      {/* Sticky Viewport Stage - 100% Centered & Fixed in Middle of Screen */}
      <motion.div 
        style={{ opacity: masterStageOpacity }}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black"
      >
        
        {/* Background Subtle Studio Atmosphere Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_65%)] pointer-events-none" />

        {/* STEP 1: Instruction / Status Header (Fades out as user scrolls) */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute top-12 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-bold text-gray-300 uppercase tracking-widest mb-3 shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-md">
            <Camera className="w-3.5 h-3.5 text-primary animate-pulse" />
            Scroll Down to Open Cinema Lens
          </div>
          <p className="text-sm text-gray-400 font-mono tracking-wider">
            [ T1.4 35MM CINE-PRIME // APERTURE CHARGING ]
          </p>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-3 flex justify-center text-primary"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* STEP 2: The High-Precision 3D Cinema Lens & Mechanical Aperture */}
        <motion.div 
          style={{ 
            scale: cameraZoomScale,
            opacity: lensOpacity 
          }}
          className="relative z-30 w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] flex items-center justify-center pointer-events-none"
        >
          {/* Outer Lens Metallic Barrel Rim */}
          <div className="absolute inset-0 rounded-full border-[6px] border-white/10 bg-gradient-to-br from-[#13111c] via-black to-[#09080e] shadow-[0_0_100px_rgba(168,85,247,0.35)] flex items-center justify-center">
            
            {/* Focal Markings Ring */}
            <div className="absolute inset-4 rounded-full border border-dashed border-white/20 flex items-center justify-center">
              <span className="absolute top-5 text-[10px] font-mono text-gray-400 font-bold tracking-widest">
                VISTARA CINE-PRIME 35MM T1.4
              </span>
              <span className="absolute bottom-5 text-[10px] font-mono text-purple-400 font-bold tracking-widest">
                REC.709 // 8K RAW ANAMORPHIC
              </span>
            </div>

            {/* Inner Metallic Focus Barrel */}
            <div className="absolute inset-12 rounded-full border-2 border-primary/40 bg-black shadow-[inset_0_0_60px_rgba(168,85,247,0.4)] flex items-center justify-center overflow-hidden">
              
              {/* Mechanical Aperture Blades SVG (Rotate & Open smoothly on scroll) */}
              <motion.div 
                style={{ 
                  rotate: apertureRotate,
                  scale: apertureOpenScale 
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full text-[#1b1528]">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle} 100 100)`}>
                      <path
                        d="M 100 100 L 160 45 A 95 95 0 0 1 185 100 Z"
                        fill="currentColor"
                        stroke="#a855f7"
                        strokeWidth="1.2"
                        strokeOpacity="0.6"
                      />
                    </g>
                  ))}
                </svg>
              </motion.div>

              {/* Glass Optic Reflection / Purple-Pink Sheen */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 mix-blend-screen pointer-events-none" />
              <div className="absolute inset-20 rounded-full bg-radial-gradient from-white/25 via-primary/20 to-transparent blur-md pointer-events-none" />

              {/* Center Light Emitter Core */}
              <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_30px_#ffffff] flex items-center justify-center z-10" />
            </div>
          </div>
        </motion.div>

        {/* STEP 3: THE CINEMATIC FLASH BURST */}
        <motion.div
          style={{
            opacity: flashOpacity,
            scale: flashScale,
          }}
          className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center"
        >
          {/* Intense Radial White/Purple Flashbulb Glow */}
          <div className="w-44 h-44 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#e879f9_45%,#a855f7_75%,transparent_100%)] blur-xl shadow-[0_0_180px_#ffffff]" />
        </motion.div>

        {/* Full-screen White Flash Overlay at Peak Strobe */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0.38, 0.48, 0.62], [0, 0.95, 0]) }}
          className="absolute inset-0 bg-white z-50 pointer-events-none mix-blend-screen"
        />

        {/* STEP 4: Welcome Typography Inside the Flash */}
        <motion.div
          style={{ opacity: welcomeOpacity }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none text-center px-4"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/80 border border-primary/50 text-primary text-xs md:text-sm font-bold uppercase tracking-widest mb-6 shadow-2xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            Entering Visual Reality
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
            Welcome to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Vistara</span>
          </h2>
        </motion.div>

      </motion.div>
    </div>
  );
}
