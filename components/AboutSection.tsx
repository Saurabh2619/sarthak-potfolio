'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, Target, Zap, Play, Sparkles } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AboutSection() {
  // Global mouse position for the whole section background
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 3D Tilt Effect for Profile Card
  const profileX = useMotionValue(0);
  const profileY = useMotionValue(0);
  
  const profileMouseX = useSpring(profileX, { stiffness: 300, damping: 30 });
  const profileMouseY = useSpring(profileY, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(profileMouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(profileMouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleProfileMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    profileX.set(xPct);
    profileY.set(yPct);
  };

  const handleProfileMouseLeave = () => {
    profileX.set(0);
    profileY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-black py-32 px-4 overflow-hidden"
    >
      {/* Dynamic Interactive Spotlight Background */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out opacity-50"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, rgba(147, 51, 234, 0.08), transparent 80%)`
        }}
      />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-24" variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wide uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>Discover My World</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600 mb-6 tracking-tighter">
            About Me
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          
          {/* Left - Advanced 3D Profile Card */}
          <motion.div 
            className="relative w-full max-w-lg mx-auto perspective-1000" 
            variants={itemVariants}
          >
            <motion.div
              onMouseMove={handleProfileMouseMove}
              onMouseLeave={handleProfileMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full aspect-square cursor-default"
            >
              {/* Glowing backdrops */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-[2.5rem] blur-3xl opacity-30 animate-pulse"></div>
              
              {/* Glassmorphism main card */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gray-900/60 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                <User className="w-40 h-40 text-white/20 drop-shadow-2xl" />
              </div>

              {/* Floating Element 1 */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-gray-900/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3"
                style={{ transform: "translateZ(50px)" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-purple-400 ml-1" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Experience</p>
                  <p className="text-sm text-white font-bold">50+ Videos Edited</p>
                </div>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                className="absolute -bottom-8 -left-8 bg-gray-900/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3"
                style={{ transform: "translateZ(80px)" }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                <p className="text-sm text-white font-bold tracking-wide">Available for Freelance</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Description with Rich Typography */}
          <motion.div className="space-y-8 lg:pl-8" variants={itemVariants}>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Dual Identity,
              </h3>
              <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-tight">
                One Singular Vision.
              </h3>
            </div>
            
            <div className="space-y-6 text-xl text-gray-300/80 leading-relaxed font-light">
              <p>
                I am a second-year BBA student by day and a highly passionate video editor by night. 
                Through <span className="text-white font-medium border-b border-purple-500">Vistara</span>, I merge 
                sharp business acumen with immersive creative storytelling to construct visual content 
                that truly resonates with modern audiences.
              </p>
              <p>
                What began as a pure passion project has organically evolved into 
                a thriving freelance venture. I collaborate with ambitious brands and creators to bring their 
                wildest visions to life through the dynamic power of video.
              </p>
            </div>
            
            {/* Minimalist Stats/Tags */}
            <div className="flex flex-wrap gap-4 pt-4">
              {['Premiere Pro', 'After Effects', 'Marketing Strategy', 'Content Creation'].map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 text-gray-300 text-sm font-medium hover:border-purple-500 hover:text-white transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Advanced Spotlight Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <SpotlightCard 
            icon={<GraduationCap className="w-8 h-8 text-purple-400" />}
            title="Academic Excellence"
            description="Pursuing BBA with an intensive focus on modern marketing, management, and digital entrepreneurship."
            color="from-purple-500/20"
            glowColor="rgba(168, 85, 247, 0.15)"
          />
          <SpotlightCard 
            icon={<Target className="w-8 h-8 text-pink-400" />}
            title="Creative Vision"
            description="Transforming abstract ideas into stunning visual narratives that aggressively captivate and engage viewers."
            color="from-pink-500/20"
            glowColor="rgba(236, 72, 153, 0.15)"
          />
          <SpotlightCard 
            icon={<Zap className="w-8 h-8 text-blue-400" />}
            title="Rapid Delivery"
            description="Lightning-fast turnaround times optimized for social media without ever compromising on elite quality."
            color="from-blue-500/20"
            glowColor="rgba(59, 130, 246, 0.15)"
          />
        </div>
      </motion.div>
    </section>
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
      {/* Animated hover spotlight gradient */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`
        }}
      />
      
      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${color} to-transparent border border-white/5`}>
          {icon}
        </div>
        <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h4>
        <p className="text-gray-400/90 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Icon Components
function GraduationCap({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  );
}