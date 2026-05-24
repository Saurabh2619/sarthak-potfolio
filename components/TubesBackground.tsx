'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    TubesCursor: any;
  }
}

const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({ 
  children, 
  className,
  enableClickInteraction = true 
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    const initTubes = async () => {
      if (!canvasRef.current || typeof window === 'undefined') return;

      try {
        // Load the locally patched version of the script that draws a 'V' shape instead of infinity
        const scriptUrl = '/tubes-v.js';
        
        if (!window.TubesCursor) {
          // Dynamic import for ES modules
          const module = await eval(`import('${scriptUrl}')`);
          window.TubesCursor = module.default || module;
        }

        if (!mounted || !canvasRef.current) return;

        const app = window.TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
        setIsLoaded(true);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (tubesRef.current && tubesRef.current.dispose) {
          try {
              tubesRef.current.dispose();
          } catch(e) {}
      }
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    
    try {
      const colors = randomColors(3);
      const lightsColors = randomColors(4);
      
      if (tubesRef.current.tubes) {
        tubesRef.current.tubes.setColors?.(colors);
        tubesRef.current.tubes.setLightsColors?.(lightsColors);
      }
    } catch (error) {
      console.error("Color change failed:", error);
    }
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-[400px] overflow-hidden", className)}
      style={{ backgroundColor: '#000' }}
      onClick={handleClick}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: 'none' }}
      />
      
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>

      {!isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ backgroundColor: '#000' }}
        >
          <div className="flex flex-col items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full animate-spin"
              style={{
                border: '4px solid rgba(255, 255, 255, 0.2)',
                borderTopColor: '#fff'
              }}
            />
            <div 
              className="text-sm animate-pulse"
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              Loading 3D Experience...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TubesBackground;