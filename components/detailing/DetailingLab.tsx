'use client';

import React, { useState } from 'react';
import CarCanvas from '@/components/3d/CarCanvas';
import { DETAILING_HOTSPOTS, DetailingHotspot } from '@/config/studio';
import { soundEngine } from '@/lib/audio';
import { Shield, Sparkles, Check, ArrowRight } from 'lucide-react';

interface DetailingLabProps {
  onBookDetailing: (serviceName: string) => void;
}

export default function DetailingLab({ onBookDetailing }: DetailingLabProps) {
  const [activeHotspot, setActiveHotspot] = useState<DetailingHotspot>(DETAILING_HOTSPOTS[0]);

  const handleSelectHotspot = (hotspot: DetailingHotspot) => {
    soundEngine.playMechanicalClick(700, 0.03);
    setActiveHotspot(hotspot);
  };

  return (
    <section id="detailing-lab" className="relative w-full py-28 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C9A66B] uppercase mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>THE LABORATORY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              DETAILING IS <br />
              <span className="text-[#C9A66B]">NOT CLEANING.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#A7A7A7] font-light leading-relaxed">
            Cleaning removes dirt. Detailing restores clearcoat geometry, seals molecular pore structures, and preserves automotive legacy.
          </p>
        </div>

        {/* Hotspot Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 no-scrollbar">
          {DETAILING_HOTSPOTS.map((hotspot) => {
            const isActive = activeHotspot.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => handleSelectHotspot(hotspot)}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A66B] text-black font-bold shadow-[0_2px_12px_rgba(201,166,107,0.3)]'
                    : 'bg-[#141414] text-[#A7A7A7] hover:text-white border border-white/5'
                }`}
              >
                {hotspot.label}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3D Vehicle with Active Camera Zoom */}
          <div className="lg:col-span-8 bg-[#0B0B0B] border border-white/10 rounded-sm relative min-h-[420px] md:min-h-[520px] overflow-hidden">
            <CarCanvas
              mode="detailing"
              activeHotspotId={activeHotspot.id}
              interactive={true}
            />

            {/* In-Canvas Dynamic Hotspot Badge */}
            <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md px-4 py-2 border border-[#C9A66B]/40 rounded-sm">
              <span className="text-[10px] font-mono text-[#C9A66B] tracking-[0.25em] uppercase block font-bold">
                CAMERA FOCUS: {activeHotspot.label}
              </span>
              <span className="text-xs text-white font-bold tracking-wide">
                {activeHotspot.headline}
              </span>
            </div>
          </div>

          {/* Detailed Hotspot Explanation Card */}
          <div className="lg:col-span-4 bg-[#121212] border border-white/10 p-6 sm:p-8 flex flex-col justify-between rounded-sm">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C9A66B] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SPECIFICATION BREAKDOWN</span>
              </div>

              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                {activeHotspot.headline}
              </h3>

              <div className="inline-block px-3 py-1 bg-neutral-900 border border-white/10 text-[11px] font-mono text-[#C9A66B] rounded-sm mb-6">
                {activeHotspot.metrics}
              </div>

              <p className="text-sm text-[#A7A7A7] font-light leading-relaxed mb-6">
                {activeHotspot.description}
              </p>

              {/* Protocol Checklist */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs text-white">
                  <Check className="w-4 h-4 text-[#C9A66B] shrink-0" />
                  <span>Ra95+ CRI Color-Match Inspection Lighting</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white">
                  <Check className="w-4 h-4 text-[#C9A66B] shrink-0" />
                  <span>Sub-2 Micron Surgical Clearcoat Removal Tolerance</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white">
                  <Check className="w-4 h-4 text-[#C9A66B] shrink-0" />
                  <span>Infrared Short-Wave Lamp Curing Facility</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playMechanicalClick();
                  onBookDetailing(activeHotspot.headline);
                }}
                className="w-full py-3.5 bg-[#C9A66B] hover:bg-[#DFBD82] text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>COMMISSION {activeHotspot.label} SPEC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
