'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { STUDIO_CONFIG } from '@/config/studio';
import { soundEngine } from '@/lib/audio';
import { MessageSquare } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.16,
    },
  },
};

const badgeItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const buttonItemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.82 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      mass: 0.8,
    },
  },
};

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const text = encodeURIComponent('Hello Apex Automotive Studio! I would like to inquire about a custom build or detailing appointment.');
  const whatsappUrl = `https://wa.me/${STUDIO_CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${text}`;

  const handleClick = () => {
    soundEngine.playMechanicalClick(750, 0.04);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none"
    >
      {/* Staggered Element 1: Status Callout & Tooltip */}
      <AnimatePresence>
        {isHovered ? (
          <motion.div
            key="hover-pill"
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center px-3.5 py-2 bg-[#0C0C0C]/95 backdrop-blur-md border border-[#25D366]/40 text-white text-[11px] font-mono tracking-wider uppercase shadow-[0_4px_24px_rgba(0,0,0,0.8)] rounded-sm"
          >
            <span className="relative flex h-2 w-2 mr-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
            </span>
            <span className="text-[#EDEDED]">TALK TO THE GARAGE // ONLINE</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle-pill"
            variants={badgeItemVariants}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A]/90 backdrop-blur-sm border border-white/10 text-neutral-400 text-[10px] font-mono tracking-widest uppercase rounded-sm shadow-md"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366] shadow-[0_0_8px_#25D366]" />
            <span>DISPATCH LIVE</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Staggered Element 2: Primary WhatsApp Launcher Button */}
      <motion.div variants={buttonItemVariants} className="relative">
        {/* Subtle Ambient Radar Ring */}
        <span className="absolute -inset-1 rounded-full border border-[#25D366]/25 animate-ping pointer-events-none opacity-30" />

        <a
          id="floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-13 h-13 rounded-full bg-[#0D0D0D] border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-black shadow-[0_0_24px_rgba(37,211,102,0.35)] flex items-center justify-center transition-all duration-300 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#25D366]/60"
          aria-label="Direct WhatsApp Consultation"
        >
          <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
        </a>
      </motion.div>
    </motion.div>
  );
}
