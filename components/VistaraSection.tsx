'use client';

import React from 'react';
import { Video, Scissors, Palette, Wand2, Sparkles, TrendingUp } from 'lucide-react';

export default function VistaraSection() {
  const tools = [
    { name: 'Adobe Premiere Pro', icon: '🎬', color: 'from-purple-500 to-pink-500' },
    { name: 'After Effects', icon: '✨', color: 'from-blue-500 to-cyan-500' },
    { name: 'DaVinci Resolve', icon: '🎨', color: 'from-red-500 to-orange-500' },
    { name: 'Final Cut Pro', icon: '🎞️', color: 'from-green-500 to-teal-500' },
    { name: 'Photoshop', icon: '🖼️', color: 'from-indigo-500 to-purple-500' },
    { name: 'CapCut', icon: '📱', color: 'from-pink-500 to-rose-500' },
  ];

  const services = [
    {
      icon: Video,
      title: 'Video Editing',
      description: 'Professional editing for YouTube, social media, and corporate videos',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Scissors,
      title: 'Content Creation',
      description: 'Short-form content for Instagram Reels, TikTok, and YouTube Shorts',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'Color Grading',
      description: 'Cinematic color grading to enhance visual storytelling',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Wand2,
      title: 'Motion Graphics',
      description: 'Eye-catching animations and text effects for dynamic content',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Sparkles,
      title: 'VFX & Effects',
      description: 'Special effects and visual enhancements for impactful videos',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: TrendingUp,
      title: 'Brand Videos',
      description: 'Promotional content that drives engagement and conversions',
      gradient: 'from-pink-500 to-rose-500'
    },
  ];

  return (
    <section id="vistara" className="relative w-full min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm uppercase tracking-widest text-purple-400 font-bold">Freelance Services</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Vistara
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your vision, expertly crafted. From concept to final cut, I deliver videos that tell your story and captivate your audience.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mx-auto mt-6"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`relative w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="relative text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                {service.title}
              </h3>
              <p className="relative text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tools Section */}
        <div className="mt-20">
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Tools I Master
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 text-center overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="relative text-4xl mb-3">{tool.icon}</div>
                <p className="relative text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                  {tool.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '25+', label: 'Happy Clients' },
            { number: '100%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}