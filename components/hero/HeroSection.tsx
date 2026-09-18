'use client';

import React from 'react';
import CarCanvas from '@/components/3d/CarCanvas';
import { soundEngine } from '@/lib/audio';
import { ChevronDown, ArrowRight, Gauge, ShieldCheck, Flame } from 'lucide-react';

interface HeroSectionProps {
  onStartBuild: () => void;
  onExploreWork: () => void;
  onScrollToGarage: () => void;
}

export default function HeroSection({
  onStartBuild,
  onExploreWork,
  onScrollToGarage,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#080808] flex flex-col justify-between overflow-hidden pt-24 pb-8"
    >
      {/* 3D Car Viewport Canvas (Centered Background Stage) */}
      <div className="absolute inset-0 z-0">
        <CarCanvas mode="hero" interactive={true} />
        {/* Subtle vignette and gradient shading to ensure pristine typography legibility */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent w-full md:w-3/5" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full my-auto flex flex-col justify-center">
        {/* Engineering Studio Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-neutral-900/80 border border-white/10 w-fit mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B]" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C9A66B] uppercase">
            STAGE 3 MOTORSPORT & DETAILING
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.92] max-w-2xl select-none">
          <span className="block text-neutral-400">BUILT</span>
          <span className="block text-white">BEYOND</span>
          <span className="block text-[#C9A66B]">STOCK.</span>
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-lg font-light tracking-wide text-[#A7A7A7] mt-6 max-w-md">
          Performance. Precision. Presence.
          <span className="block text-xs text-neutral-500 font-mono mt-1">
            BESPOKE AERO &bull; LEVEL 3 PAINT CORRECTION &bull; DYNO TUNING
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => {
              soundEngine.playMechanicalClick();
              onStartBuild();
            }}
            className="group px-7 py-3.5 bg-[#C9A66B] hover:bg-[#DFBD82] text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm transition-all shadow-[0_8px_24px_rgba(201,166,107,0.3)] hover:shadow-[0_12px_32px_rgba(201,166,107,0.45)] flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>START YOUR BUILD</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playMechanicalClick();
              onExploreWork();
            }}
            className="px-6 py-3.5 bg-neutral-900/60 hover:bg-neutral-800/80 text-white font-semibold text-xs tracking-[0.2em] uppercase rounded-sm border border-white/15 hover:border-white/40 transition-all backdrop-blur-sm cursor-pointer"
          >
            EXPLORE OUR WORK
          </button>
        </div>

        {/* Telemetry Micro-Badges */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mt-12 pt-6 border-t border-white/10 text-neutral-400">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-white text-sm font-mono font-bold">
              <Gauge className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>850+ HP</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">
              DYNO PROVEN
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-white text-sm font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>99.4% GLOSS</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">
              SURGICAL FINISH
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-white text-sm font-mono font-bold">
              <Flame className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>100% DRY CF</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">
              PRE-PREG CARBON
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator: "SCROLL TO ENTER THE GARAGE ↓" */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            soundEngine.playMechanicalClick();
            onScrollToGarage();
          }}
          className="group flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#A7A7A7] hover:text-white transition-colors uppercase cursor-pointer"
        >
          <span>SCROLL TO ENTER THE GARAGE</span>
          <ChevronDown className="w-4 h-4 text-[#C9A66B] animate-bounce" />
        </button>

        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
          <span>COORDINATES: 34.0522° N, 118.2437° W</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700" />
          <span>STATUS: COMMISSIONING ACTIVE</span>
        </div>
      </div>
    </section>
  );
}
