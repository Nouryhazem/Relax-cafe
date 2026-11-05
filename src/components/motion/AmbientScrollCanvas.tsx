import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const AmbientScrollCanvas: React.FC = () => {
  const { section, isArabic } = useApp();
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [elevationMeters, setElevationMeters] = useState(0);

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScrollY / totalScroll)) : 0;
      setScrollProgress(progress);
      setElevationMeters(parseFloat((progress * 26.5).toFixed(1))); // Ground to +26.5m (Floor 7)

      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = Math.max(16, now - lastTime.current);
      const velocity = Math.abs(deltaY / deltaTime);

      setScrollSpeed(Math.min(100, Math.round(velocity * 80)));
      if (deltaY > 2) setScrollDirection('down');
      else if (deltaY < -2) setScrollDirection('up');

      lastScrollY.current = currentScrollY;
      lastTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Natural decay of velocity indicator when stationary
    const interval = setInterval(() => {
      setScrollSpeed(prev => (prev > 2 ? Math.round(prev * 0.85) : 0));
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [section]);

  const isMenu = section === 'menu';

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {/* 1. Dynamic Ambient Light Beam that sweeps with scroll depth */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[140px] transition-all duration-700 ease-out"
        style={{
          top: `${20 + scrollProgress * 50}%`,
          left: `${isArabic ? '10%' : '70%'}`,
          background: isMenu
            ? `radial-gradient(circle, rgba(184, 146, 78, ${0.08 + scrollProgress * 0.08}) 0%, rgba(245, 239, 235, 0) 70%)`
            : `radial-gradient(circle, rgba(184, 146, 78, ${0.06 + scrollProgress * 0.12}) 0%, rgba(59, 31, 20, 0.05) 50%, transparent 75%)`,
          transform: `translate3d(0, ${-scrollProgress * 60}px, 0) scale(${1 + (scrollSpeed / 100) * 0.2})`,
        }}
      />

      {/* 2. Floating Golden Architectural Atmosphere Particles */}
      <div
        className="absolute inset-0 opacity-40 transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollDirection === 'down' ? -scrollSpeed * 0.4 : scrollSpeed * 0.4}px)`,
        }}
      >
        <div
          className="absolute top-[18%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#B8924E]/40 blur-[0.5px]"
          style={{ transform: `translateY(${scrollProgress * 120}px)` }}
        />
        <div
          className="absolute top-[35%] right-[15%] w-2 h-2 rounded-full bg-[#B8924E]/50 blur-[1px]"
          style={{ transform: `translateY(${-scrollProgress * 90}px)` }}
        />
        <div
          className="absolute top-[65%] left-[25%] w-1 h-1 rounded-full bg-[#F3E9DA]/30"
          style={{ transform: `translateY(${scrollProgress * 160}px)` }}
        />
        <div
          className="absolute top-[82%] right-[28%] w-1.5 h-1.5 rounded-full bg-[#B8924E]/45 blur-[0.5px]"
          style={{ transform: `translateY(${-scrollProgress * 140}px)` }}
        />
      </div>

      {/* 3. Subtle Side Architectural Height Rulers (Scroll sensing) */}
      <div className="hidden xl:flex absolute top-1/4 start-3 flex-col items-start gap-1 font-mono text-[9px] text-[#B8924E]/40 tracking-wider">
        <span className="text-[10px] text-[#B8924E]/80">▲ +{elevationMeters}M</span>
        <div className="w-4 h-[1px] bg-[#B8924E]/30" />
        <span>FL.0{Math.min(7, Math.floor(scrollProgress * 6) + 1)}</span>
        <div className="w-2 h-[1px] bg-[#B8924E]/20" />
        <span className="text-[8px] opacity-60">RELAX · 7</span>
      </div>

      {/* 4. Real-time Scroll Sense Meter & Interactive Rotating Compass */}
      <div
        className={`fixed bottom-6 start-6 z-30 transition-all duration-300 pointer-events-auto ${
          scrollSpeed > 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-60 translate-y-1 scale-95 hover:opacity-100'
        }`}
      >
        <div
          className={`px-3 py-2 rounded-xl backdrop-blur-md border shadow-2xl flex items-center gap-3 transition-colors ${
            isMenu
              ? 'bg-white/90 border-[#D8C7A5] text-[#1B0F0A]'
              : 'bg-[#1B0F0A]/90 border-[#B8924E]/40 text-[#F3E9DA]'
          }`}
        >
          {/* Rotating Compass Dial that spins with scroll depth */}
          <div
            className="w-5 h-5 rounded-full border border-[#B8924E]/60 flex items-center justify-center transition-transform duration-100 ease-out"
            style={{ transform: `rotate(${scrollProgress * 720}deg)` }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#B8924E]" />
          </div>

          <div className="flex flex-col text-[10px] font-mono leading-tight">
            <span className="font-bold text-[#B8924E]">
              {scrollSpeed > 2 ? `${scrollDirection === 'down' ? '▼' : '▲'} ${scrollSpeed} KM/H` : `LEVEL 0${Math.min(7, Math.floor(scrollProgress * 6) + 1)}`}
            </span>
            <span className="opacity-60 text-[9px] uppercase tracking-wider">
              +{elevationMeters}M ASCENT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
