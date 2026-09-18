'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TRUST_STATS } from '@/config/studio';

export default function TrustSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    'stat-1': 0,
    'stat-2': 0,
    'stat-3': 0,
    'stat-4': 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1600; // ms
          const steps = 40;
          const stepTime = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = Math.min(1, step / steps);
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              'stat-1': Math.round(500 * ease),
              'stat-2': Math.round(1200 * ease),
              'stat-3': Math.round(8 * ease),
              'stat-4': Math.round(98 * ease),
            });

            if (step >= steps) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="relative w-full py-24 bg-[#0B0B0B] border-t border-white/5 overflow-hidden"
    >
      {/* Subtle Metallic Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-carbon-weave pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_STATS.map((item) => (
            <div
              key={item.id}
              className="p-6 border-l border-white/10 hover:border-[#C9A66B] transition-colors flex flex-col justify-between"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight leading-none mb-3">
                {counts[item.id] !== undefined ? counts[item.id] : item.value}
                <span className="text-[#C9A66B]">{item.suffix}</span>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-neutral-300 uppercase tracking-[0.2em] mb-1">
                  {item.label}
                </h4>
                <p className="text-[11px] font-mono text-neutral-500">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
