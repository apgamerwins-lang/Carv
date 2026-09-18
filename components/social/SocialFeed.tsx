'use client';

import React from 'react';
import { SOCIAL_GALLERY, STUDIO_CONFIG } from '@/config/studio';
import { soundEngine } from '@/lib/audio';
import { Instagram, ArrowUpRight, Heart } from 'lucide-react';

export default function SocialFeed() {
  return (
    <section id="social" className="relative w-full py-28 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C9A66B] uppercase mb-2">
              <Instagram className="w-3.5 h-3.5" />
              <span>@APEXAUTOMOTIVESTUDIO</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              LIVE FROM <br />
              <span className="text-[#C9A66B]">THE WORKSHOP.</span>
            </h2>
          </div>

          <a
            href={STUDIO_CONFIG.INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playMechanicalClick()}
            className="px-6 py-3 bg-[#141414] hover:bg-[#1a1a1a] text-white border border-white/10 hover:border-[#C9A66B] rounded-sm text-xs font-mono uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Instagram className="w-4 h-4 text-[#C9A66B]" />
            <span>FOLLOW ON INSTAGRAM</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Masonry / Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOCIAL_GALLERY.map((post) => (
            <a
              key={post.id}
              href={STUDIO_CONFIG.INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playMechanicalClick(600, 0.02)}
              className="group relative h-80 rounded-sm overflow-hidden border border-white/10 block bg-black"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Overlay Details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-black/80 text-[10px] font-mono text-[#C9A66B] uppercase tracking-widest border border-white/10">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-white bg-black/80 px-2 py-1 border border-white/10">
                    <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white uppercase tracking-wide">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs font-mono text-[#C9A66B] font-bold">
                    <span>VIEW BUILD</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
