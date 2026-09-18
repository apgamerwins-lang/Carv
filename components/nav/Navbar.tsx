'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sun, Moon } from 'lucide-react';
import { soundEngine } from '@/lib/audio';
import { STUDIO_CONFIG } from '@/config/studio';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  theme: 'dark' | 'showroom';
  onToggleTheme: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'HOME' },
  { id: 'builds', label: 'BUILDS' },
  { id: 'configurator', label: 'SPEC' },
  { id: 'services', label: 'SERVICES' },
  { id: 'detailing', label: 'DETAILING' },
  { id: 'garage', label: 'GARAGE' },
  { id: 'reviews', label: 'REVIEWS' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar({ activeSection, onNavigate, theme, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() =>
    typeof window !== 'undefined' ? soundEngine.getIsEnabled() : false
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = soundEngine.toggleSound();
    setSoundEnabled(newState);
  };

  const handleItemClick = (id: string) => {
    soundEngine.playMechanicalClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="apex-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/85 backdrop-blur-md border-b border-white/5 py-3.5 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Studio Brand Crest */}
          <button
            type="button"
            onClick={() => handleItemClick('hero')}
            className="group flex items-center gap-3 text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-sm bg-[#161616] border border-white/10 flex items-center justify-center transition-colors group-hover:border-[#C9A66B]">
              <div className="w-2.5 h-2.5 bg-[#C9A66B] rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-[0.25em] text-white uppercase leading-tight group-hover:text-[#C9A66B] transition-colors">
                APEX
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#A7A7A7] uppercase leading-tight">
                WORKS &bull; LA
              </span>
            </div>
          </button>

          {/* Center Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={`text-xs font-mono tracking-[0.2em] transition-all relative py-1 uppercase ${
                    isActive ? 'text-white font-semibold' : 'text-[#A7A7A7] hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C9A66B] shadow-[0_0_8px_rgba(201,166,107,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side: Sound Toggle + Showroom Toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Showroom / Dark mode toggle */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playMechanicalClick();
                onToggleTheme();
              }}
              title={theme === 'dark' ? 'Switch to Showroom Lighting' : 'Switch to Dark Garage'}
              className="p-2 rounded border border-white/10 text-[#A7A7A7] hover:text-white hover:border-[#C9A66B] transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Mute Mechanical Ambience' : 'Enable Mechanical Ambience'}
              className="flex items-center gap-2 text-[10px] font-mono tracking-widest px-3 py-1.5 rounded border border-white/10 text-[#A7A7A7] hover:text-white transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C9A66B]" />
                  <span className="text-[#C9A66B]">SOUND: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>SOUND: OFF</span>
                </>
              )}
            </button>

            {/* CTA Button: BOOK YOUR BUILD */}
            <button
              type="button"
              onClick={() => handleItemClick('booking')}
              className="px-5 py-2.5 rounded-sm bg-[#C9A66B] hover:bg-[#DFBD82] text-[#080808] font-bold text-xs tracking-widest uppercase transition-all shadow-[0_4px_16px_rgba(201,166,107,0.25)] hover:shadow-[0_6px_22px_rgba(201,166,107,0.4)] active:scale-95"
            >
              BOOK YOUR BUILD
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#C9A66B] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Navigation */}
      {mobileMenuOpen && (
        <div
          id="apex-mobile-nav"
          className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-xl flex flex-col justify-between px-8 py-12 lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="text-sm font-black tracking-[0.25em] text-white uppercase">
              {STUDIO_CONFIG.BUSINESS_NAME}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#A7A7A7] hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                className="text-left text-2xl font-bold tracking-[0.2em] text-neutral-300 hover:text-[#C9A66B] transition-colors"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <span className="text-xs font-mono text-[#C9A66B] mr-4">0{idx + 1}</span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-[#A7A7A7]">
              <span>AMBIENT AUDIO</span>
              <button
                type="button"
                onClick={handleSoundToggle}
                className="text-[#C9A66B] font-bold"
              >
                {soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleItemClick('booking')}
              className="w-full py-3.5 bg-[#C9A66B] text-black font-bold text-xs tracking-widest uppercase rounded-sm text-center"
            >
              BOOK YOUR BUILD
            </button>
          </div>
        </div>
      )}
    </>
  );
}
