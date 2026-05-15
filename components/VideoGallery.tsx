'use client';

import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  // Replace these with actual client video URLs
  const videos = [
    {
      title: 'Corporate Brand Video',
      client: 'Tech Startup Inc.',
      thumbnail: '/api/placeholder/600/400',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual
      category: 'Corporate',
      views: '10K+'
    },
    {
      title: 'Social Media Campaign',
      client: 'Fashion Brand',
      thumbnail: '/api/placeholder/600/400',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual
      category: 'Marketing',
      views: '25K+'
    },
    {
      title: 'Product Launch Video',
      client: 'E-commerce Store',
      thumbnail: '/api/placeholder/600/400',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual
      category: 'Product',
      views: '15K+'
    },
    {
      title: 'YouTube Content Edit',
      client: 'Content Creator',
      thumbnail: '/api/placeholder/600/400',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual
      category: 'YouTube',
      views: '50K+'
    },
    {
      title: 'Event Highlights',
      client: 'Wedding Planners',
      thumbnail: '/api/placeholder/600/400',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual
      category: 'Event',
      views: '8K+'
    },
    {
      title: 'Instagram Reels Series',
      client: 'Fitness Influencer',
      thumbnail: '/api/placeholder/600/400',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual
      category: 'Social Media',
      views: '100K+'
    },
  ];

  return (
    <section id="portfolio" className="relative w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm uppercase tracking-widest text-pink-400 font-bold">My Work</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            Video Portfolio
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of creative projects I've brought to life for clients across various industries
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-6"></div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedVideo(index)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gray-800">
                {/* Placeholder gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all duration-300">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-white/50">
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-pink-500/80 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                  {video.category}
                </div>

                {/* Views Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                  👁️ {video.views}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Client: <span className="text-purple-400 font-semibold">{video.client}</span>
                </p>
                <button className="text-sm text-pink-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Watch Now
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all"
                onClick={() => setSelectedVideo(null)}
              >
                ✕
              </button>

              {/* Video Player */}
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={videos[selectedVideo].videoUrl}
                  title={videos[selectedVideo].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Info */}
              <div className="p-6 bg-gradient-to-br from-gray-900 to-black">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {videos[selectedVideo].title}
                </h3>
                <p className="text-gray-400">
                  Client: <span className="text-purple-400 font-semibold">{videos[selectedVideo].client}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Want to see more? Check out my full portfolio!</p>
          <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.5)]">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}