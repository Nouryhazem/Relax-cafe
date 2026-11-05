import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PauseMark } from '../brand/PauseMark';
import { soundManager } from '../../lib/sound-manager';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ChevronUp } from 'lucide-react';

export const ElevatorScrollIndicator: React.FC = () => {
  const { isArabic, section, setSection } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastLevelRef = useRef(1);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
        setCurrentLevel(1);
        return;
      }
      const current = window.scrollY;
      const progress = Math.min(1, Math.max(0, current / totalScroll));
      setScrollProgress(progress);

      const floor = Math.min(7, Math.max(1, Math.floor(progress * 6.99) + 1));
      if (floor !== lastLevelRef.current) {
        lastLevelRef.current = floor;
        setCurrentLevel(floor);
        soundManager.playFloorTick();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [section]);

  const handleFloorClick = (floor: number) => {
    soundManager.playFloorTick();
    setIsMobileMenuOpen(false);

    if (floor === 7 || floor === 1) {
      setSection('seven');
    } else if (floor >= 2 && floor <= 4) {
      setSection('menu');
    } else if (floor === 5) {
      setSection('find');
    } else if (floor === 6) {
      setSection('split');
    }

    // Scroll to top of section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFloorName = (f: number) => {
    switch (f) {
      case 7:
        return isArabic ? 'ريلاكس · الدور السابع' : 'Relax · Level Seven';
      case 6:
        return isArabic ? 'حاسبة القعدة' : 'Split Calculator';
      case 5:
        return isArabic ? 'اختارلي على مزاجي' : 'Find Your Pause';
      case 4:
      case 3:
      case 2:
        return isArabic ? 'قائمة المشروبات' : 'Curated Menu';
      case 1:
      default:
        return isArabic ? 'المدخل والأسانسير' : 'Ground Entrance';
    }
  };

  return (
    <>
      {/* 1. TOP HAIRLINE BRASS SCROLL PROGRESS BAR */}
      <div className="fixed top-0 inset-x-0 h-[2.5px] z-50 pointer-events-none bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#B8924E]/40 via-[#B8924E] to-[#F3E9DA] shadow-[0_0_12px_#B8924E] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* 2. FLOATING MECHANICAL ELEVATOR STATION (Desktop & Tablet: Right Side) */}
      <aside
        aria-label="Interactive Elevator Station"
        className="hidden md:flex fixed end-5 lg:end-7 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 select-none"
      >
        <div className="p-2.5 rounded-2xl bg-[#1B0F0A]/95 border border-[#3B1F14] hover:border-[#B8924E]/50 shadow-[0_0_35px_rgba(0,0,0,0.85)] backdrop-blur-md flex flex-col items-center transition-colors">
          {/* Pause symbol crown */}
          <div className="cursor-pointer mb-2" onClick={scrollToTop} title={isArabic ? 'للأعلى' : 'To Top'}>
            <PauseMark size="sm" color="#B8924E" />
          </div>

          {/* Floor Buttons Vertical Stack (07 down to 01) */}
          <div className="flex flex-col gap-1.5 py-1">
            {[7, 6, 5, 4, 3, 2, 1].map(f => {
              const isActive = currentLevel === f;
              return (
                <div key={f} className="relative group flex items-center">
                  <button
                    onClick={() => handleFloorClick(f)}
                    className={`w-7 h-7 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-[#B8924E] text-[#1B0F0A] shadow-[0_0_14px_#B8924E] scale-110 ring-2 ring-[#F3E9DA]/40'
                        : 'bg-[#3B1F14]/40 hover:bg-[#3B1F14] text-[#F3E9DA]/50 hover:text-[#F3E9DA]'
                    }`}
                    title={getFloorName(f)}
                  >
                    0{f}
                  </button>

                  {/* Tooltip on Hover */}
                  <div className="absolute end-full me-2.5 px-2.5 py-1 rounded bg-[#1B0F0A] border border-[#B8924E]/40 text-[10px] text-[#F3E9DA] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                    {getFloorName(f)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Level Tag & Scroll percentage */}
          <span className="font-cormorant text-[9px] text-[#B8924E] uppercase tracking-widest block mt-2">
            LVL
          </span>
          <span className="font-mono text-[8px] text-[#F3E9DA]/40">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </aside>

      {/* 3. MOBILE FLOATING ELEVATOR TACTILE BADGE (Mobile Bottom-Right) */}
      <div className="md:hidden fixed bottom-20 end-3 z-40 flex flex-col items-end gap-2">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="p-3 rounded-2xl bg-[#1B0F0A]/95 border border-[#B8924E]/50 shadow-2xl backdrop-blur-md flex flex-col gap-2 mb-1"
            >
              <div className="text-[10px] font-cormorant uppercase tracking-wider text-[#B8924E] text-center">
                {isArabic ? 'طوابق ريلاكس' : 'RELAX FLOORS'}
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[7, 6, 5, 4, 3, 2, 1].map(f => (
                  <button
                    key={f}
                    onClick={() => handleFloorClick(f)}
                    className={`w-8 h-8 rounded-full text-xs font-mono font-bold transition-all ${
                      currentLevel === f
                        ? 'bg-[#B8924E] text-[#1B0F0A] shadow-[0_0_10px_#B8924E]'
                        : 'bg-[#3B1F14]/70 text-[#F3E9DA]/70 border border-[#3B1F14]'
                    }`}
                  >
                    0{f}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile floating pill button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B0F0A]/95 border border-[#B8924E]/50 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md text-xs font-mono text-[#F3E9DA] cursor-pointer"
        >
          <PauseMark size="sm" color="#B8924E" />
          <span className="text-[#B8924E] font-bold">0{currentLevel}</span>
          <span className="text-[10px] text-[#F3E9DA]/40">/ 07</span>
        </button>
      </div>
    </>
  );
};
