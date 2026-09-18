'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'link' | 'view' | 'drag' | 'rotate'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch] = useState(() =>
    typeof window !== 'undefined' ? 'ontouchstart' in window || navigator.maxTouchPoints > 0 : false
  );

  useEffect(() => {
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr === 'view') {
        setCursorType('view');
      } else if (cursorAttr === 'drag') {
        setCursorType('drag');
      } else if (cursorAttr === 'rotate') {
        setCursorType('rotate');
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      {cursorType === 'default' && (
        <div className="w-3 h-3 rounded-full bg-white/90 border border-black/30 shadow-[0_0_8px_rgba(201,166,107,0.4)]" />
      )}

      {cursorType === 'link' && (
        <div className="w-8 h-8 rounded-full border border-[#C9A66B] bg-[#C9A66B]/15 backdrop-blur-[1px] animate-ping-slow flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A66B]" />
        </div>
      )}

      {cursorType === 'view' && (
        <div className="px-3 py-1 rounded-full bg-[#C9A66B] text-[#080808] font-mono text-[10px] font-bold tracking-widest uppercase shadow-lg">
          VIEW
        </div>
      )}

      {cursorType === 'drag' && (
        <div className="px-3 py-1 rounded-full bg-white text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-lg flex items-center gap-1">
          <span>↔</span> DRAG
        </div>
      )}

      {cursorType === 'rotate' && (
        <div className="px-3 py-1 rounded-full bg-[#C9A66B] text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-lg flex items-center gap-1">
          <span>↻</span> ROTATE
        </div>
      )}
    </div>
  );
}
