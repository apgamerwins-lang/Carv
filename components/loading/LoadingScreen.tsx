'use client';

import React, { useEffect, useState, useRef } from 'react';
import { soundEngine } from '@/lib/audio';
import { STUDIO_CONFIG } from '@/config/studio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'black' | 'particles' | 'logo' | 'ignited' | 'fadeOut'>('black');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Skip immediately
  const handleSkip = () => {
    soundEngine.playMechanicalClick(650, 0.03);
    setPhase('fadeOut');
    setTimeout(onComplete, 400);
  };

  useEffect(() => {
    // Stage 1: black screen for 250ms
    const timer1 = setTimeout(() => {
      setPhase('particles');
      soundEngine.playIgnitionStart();
    }, 200);

    // Stage 2: Particles form logo
    const timer2 = setTimeout(() => {
      setPhase('logo');
    }, 850);

    // Progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + increment);
      });
    }, 60);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, []);

  // When 100% reached
  useEffect(() => {
    if (progress === 100) {
      const timer1 = setTimeout(() => {
        setPhase('ignited');
      }, 50);

      const timer2 = setTimeout(() => {
        setPhase('fadeOut');
        setTimeout(onComplete, 600);
      }, 450);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [progress, onComplete]);

  // Particle canvas animation during formation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; targetX: number; targetY: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const count = 75;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 90 + (i % 3) * 20;
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 600,
        y: height / 2 + (Math.random() - 0.5) * 600,
        targetX: width / 2 + Math.cos(angle) * radius,
        targetY: height / 2 + Math.sin(angle) * (radius * 0.45),
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Accelerate towards target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx += dx * 0.04;
        p.vy += dy * 0.04;
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = `rgba(201, 166, 107, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      id="apex-cinematic-loader"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] transition-opacity duration-700 ease-in-out ${
        phase === 'fadeOut' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />

      {/* Centerpiece Studio Insignia */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        {/* Sleek Geometric Apex Badge */}
        <div
          className={`w-20 h-20 mb-8 relative flex items-center justify-center transition-all duration-700 ${
            phase === 'black'
              ? 'opacity-0 scale-75'
              : phase === 'particles'
              ? 'opacity-40 scale-90'
              : 'opacity-100 scale-100'
          }`}
        >
          {/* Outer Titanium Hexagon / Ring */}
          <div className="absolute inset-0 border border-white/20 rotate-45 transform transition-transform duration-1000" />
          <div className="absolute inset-1 border border-[#C9A66B]/50 rotate-12" />

          {/* Core Apex Symbol */}
          <svg
            className="w-10 h-10 text-[#C9A66B] drop-shadow-[0_0_12px_rgba(201,166,107,0.6)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path d="M12 2L2 22h20L12 2z" />
            <path d="M12 7l-5 11h10L12 7z" fill="currentColor" fillOpacity="0.2" />
          </svg>
        </div>

        {/* Studio Name */}
        <h1
          className={`text-2xl md:text-3xl font-black tracking-[0.35em] text-white uppercase transition-all duration-700 ${
            phase === 'black' ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          {STUDIO_CONFIG.BUSINESS_NAME}
        </h1>

        {/* Required Tagline: "CRAFTED FOR MACHINES." */}
        <p
          className={`text-xs md:text-sm font-mono tracking-[0.45em] text-[#C9A66B] uppercase mt-3 transition-all duration-700 delay-150 ${
            phase === 'black' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {STUDIO_CONFIG.TAGLINE}
        </p>

        {/* Thin Horizontal Progress Indicator */}
        <div className="w-64 h-[2px] bg-neutral-900 overflow-hidden relative mt-10 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-neutral-500 via-[#C9A66B] to-white transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numerical Telemetry */}
        <div className="flex justify-between w-64 text-[10px] font-mono tracking-widest text-[#A7A7A7] mt-2">
          <span>INITIALIZING V8</span>
          <span className="text-white font-bold">{progress}%</span>
        </div>
      </div>

      {/* Skip Intro Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-8 text-xs font-mono tracking-widest uppercase text-[#A7A7A7] hover:text-white transition-colors px-4 py-2 border border-white/10 rounded-full hover:border-[#C9A66B] bg-black/40 backdrop-blur-sm"
      >
        SKIP INTRO [ESC]
      </button>
    </div>
  );
}
