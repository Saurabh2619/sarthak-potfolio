'use client';

import React, { useState, useRef } from 'react';
import { Camera, Scissors, Video, Sparkles } from 'lucide-react';
import { motion, LayoutGroup, useInView, useSpring, useTransform } from 'framer-motion';

export default function AboutSection() {
  const logoRef = useRef<HTMLDivElement>(null);
  const isLogoInView = useInView(logoRef, { once: true, margin: "-40% 0px" });

  // 3D Parallax variables for Logo
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate normalized position from -1 to 1
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Convert mouse position to rotation angles (max tilt 15 degrees)
  const rotateX = useTransform(mouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]);

  // Staggered text animation variants
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      }
    }
  };

  const textChildVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <div className="relative bg-black" id="about">
      {/* Background subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_50%)] pointer-events-none"></div>

      <section className="relative w-full min-h-screen flex items-center py-24 px-4 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24 relative z-10">
           
           {/* Left: Enhanced Logo Section */}
           <div 
             ref={logoRef} 
             className="w-full md:w-5/12 flex justify-center perspective-[1000px]"
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
           >
             <motion.div 
               style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
               className="relative"
             >
                {/* Dropping Container with Neon Flicker */}
                <motion.div 
                  initial={{ opacity: 0, y: -500, rotate: -15, scale: 0.8 }}
                  animate={isLogoInView ? { 
                    opacity: [0, 0.5, 0.2, 1], // Glitch/Flicker effect during drop
                    y: 0, 
                    rotate: 0, 
                    scale: 1 
                  } : { opacity: 0, y: -500, rotate: -15, scale: 0.8 }}
                  transition={{ 
                    y: { type: "spring", stiffness: 70, damping: 10, delay: 0.2 },
                    rotate: { type: "spring", stiffness: 70, damping: 10, delay: 0.2 },
                    scale: { type: "spring", stiffness: 70, damping: 10, delay: 0.2 },
                    opacity: { duration: 0.4, delay: 0.2, times: [0, 0.3, 0.6, 1] }
                  }}
                  className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.02)]"
                >
                  {/* Glowing 3D element shadow */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(168,85,247,0.1)]" style={{ transform: "translateZ(-20px)" }}></div>
                  
                  {/* Vistara Logo Placeholder */}
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" 
                    fill="currentColor"
                    style={{ transform: "translateZ(30px)" }} // Pops out of the circle
                  >
                    <path d="M10 10 L45 90 L55 90 L90 10 L75 10 L50 70 L25 10 Z" />
                  </svg>
                </motion.div>

                {/* Shockwave Impact Effect */}
                {isLogoInView && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.6, 0], scale: [1, 1.5, 2] }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.8, 
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 1.5
                    }} 
                    className="absolute inset-0 rounded-full border-2 border-primary/40 shadow-[0_0_30px_var(--theme-primary)]"
                  />
                )}
             </motion.div>
           </div>

           {/* Right: Typography Section with Interactive Pills */}
           <div className="w-full md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left">
              
              <motion.div 
                variants={textContainerVariants}
                initial="hidden"
                animate={isLogoInView ? "visible" : "hidden"}
              >
                <motion.div variants={textChildVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_var(--theme-primary)]/10">
                  <Sparkles className="w-4 h-4" />
                  <span>The Vistara Experience</span>
                </motion.div>

                <motion.h2 variants={textChildVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 tracking-tighter leading-[1.1]">
                  Architects of <br/>
                  {/* Liquid Flowing Gradient Text */}
                  <motion.span 
                    animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="text-transparent bg-clip-text bg-[linear-gradient(110deg,#a855f7,45%,#ec4899,55%,#a855f7)] bg-[length:200%_auto]"
                  >
                    Visual Reality.
                  </motion.span>
                </motion.h2>

                <motion.div variants={textChildVariants}>
                  <div className="text-xl md:text-3xl leading-[2.2] md:leading-[2.2] font-light text-gray-400 max-w-2xl relative z-30">
                    <span>We are a premium production house driven by </span>
                    
                    <MagneticWrapper>
                      <InteractivePill text="Cinematic Vision" imageSrc="https://images.unsplash.com/photo-1585698715783-9366fb8be6c2?w=400&q=80" />
                    </MagneticWrapper>
                    
                    <span>, elevated through </span>
                    
                    <MagneticWrapper>
                      <InteractivePill text="Precision Editing" imageSrc="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80" />
                    </MagneticWrapper>
                    
                    <span>, and brought to life with </span>
                    
                    <MagneticWrapper>
                      <InteractivePill text="Immersive VFX" imageSrc="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80" />
                    </MagneticWrapper>
                    
                    <span>. We craft visual masterpieces.</span>
                  </div>
                </motion.div>
              </motion.div>
           </div>

        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative w-full bg-black py-16 md:py-24 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Capabilities</h3>
            <p className="text-gray-400">What makes Vistara the ultimate creative partner.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <SpotlightCard 
              icon={<Camera className="w-8 h-8 text-white" />}
              title="Cinematography"
              description="High-end camera work and lighting design that gives your brand a distinctive, cinematic look."
              color="from-primary/40"
              glowColor="var(--color-primary, #a855f7)"
            />
            <SpotlightCard 
              icon={<Scissors className="w-8 h-8 text-white" />}
              title="Precision Editing"
              description="Transforming raw footage into stunning visual narratives with perfect pacing and rhythm."
              color="from-secondary/40"
              glowColor="var(--color-secondary, #ec4899)"
            />
            <SpotlightCard 
              icon={<Video className="w-8 h-8 text-white" />}
              title="VFX & Motion"
              description="Mind-bending visual effects and motion graphics that push the boundaries of reality."
              color="from-primary/40"
              glowColor="var(--color-primary, #a855f7)"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Magnetic Wrapper Component
function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Move the element 20% of the distance to the mouse
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block relative z-20 mx-1"
    >
      {children}
    </motion.span>
  );
}


// Interactive Hover/Tap Pill Component
function InteractivePill({ text, imageSrc }: { text: string, imageSrc: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.span
      // PC Interactions
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      // Mobile Interactions
      onClick={(e) => {
        e.preventDefault();
        setIsExpanded(!isExpanded);
      }}
      className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/30 hover:to-secondary/30 rounded-full px-5 py-1.5 cursor-pointer border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)] align-middle transition-colors duration-300 relative"
    >
      <span className="font-serif italic text-white font-medium whitespace-nowrap text-2xl md:text-3xl relative z-20">
        {text}
      </span>
      
      {/* Shimmer Effect (Clipped to Pill bounds) */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-10">
        <motion.div 
          animate={{ x: ["-200%", "400%"] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
          className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
        />
      </div>
      
      {/* Floating Image Reveal (No Layout Shift) */}
      <motion.div 
        initial={{ opacity: 0, y: 15, scale: 0.8 }}
        animate={{ 
          opacity: isExpanded ? 1 : 0, 
          y: isExpanded ? 0 : 15,
          scale: isExpanded ? 1 : 0.8
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
        className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[140px] h-[80px] md:w-[200px] md:h-[110px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl pointer-events-none z-50 origin-bottom"
      >
        <img src={imageSrc} alt={text} className="w-full h-full object-cover" />
      </motion.div>
    </motion.span>
  );
}

// Custom Spotlight Card Component
function SpotlightCard({ icon, title, description, color, glowColor }: { icon: React.ReactNode, title: string, description: string, color: string, glowColor: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      className="relative group rounded-3xl border border-white/10 bg-gray-900/50 backdrop-blur-sm overflow-hidden"
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`
        }}
      />
      
      <div className="relative z-10 p-8 flex flex-col h-full pointer-events-none">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 bg-gradient-to-br ${color} to-transparent border border-white/5`}>
          {icon}
        </div>
        <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight">{title}</h4>
        <p className="text-sm md:text-base text-gray-400/90 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </motion.div>
  );
}