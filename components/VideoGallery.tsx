'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const videos = [
  {
    title: 'Neon Cyberpunk Ad',
    client: 'CyberTech Industries',
    thumbnail: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Commercial',
    views: '120K+'
  },
  {
    title: 'Future of Finance',
    client: 'Nova Bank',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Corporate',
    views: '85K+'
  },
  {
    title: 'Urban Streetwear Drop',
    client: 'Vanguard Apparel',
    thumbnail: 'https://images.unsplash.com/photo-1523398002811-999aa8d9512e?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Fashion',
    views: '250K+'
  },
  {
    title: 'Cosmic Exploration',
    client: 'AeroSpace X',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Documentary',
    views: '500K+'
  },
  {
    title: 'Gaming Console Launch',
    client: 'NextGen Gaming',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Promo',
    views: '1.2M+'
  },
  {
    title: 'Electric Supercar',
    client: 'Velocity Motors',
    thumbnail: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Automotive',
    views: '340K+'
  }
];

export default function VideoGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, []);
  // Handle scroll wheel for rotating carousel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isThrottled = false;
    let resetTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // prevents page scroll when mouse is OVER the container
      
      // Clear the timeout on every single scroll event (including momentum)
      clearTimeout(resetTimeout);
      
      // Only unlock when the user has completely stopped scrolling for 150ms
      resetTimeout = setTimeout(() => {
        isThrottled = false;
      }, 150);
      
      if (isThrottled) return;
      
      const threshold = 15; // lowered threshold for laptop trackpads
      if (e.deltaY > threshold || e.deltaX > threshold) {
        handleNext();
        isThrottled = true;
      } else if (e.deltaY < -threshold || e.deltaX < -threshold) {
        handlePrev();
        isThrottled = true;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(resetTimeout);
    };
  }, [handleNext, handlePrev]);


  // Auto-play functionality (every 3 seconds)
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  // Handle Drag
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      handleNext();
    } else if (swipe > 50) {
      handlePrev();
    }
  };

  return (
    <section id="portfolio" className="relative w-full bg-black py-12 md:py-20 overflow-hidden perspective-[2000px]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,var(--theme-primary)_0%,transparent_70%)] blur-[100px] transform scale-150"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm uppercase tracking-widest text-secondary font-bold">Featured Projects</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Vault</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Swipe, drag, or scroll to explore my latest high-end visual productions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto mt-8 rounded-full"></div>
        </div>

        {/* 3D Carousel Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {videos.map((video, index) => {
            // Calculate shortest path offset
            let offset = index - activeIndex;
            const halfLen = Math.floor(videos.length / 2);
            if (offset > halfLen) offset -= videos.length;
            if (offset < -halfLen) offset += videos.length;

            const isCenter = offset === 0;
            
            // Math for 3D positioning
            const absOffset = Math.abs(offset);
            const z = isCenter ? 0 : -absOffset * 150 - 50;
            const x = offset * 250; // pixels apart horizontally
            const rotateY = offset * -25; // face inwards
            const scale = isCenter ? 1 : Math.max(0.6, 1 - absOffset * 0.15);
            const opacity = isCenter ? 1 : Math.max(0, 0.7 - absOffset * 0.2);
            const zIndex = 100 - absOffset;

            return (
              <motion.div
                key={index}
                className="absolute top-0 w-full max-w-lg origin-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={false}
                animate={{
                  x,
                  z,
                  rotateY,
                  scale,
                  opacity,
                  zIndex
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                  mass: 1
                }}
                style={{ transformStyle: 'preserve-3d', touchAction: 'pan-y' }}
                onClick={() => {
                  if (isCenter) {
                    setSelectedVideo(index);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              >
                <div 
                  className={`group relative rounded-3xl overflow-hidden border-2 transition-all duration-300 shadow-2xl bg-gray-900 ${
                    isCenter ? 'border-primary/50 shadow-[0_0_50px_var(--theme-primary)]/30' : 'border-white/5 hover:border-secondary/30'
                  }`}
                  style={{ aspectRatio: '4/3' }}
                >
                  {/* Thumbnail Image */}
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${isCenter ? 'from-black via-black/40 to-primary/20' : 'from-black via-black/50 to-transparent'}`}></div>
                  
                  {/* Play Button Overlay (only on center) */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isCenter ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <div className="w-20 h-20 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/40 transition-all duration-300 border-2 border-primary/50">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-primary tracking-wider uppercase">
                    {video.category}
                  </div>
                  <div className="absolute top-4 right-4 px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-white">
                    👁️ {video.views}
                  </div>

                  {/* Info Footer */}
                  <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm md:text-base text-gray-300">
                        Client: <span className="text-secondary font-semibold">{video.client}</span>
                      </p>
                      {isCenter && (
                        <div className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all text-sm uppercase tracking-widest">
                          Watch <ExternalLink className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-36 sm:mt-16 md:mt-8">
          <button 
            onClick={handlePrev}
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
          </button>
          
          <div className="flex items-center gap-3">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx 
                    ? 'w-10 h-2 bg-gradient-to-r from-primary to-secondary' 
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-all group"
          >
            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="relative w-full max-w-6xl bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_var(--theme-primary)]/20"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-all group border border-white/10 hover:border-transparent"
                  onClick={() => setSelectedVideo(null)}
                >
                  <span className="text-xl group-hover:rotate-90 transition-transform duration-300">✕</span>
                </button>

                {/* Video Player */}
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={videos[selectedVideo].videoUrl}
                    title={videos[selectedVideo].title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Modal Info */}
                <div className="p-8 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                        {videos[selectedVideo].title}
                      </h3>
                      <p className="text-xl text-gray-400 font-light">
                        Created for <span className="text-secondary font-bold">{videos[selectedVideo].client}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="px-6 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary font-bold tracking-widest uppercase text-sm">
                        {videos[selectedVideo].category}
                      </div>
                      <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white font-semibold flex items-center gap-2">
                        👁️ {videos[selectedVideo].views}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}