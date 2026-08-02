"use client";

import React, { useState } from "react";
import { Play, TrendingUp, Sparkles, CheckCircle2, ArrowUpRight, Video, Zap, Award, Layers } from "lucide-react";
import SplitText from "../../components/react-bits/SplitText";
import ShinyText from "../../components/react-bits/ShinyText";
import SpotlightCard from "../../components/react-bits/SpotlightCard";
import CountUp from "../../components/react-bits/CountUp";
import Magnet from "../../components/react-bits/Magnet";

const CATEGORIES = ["All Work", "Performance Ads", "Viral Shorts", "YouTube Edits", "3D Motion"];

const SHOWREEL_PROJECTS = [
  {
    id: 1,
    title: "Gymshark Q3 Performance Ad",
    client: "Gymshark",
    category: "Performance Ads",
    metric: "+340% ROAS",
    duration: "0:30",
    views: "4.2M Views",
    gradient: "from-purple-900/40 via-purple-600/10 to-black",
    accent: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "HyperScale SaaS 3D Product Launch",
    client: "HyperScale AI",
    category: "3D Motion",
    metric: "12.8M Views",
    duration: "0:45",
    views: "Viral Launch",
    gradient: "from-blue-900/40 via-blue-600/10 to-black",
    accent: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Imran Khan Podcast Viral Reel Series",
    client: "Creator Studio",
    category: "Viral Shorts",
    metric: "88% Avg Retention",
    duration: "0:59",
    views: "18.5M Views",
    gradient: "from-emerald-900/40 via-emerald-600/10 to-black",
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Aura Drinks TikTok Acquisition Ad",
    client: "Aura Nutrition",
    category: "Performance Ads",
    metric: "5.4x ROAS",
    duration: "0:25",
    views: "6.1M Views",
    gradient: "from-pink-900/40 via-pink-600/10 to-black",
    accent: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "MKBHD Tech Breakdown Master Edit",
    client: "Tech Spotlight",
    category: "YouTube Edits",
    metric: "94% Click-Through",
    duration: "14:20",
    views: "2.9M Views",
    gradient: "from-amber-900/40 via-amber-600/10 to-black",
    accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Apex Legends E-Sports Trailer",
    client: "EA Sports",
    category: "3D Motion",
    metric: "+210% Conversions",
    duration: "1:15",
    views: "9.4M Views",
    gradient: "from-cyan-900/40 via-cyan-600/10 to-black",
    accent: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AgencyPage() {
  const [activeCategory, setActiveCategory] = useState("All Work");

  const filteredProjects =
    activeCategory === "All Work"
      ? SHOWREEL_PROJECTS
      : SHOWREEL_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#07070A] text-white font-sans selection:bg-purple-600/40 overflow-x-hidden">
      
      {/* Cinematic Background Gradient Light */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-purple-600/20 via-pink-600/10 to-transparent blur-[120px] opacity-70 z-0" />
      <div className="pointer-events-none fixed top-1/3 -left-40 w-[500px] h-[500px] bg-purple-900/20 blur-[140px] z-0" />

      {/* Top Navigation */}
      <header className="relative z-20 border-b border-white/5 bg-[#07070A]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              V
            </div>
            <div>
              <span className="font-extrabold tracking-wider text-sm block leading-none">VISTARA CUTS</span>
              <span className="text-[10px] tracking-widest text-purple-400 font-medium">CREATIVE AD AGENCY</span>
            </div>
          </div>

          {/* Shimmering Top Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <ShinyText text="✨ Taking 3 New E-Commerce & Creator Clients for Q3" speed={3} />
          </div>

          <Magnet magnetStrength={2.5}>
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2">
              Book Strategy Call <ArrowUpRight className="w-4 h-4" />
            </button>
          </Magnet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-8">
          <Zap className="w-3.5 h-3.5 text-purple-400 fill-purple-400" /> Powered by Data & Hollywood Editing
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-8">
          <SplitText
            text="WE TURN RAW FOOTAGE INTO VIRAL EDITS & HIGH-ROI ADS."
            className="justify-center text-white"
            wordDelay={0.05}
          />
        </h1>

        <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-normal">
          We don’t just edit videos. We engineer{" "}
          <span className="text-white font-medium underline decoration-purple-500 underline-offset-4">
            high-retention showpieces
          </span>{" "}
          and data-tested performance creatives that scale brands past $100k/month.
        </p>

        {/* Magnetic Hero CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Magnet magnetStrength={3}>
            <a
              href="#showreel"
              className="px-8 py-4 rounded-2xl bg-white text-black font-extrabold text-sm tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all inline-flex items-center gap-3"
            >
              <Play className="w-4 h-4 fill-black" /> Watch Showreel
            </a>
          </Magnet>
          <a
            href="#contact"
            className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm tracking-wide transition-all inline-flex items-center gap-2"
          >
            Explore Pricing
          </a>
        </div>

        {/* Agency ROI Animated Counter Bar (CountUp React Bits) */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center justify-center">
              <CountUp to={500} suffix="M+" duration={2.5} />
            </div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">Total Views Generated</div>
          </div>
          <div className="p-4 border-l border-white/5">
            <div className="text-3xl md:text-4xl font-black text-purple-400 tracking-tight flex items-center justify-center">
              <CountUp to={4.8} decimals={1} suffix="x" duration={2} />
            </div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">Avg Performance ROAS</div>
          </div>
          <div className="p-4 border-l border-white/5">
            <div className="text-3xl md:text-4xl font-black text-pink-400 tracking-tight flex items-center justify-center">
              <CountUp prefix="$" to={14} suffix="M+" duration={2.5} />
            </div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">Client Ad Revenue</div>
          </div>
          <div className="p-4 border-l border-white/5">
            <div className="text-3xl md:text-4xl font-black text-emerald-400 tracking-tight flex items-center justify-center">
              <CountUp to={98} suffix="%" duration={2} />
            </div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">Client Retention Rate</div>
          </div>
        </div>
      </section>

      {/* Showreel & Video Editing Showcase (SpotlightCard React Bits) */}
      <section id="showreel" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-purple-400 tracking-widest uppercase block mb-2">
              // PRODUCTION SHOWREEL
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Work That <ShinyText text="Commands Attention" speed={4} />
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid using SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              className="group cursor-pointer border-white/10 hover:border-purple-500/40"
              spotlightColor="rgba(168, 85, 247, 0.22)"
            >
              {/* Image Preview / Video Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-80`} />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${project.accent}`}
                  >
                    {project.category}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/10">
                    {project.duration}
                  </span>
                </div>

                {/* Play Button Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-black ml-1" />
                  </div>
                </div>

                {/* Metric Overlay Bottom */}
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> {project.metric}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6">
                <div className="text-xs text-purple-400 font-bold tracking-wider uppercase mb-1">
                  {project.client}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-purple-400" /> Hollywood Pacing
                  </span>
                  <span className="font-medium text-gray-300">{project.views}</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Why Choose Us / Services Grid */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-pink-400 tracking-widest uppercase block mb-2">
            // THE PERFORMANCE PIPELINE
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            How We Out-Perform In-House Editors & Agencies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SpotlightCard className="p-8 border-white/10" spotlightColor="rgba(236, 72, 153, 0.15)">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">01. Viral Retention Pacing</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We engineer edits around algorithmic watch-time triggers: custom sound design, 3D motion tracking, dynamic typography, and pattern interrupts every 2.5 seconds.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
              <CheckCircle2 className="w-4 h-4" /> 48-Hour Rapid Turnaround
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-8 border-white/10" spotlightColor="rgba(168, 85, 247, 0.15)">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-6 text-pink-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">02. Data-Tested Paid Ads</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We don’t guess. We test multiple ad hooks, CTAs, and video variations weekly on Meta, TikTok, and YouTube Shorts to maximize your Return on Ad Spend.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-pink-400">
              <CheckCircle2 className="w-4 h-4" /> Weekly Creative Iterations
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-8 border-white/10" spotlightColor="rgba(59, 130, 246, 0.15)">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 text-blue-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">03. Full Creative Department</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Get a dedicated Creative Director, senior Hollywood editor, and motion designer in your Slack channel for less than the cost of one junior hire.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
              <CheckCircle2 className="w-4 h-4" /> Unlimited Revisions & Slack Channel
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* CTA Conversion Banner */}
      <section id="contact" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 via-[#111118] to-black border border-purple-500/30 p-10 md:p-16 text-center shadow-[0_0_80px_rgba(168,85,247,0.2)]">
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-purple-600/30 blur-[90px]" />

          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-4">
            // SCALE YOUR CREATIVES TODAY
          </span>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 max-w-2xl mx-auto">
            Ready To Turn Views Into <ShinyText text="Predictable Revenue" speed={3} />?
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10">
            Book a 20-minute creative strategy audit. We’ll review your current ads and show you exact edits that will double your CTR.
          </p>

          <Magnet magnetStrength={2.5}>
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(168,85,247,0.5)] transition-all inline-flex items-center gap-3">
              Book Your Free Strategy Audit <ArrowUpRight className="w-5 h-5" />
            </button>
          </Magnet>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 py-10 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <div>© 2026 Vistara Cuts // Creative Performance Agency. All rights reserved.</div>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>

    </div>
  );
}
