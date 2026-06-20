'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const clients = [
  { id: 1, name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', type: 'Tech' },
  { id: 2, name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', type: 'Apparel' },
  { id: 3, name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg', type: 'Audio' },
  { id: 4, name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png', type: 'Automotive' },
  { id: 5, name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg', type: 'Creative' },
  { id: 6, name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg', type: 'Entertainment' },
];

export default function ClientsCarousel() {
  const [itemsPerView, setItemsPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(clients.length); // Start at the middle duplicate set
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Drag states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  // Triple the array to create a seamless infinite loop buffer: [prev, current, next]
  const extendedClients = [...clients, ...clients, ...clients];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1); // 1 on mobile
      else if (window.innerWidth < 1024) setItemsPerView(2); // 2 on tablet
      else setItemsPerView(3); // 3 on PC
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Infinite loop reset logic
  useEffect(() => {
    if (!isTransitioning) return;

    // Wait for the CSS transition to finish, then snap back if needed
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
      
      // If we scrolled past the end of the middle set, snap back to the start of the middle set
      if (currentIndex >= clients.length * 2) {
        setCurrentIndex(currentIndex - clients.length);
      } 
      // If we scrolled before the start of the middle set, snap forward
      else if (currentIndex < clients.length) {
        setCurrentIndex(currentIndex + clients.length);
      }
    }, 500); // 500ms matches the CSS transition duration

    return () => clearTimeout(timeout);
  }, [currentIndex, isTransitioning]);

  // Auto-play
  useEffect(() => {
    if (isHovered || isDragging) return;
    const timer = setInterval(() => {
      next();
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, isDragging, currentIndex]);

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setCurrentTranslate(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Threshold for swipe
    if (currentTranslate < -50) {
      next();
    } else if (currentTranslate > 50) {
      prev();
    }
    setCurrentTranslate(0);
  };

  // Calculate base translation percentage depending on items per view
  // Each item takes (100 / itemsPerView)% of the container
  const itemWidthPercentage = 100 / itemsPerView;
  const baseTranslate = -(currentIndex * itemWidthPercentage);
  
  // Calculate pixel translation from dragging, convert it roughly to percentage for smoothness
  const dragTranslatePercentage = sliderRef.current 
    ? (currentTranslate / sliderRef.current.offsetWidth) * 100 
    : 0;

  const totalTranslate = baseTranslate + dragTranslatePercentage;

  if (itemsPerView === 0) return null;

  return (
    <section className="py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm uppercase tracking-widest text-primary font-bold">Trusted Partners</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Our Clients</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
        </div>

        <div className="relative w-full">
          {/* Arrows */}
          <button 
            onClick={prev} 
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-white hover:bg-gray-800 z-20 transition-colors shadow-xl group"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={next} 
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-white hover:bg-gray-800 z-20 transition-colors shadow-xl group"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Carousel Track */}
          <div 
            className="overflow-hidden px-12 md:px-24 py-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeaveDrag={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            ref={sliderRef}
          >
            <div 
              className="flex"
              style={{ 
                transform: `translateX(${totalTranslate}%)`,
                transition: isDragging || !isTransitioning ? 'none' : 'transform 500ms ease-in-out',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            >
              {extendedClients.map((client, index) => (
                <div 
                  key={`${client.id}-${index}`} 
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="flex flex-col items-center justify-center h-[280px] p-6 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-all duration-300 group select-none">
                    <div className="w-24 h-24 md:w-28 md:h-28 mb-6 rounded-full overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center p-6 group-hover:bg-white/10 transition-colors duration-500 pointer-events-none">
                      <img src={client.logo} alt={client.name} className="w-full h-full object-contain invert opacity-60 group-hover:opacity-100 transition-opacity duration-500" draggable="false" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight pointer-events-none">{client.name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-widest pointer-events-none">{client.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
