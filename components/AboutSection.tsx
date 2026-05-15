'use client';

import React from 'react';
import { User, Target, Zap } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Profile */}
          <div className="space-y-6">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative w-full h-full bg-gray-800 rounded-3xl flex items-center justify-center border-2 border-white/10">
                <User className="w-48 h-48 text-white/30" />
              </div>
            </div>
          </div>

          {/* Right - Description */}
          <div className="space-y-6">
            <h3 className="text-4xl font-bold text-white">
              Dual Identity, One Vision
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a second-year BBA student by day and a passionate video editor by night. 
              Through <span className="text-purple-400 font-semibold">Vistara</span>, I combine 
              business acumen with creative storytelling to deliver compelling visual content 
              that resonates with audiences.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My journey in video editing started as a passion project and has evolved into 
              a thriving freelance business, working with multiple clients to bring their 
              visions to life through the power of video.
            </p>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-3">Academic Excellence</h4>
            <p className="text-gray-400">
              Pursuing BBA with focus on marketing, management, and entrepreneurship
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-pink-400" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-3">Creative Vision</h4>
            <p className="text-gray-400">
              Transforming ideas into stunning visual narratives that captivate and engage
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-3">Fast Delivery</h4>
            <p className="text-gray-400">
              Quick turnaround times without compromising on quality or creativity
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GraduationCap({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  );
}