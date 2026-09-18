'use client';

import React, { useState } from 'react';
import CarCanvas, { CarSpecConfig } from '@/components/3d/CarCanvas';
import { soundEngine } from '@/lib/audio';
import { Check, Sparkles, Sliders, ArrowRight } from 'lucide-react';

interface ConfiguratorSectionProps {
  onBuildMySpec: (configuredSpecSummary: string) => void;
}

const CATEGORIES = [
  { id: 'WHEELS', label: 'WHEELS', subtitle: 'Forged Performance Wheels' },
  { id: 'BODY KIT', label: 'BODY KIT', subtitle: 'Carbon Aerodynamic Package' },
  { id: 'PAINT', label: 'PAINT', subtitle: 'Bespoke Automotive Paint & Wrap' },
  { id: 'LIGHTING', label: 'LIGHTING', subtitle: 'Projector LED & Bi-Xenon' },
  { id: 'EXHAUST', label: 'EXHAUST', subtitle: 'Valved Titanium & Carbon' },
  { id: 'BRAKES', label: 'BRAKES', subtitle: 'Carbon-Silicon Carbide Discs' },
  { id: 'STANCE', label: 'STANCE', subtitle: 'Clubsport & Air Suspension' },
];

export default function ConfiguratorSection({ onBuildMySpec }: ConfiguratorSectionProps) {
  const [activeCategory, setActiveCategory] = useState('WHEELS');

  const [carSpec, setCarSpec] = useState<CarSpecConfig>({
    paintColor: '#0e0e10',
    paintFinish: 'metallic',
    wheelStyle: 'monoblock-5',
    wheelFinish: '#A7A7A7',
    caliperColor: '#C9A66B',
    bodyKit: 'carbon-aero',
    stance: 'clubsport',
    headlightsOn: true,
    exhaustType: 'quad-carbon',
  });

  const handleCategorySelect = (cat: string) => {
    soundEngine.playMechanicalClick(520, 0.03);
    setActiveCategory(cat);
  };

  const handleSpecUpdate = (partial: Partial<CarSpecConfig>) => {
    soundEngine.playMechanicalClick(680, 0.03);
    if (partial.stance) soundEngine.playAirSuspensionHiss();
    setCarSpec((prev) => ({ ...prev, ...partial }));
  };

  // Build spec summary string to send to booking
  const handleBuildSpecCTA = () => {
    soundEngine.playMechanicalClick();
    const summary = `Spec: Paint ${carSpec.paintColor} (${carSpec.paintFinish}), Wheels ${carSpec.wheelStyle} (${carSpec.wheelFinish}), Aero ${carSpec.bodyKit}, Stance ${carSpec.stance}, Calipers ${carSpec.caliperColor}, Exhaust ${carSpec.exhaustType}`;
    onBuildMySpec(summary);
  };

  return (
    <section id="configurator" className="relative w-full min-h-screen bg-[#0A0A0A] py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C9A66B] uppercase mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>DIGITAL SPECIFICATION SUITE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              YOUR CAR.<br />
              <span className="text-[#C9A66B]">YOUR SPEC.</span>
            </h2>
          </div>

          <div className="max-w-md text-sm text-[#A7A7A7] font-light leading-relaxed">
            Configure motorsport aerodynamic components, forged wheel fitments, surgical paint finishes, and chassis geometry in real-time 3D.
          </div>
        </div>

        {/* Category Tab Bar (Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-5 py-2.5 rounded-sm text-xs font-mono tracking-[0.18em] uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A66B] text-black font-bold shadow-[0_2px_12px_rgba(201,166,107,0.3)]'
                    : 'bg-[#141414] text-[#A7A7A7] hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Interactive 3D Configurator Stage + Details Drawer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main 3D Car Canvas Viewport */}
          <div className="lg:col-span-8 bg-[#080808] border border-white/10 rounded-sm relative min-h-[440px] md:min-h-[560px] overflow-hidden">
            <CarCanvas
              mode="configurator"
              spec={carSpec}
              activeCategory={activeCategory}
              interactive={true}
            />

            {/* Live Camera View Indicator */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] font-mono tracking-widest text-[#A7A7A7] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B]" />
              <span>ACTIVE ZONE: {activeCategory}</span>
            </div>
          </div>

          {/* Configuration Options & Information Panel */}
          <div className="lg:col-span-4 bg-[#121212] border border-white/10 p-6 sm:p-8 flex flex-col justify-between rounded-sm">
            <div>
              {/* Category Header */}
              <div className="mb-6 pb-4 border-b border-white/10">
                <span className="text-[10px] font-mono tracking-widest text-[#C9A66B] uppercase block mb-1">
                  MODULE 0{CATEGORIES.findIndex((c) => c.id === activeCategory) + 1}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-wide uppercase">
                  {activeCategory}
                </h3>
                <p className="text-xs text-[#A7A7A7] mt-1">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.subtitle}
                </p>
              </div>

              {/* Dynamic Controls based on Category */}
              {activeCategory === 'WHEELS' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] tracking-wider uppercase block mb-3">
                      WHEEL DESIGN
                    </label>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        { id: 'monoblock-5', name: 'Monoblock 5-Spoke Forged', detail: 'Aircraft-grade 6061-T6 aluminum (-4.2 kg/corner)' },
                        { id: 'gt3-multispoke', name: 'GT3 Competition Multi-Spoke', detail: 'High rigidity track design with scalloped spokes' },
                        { id: 'forged-aerodisc', name: 'Carbon Aerodisc Spec', detail: 'Reduced aerodynamic turbulence and brake ducting' },
                      ].map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => handleSpecUpdate({ wheelStyle: style.id as any })}
                          className={`p-3 text-left border rounded-sm transition-all cursor-pointer ${
                            carSpec.wheelStyle === style.id
                              ? 'border-[#C9A66B] bg-[#1a1814]'
                              : 'border-white/10 hover:border-white/20 bg-neutral-900/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{style.name}</span>
                            {carSpec.wheelStyle === style.id && <Check className="w-3.5 h-3.5 text-[#C9A66B]" />}
                          </div>
                          <p className="text-[10px] text-[#A7A7A7] mt-1">{style.detail}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] tracking-wider uppercase block mb-3">
                      FINISH COLOR
                    </label>
                    <div className="flex gap-3">
                      {[
                        { color: '#A7A7A7', name: 'Titanium' },
                        { color: '#C9A66B', name: 'Satin Gold' },
                        { color: '#161616', name: 'Satin Black' },
                        { color: '#4A5568', name: 'Gunmetal' },
                      ].map((item) => (
                        <button
                          key={item.color}
                          type="button"
                          onClick={() => handleSpecUpdate({ wheelFinish: item.color })}
                          title={item.name}
                          className={`w-9 h-9 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                            carSpec.wheelFinish === item.color ? 'border-[#C9A66B] scale-110' : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: item.color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeCategory === 'BODY KIT' && (
                <div className="space-y-4">
                  <label className="text-xs font-mono text-[#A7A7A7] tracking-wider uppercase block">
                    AERODYNAMIC PROGRAM
                  </label>
                  {[
                    { id: 'carbon-aero', name: 'Carbon Aero Package', desc: 'Front splitter, side skirts, rear diffuser, GT swan-neck wing' },
                    { id: 'widebody-gt', name: 'Apex Widebody Conversion', desc: '+65mm front / +80mm rear flared composite fenders' },
                    { id: 'oem', name: 'OEM+ Subtle Carbon Trim', desc: 'Mirror caps, subtle boot lip, front air duct canards' },
                  ].map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => handleSpecUpdate({ bodyKit: pkg.id as any })}
                      className={`w-full p-3.5 text-left border rounded-sm transition-all cursor-pointer ${
                        carSpec.bodyKit === pkg.id
                          ? 'border-[#C9A66B] bg-[#1a1814]'
                          : 'border-white/10 hover:border-white/20 bg-neutral-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{pkg.name}</span>
                        {carSpec.bodyKit === pkg.id && <Check className="w-3.5 h-3.5 text-[#C9A66B]" />}
                      </div>
                      <p className="text-[10px] text-[#A7A7A7] mt-1">{pkg.desc}</p>
                    </button>
                  ))}
                </div>
              )}

              {activeCategory === 'PAINT' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] tracking-wider uppercase block mb-3">
                      AUTOMOTIVE COLOR PALETTE
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { color: '#080808', name: 'Obsidian Black' },
                        { color: '#1B2430', name: 'Midnight Navy' },
                        { color: '#4A5057', name: 'Nardo Titanium' },
                        { color: '#801818', name: 'Rosso Corsa' },
                        { color: '#C9A66B', name: 'Liquid Champagne' },
                        { color: '#1E3A2F', name: 'British Racing Green' },
                        { color: '#E8E8E8', name: 'Chalk White' },
                        { color: '#59253A', name: 'Black Cherry' },
                      ].map((paint) => (
                        <button
                          key={paint.color}
                          type="button"
                          onClick={() => handleSpecUpdate({ paintColor: paint.color })}
                          className={`flex flex-col items-center gap-1.5 p-2 rounded border transition-all cursor-pointer ${
                            carSpec.paintColor === paint.color ? 'border-[#C9A66B] bg-neutral-800' : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: paint.color }} />
                          <span className="text-[9px] font-mono text-[#A7A7A7] text-center leading-tight truncate w-full">
                            {paint.name.split(' ')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] tracking-wider uppercase block mb-3">
                      CLEARCOAT FINISH
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['metallic', 'gloss', 'satin'] as const).map((finish) => (
                        <button
                          key={finish}
                          type="button"
                          onClick={() => handleSpecUpdate({ paintFinish: finish })}
                          className={`py-2 text-center text-xs font-mono uppercase border rounded-sm transition-all cursor-pointer ${
                            carSpec.paintFinish === finish
                              ? 'border-[#C9A66B] bg-[#C9A66B]/15 text-[#C9A66B] font-bold'
                              : 'border-white/10 text-[#A7A7A7] hover:text-white'
                          }`}
                        >
                          {finish}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeCategory === 'LIGHTING' && (
                <div className="space-y-4">
                  <label className="text-xs font-mono text-[#A7A7A7] tracking-wider uppercase block">
                    OPTICS & BEAM CONTROL
                  </label>
                  <div className="flex items-center justify-between p-4 border border-white/10 rounded-sm bg-neutral-900/40">
                    <div>
                      <span className="text-xs font-bold text-white block">LED Matrix Projectors</span>
                      <span className="text-[10px] text-[#A7A7A7]">6,500K Laser illumination with adaptive beam pattern</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSpecUpdate({ headlightsOn: !carSpec.headlightsOn })}
                      className={`px-4 py-2 text-xs font-mono rounded-sm transition-all cursor-pointer ${
                        carSpec.headlightsOn
                          ? 'bg-[#C9A66B] text-black font-bold'
                          : 'bg-neutral-800 text-[#A7A7A7]'
                      }`}
                    >
                      {carSpec.headlightsOn ? 'ACTIVE' : 'OFF'}
                    </button>
                  </div>
                </div>
              )}

              {activeCategory === 'EXHAUST' && (
                <div className="space-y-3">
                  <label className="text-xs font-mono text-[#A7A7A7] tracking-wider uppercase block">
                    VALVED PERFORMANCE EXHAUST
                  </label>
                  {[
                    { id: 'quad-carbon', name: 'Quad Matte Carbon Tips', note: 'Inconel valved cat-back (+18 HP, -14 kg)' },
                    { id: 'dual-titanium', name: 'Dual Burnt Titanium Outlets', note: 'Full straight-pipe motorsport spec with blued tips' },
                    { id: 'oval-race', name: 'Twin RS Oval Billet Tips', note: 'Ceramic heat-coated stealth blackout finish' },
                  ].map((ex) => (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => handleSpecUpdate({ exhaustType: ex.id as any })}
                      className={`w-full p-3.5 text-left border rounded-sm transition-all cursor-pointer ${
                        carSpec.exhaustType === ex.id
                          ? 'border-[#C9A66B] bg-[#1a1814]'
                          : 'border-white/10 hover:border-white/20 bg-neutral-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{ex.name}</span>
                        {carSpec.exhaustType === ex.id && <Check className="w-3.5 h-3.5 text-[#C9A66B]" />}
                      </div>
                      <p className="text-[10px] text-[#A7A7A7] mt-1">{ex.note}</p>
                    </button>
                  ))}
                </div>
              )}

              {activeCategory === 'BRAKES' && (
                <div className="space-y-4">
                  <label className="text-xs font-mono text-[#A7A7A7] tracking-wider uppercase block">
                    CALIPER HIGH-TEMP LACQUER
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { color: '#C9A66B', name: 'Champagne Gold' },
                      { color: '#C53030', name: 'Racing Rosso' },
                      { color: '#84CC16', name: 'Acid Lime' },
                      { color: '#1A1A1A', name: 'Stealth Black' },
                    ].map((cal) => (
                      <button
                        key={cal.color}
                        type="button"
                        onClick={() => handleSpecUpdate({ caliperColor: cal.color })}
                        className={`p-3 border rounded-sm flex items-center gap-2.5 transition-all cursor-pointer ${
                          carSpec.caliperColor === cal.color ? 'border-[#C9A66B] bg-neutral-800' : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: cal.color }} />
                        <span className="text-xs text-white font-medium">{cal.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="p-3 bg-neutral-900/60 border border-white/5 rounded-sm text-[10px] text-[#A7A7A7] leading-relaxed">
                    Fitted with Surface Transforms 400x38mm Carbon-Silicon Carbide drilled rotors and Pagid RSC1 track pads.
                  </div>
                </div>
              )}

              {activeCategory === 'STANCE' && (
                <div className="space-y-3">
                  <label className="text-xs font-mono text-[#A7A7A7] tracking-wider uppercase block">
                    CHASSIS & SUSPENSION GEOMETRY
                  </label>
                  {[
                    { id: 'clubsport', name: 'Clubsport Fast-Road (-25mm)', detail: 'KW 3-Way adjustable damping, corner balanced' },
                    { id: 'slammed-air', name: 'Air Lift Performance 3H (-60mm)', detail: 'Digital height-managed air struts with presets' },
                    { id: 'stock', name: 'Factory Performance Ride', detail: 'Original factory geometry for maximum compliance' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => handleSpecUpdate({ stance: st.id as any })}
                      className={`w-full p-3.5 text-left border rounded-sm transition-all cursor-pointer ${
                        carSpec.stance === st.id
                          ? 'border-[#C9A66B] bg-[#1a1814]'
                          : 'border-white/10 hover:border-white/20 bg-neutral-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{st.name}</span>
                        {carSpec.stance === st.id && <Check className="w-3.5 h-3.5 text-[#C9A66B]" />}
                      </div>
                      <p className="text-[10px] text-[#A7A7A7] mt-1">{st.detail}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Final CTA: BUILD MY SPEC */}
            <div className="pt-6 border-t border-white/10 mt-6">
              <button
                type="button"
                onClick={handleBuildSpecCTA}
                className="w-full py-4 bg-[#C9A66B] hover:bg-[#DFBD82] text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm transition-all shadow-[0_4px_20px_rgba(201,166,107,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>BUILD MY SPEC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono text-center block text-neutral-500 mt-2 uppercase tracking-widest">
                LOCKS YOUR CHOSEN SPEC & OPENS CONSULTATION
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
