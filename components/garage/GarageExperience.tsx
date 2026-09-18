'use client';

import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';
import { ArrowRight, Wrench, Shield, Disc, Sparkles, Layers } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  stationNumber: string;
  headline: string;
  description: string;
  equipment: string[];
  specs: string;
  image: string;
}

const WORKSHOP_STATIONS: Station[] = [
  {
    id: 'lift',
    name: 'HYDRAULIC CHASSIS CELL',
    stationNumber: 'BAY 01',
    headline: 'Rotary In-Ground Lift & Corner Balancing',
    description: 'Flush-floor low-clearance scissor lift capable of sub-2 inch ride height supercars without scraping carbon splitters. Features 4-point digital Intercomp scale pads.',
    equipment: ['Rotary 12,000 lb In-Ground Lift', 'Intercomp Wireless Corner Scales', 'Beissbarth 3D Laser Alignment System'],
    specs: '0.01° Alignment Precision • Sub-2" Ground Clearance',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'dyno',
    name: 'AWD DYNO & TUNING VAULT',
    stationNumber: 'BAY 02',
    headline: 'Mainline ProHub All-Wheel-Drive Dyno Cell',
    description: 'Acoustically insulated cell with 120,000 CFM twin high-velocity wind turbine fans. Measures axle torque directly, eliminating tire slippage errors.',
    equipment: ['Mainline AWD Hub Dyno (3000 HP rating)', 'Dual 120,000 CFM Turbine Air Flow', 'Plex Knock Monitor V3 & Dual Wideband Lambda'],
    specs: 'Up to 3,000 HP / 250 MPH Airspeed Sim',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cleanroom',
    name: 'SURGICAL DETAILING & PPF LAB',
    stationNumber: 'BAY 03',
    headline: 'HEPA Positive-Pressure Cleanroom',
    description: 'Airfiltered to 0.3 microns to prevent dust contamination during PPF tucking and ceramic bonding. 5000K daylight-balanced illumination eliminates optical shadows.',
    equipment: ['Triple Stage HEPA Filtration Units', 'Graphtec FC9000 64" Film Plotter', 'Infratech Medium-Wave Infrared Heat Curing Arrays'],
    specs: 'ISO Class 7 Cleanroom • 99.97% Dust Free',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fab',
    name: 'EXHAUST & CARBON FABRICATION',
    stationNumber: 'BAY 04',
    headline: 'Titanium TIG Welding & Composite Fitting',
    description: 'Bespoke exhaust plumbing, mandrel benders, back-purged argon TIG setups, and carbon autoclave trimming benches.',
    equipment: ['Miller Dynasty 280 DX TIG Welder', 'Pure Argon Back-Purging Kit', 'Donaldson Dust Extraction Shroud'],
    specs: 'Grade 1 & 2 Titanium • Autoclave Composite',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function GarageExperience() {
  const [activeStation, setActiveStation] = useState<Station>(WORKSHOP_STATIONS[0]);

  const handleStationClick = (station: Station) => {
    soundEngine.playMechanicalClick(560, 0.03);
    setActiveStation(station);
  };

  return (
    <section id="garage" className="relative w-full py-28 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#C9A66B] uppercase block mb-2">
              FACILITY TOUR
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              INSIDE THE <br />
              <span className="text-[#C9A66B]">APEX WORKSHOP.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#A7A7A7] font-light leading-relaxed">
            A 14,000 sq.ft. private aerospace-grade hangar engineered specifically for supercars, hypercars, and bespoke track conversions.
          </p>
        </div>

        {/* 4 Workshop Cells Selection Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {WORKSHOP_STATIONS.map((st) => {
            const isActive = activeStation.id === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => handleStationClick(st)}
                className={`p-5 text-left border rounded-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#141414] border-[#C9A66B] shadow-[0_4px_20px_rgba(201,166,107,0.15)]'
                    : 'bg-[#0e0e0e] border-white/5 hover:border-white/15'
                }`}
              >
                <span className="text-xs font-mono text-[#C9A66B] block mb-1">{st.stationNumber}</span>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">{st.name}</h4>
              </button>
            );
          })}
        </div>

        {/* Selected Workshop Cell Interactive View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#111111] border border-white/10 rounded-sm overflow-hidden p-6 sm:p-10">
          {/* Station Photo & Equipment Badges */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[320px] rounded-sm overflow-hidden border border-white/5">
            <img
              src={activeStation.image}
              alt={activeStation.name}
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10 text-[10px] font-mono tracking-widest text-[#C9A66B] uppercase">
              FACILITY // {activeStation.stationNumber}
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 border border-white/10 rounded-sm">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                CERTIFIED TOLERANCE:
              </span>
              <span className="text-xs font-mono font-bold text-white">
                {activeStation.specs}
              </span>
            </div>
          </div>

          {/* Station Details */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-4 lg:pt-0">
            <div>
              <span className="text-xs font-mono text-[#C9A66B] tracking-[0.25em] uppercase block mb-1">
                OPERATIONAL CAPABILITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">
                {activeStation.headline}
              </h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {activeStation.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase block">
                  DEPLOYED TOOLING & SENSORS:
                </span>
                {activeStation.equipment.map((eq) => (
                  <div key={eq} className="flex items-center gap-2.5 text-xs text-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B]" />
                    <span className="font-mono">{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8">
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">
                STATUS: TEMPERATURE & HUMIDITY STABILIZED
              </div>
              <a
                href="#booking"
                onClick={() => soundEngine.playMechanicalClick()}
                className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs tracking-[0.2em] uppercase rounded-sm border border-white/15 hover:border-[#C9A66B] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BOOK PRIVATE WORKSHOP CONSULTATION</span>
                <ArrowRight className="w-4 h-4 text-[#C9A66B]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
