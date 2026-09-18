'use client';

import React, { useState } from 'react';
import { BUILDS_DATA, BuildProject } from '@/config/studio';
import { soundEngine } from '@/lib/audio';
import BuildModal from './BuildModal';
import { ArrowUpRight, Gauge, Wrench, Sparkles } from 'lucide-react';

interface BuildsGalleryProps {
  onInquireBuild: (vehicleName: string) => void;
}

export default function BuildsGallery({ onInquireBuild }: BuildsGalleryProps) {
  const [selectedBuild, setSelectedBuild] = useState<BuildProject | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Performance', 'Widebody', 'OEM+', 'Restoration'];

  const filteredBuilds = filterCategory === 'ALL'
    ? BUILDS_DATA
    : BUILDS_DATA.filter((b) => b.category === filterCategory);

  const handleOpenBuild = (build: BuildProject) => {
    soundEngine.playMechanicalClick(650, 0.03);
    setSelectedBuild(build);
  };

  return (
    <section id="builds" className="relative w-full py-28 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C9A66B] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ARCHIVE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              BUILT IN <br />
              <span className="text-[#C9A66B]">THE GARAGE.</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundEngine.playMechanicalClick(540, 0.02);
                  setFilterCategory(cat);
                }}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-sm transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-[#C9A66B] text-black font-bold shadow-md'
                    : 'bg-[#141414] text-[#A7A7A7] hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Large Editorial Project Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBuilds.map((build) => (
            <div
              key={build.id}
              data-cursor="view"
              onClick={() => handleOpenBuild(build)}
              className="group relative bg-[#121212] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-500 hover:border-[#C9A66B]/60 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_16px_36px_rgba(0,0,0,0.8)]"
            >
              {/* Image Container with Smooth Zoom */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black">
                <img
                  src={build.heroImage}
                  alt={build.vehicleName}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />

                {/* Top Corner Project Number */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10 text-xs font-mono font-bold text-[#C9A66B]">
                  PROJECT // {build.projectNumber}
                </div>

                {/* Category Pill */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-widest text-neutral-400 uppercase border border-white/10">
                  {build.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      {build.year} BESPOKE BUILD
                    </span>
                    <span className="text-xs font-mono text-[#C9A66B] font-bold">
                      {build.powerHp} HP
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-[#C9A66B] transition-colors leading-tight">
                    {build.vehicleName}
                  </h3>

                  <p className="text-sm font-serif italic text-neutral-400 mt-1 mb-4">
                    &ldquo;{build.subtitle}&rdquo;
                  </p>

                  <p className="text-xs text-[#A7A7A7] font-light line-clamp-2 leading-relaxed mb-6">
                    {build.summary}
                  </p>
                </div>

                {/* Bottom Meta & Hover CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-[#C9A66B]" />
                      {build.torqueNm} Nm
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-[#C9A66B]" />
                      {build.modificationsCount} Mods
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-xs font-mono text-white group-hover:text-[#C9A66B] font-bold tracking-wider uppercase transition-colors">
                    <span>VIEW BUILD</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Case Study Modal */}
      {selectedBuild && (
        <BuildModal
          project={selectedBuild}
          onClose={() => setSelectedBuild(null)}
          onInquireBuild={onInquireBuild}
        />
      )}
    </section>
  );
}
