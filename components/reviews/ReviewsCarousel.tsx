'use client';

import React, { useState } from 'react';
import { REVIEWS_DATA } from '@/config/studio';
import { soundEngine } from '@/lib/audio';
import { ChevronLeft, ChevronRight, Star, ShieldCheck } from 'lucide-react';

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    soundEngine.playMechanicalClick(580, 0.03);
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    soundEngine.playMechanicalClick(580, 0.03);
    setCurrentIndex((prev) => (prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1));
  };

  const currentReview = REVIEWS_DATA[currentIndex];

  return (
    <section id="reviews" className="relative w-full py-28 bg-[#090909] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C9A66B] uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OWNER DISPATCHES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              PROVEN ON ROAD <br />
              <span className="text-[#C9A66B]">& THE TRACK.</span>
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="p-3 rounded-sm bg-[#141414] hover:bg-[#1a1a1a] text-white border border-white/10 hover:border-[#C9A66B] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-neutral-500 tracking-widest px-2">
              0{currentIndex + 1} / 0{REVIEWS_DATA.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="p-3 rounded-sm bg-[#141414] hover:bg-[#1a1a1a] text-white border border-white/10 hover:border-[#C9A66B] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Rotating Review Stage */}
        <div className="bg-[#121212] border border-white/10 rounded-sm p-8 sm:p-14 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Vehicle Thumbnail Box (Mandate: Vehicle thumbnails instead of generic profile avatars) */}
            <div className="lg:col-span-4 relative rounded-sm overflow-hidden border border-white/10 h-64 sm:h-72 shadow-2xl">
              <img
                src={currentReview.thumbnail}
                alt={currentReview.vehicle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono tracking-widest text-[#C9A66B] uppercase block">
                  COMMISSIONED VEHICLE
                </span>
                <span className="text-sm font-bold text-white font-mono block">
                  {currentReview.vehicle}
                </span>
              </div>
            </div>

            {/* Testimonial Quote & Metadata */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A66B] text-[#C9A66B]" />
                ))}
                <span className="text-xs font-mono text-neutral-400 ml-2">5.0 / 5.0 VERIFIED CLIENT</span>
              </div>

              {/* Large Editorial Quote */}
              <blockquote className="text-xl sm:text-2xl lg:text-3xl text-white font-serif font-light leading-relaxed mb-8 italic">
                &ldquo;{currentReview.review}&rdquo;
              </blockquote>

              {/* Client & Vehicle Signature Line */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-base font-bold text-white uppercase tracking-wider">
                    — {currentReview.name}
                  </div>
                  <div className="text-xs font-mono text-[#C9A66B] mt-0.5">
                    {currentReview.vehicle} &bull; {currentReview.service}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    VERIFIED OWNER RECORD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
