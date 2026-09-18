'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_CONFIG } from '@/config/studio';
import { soundEngine } from '@/lib/audio';
import { MessageSquare } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const text = encodeURIComponent('Hello Apex Automotive Studio! I would like to inquire about a custom build or detailing appointment.');
  const whatsappUrl = `https://wa.me/${STUDIO_CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${text}`;

  const handleClick = () => {
    soundEngine.playMechanicalClick(750, 0.04);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center px-3 py-1.5 bg-black/90 backdrop-blur-md border border-[#25D366]/40 text-white text-[11px] font-mono tracking-wider uppercase shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] mr-2 animate-ping" />
            <span>TALK TO THE GARAGE // ONLINE</span>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-13 h-13 rounded-full bg-[#121212] border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-black shadow-[0_0_20px_rgba(37,211,102,0.35)] flex items-center justify-center transition-all duration-300 active:scale-95 group"
        aria-label="Direct WhatsApp Consultation"
      >
        <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
}
