'use client';

import React, { useState, useRef } from 'react';
import { Video, Scissors, Palette, Wand2, Sparkles, TrendingUp, Sliders, CheckCircle2, Layers, Cpu, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VistaraSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(65); // Percentage for before/after slider
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const tools = [
    { 
      name: 'Adobe Premiere Pro', 
      icon: '🎬', 
      color: 'from-purple-600 to-pink-600',
      specialty: 'Multi-Cam Editing • Dynamic Pacing • Custom Sound Design',
      level: '98% Proficiency'
    },
    { 
      name: 'After Effects', 
      icon: '✨', 
      color: 'from-pink-600 to-purple-600',
      specialty: '3D Camera Tracking • Advanced VFX • Kinetic Typography',
      level: '95% Proficiency'
    },
    { 
      name: 'DaVinci Resolve', 
      icon: '🎨', 
      color: 'from-purple-500 to-indigo-600',
      specialty: '10-Bit Log Grading • Color Warping • Cinema REC.709',
      level: '94% Proficiency'
    },
    { 
      name: 'Final Cut Pro', 
      icon: '🎞️', 
      color: 'from-indigo-600 to-purple-600',
      specialty: 'Magnetic Timeline • ProRes 422 RAW • Rapid Turnaround',
      level: '90% Proficiency'
    },
    { 
      name: 'Photoshop', 
      icon: '🖼️', 
      color: 'from-pink-500 to-rose-600',
      specialty: 'High-CTR Thumbnails • Visual Compositing • Retouching',
      level: '92% Proficiency'
    },
    { 
      name: 'CapCut Pro', 
      icon: '📱', 
      color: 'from-purple-600 to-pink-500',
      specialty: 'Viral Reel Templates • Auto-Subtitles • Algorithmic Hooks',
      level: '99% Proficiency'
    },
  ];

  const services = [
    {
      icon: Video,
      title: 'Cinematic Video Editing',
      description: 'Hollywood-grade pacing, rhythmic cuts, and immersive storytelling engineered to hold viewer attention from the first second to the last.',
      tags: ['4K/8K Workflow', 'Sound Engineering', 'Narrative Arc'],
      gradient: 'from-primary to-secondary'
    },
    {
      icon: Scissors,
      title: 'Viral Short-Form Reels',
      description: 'Algorithm-focused editing for Instagram Reels, TikTok, and YouTube Shorts with dynamic captions, sound design, and hook optimization.',
      tags: ['Pattern Interrupts', 'Hook Retention', 'Dynamic Subtitles'],
      gradient: 'from-secondary to-primary'
    },
    {
      icon: Palette,
      title: 'Advanced Color Grading',
      description: 'Transform flat Log footage into vibrant cinematic masterpieces with DaVinci Resolve node grading, skin tone protection, and mood styling.',
      tags: ['DaVinci Nodes', 'REC.709 Delivery', 'Custom LUTs'],
      gradient: 'from-primary to-secondary'
    },
    {
      icon: Wand2,
      title: 'Motion Graphics & Titles',
      description: 'Eye-catching 2D/3D kinetic typography, animated lower-thirds, and visual overlays that give your videos a broadcast-television polish.',
      tags: ['Kinetic Typography', '3D Callouts', 'Seamless Transitions'],
      gradient: 'from-secondary to-primary'
    },
    {
      icon: Sparkles,
      title: 'VFX & Compositing',
      description: 'Green screen removal, object tracking, light leaks, and digital enhancements that blend fantasy into reality seamlessly.',
      tags: ['3D Tracking', 'Roto-scoping', 'Visual Enhancements'],
      gradient: 'from-primary to-secondary'
    },
    {
      icon: TrendingUp,
      title: 'High-ROI Brand Commercials',
      description: 'Persuasive promotional campaigns designed for e-commerce, tech brands, and creators to maximize CTR and ad conversion rates.',
      tags: ['Ad Hooks', 'Conversion Focus', 'Multi-Platform Export'],
      gradient: 'from-secondary to-primary'
    },
  ];

  return (
    <section id="vistara" className="relative w-full bg-black py-20 md:py-32 px-4 overflow-hidden">
      {/* Subtle Purple Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <Film className="w-3.5 h-3.5 text-secondary" /> The Vistara Experience
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Where Vision Meets <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Execution</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Every frame matters. We combine Hollywood-grade post-production with algorithmic retention strategies to make your videos unforgettable.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-8 rounded-full" />
        </div>

        {/* INTERACTIVE FEATURE 1: Before & After Color Grading / Visual Showcase Slider */}
        <div className="mb-24">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center justify-center gap-2">
              <Sliders className="w-4 h-4 text-primary" /> Interactive Studio Compare — Drag Left / Right
            </span>
          </div>

          <div 
            ref={sliderRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full max-w-4xl mx-auto h-[260px] sm:h-[380px] md:h-[460px] rounded-3xl overflow-hidden border-2 border-white/15 shadow-[0_0_50px_rgba(168,85,247,0.25)] select-none cursor-ew-resize group"
          >
            {/* LEFT IMAGE: RAW / LOG Flat Footage */}
            <div className="absolute inset-0 bg-[#151515] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80" 
                alt="RAW LOG Footage" 
                className="w-full h-full object-cover filter grayscale contrast-75 brightness-90"
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                LOG / RAW Uncut Footage
              </div>
            </div>

            {/* RIGHT IMAGE: Vistara Graded Cinematic Version */}
            <div 
              className="absolute inset-0 overflow-hidden" 
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80" 
                alt="Vistara Color Graded" 
                className="w-full h-full object-cover filter saturate-150 contrast-125 brightness-105"
              />
              {/* Neon Light Leak Overlay on Graded Side */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-pink-500/20 mix-blend-screen pointer-events-none" />
              
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-[11px] uppercase tracking-wider shadow-lg">
                ✨ Vistara Cinematic Grade
              </div>
            </div>

            {/* Slider Divider Line & Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold shadow-[0_0_20px_rgba(255,255,255,0.9)] border-2 border-primary group-hover:scale-110 transition-transform">
                <Sliders className="w-4 h-4 text-primary rotate-90" />
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE FEATURE 2: Interactive Service Stage */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
              What We Create
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Hover or tap any service below to explore our post-production capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="group relative bg-gradient-to-br from-gray-900/90 to-black p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_35px_var(--theme-primary)]/20 flex flex-col justify-between"
              >
                {/* Top Glow on Hover */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl`} />

                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-primary transition-colors font-mono">
                      0{index + 1} //
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Feature Specs Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {service.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10 group-hover:border-primary/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE FEATURE 3: Interactive Software Mastery Matrix */}
        <div className="mb-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#101018] to-black border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.1)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-2">
                // PROFESSIONAL TOOLSTACK
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-white">
                Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Mastery</span>
              </h3>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              Click any tool to inspect our specific workflow expertise and proficiency level.
            </p>
          </div>

          {/* Tool Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {tools.map((tool, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  activeTab === index
                    ? 'bg-gradient-to-b from-purple-900/50 to-black border-primary shadow-[0_0_25px_var(--theme-primary)]/40 scale-105'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <span className="text-3xl">{tool.icon}</span>
                <span className="text-xs font-bold text-gray-200">{tool.name}</span>
              </button>
            ))}
          </div>

          {/* Active Tool Deep-Dive Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-2xl">
                  {tools[activeTab].icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    {tools[activeTab].name}
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/20 text-purple-300 border border-primary/40">
                      {tools[activeTab].level}
                    </span>
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    {tools[activeTab].specialty}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Daily Studio Production Use
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* STATS COUNTERS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/10">
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '25+', label: 'Happy Clients' },
            { number: '100%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Studio Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}