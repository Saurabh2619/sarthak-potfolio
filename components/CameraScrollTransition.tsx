'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { Camera, ArrowDown, Sparkles } from 'lucide-react';

/**
 * Derives a `visibility` MotionValue from an opacity MotionValue.
 * An element at opacity:0 is still rasterized and composited every frame.
 * Flipping it to `hidden` removes it from the paint tree entirely.
 */
function useVisibility(opacity: MotionValue<number>) {
  return useTransform(opacity, (v) => (v < 0.005 ? 'hidden' : 'visible'));
}

export default function CameraScrollTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Critically damped spring. ζ = 15 / (2 * sqrt(160 * 0.4)) ≈ 0.94
  // restDelta/restSpeed tightened because scrollYProgress is a 0→1 range,
  // where the default restDelta of 0.01 is a full 1% — coarse enough to step.
  const springConfig = prefersReduced
    ? { stiffness: 1000, damping: 100, mass: 0.1, restDelta: 0.0001 }
    : {
        stiffness: 160,
        damping: 15,
        mass: 0.4,
        restDelta: 0.0001,
        restSpeed: 0.0001,
      };

  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // PHASE 1: APERTURE BLADES ROTATE & OPEN
  const apertureRotate = useTransform(smoothProgress, [0, 0.4], [0, 85]);
  const apertureOpenScale = useTransform(smoothProgress, [0, 0.4], [0.25, 1.35]);
  const lensOpacity = useTransform(smoothProgress, [0.7, 0.84], [1, 0]);

  // Fine lens detail (8-path SVG, dashed ring, mono text) retires once the
  // barrel is past ~4x, where it is already outside the viewport. Keeps the
  // browser from re-rasterizing vector geometry at every zoom step.
  const lensDetailOpacity = useTransform(smoothProgress, [0.42, 0.55], [1, 0]);

  // PHASE 2: CINEMATIC FLASH STROBE BURST
  const flashOpacity = useTransform(
    smoothProgress,
    [0.32, 0.45, 0.58, 0.72],
    [0, 1, 0.7, 0]
  );

  // The flash is a large, soft, pre-baked gradient — no blur filter.
  // It starts at 0.55 (never small enough to read as a discrete sphere) and
  // tops out at 1.8 instead of the original 50.
  const flashScale = useTransform(smoothProgress, [0.35, 0.65, 0.9], [0.55, 1.2, 1.8]);

  // PHASE 3: ZOOMING INTO THE HEART OF THE LENS
  // Peak zoom capped at 8. See notes: 480px * 22 exceeded the GPU max texture
  // size and Chrome bailed out mid-raster, which is what clipped the barrel.
  const cameraZoomScale = useTransform(
    smoothProgress,
    [0, 0.4, 0.62, 0.84],
    [1, 1.2, 3.2, 8]
  );

  const textOpacity = useTransform(smoothProgress, [0, 0.28], [1, 0]);
  const welcomeOpacity = useTransform(smoothProgress, [0.48, 0.68, 0.85], [0, 1, 0]);
  const whiteFlashOpacity = useTransform(smoothProgress, [0.38, 0.48, 0.62], [0, 0.95, 0]);

  // PHASE 4: MASTER STAGE OPACITY
  const masterStageOpacity = useTransform(smoothProgress, [0.8, 0.94], [1, 0]);

  // Visibility toggles — remove fully transparent layers from compositing.
  const headerVisibility = useVisibility(textOpacity);
  const lensVisibility = useVisibility(lensOpacity);
  const lensDetailVisibility = useVisibility(lensDetailOpacity);
  const flashVisibility = useVisibility(flashOpacity);
  const whiteFlashVisibility = useVisibility(whiteFlashOpacity);
  const welcomeVisibility = useVisibility(welcomeOpacity);
  const stageVisibility = useVisibility(masterStageOpacity);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black select-none">
      {/* Compositor-driven bob. Replaces the JS `repeat: Infinity` loop that ran
          for the full 300vh, sharing the main thread with scroll handling. */}
      <style>{`
        @keyframes cst-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
        .cst-bob { animation: cst-bob 1.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .cst-bob { animation: none; } }
      `}</style>

      {/* Sticky Viewport Stage */}
      <motion.div
        style={{ opacity: masterStageOpacity, visibility: stageVisibility }}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black"
      >
        {/* Background Subtle Studio Atmosphere Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_65%)] pointer-events-none" />

        {/* STEP 1: Instruction / Status Header */}
        <motion.div
          style={{ opacity: textOpacity, visibility: headerVisibility }}
          className="absolute top-12 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none"
        >
          {/* backdrop-blur removed: forces a backdrop readback every frame and
              renders identically here, since the surface behind it is flat black. */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-bold text-gray-300 uppercase tracking-widest mb-3 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Camera className="w-3.5 h-3.5 text-primary animate-pulse" />
            Scroll Down to Open Cinema Lens
          </div>
          <p className="text-sm text-gray-400 font-mono tracking-wider">
            [ T1.4 35MM CINE-PRIME // APERTURE CHARGING ]
          </p>
          <div className="mt-3 flex justify-center text-primary">
            <ArrowDown className="w-5 h-5 cst-bob" />
          </div>
        </motion.div>

        {/* STEP 2: The 3D Cinema Lens & Mechanical Aperture
            NOTE: no `will-change` and no static `transform` here — both were
            actively breaking this element. Framer-motion writes `transform`
            itself, so declaring one alongside `scale` is a direct conflict. */}
        <motion.div
          style={{
            scale: cameraZoomScale,
            opacity: lensOpacity,
            visibility: lensVisibility,
          }}
          className="relative z-30 w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] flex items-center justify-center pointer-events-none"
        >
          {/* Outer Lens Metallic Barrel Rim */}
          <div className="absolute inset-0 rounded-full border-[6px] border-white/10 bg-gradient-to-br from-[#13111c] via-black to-[#09080e] shadow-[0_0_100px_rgba(168,85,247,0.35)] flex items-center justify-center">
            {/* Focal Markings Ring — retired before deep zoom */}
            <motion.div
              style={{ opacity: lensDetailOpacity, visibility: lensDetailVisibility }}
              className="absolute inset-4 rounded-full border border-dashed border-white/20 flex items-center justify-center"
            >
              <span className="absolute top-5 text-[10px] font-mono text-gray-400 font-bold tracking-widest">
                VISTARA CINE-PRIME 35MM T1.4
              </span>
              <span className="absolute bottom-5 text-[10px] font-mono text-purple-400 font-bold tracking-widest">
                REC.709 // 8K RAW ANAMORPHIC
              </span>
            </motion.div>

            {/* Inner Metallic Focus Barrel */}
            <div className="absolute inset-12 rounded-full border-2 border-primary/40 bg-black shadow-[inset_0_0_60px_rgba(168,85,247,0.4)] flex items-center justify-center overflow-hidden">
              {/* Mechanical Aperture Blades — retired before deep zoom */}
              <motion.div
                style={{
                  rotate: apertureRotate,
                  scale: apertureOpenScale,
                  opacity: lensDetailOpacity,
                  visibility: lensDetailVisibility,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full text-[#1b1528]">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle} 100 100)`}>
                      <path
                        d="M 100 100 L 160 45 A 95 95 0 0 1 185 100 Z"
                        fill="currentColor"
                        stroke="#a855f7"
                        strokeWidth="1.2"
                        strokeOpacity="0.6"
                      />
                    </g>
                  ))}
                </svg>
              </motion.div>

              {/* Glass Optic Sheen. mix-blend-screen dropped — blend modes force
                  the compositor to read back the backdrop every frame, and this
                  reads the same against black. */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-primary/40 via-transparent to-secondary/40 pointer-events-none" />
              {/* `bg-radial-gradient` was not a real utility in this Tailwind v4
                  setup and silently did nothing. Now inline, with the softness
                  baked into the colour stops instead of a blur filter. */}
              <div
                className="absolute inset-20 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(168,85,247,0.20) 45%, transparent 72%)',
                }}
              />

              {/* Center Light Emitter Core */}
              <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_30px_#ffffff] flex items-center justify-center z-10" />
            </div>
          </div>
        </motion.div>

        {/* STEP 3: THE CINEMATIC FLASH BURST */}
        <motion.div
          style={{
            opacity: flashOpacity,
            scale: flashScale,
            visibility: flashVisibility,
          }}
          className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center"
        >
          {/* Long, gradual alpha falloff so this reads as a bloom rather than a
              solid sphere. The original relied on `blur-xl`, which at small
              scales was proportionally enormous and hid the gradient's edge —
              that's why the previous version showed a hard purple ball. */}
          <div
            className="w-[100vmax] h-[100vmax] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 8%, rgba(245,208,254,0.55) 18%, rgba(232,121,249,0.34) 30%, rgba(192,132,252,0.18) 43%, rgba(168,85,247,0.08) 57%, rgba(168,85,247,0.025) 70%, transparent 82%)',
            }}
          />
        </motion.div>

        {/* Full-screen White Flash Overlay at Peak Strobe.
            mix-blend-screen removed — pure white over this stage is visually
            identical under `normal` blending, minus the backdrop readback. */}
        <motion.div
          style={{ opacity: whiteFlashOpacity, visibility: whiteFlashVisibility }}
          className="absolute inset-0 bg-white z-50 pointer-events-none"
        />

        {/* STEP 4: Welcome Typography Inside the Flash */}
        <motion.div
          style={{ opacity: welcomeOpacity, visibility: welcomeVisibility }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none text-center px-4"
        >
          {/* backdrop-blur removed — it sat at the exact peak-load moment. */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/80 border border-primary/50 text-primary text-xs md:text-sm font-bold uppercase tracking-widest mb-6 shadow-2xl">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            Entering Visual Reality
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Vistara
            </span>
          </h2>
        </motion.div>
      </motion.div>
    </div>
  );
}