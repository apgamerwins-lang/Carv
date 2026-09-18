'use client';

import React, { useState, useRef, useCallback } from 'react';
import { soundEngine } from '@/lib/audio';
import { Sparkles, MoveHorizontal, Eye } from 'lucide-react';

export default function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50, visible: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);

    setLoupePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      visible: true,
    });
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
    soundEngine.playMechanicalClick(500, 0.02);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updatePosition(e.clientX, e.clientY);
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      setLoupePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        visible: true,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <section id="detailing" className="relative w-full py-28 bg-[#090909] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C9A66B] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPTICAL MICRON LEVELING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            THE DIFFERENCE IS IN <br />
            <span className="text-[#C9A66B]">THE REFLECTION.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A7A7A7] font-light mt-4 leading-relaxed">
            Drag the divider to witness 3-stage compound jeweling vs. oxidized, swirl-etched factory paint. We eliminate micro-scratches without compromising factory clearcoat depth.
          </p>
        </div>

        {/* Comparison Viewer Stage */}
        <div
          ref={containerRef}
          data-cursor="drag"
          className="relative w-full h-[380px] sm:h-[540px] md:h-[620px] rounded-sm border border-white/15 overflow-hidden select-none cursor-ew-resize bg-[#121212] shadow-2xl"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setIsDragging(false);
            setLoupePos((p) => ({ ...p, visible: false }));
          }}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
        >
          {/* Layer 1: AFTER (Full Background - Flawless Deep Ceramic Finish) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=90)',
            }}
          >
            {/* After Banner Badge */}
            <div className="absolute top-6 right-6 z-20 bg-black/80 backdrop-blur-md px-4 py-2 border border-[#C9A66B]/50 rounded-sm">
              <span className="text-xs font-mono text-[#C9A66B] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A66B] animate-pulse" />
                AFTER: SURGICAL 9H CERAMIC
              </span>
              <span className="block text-[10px] font-mono text-[#A7A7A7] mt-0.5">
                GLOSS INDEX: 99.6 GU &bull; 0 SWIRL DEFECTS
              </span>
            </div>
          </div>

          {/* Layer 2: BEFORE (Clipped Layer - Swirled, dull, hazy paint) */}
          <div
            className="absolute inset-0 bg-cover bg-center filter saturate-70 contrast-90 brightness-90"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              backgroundImage:
                'url(https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=80)',
            }}
          >
            {/* Simulated Swirl Micro-Texture Overlay for Before */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 45% 45%, rgba(255,255,255,0.7) 0%, transparent 60%)',
              }}
            />

            {/* Before Banner Badge */}
            <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 rounded-sm">
              <span className="text-xs font-mono text-neutral-400 font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                BEFORE: FACTORY OXIDATION
              </span>
              <span className="block text-[10px] font-mono text-neutral-500 mt-0.5">
                GLOSS INDEX: 68.2 GU &bull; BUFFER TRAILS & CONTAMINATION
              </span>
            </div>
          </div>

          {/* Draggable Vertical Divider Bar */}
          <div
            className="absolute top-0 bottom-0 z-30 w-[2px] bg-white pointer-events-none shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Drag Handle Knob */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#080808] border-2 border-[#C9A66B] shadow-[0_0_20px_rgba(201,166,107,0.5)] flex items-center justify-center pointer-events-auto">
              <MoveHorizontal className="w-5 h-5 text-[#C9A66B]" />
            </div>
          </div>

          {/* Precision Surface Inspection Loupe / Tooltip near cursor */}
          {loupePos.visible && (
            <div
              className="absolute z-40 pointer-events-none hidden md:flex items-center gap-2.5 px-3 py-1.5 bg-black/90 backdrop-blur-md border border-white/20 rounded-sm text-[10px] font-mono tracking-wider text-white shadow-xl -translate-x-1/2 -translate-y-14"
              style={{
                left: `${loupePos.x}%`,
                top: `${loupePos.y}%`,
              }}
            >
              <Eye className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>
                {loupePos.x < sliderPos
                  ? 'ANALYZING: MICRO-MARRING & BUFFER TRAILS'
                  : 'ANALYZING: 100% SPECULAR MIRROR PLANE'}
              </span>
            </div>
          )}

          {/* Bottom Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/70 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#A7A7A7] uppercase pointer-events-none border border-white/5">
            DRAG VERTICAL SLIDER TO REVEAL TRANSFORMATION
          </div>
        </div>

        {/* Telemetry Row Beneath Comparison */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 bg-[#121212] border border-white/5 rounded-sm">
            <span className="text-[10px] font-mono text-[#C9A66B] uppercase tracking-widest block mb-1">
              SPECULAR GLOSS
            </span>
            <span className="text-xl font-black text-white font-mono">99.6 GU</span>
            <span className="text-[10px] text-neutral-500 block mt-0.5">Rhopoint IQ Certified</span>
          </div>

          <div className="p-4 bg-[#121212] border border-white/5 rounded-sm">
            <span className="text-[10px] font-mono text-[#C9A66B] uppercase tracking-widest block mb-1">
              CLEARCOAT PRESERVED
            </span>
            <span className="text-xl font-black text-white font-mono">98.4%</span>
            <span className="text-[10px] text-neutral-500 block mt-0.5">Ultrasonic Gauge Verified</span>
          </div>

          <div className="p-4 bg-[#121212] border border-white/5 rounded-sm">
            <span className="text-[10px] font-mono text-[#C9A66B] uppercase tracking-widest block mb-1">
              WATER BEADING ANGLE
            </span>
            <span className="text-xl font-black text-white font-mono">116°</span>
            <span className="text-[10px] text-neutral-500 block mt-0.5">Superhydrophobic Contact</span>
          </div>

          <div className="p-4 bg-[#121212] border border-white/5 rounded-sm">
            <span className="text-[10px] font-mono text-[#C9A66B] uppercase tracking-widest block mb-1">
              HEAT TOLERANCE
            </span>
            <span className="text-xl font-black text-white font-mono">1200° F</span>
            <span className="text-[10px] text-neutral-500 block mt-0.5">Caliper & Exhaust Shield</span>
          </div>
        </div>
      </div>
    </section>
  );
}
