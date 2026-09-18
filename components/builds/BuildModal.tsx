'use client';

import React, { useEffect, useState } from 'react';
import { BuildProject } from '@/config/studio';
import { soundEngine } from '@/lib/audio';
import { X, CheckCircle, ArrowRight, Gauge, Clock, Wrench, Shield } from 'lucide-react';

interface BuildModalProps {
  project: BuildProject | null;
  onClose: () => void;
  onInquireBuild: (vehicleName: string) => void;
}

export default function BuildModal({ project, onClose, onInquireBuild }: BuildModalProps) {
  const [animatedHp, setAnimatedHp] = useState(0);
  const [animatedTorque, setAnimatedTorque] = useState(0);
  const [animatedDays, setAnimatedDays] = useState(0);
  const [animatedMods, setAnimatedMods] = useState(0);

  useEffect(() => {
    if (!project) return;

    // Number counting animation
    const duration = 1200; // ms
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(1, step / steps);
      // Ease-out expo
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedHp(Math.round(project.powerHp * ease));
      setAnimatedTorque(Math.round(project.torqueNm * ease));
      setAnimatedDays(Math.round(project.buildTimeDays * ease));
      setAnimatedMods(Math.round(project.modificationsCount * ease));

      if (step >= steps) clearInterval(timer);
    }, stepTime);

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="apex-build-modal"
      className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-2xl overflow-y-auto flex flex-col justify-between"
    >
      {/* Top Sticky Bar with Close Button */}
      <div className="sticky top-0 z-50 bg-[#080808]/85 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#C9A66B] uppercase tracking-widest font-bold">
            CASE STUDY // {project.projectNumber}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider hidden sm:inline">
            {project.vehicleName}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            soundEngine.playMechanicalClick();
            onClose();
          }}
          className="p-2 text-[#A7A7A7] hover:text-white border border-white/10 hover:border-[#C9A66B] rounded-sm transition-colors cursor-pointer flex items-center gap-2 text-xs font-mono uppercase"
        >
          <span>CLOSE [ESC]</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
        {/* Hero Visual Moment */}
        <div className="relative w-full h-[400px] sm:h-[550px] rounded-sm overflow-hidden border border-white/10 mb-12 shadow-2xl">
          <img
            src={project.heroImage}
            alt={project.vehicleName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />

          {/* Hero Overlay Headline */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#C9A66B] tracking-[0.3em] uppercase block mb-2">
                PROJECT {project.projectNumber} &bull; {project.year}
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
                {project.vehicleName}
              </h2>
              <p className="text-lg text-neutral-300 font-serif italic mt-1">
                &ldquo;{project.subtitle}&rdquo;
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEngine.playMechanicalClick();
                onClose();
                onInquireBuild(project.vehicleName);
              }}
              className="px-8 py-4 bg-[#C9A66B] hover:bg-[#DFBD82] text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>COMMISSION SIMILAR BUILD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Animated Statistics Counter Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-6 bg-[#121212] border border-white/10 rounded-sm">
            <div className="flex items-center gap-2 text-neutral-500 mb-2">
              <Gauge className="w-4 h-4 text-[#C9A66B]" />
              <span className="text-[10px] font-mono tracking-widest uppercase">POWER OUTPUT</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-white">
              {animatedHp} <span className="text-lg text-[#C9A66B] font-bold">HP</span>
            </div>
            <span className="text-[10px] text-neutral-400 mt-1 block">Calibrated on AWD Dyno</span>
          </div>

          <div className="p-6 bg-[#121212] border border-white/10 rounded-sm">
            <div className="flex items-center gap-2 text-neutral-500 mb-2">
              <Gauge className="w-4 h-4 text-[#C9A66B]" />
              <span className="text-[10px] font-mono tracking-widest uppercase">WHEEL TORQUE</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-white">
              {animatedTorque} <span className="text-lg text-[#C9A66B] font-bold">Nm</span>
            </div>
            <span className="text-[10px] text-neutral-400 mt-1 block">Peak flat-plate curve</span>
          </div>

          <div className="p-6 bg-[#121212] border border-white/10 rounded-sm">
            <div className="flex items-center gap-2 text-neutral-500 mb-2">
              <Clock className="w-4 h-4 text-[#C9A66B]" />
              <span className="text-[10px] font-mono tracking-widest uppercase">BUILD TIMELINE</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-white">
              {animatedDays} <span className="text-lg text-[#C9A66B] font-bold">DAYS</span>
            </div>
            <span className="text-[10px] text-neutral-400 mt-1 block">Dedicated master technician</span>
          </div>

          <div className="p-6 bg-[#121212] border border-white/10 rounded-sm">
            <div className="flex items-center gap-2 text-neutral-500 mb-2">
              <Wrench className="w-4 h-4 text-[#C9A66B]" />
              <span className="text-[10px] font-mono tracking-widest uppercase">MODIFICATIONS</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-white">
              {animatedMods}+ <span className="text-lg text-[#C9A66B] font-bold">PARTS</span>
            </div>
            <span className="text-[10px] text-neutral-400 mt-1 block">Motorsport certified items</span>
          </div>
        </div>

        {/* Narrative Columns: Original Condition & Engineering Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-mono text-[#C9A66B] tracking-[0.2em] uppercase block mb-2">
                EXECUTIVE SUMMARY
              </span>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="p-6 bg-[#121212] border border-white/5 rounded-sm">
              <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase block mb-2">
                ORIGINAL INTAKE CONDITION
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {project.originalCondition}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-[#C9A66B] tracking-[0.2em] uppercase block mb-3">
                SURGICAL WORK COMPLETED
              </span>
              <div className="space-y-2.5">
                {project.workCompleted.map((w) => (
                  <div key={w} className="flex items-start gap-3 text-xs text-neutral-300">
                    <CheckCircle className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-mono text-[#C9A66B] tracking-[0.2em] uppercase block mb-3">
                PARTS & COMPONENTS INSTALLED
              </span>
              <div className="p-6 bg-[#141414] border border-white/10 rounded-sm space-y-3">
                {project.partsInstalled.map((part) => (
                  <div key={part} className="flex items-center gap-3 text-xs text-white pb-3 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B]" />
                    <span className="font-mono">{part}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Telemetry Block */}
            <div className="p-6 bg-[#121212] border border-white/5 rounded-sm">
              <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase block mb-4">
                TELEMETRY BENCH SPECS
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block">ENGINE:</span>
                  <span className="text-white font-bold">{project.performanceSpecs.engine}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">TRANSMISSION:</span>
                  <span className="text-white font-bold">{project.performanceSpecs.transmission}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">0-60 MPH (0-100 KM/H):</span>
                  <span className="text-[#C9A66B] font-bold text-sm">{project.performanceSpecs.zeroToSixty}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">TOP SPEED:</span>
                  <span className="text-[#C9A66B] font-bold text-sm">{project.performanceSpecs.topSpeed}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase block mb-1">
                PAINT FINISH & ARMOR SPEC
              </span>
              <div className="inline-block px-4 py-2 bg-neutral-900 border border-[#C9A66B]/40 text-xs font-mono text-white rounded-sm">
                {project.paintFinish}
              </div>
            </div>
          </div>
        </div>

        {/* Before / After Dual Gallery for this Build */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-[#C9A66B] tracking-[0.2em] uppercase">
              VISUAL TRANSFORMATION ARCHIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-sm overflow-hidden border border-white/10 relative group">
              <img
                src={project.beforeImage}
                alt="Before modification"
                className="w-full h-72 object-cover filter grayscale contrast-125 group-hover:filter-none transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 text-[10px] font-mono text-neutral-400 uppercase tracking-widest border border-white/10">
                INTAKE STATE
              </div>
            </div>

            <div className="rounded-sm overflow-hidden border border-[#C9A66B]/40 relative group">
              <img
                src={project.afterImage}
                alt="After completion"
                className="w-full h-72 object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#C9A66B] px-3 py-1 text-[10px] font-mono text-black font-bold uppercase tracking-widest">
                FINAL DELIVERY STATE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
