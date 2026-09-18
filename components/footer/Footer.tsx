'use client';

import React from 'react';
import { STUDIO_CONFIG } from '@/config/studio';
import { soundEngine } from '@/lib/audio';
import { ArrowUp, Instagram, Youtube, Twitter, Phone, Mail, MapPin, Volume2, VolumeX } from 'lucide-react';

interface FooterProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Footer({ soundEnabled, onToggleSound }: FooterProps) {
  const scrollToTop = () => {
    soundEngine.playMechanicalClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/10 pt-24 pb-12 overflow-hidden text-neutral-400">
      {/* Subtle Carbon Ambient Background */}
      <div className="absolute inset-0 bg-carbon-weave opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Massive Editorial Studio Brand Typography */}
        <div className="mb-20 pb-12 border-b border-white/10">
          <span className="text-xs font-mono tracking-[0.3em] text-[#C9A66B] uppercase block mb-3">
            BESPOKE AUTOMOTIVE ATELIER
          </span>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none select-none">
            APEX AUTOMOTIVE <br />
            <span className="text-[#252525] hover:text-[#C9A66B] transition-colors duration-700">
              STUDIO.
            </span>
          </h2>
        </div>

        {/* 4 Multi-Column Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {/* Column 1: Studio Workshop Address */}
          <div>
            <span className="text-xs font-mono text-white tracking-[0.2em] uppercase block mb-4">
              FACILITY LOCATION
            </span>
            <div className="flex items-start gap-2.5 text-xs text-neutral-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
              <span>{STUDIO_CONFIG.ADDRESS}</span>
            </div>
            <p className="text-[11px] font-mono text-neutral-500 mt-4">
              Private access hangar. Strictly by confirmed consultation appointment only.
            </p>
          </div>

          {/* Column 2: Hours of Operation */}
          <div>
            <span className="text-xs font-mono text-white tracking-[0.2em] uppercase block mb-4">
              WORKSHOP HOURS
            </span>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>MON – FRI:</span>
                <span className="text-white">{STUDIO_CONFIG.HOURS.WEEKDAYS}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>SATURDAY:</span>
                <span className="text-white">{STUDIO_CONFIG.HOURS.SATURDAY}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>SUNDAY:</span>
                <span className="text-[#C9A66B]">{STUDIO_CONFIG.HOURS.SUNDAY}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Direct Inquiries */}
          <div>
            <span className="text-xs font-mono text-white tracking-[0.2em] uppercase block mb-4">
              CONTACT CHANNELS
            </span>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A66B]" />
                <a href={`tel:${STUDIO_CONFIG.PHONE}`} className="hover:text-white transition-colors">
                  {STUDIO_CONFIG.PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9A66B]" />
                <a href={`mailto:${STUDIO_CONFIG.EMAIL}`} className="hover:text-white transition-colors">
                  {STUDIO_CONFIG.EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <a
                href={STUDIO_CONFIG.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 bg-[#121212] hover:bg-[#1c1c1c] text-neutral-300 hover:text-[#C9A66B] rounded-sm border border-white/10 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={STUDIO_CONFIG.YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 bg-[#121212] hover:bg-[#1c1c1c] text-neutral-300 hover:text-[#C9A66B] rounded-sm border border-white/10 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={STUDIO_CONFIG.TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="p-2 bg-[#121212] hover:bg-[#1c1c1c] text-neutral-300 hover:text-[#C9A66B] rounded-sm border border-white/10 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 4: Sound Engine & Navigation Fast Links */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-white tracking-[0.2em] uppercase block mb-4">
                AUDIO CONTROLS
              </span>
              <button
                type="button"
                onClick={onToggleSound}
                className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#121212] hover:bg-[#1c1c1c] border border-white/10 text-xs font-mono text-neutral-300 cursor-pointer transition-colors"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#C9A66B]" />
                    <span>AUDIO: ENGINE ACTIVE</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-neutral-500" />
                    <span>AUDIO: MUTED</span>
                  </>
                )}
              </button>
            </div>

            {/* Back to Top Action */}
            <div className="pt-6">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-[#C9A66B] uppercase tracking-widest cursor-pointer transition-colors"
              >
                <span>RETURN TO TOP</span>
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} APEX AUTOMOTIVE STUDIO LLC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">PRIVACY PROTOCOL</span>
            <span>&bull;</span>
            <span className="hover:text-neutral-400 cursor-pointer">TERMS OF COMMISSION</span>
            <span>&bull;</span>
            <span className="hover:text-neutral-400 cursor-pointer">DYNO SAFETY WAIVER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
