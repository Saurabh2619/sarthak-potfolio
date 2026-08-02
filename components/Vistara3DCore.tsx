'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Video, TrendingUp, Palette, Sparkles, CheckCircle2, Award, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Vistara3DCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<'editing' | 'ads' | 'vfx'>('editing');

  const servicesInfo = {
    editing: {
      title: 'Viral Video Editing',
      subtitle: 'Reels, YouTube & Commercials',
      description: 'Algorithm-engineered cuts, dynamic pacing, and custom typography designed to maximize viewer retention.',
      badge: 'Avg. +45% Watch Time',
      color: '#a855f7', // Purple
      accentColor: 'from-purple-500 to-indigo-600',
    },
    ads: {
      title: 'Performance Ad Creatives',
      subtitle: 'High-ROI Video Campaigns',
      description: 'Persuasive hook-first video ads tailored for Meta, TikTok, and YouTube to drive lower CPA and high conversions.',
      badge: '3.8x Average ROAS',
      color: '#ec4899', // Pink
      accentColor: 'from-pink-500 to-rose-600',
    },
    vfx: {
      title: 'Cinema Grading & VFX',
      subtitle: 'DaVinci 10-Bit Color & Motion',
      description: 'Hollywood-grade REC.709 color grading, sound design, and 3D visual overlays that give your brand an unfair advantage.',
      badge: '100% Custom Workflow',
      color: '#38bdf8', // Electric Cyan
      accentColor: 'from-cyan-500 to-blue-600',
    },
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Elegant Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const primaryLight = new THREE.PointLight(0xa855f7, 4, 20);
    primaryLight.position.set(4, 4, 4);
    scene.add(primaryLight);

    const secondaryLight = new THREE.PointLight(0xec4899, 4, 20);
    secondaryLight.position.set(-4, -4, 4);
    scene.add(secondaryLight);

    // 3. Relatable 3D Element: Clean Geometric Cinema Lens / Prism Core
    const sphereGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f0b18,
      emissive: 0xa855f7,
      emissiveIntensity: 0.2,
      metalness: 0.95,
      roughness: 0.1,
      transparent: true,
      opacity: 0.9,
      transmission: 0.4,
      ior: 1.5,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(coreSphere);

    // 4. Outer Metallic Lens Ring (Horizontal)
    const ring1Geo = new THREE.TorusGeometry(2.0, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 1.0,
      roughness: 0.2,
      emissive: 0xa855f7,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.5;
    scene.add(ring1);

    // 5. Outer Metallic Lens Ring 2 (Tilted)
    const ring2Geo = new THREE.TorusGeometry(2.35, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      metalness: 1.0,
      roughness: 0.2,
      emissive: 0xec4899,
      emissiveIntensity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    scene.add(ring2);

    // 6. Subtle Floating Studio Dust Particles
    const particlesCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 9;
      positions[i + 1] = (Math.random() - 0.5) * 9;
      positions[i + 2] = (Math.random() - 0.5) * 9;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd8b4fe,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // 7. Mouse Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseX = x;
      mouseY = y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Smooth Rotation
      coreSphere.rotation.y = elapsedTime * 0.2 + targetX * 0.5;
      coreSphere.rotation.x = -targetY * 0.5;

      ring1.rotation.z = elapsedTime * 0.4;
      ring1.rotation.y = Math.PI / 2.5 + targetX * 0.4;
      
      ring2.rotation.x = -elapsedTime * 0.3;
      ring2.rotation.z = Math.PI / 3 + targetY * 0.4;

      particleCloud.rotation.y = elapsedTime * 0.05;

      camera.position.x = targetX * 0.4;
      camera.position.y = targetY * 0.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // 9. Dynamic Color shifts based on active service
    const updateColors = () => {
      const activeColorHex = servicesInfo[activeService].color;
      const rgb = new THREE.Color(activeColorHex);
      sphereMat.emissive.set(rgb);
      ring1Mat.color.set(rgb);
      ring1Mat.emissive.set(rgb);
      primaryLight.color.set(rgb);
    };
    updateColors();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeService]);

  return (
    <div className="relative w-full max-w-lg h-[420px] sm:h-[480px] md:h-[520px] mx-auto rounded-3xl bg-gradient-to-br from-[#120d20]/90 via-black to-[#0d0a14] border border-white/15 shadow-[0_0_60px_rgba(168,85,247,0.2)] overflow-hidden flex flex-col justify-between p-6 select-none transition-all duration-500 hover:border-primary/50">
      
      {/* Top Bar: Interactive Service Switcher */}
      <div className="relative z-20 flex items-center justify-between gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveService('editing')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeService === 'editing'
              ? 'bg-purple-600/30 text-white border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
              : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10 hover:text-white'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-purple-400" />
          <span>Video Editing</span>
        </button>

        <button
          onClick={() => setActiveService('ads')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeService === 'ads'
              ? 'bg-pink-600/30 text-white border border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
              : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10 hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-pink-400" />
          <span>Performance Ads</span>
        </button>

        <button
          onClick={() => setActiveService('vfx')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeService === 'vfx'
              ? 'bg-cyan-600/30 text-white border border-cyan-500/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
              : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-cyan-400" />
          <span>Color & VFX</span>
        </button>
      </div>

      {/* Center 3D Three.js Interactive Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing" />

      {/* Bottom Relatable Service Info Overlay (No Fake Ticking HUD!) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="relative z-20 p-5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                // {servicesInfo[activeService].subtitle}
              </span>
              <h4 className="text-xl font-bold text-white">
                {servicesInfo[activeService].title}
              </h4>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-bold text-gray-200 shrink-0">
              <Zap className="w-3.5 h-3.5 text-secondary" />
              {servicesInfo[activeService].badge}
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
            {servicesInfo[activeService].description}
          </p>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> High-Retention Editing & Hooks
            </span>
            <span className="text-primary font-bold">100% Client Ownership</span>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
