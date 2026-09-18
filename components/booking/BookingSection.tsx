'use client';

import React, { useState, useEffect } from 'react';
import { STUDIO_CONFIG } from '@/config/studio';
import { soundEngine } from '@/lib/audio';
import { MessageSquare, Send, CheckCircle2, AlertCircle, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

interface BookingSectionProps {
  prefilledService?: string;
  prefilledSpec?: string;
}

const SERVICES = [
  'Performance',
  'Modification',
  'Detailing',
  'PPF',
  'Ceramic Coating',
  'Restoration',
  'Full Build',
];

const BUDGET_RANGES = [
  '$5,000 – $15,000 (Entry Stage)',
  '$15,000 – $35,000 (Comprehensive Track / Detail)',
  '$35,000 – $75,000 (Bespoke Widebody / Engine Build)',
  '$75,000+ (Full Turnkey Supercar Program)',
];

export default function BookingSection({ prefilledService, prefilledSpec }: BookingSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    year: '2023',
    service: 'Full Build',
    budgetRange: '$15,000 – $35,000 (Comprehensive Track / Detail)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Apply prefilled service or spec
  useEffect(() => {
    if (prefilledService) {
      const match = SERVICES.find((s) => s.toLowerCase() === prefilledService.toLowerCase()) || 'Full Build';
      const timer = setTimeout(() => {
        setFormData((prev) => ({ ...prev, service: match }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledSpec) {
      const timer = setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          message: prev.message ? `${prev.message}\n\n[Configured Spec]: ${prefilledSpec}` : `[Configured Spec]: ${prefilledSpec}`,
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [prefilledSpec]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playMechanicalClick();
    setErrorMsg('');

    if (!formData.name || !formData.phone || !formData.email || !formData.vehicle) {
      setErrorMsg('Please complete all vehicle and contact fields before requesting.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          specSummary: prefilledSpec || '',
        }),
      });

      const json = await res.json();
      if (res.ok) {
        soundEngine.playMechanicalClick(840, 0.05);
        setInquiryId(json.inquiryId || 'APX-78219');
        setSubmitted(true);
      } else {
        setErrorMsg(json.error || 'Failed to dispatch inquiry. Please try again or message via WhatsApp.');
      }
    } catch {
      setErrorMsg('Network error communicating with the garage server.');
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp formatted URL
  const whatsappUrl = `https://wa.me/${STUDIO_CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hi Apex Studio, I'd like to discuss a project for my ${formData.vehicle || 'vehicle'} (${formData.service}). ${prefilledSpec ? `Configured Spec: ${prefilledSpec}` : ''}`
  )}`;

  return (
    <section id="contact" className="relative w-full py-28 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Philosophy & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C9A66B] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRIVATE COMMISSIONS</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-tight">
                READY TO <br />
                <span className="text-[#C9A66B]">BUILD?</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#A7A7A7] font-light leading-relaxed">
              We take on a limited roster of 6 full-build commissions per quarter to maintain uncompromising mechanical standards. Submit your specification below to reserve an engineering slot.
            </p>

            {/* Direct Studio Metadata */}
            <div className="p-6 bg-[#111111] border border-white/10 rounded-sm space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-neutral-400 block font-mono uppercase">HANGAR FACILITY</span>
                  <span className="text-white font-medium">{STUDIO_CONFIG.ADDRESS}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-neutral-400 block font-mono uppercase">DIRECT WORKSHOP LINE</span>
                  <a href={`tel:${STUDIO_CONFIG.PHONE}`} className="text-white hover:text-[#C9A66B] transition-colors">
                    {STUDIO_CONFIG.PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-neutral-400 block font-mono uppercase">CONCIERGE DESK</span>
                  <a href={`mailto:${STUDIO_CONFIG.EMAIL}`} className="text-white hover:text-[#C9A66B] transition-colors">
                    {STUDIO_CONFIG.EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playMechanicalClick()}
                className="w-full py-4 bg-[#1e2e1e] hover:bg-[#253d25] border border-emerald-600/40 text-emerald-400 font-bold text-xs tracking-[0.2em] uppercase rounded-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT ON WHATSAPP</span>
              </a>
              <span className="text-[10px] font-mono text-center block text-neutral-500 mt-2 uppercase tracking-widest">
                DIRECT TO LEAD TUNER &bull; IMMEDIATE RESPONSE
              </span>
            </div>
          </div>

          {/* Right Column: Inquiry Form or Submission Success Screen */}
          <div className="lg:col-span-7 bg-[#121212] border border-white/10 rounded-sm p-8 sm:p-12 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#C9A66B]/15 border border-[#C9A66B] flex items-center justify-center mx-auto text-[#C9A66B]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#C9A66B] uppercase tracking-[0.25em]">
                    COMMISSION DOSSIER OPENED
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                    SPECIFICATION RECEIVED.
                  </h3>
                  <p className="text-sm text-[#A7A7A7] max-w-md mx-auto font-light leading-relaxed">
                    A senior build consultant will review your vehicle configuration and reach out within 24 hours with dyno feasibility and scheduling options.
                  </p>
                </div>

                <div className="p-4 bg-black/80 border border-white/10 rounded-sm max-w-sm mx-auto font-mono text-xs">
                  <span className="text-neutral-500 block text-[10px] uppercase">INQUIRY TRACKING CODE:</span>
                  <span className="text-[#C9A66B] font-bold text-base">{inquiryId}</span>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playMechanicalClick();
                      setSubmitted(false);
                    }}
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-xs font-mono uppercase text-white rounded-sm border border-white/10"
                  >
                    SUBMIT ANOTHER VEHICLE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {prefilledSpec && (
                  <div className="p-3.5 bg-neutral-900/90 border border-[#C9A66B]/40 rounded-sm text-xs font-mono text-neutral-300">
                    <span className="text-[#C9A66B] font-bold uppercase block mb-1">
                      ATTACHED 3D SPECIFICATION:
                    </span>
                    <p className="text-[11px] text-neutral-400 truncate">{prefilledSpec}</p>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-3 bg-red-950/60 border border-red-800 text-xs text-red-200 rounded-sm flex items-center gap-2 font-mono">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider block mb-2">
                      CLIENT FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Julian Vance"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#181818] border border-white/10 focus:border-[#C9A66B] rounded-sm px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider block mb-2">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +1 (555) 019-2834"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#181818] border border-white/10 focus:border-[#C9A66B] rounded-sm px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider block mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="julian@performance.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#181818] border border-white/10 focus:border-[#C9A66B] rounded-sm px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider block mb-2">
                      VEHICLE MAKE & MODEL *
                    </label>
                    <input
                      type="text"
                      name="vehicle"
                      required
                      placeholder="e.g. Porsche 911 GT3 RS / BMW M4"
                      value={formData.vehicle}
                      onChange={handleChange}
                      className="w-full bg-[#181818] border border-white/10 focus:border-[#C9A66B] rounded-sm px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider block mb-2">
                      MODEL YEAR *
                    </label>
                    <input
                      type="number"
                      name="year"
                      min="1960"
                      max="2026"
                      required
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full bg-[#181818] border border-white/10 focus:border-[#C9A66B] rounded-sm px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider block mb-2">
                      SERVICE PROGRAM *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-[#181818] border border-white/10 focus:border-[#C9A66B] rounded-sm px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    >
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider block mb-2">
                      BUDGET RANGE
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full bg-[#181818] border border-white/10 focus:border-[#C9A66B] rounded-sm px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    >
                      {BUDGET_RANGES.map((b) => (
                        <option key={b} value={b}>
                          {b.split(' ')[0]} {b.split(' ')[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#A7A7A7] uppercase tracking-wider block mb-2">
                    PROJECT NOTES / OBJECTIVES
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about desired wheel horsepower, track intentions, cosmetic styling, or current paint defects..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/10 focus:border-[#C9A66B] rounded-sm px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#C9A66B] hover:bg-[#DFBD82] text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm transition-all shadow-[0_4px_20px_rgba(201,166,107,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'TRANSMITTING SPEC...' : 'REQUEST A CONSULTATION'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
