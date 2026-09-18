'use client';

import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';
import { ArrowUpRight, Gauge, Wrench, Shield, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

interface ServiceGroup {
  id: string;
  category: string;
  title: string;
  number: string;
  icon: React.ElementType;
  tagline: string;
  items: { name: string; description: string; techSpecs: string }[];
  image: string;
}

const SERVICES_DATA: ServiceGroup[] = [
  {
    id: 'performance',
    category: 'MOTORSPORT ENGINEERING',
    title: 'PERFORMANCE',
    number: '01',
    icon: Gauge,
    tagline: 'Precision Dyno Calibration & Forced Induction Systems',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    items: [
      { name: 'ECU Tuning & Bench Flashing', description: 'Individual dyno calibration, ignition timing, and boost curve optimization.', techSpecs: 'AWD Mainline Dyno • Custom Rom Files' },
      { name: 'Stage 1 / Stage 2+ Tuning', description: 'Matched software with high-flow downpipes, intake, and intercooler packages.', techSpecs: '+40 to +180 Wheel HP gains' },
      { name: 'Valved Exhaust Systems', description: 'Handcrafted titanium and Inconel cat-back exhaust with wireless valve override.', techSpecs: 'Dual/Quad blued titanium tips • 0.9mm wall thickness' },
      { name: 'Intake Systems', description: 'Dry carbon pre-preg cold air intake chambers designed for zero restriction.', techSpecs: 'Dual inverted cone filters • CAD CFD modeled' },
      { name: 'Turbo & Supercharger Upgrades', description: 'Billet compressor wheels, enlarged turbine housings, and custom oil lines.', techSpecs: 'PureTurbos / Garrett GTX Series' },
      { name: 'Motorsport Cooling Upgrades', description: 'Multi-pass aluminum radiators, auxiliary heat exchangers, and transmission coolers.', techSpecs: 'Sub-40°C intake air charge retention' },
    ],
  },
  {
    id: 'modification',
    category: 'AERO & CHASSIS',
    title: 'MODIFICATION',
    number: '02',
    icon: Wrench,
    tagline: 'Hand-Laid Pre-Preg Carbon Fiber & Widebody Conversions',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    items: [
      { name: 'Bespoke Body Kits', description: 'Engineered aerodynamic splitters, aggressive rear diffusers, and side skirts.', techSpecs: 'TUV / FIA track-spec durability' },
      { name: 'Pre-Preg Carbon-Fiber Parts', description: 'Autoclave-cured 2x2 and 1x1 weave carbon body panels for ultimate lightness.', techSpecs: '40% lighter than OEM composite' },
      { name: 'Custom Bumpers & Vents', description: 'Functional cooling ducts directed to oil coolers and brake calipers.', techSpecs: 'OEM mounting points preserved' },
      { name: 'Swan-Neck Track Spoilers', description: 'Underbody vortex generators and multi-angle adjustable downforce wings.', techSpecs: 'Up to 340 kg downforce @ 150 mph' },
      { name: 'Widebody Conversions', description: 'Seamless wheel arch extensions crafted without raw exposed rivets.', techSpecs: '+50mm to +90mm widened track' },
      { name: 'Custom Lighting', description: 'Laser etched projector shrouds, RGB demon eyes, and smoked sequential lenses.', techSpecs: 'DOT compliant optical clarity' },
    ],
  },
  {
    id: 'detailing',
    category: 'SURGICAL FINISHING',
    title: 'DETAILING',
    number: '03',
    icon: Shield,
    tagline: 'Paint Correction, 9H Ceramic Shield & Edge-Wrapped PPF',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
    items: [
      { name: 'Multi-Stage Paint Correction', description: 'Microscopic leveling removing 95-99% of swirl marks, scratches, and orange peel.', techSpecs: 'Ultrasonic depth gauge certified' },
      { name: '9H Ceramic Coating', description: 'Covalently bonded nano-ceramic layer providing intense gloss and water contact angles.', techSpecs: '5 & 8-year warranty options' },
      { name: 'Graphene Matrix Infusion', description: 'Reduced water-spotting and heat dissipation properties over dark paints.', techSpecs: '115° hydrophobic contact angle' },
      { name: 'Edge-Wrapped PPF', description: 'Precision-plotted TPU film wrapped around every panel edge for zero visible seams.', techSpecs: '8-mil self-healing polyurethane' },
      { name: 'Concierge Interior Detailing', description: 'pH-neutral dry steam extraction for Alcantara, Nappa leather deep rejuvenation.', techSpecs: 'Anti-microbial & matte UV barrier' },
      { name: 'Engine Bay Cryo Detailing', description: 'Dry-ice blasting for sensitive engine components with zero water contamination.', techSpecs: 'Industrial dry-ice pelleted CO2' },
    ],
  },
  {
    id: 'restoration',
    category: 'LEGENDARY PRESERVATION',
    title: 'RESTORATION',
    number: '04',
    icon: Sparkles,
    tagline: 'Modernizing Icons with Modern Metallurgy & Clearcoat Science',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    items: [
      { name: 'Vintage Paint Restoration', description: 'Preserving single-stage vintage lacquers while reviving depth and color richness.', techSpecs: 'Hand jeweling technique' },
      { name: 'Interior & Leather Revival', description: 'Crack filling, bespoke color-matched dye matching, and period-correct re-stitching.', techSpecs: 'German Connolly / Nappa hide restoration' },
      { name: 'Wheel Resurfacing & Trueing', description: 'CNC diamond-cut lip finishing, hairline crack repair, and custom powder-coat.', techSpecs: 'Rotational runout <0.02mm' },
      { name: 'Polycarbonate Headlight Restoration', description: 'Wet-sanding, compounding, and 2K UV-blocking clearcoat replacement.', techSpecs: 'Optical clarity guaranteed 3+ years' },
      { name: 'Complete Vehicle Revival', description: 'Full mechanical tear-down, zinc plating of all fasteners, and suspension renewal.', techSpecs: 'Concourse d\'Elegance preparation' },
    ],
  },
];

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('performance');

  const selectedGroup = SERVICES_DATA.find((g) => g.id === activeTab) || SERVICES_DATA[0];

  const handleTabChange = (id: string) => {
    soundEngine.playMechanicalClick(600, 0.03);
    setActiveTab(id);
  };

  return (
    <section id="services" className="relative w-full min-h-screen bg-[#080808] py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C9A66B] uppercase mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>CAPABILITIES & METHODOLOGY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              SURGICAL CRAFT.<br />
              <span className="text-neutral-400">UNCOMPROMISED POWER.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#A7A7A7] font-light leading-relaxed">
            Every service at Apex is executed in temperature-controlled bays by master technicians utilizing aerospace tooling, computerized dynos, and surgical inspection lamps.
          </p>
        </div>

        {/* 4 Primary Service Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {SERVICES_DATA.map((srv) => {
            const isActive = activeTab === srv.id;
            const IconComponent = srv.icon;
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => handleTabChange(srv.id)}
                className={`p-5 text-left border rounded-sm transition-all cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'border-[#C9A66B] bg-[#141414] shadow-[0_4px_20px_rgba(201,166,107,0.15)]'
                    : 'border-white/10 hover:border-white/20 bg-[#0E0E0E]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#C9A66B]">{srv.number}</span>
                  <IconComponent
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-[#C9A66B]' : 'text-neutral-500'
                    }`}
                  />
                </div>
                <h3 className="text-lg font-black text-white tracking-wide uppercase">{srv.title}</h3>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-1 block">
                  {srv.category}
                </span>

                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A66B]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Moment & Hero Specs */}
          <div className="lg:col-span-5 bg-[#121212] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedGroup.image}
                alt={selectedGroup.title}
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest text-[#C9A66B] uppercase border border-white/10">
                DISCIPLINE // {selectedGroup.number}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h4 className="text-2xl font-black text-white tracking-wide uppercase mb-2">
                {selectedGroup.title}
              </h4>
              <p className="text-xs text-[#A7A7A7] font-light leading-relaxed mb-6">
                {selectedGroup.tagline}
              </p>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playMechanicalClick();
                  onSelectService(selectedGroup.title);
                }}
                className="w-full py-3.5 bg-[#C9A66B] hover:bg-[#DFBD82] text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <span>BOOK {selectedGroup.title} WORK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Detailed Breakdown List of Specific Services */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedGroup.items.map((item, idx) => (
              <div
                key={item.name}
                className="group p-5 bg-[#111111] hover:bg-[#161616] border border-white/5 hover:border-white/20 rounded-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-2">
                    <span>SPEC 0{idx + 1}</span>
                    <span className="text-[#C9A66B] opacity-0 group-hover:opacity-100 transition-opacity">
                      CERTIFIED
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-white tracking-wide mb-2 group-hover:text-[#C9A66B] transition-colors">
                    {item.name}
                  </h5>
                  <p className="text-xs text-[#A7A7A7] font-light leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span className="truncate">{item.techSpecs}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
