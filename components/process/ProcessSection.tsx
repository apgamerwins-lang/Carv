'use client';

import React, { useState } from 'react';
import { PROCESS_STEPS } from '@/config/studio';
import { soundEngine } from '@/lib/audio';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const handleStepClick = (index: number) => {
    soundEngine.playMechanicalClick(620, 0.03);
    setActiveStepIndex(index);
  };

  const currentStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="relative w-full py-28 bg-[#090909] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#C9A66B] uppercase block mb-2">
              METHODOLOGY & TIMELINE
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              FROM IDEA <br />
              <span className="text-[#C9A66B]">TO MACHINE.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#A7A7A7] font-light leading-relaxed">
            Our 6-phase engineering lifecycle ensures complete mechanical transparency, dyno-proven output, and flawless optical clearcoat delivery.
          </p>
        </div>

        {/* Horizontal Cinematic Progress Bar & Stage Nodes */}
        <div className="relative mb-14">
          {/* Background Connecting Rail */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-neutral-800 hidden md:block" />

          {/* Active Illuminated Rail */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px] bg-[#C9A66B] transition-all duration-500 hidden md:block shadow-[0_0_12px_rgba(201,166,107,0.8)]"
            style={{ width: `${(activeStepIndex / (PROCESS_STEPS.length - 1)) * 100}%` }}
          />

          {/* 6 Stage Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isPast = idx < activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => handleStepClick(idx)}
                  className={`p-4 rounded-sm text-left transition-all cursor-pointer border ${
                    isCurrent
                      ? 'bg-[#141414] border-[#C9A66B] shadow-[0_4px_20px_rgba(201,166,107,0.2)]'
                      : isPast
                      ? 'bg-[#101010] border-white/20 hover:border-white/40'
                      : 'bg-[#0c0c0c] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isCurrent ? 'text-[#C9A66B]' : isPast ? 'text-white' : 'text-neutral-600'
                      }`}
                    >
                      {step.step}
                    </span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A66B]" />}
                  </div>
                  <h4
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isCurrent ? 'text-white' : 'text-neutral-400'
                    }`}
                  >
                    {step.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Showcase Board */}
        <div className="bg-[#121212] border border-white/10 rounded-sm p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle background stage indicator number watermark */}
          <div className="absolute right-4 bottom-0 text-[140px] font-black font-mono text-white/[0.02] pointer-events-none select-none leading-none">
            {currentStep.step}
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono text-[#C9A66B] tracking-[0.25em] uppercase block mb-1">
              PHASE // {currentStep.step} OF 06
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
              {currentStep.title}: {currentStep.subtitle}
            </h3>

            <p className="text-base text-neutral-300 font-light leading-relaxed my-6">
              {currentStep.description}
            </p>

            {/* Deliverable Box */}
            <div className="p-4 bg-black/60 border border-[#C9A66B]/30 rounded-sm flex items-center gap-3">
              <span className="text-[10px] font-mono text-[#C9A66B] uppercase tracking-widest shrink-0">
                PHASE DELIVERABLE:
              </span>
              <span className="text-xs font-mono text-white font-medium">
                {currentStep.deliverable}
              </span>
            </div>

            {/* Next / Previous Controls */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={() => handleStepClick(activeStepIndex - 1)}
                className="px-5 py-2 text-xs font-mono uppercase border border-white/10 text-[#A7A7A7] hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded-sm"
              >
                PREVIOUS PHASE
              </button>

              <button
                type="button"
                disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                onClick={() => handleStepClick(activeStepIndex + 1)}
                className="px-6 py-2 text-xs font-mono uppercase bg-[#C9A66B] hover:bg-[#DFBD82] text-black font-bold disabled:opacity-30 disabled:pointer-events-none rounded-sm flex items-center gap-2"
              >
                <span>NEXT PHASE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
