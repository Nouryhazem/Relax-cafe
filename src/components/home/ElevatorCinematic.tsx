import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PauseMark } from '../brand/PauseMark';
import { RelaxLogo } from '../brand/RelaxLogo';
import { soundManager } from '../../lib/sound-manager';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUp,
  Coffee,
  Sparkles,
  ReceiptText,
  Check,
  ChevronDown,
  RotateCcw,
  Volume2,
} from 'lucide-react';

export const ElevatorCinematic: React.FC = () => {
  const { setSection, isArabic, introDone, setIntroDone } = useApp();

  const [currentFloor, setCurrentFloor] = useState<number>(introDone ? 7 : 1);
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [doorsOpen, setDoorsOpen] = useState<boolean>(introDone);
  const [cableOffset, setCableOffset] = useState<number>(0);
  const [hasScrolledIn, setHasScrolledIn] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastFloorRef = useRef<number>(currentFloor);

  // Keep ref updated & manage street ambient noise crossfade
  useEffect(() => {
    lastFloorRef.current = currentFloor;
    if (currentFloor === 1 && !doorsOpen) {
      soundManager.startStreetAmbience();
    } else {
      soundManager.stopStreetAmbience();
    }
    return () => {
      soundManager.stopStreetAmbience();
    };
  }, [currentFloor, doorsOpen]);

  // Direct manual elevator jump/drive to target floor
  const goToFloor = (targetFloor: number) => {
    if (isAscending || targetFloor === currentFloor) return;
    setIsAscending(true);
    setDoorsOpen(false);
    soundManager.startElevatorHum();

    const direction = targetFloor > currentFloor ? 1 : -1;
    let floor = currentFloor;
    const stepTime = 420;

    const interval = setInterval(() => {
      floor += direction;
      setCurrentFloor(floor);
      setCableOffset(prev => prev + 50);
      soundManager.playFloorTick();

      if (floor === targetFloor) {
        clearInterval(interval);
        soundManager.stopElevatorHum();

        if (targetFloor === 7) {
          soundManager.playLevelSevenChime();
          setTimeout(() => {
            setDoorsOpen(true);
            soundManager.playDoorsOpen();
            setIsAscending(false);
            setIntroDone(true);
          }, 350);
        } else {
          setIsAscending(false);
        }
      }
    }, stepTime);
  };

  const handleAscendToSeven = () => {
    goToFloor(7);
  };

  const handleSkip = () => {
    soundManager.stopElevatorHum();
    setCurrentFloor(7);
    setDoorsOpen(true);
    setIsAscending(false);
    setIntroDone(true);
  };

  const handleReRide = () => {
    setDoorsOpen(false);
    soundManager.startElevatorHum();
    setTimeout(() => {
      setCurrentFloor(1);
      soundManager.playFloorTick();
      soundManager.stopElevatorHum();
      setIsAscending(false);
    }, 400);
  };

  // Scroll-linked elevator movement when scrolling through the container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isAscending) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Check where user is within the elevator section
      if (rect.top <= 0 && rect.bottom >= windowH * 0.4) {
        setHasScrolledIn(true);
        const scrolledDistance = -rect.top;
        const totalDistance = rect.height - windowH;
        if (totalDistance <= 0) return;

        const rawRatio = Math.min(1, Math.max(0, scrolledDistance / totalDistance));
        const calculatedFloor = Math.min(7, Math.max(1, Math.floor(rawRatio * 6.99) + 1));

        if (calculatedFloor !== lastFloorRef.current) {
          setCurrentFloor(calculatedFloor);
          setCableOffset(prev => prev + 35);
          soundManager.playFloorTick();

          if (calculatedFloor === 7 && !doorsOpen) {
            soundManager.playLevelSevenChime();
            setTimeout(() => {
              setDoorsOpen(true);
              soundManager.playDoorsOpen();
              setIntroDone(true);
            }, 300);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAscending, doorsOpen, setIntroDone]);

  const floorRatio = (currentFloor - 1) / 6; // 0 to 1

  return (
    <div
      ref={containerRef}
      className="relative min-h-[140vh] sm:min-h-[160vh] w-full bg-[#1B0F0A]"
    >
      {/* Pinned Sticky Elevator Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden border-b border-[#3B1F14] select-none">
        
        {/* ========================================================================= */}
        {/* 1. ATMOSPHERIC SANCTUARY REVEAL ON LEVEL SEVEN (Background Behind Doors) */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          
          {/* Ground Street Horizon & City Ambience (Visible on lower floors) */}
          <div
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              opacity: Math.max(0, 1 - floorRatio * 2.2),
              transform: `translateY(${floorRatio * 180}px)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#120805] via-[#1B0F0A] to-[#0A0402]">
              {/* Distant street building silhouettes & headlights */}
              <div className="absolute bottom-16 inset-x-0 h-48 opacity-40 flex items-end justify-between px-8 max-w-5xl mx-auto">
                <div className="w-28 h-36 bg-[#160B07] border-t border-[#3B1F14] rounded-t" />
                <div className="w-36 h-44 bg-[#140905] border-t border-[#3B1F14] rounded-t flex flex-col justify-around p-3">
                  <div className="w-full h-1 bg-[#B8924E]/20" />
                  <div className="w-full h-1 bg-[#B8924E]/20" />
                </div>
                <div className="w-44 h-32 bg-[#180C08] border-t border-[#3B1F14] rounded-t" />
                <div className="w-32 h-40 bg-[#150A06] border-t border-[#3B1F14] rounded-t" />
              </div>

              {/* Samalout Street Level Glow & Ground Floor Elevator Threshold */}
              <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0A0402] to-transparent flex items-center justify-center">
                <div className="flex items-center gap-4 text-[11px] text-[#F3E9DA]/40 font-mono">
                  <span>GROUND LEVEL · SHARA'A SAMALOUT</span>
                  <span>•</span>
                  <span>ELEVATOR ENTRANCE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ambient Evening Light Bloom (Intensifies with floor height) */}
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{
              opacity: 0.15 + floorRatio * 0.85,
              background: `radial-gradient(ellipse at 50% 35%, rgba(184, 146, 78, 0.42) 0%, rgba(59, 31, 20, 0.7) 48%, #1B0F0A 85%)`,
            }}
          />

          {/* Architectural Timber Ceiling, Dark Beams & Glass City Perspective */}
          <div
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{
              opacity: doorsOpen ? 1 : 0.12 + floorRatio * 0.45,
              transform: `scale(${0.96 + floorRatio * 0.04})`,
            }}
          >
            {/* Upper Structural Beams & Warm Pitched Roof Geometry */}
            <div className="absolute top-0 inset-x-0 h-52 bg-gradient-to-b from-[#140B07] to-transparent">
              <div className="max-w-6xl mx-auto h-full grid grid-cols-7 gap-6 opacity-45">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full border-r border-[#3B1F14] transform -skew-x-12 bg-gradient-to-b from-[#2A150D] to-transparent shadow-2xl"
                  />
                ))}
              </div>
            </div>

            {/* Warm Amber Glowing Pendant Lamps (Gently Swaying) */}
            <div className="absolute top-12 inset-x-0 flex justify-around max-w-5xl mx-auto px-6 pointer-events-none">
              {[0, 1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ rotate: [-0.8, 0.8, -0.8] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center origin-top"
                >
                  <div className="w-[1.5px] h-24 bg-gradient-to-b from-[#B8924E]/20 to-[#B8924E]/70" />
                  <div
                    className="w-6 h-8 rounded-b-full bg-gradient-to-b from-[#F3E9DA] to-[#B8924E] shadow-[0_0_40px_#B8924E]"
                    style={{ opacity: 0.5 + floorRatio * 0.5 }}
                  />
                  {/* Subtle warm halo */}
                  <div className="w-24 h-24 rounded-full bg-[#B8924E]/15 blur-xl -mt-6 pointer-events-none" />
                </motion.div>
              ))}
            </div>

            {/* Floating Warm Steam Particles */}
            <div className="absolute bottom-24 inset-x-0 flex justify-center gap-16 pointer-events-none opacity-40">
              <div className="w-1.5 h-16 rounded-full bg-gradient-to-t from-[#B8924E]/50 to-transparent blur-sm animate-steam" />
              <div className="w-2 h-20 rounded-full bg-gradient-to-t from-[#F3E9DA]/40 to-transparent blur-sm animate-steam [animation-delay:1.5s]" />
              <div className="w-1.5 h-14 rounded-full bg-gradient-to-t from-[#B8924E]/40 to-transparent blur-sm animate-steam [animation-delay:3s]" />
            </div>

            {/* Terracotta Seating, Tables & Calm Glass Overlook Silhouette */}
            <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#1B0F0A] via-[#24130A]/70 to-transparent flex items-end justify-center">
              <div className="w-full max-w-5xl px-6 flex justify-between items-end opacity-70">
                <div className="w-36 sm:w-44 h-28 rounded-t-2xl bg-[#5C2B1C]/60 border-t-2 border-[#B8924E]/40 shadow-2xl" />
                <div className="w-48 sm:w-64 h-20 rounded-t-xl bg-[#3B1F14]/80 border-t-2 border-[#B8924E]/30 shadow-xl flex items-center justify-center">
                  <span className="font-cormorant text-[10px] tracking-widest text-[#B8924E]/70 uppercase">
                    SEVEN SANCTUARY
                  </span>
                </div>
                <div className="w-36 sm:w-44 h-28 rounded-t-2xl bg-[#5C2B1C]/60 border-t-2 border-[#B8924E]/40 shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Elevator Tension Cables & Counterweight (Moving in parallax) */}
          <div
            className="absolute inset-y-0 inset-x-0 opacity-25 pointer-events-none transition-transform duration-300"
            style={{ transform: `translateY(${cableOffset % 90}px)` }}
          >
            <div className="max-w-4xl mx-auto h-full flex justify-between px-10">
              <div className="w-[1.5px] h-full bg-gradient-to-b from-transparent via-[#B8924E] to-transparent shadow-[0_0_8px_#B8924E]" />
              <div className="w-[1.5px] h-full bg-gradient-to-b from-transparent via-[#B8924E]/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. BRUSHED BRASS PNEUMATIC ELEVATOR DOORS (Sliding apart on Floor 07) */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none z-10 flex overflow-hidden">
          {/* Left Elevator Door */}
          <motion.div
            animate={{ x: doorsOpen ? '-100%' : '0%' }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-1/2 h-full bg-[#180D09] border-r-2 border-[#B8924E]/50 shadow-[15px_0_50px_rgba(0,0,0,0.9)] flex items-center justify-end"
          >
            {/* Metallic Paneling & Pinstripes */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#3B1F14_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
            <div className="absolute top-1/4 right-8 w-1.5 h-44 bg-[#B8924E]/50 rounded-full shadow-[0_0_12px_#B8924E]" />
            <div className="absolute top-1/4 right-12 w-[1px] h-44 bg-[#B8924E]/25" />
            
            {/* Chamfered Brand Pattern Mark */}
            <div className="absolute top-1/2 -translate-y-1/2 right-6 opacity-35">
              <PauseMark size="lg" color="#B8924E" />
            </div>

            {/* Glowing Door Seam */}
            <div
              className="absolute top-0 bottom-0 right-0 w-3 transition-opacity duration-500"
              style={{
                background: `linear-gradient(to left, rgba(184, 146, 78, ${0.15 + floorRatio * 0.85}), transparent)`,
              }}
            />
          </motion.div>

          {/* Right Elevator Door */}
          <motion.div
            animate={{ x: doorsOpen ? '100%' : '0%' }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-1/2 h-full bg-[#180D09] border-l-2 border-[#B8924E]/50 shadow-[-15px_0_50px_rgba(0,0,0,0.9)] flex items-center justify-start"
          >
            {/* Metallic Paneling & Pinstripes */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#3B1F14_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
            <div className="absolute top-1/4 left-8 w-1.5 h-44 bg-[#B8924E]/50 rounded-full shadow-[0_0_12px_#B8924E]" />
            <div className="absolute top-1/4 left-12 w-[1px] h-44 bg-[#B8924E]/25" />

            {/* Chamfered Brand Pattern Mark */}
            <div className="absolute top-1/2 -translate-y-1/2 left-6 opacity-35">
              <PauseMark size="lg" color="#B8924E" />
            </div>

            {/* Glowing Door Seam */}
            <div
              className="absolute top-0 bottom-0 left-0 w-3 transition-opacity duration-500"
              style={{
                background: `linear-gradient(to right, rgba(184, 146, 78, ${0.15 + floorRatio * 0.85}), transparent)`,
              }}
            />
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TOP MECHANICAL STATUS BAR (Live Elevator Floor & Control) */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-[#1B0F0A]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#B8924E]/30 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8924E] shadow-[0_0_8px_#B8924E] animate-pulse" />
            <span className="font-cormorant text-xs sm:text-sm tracking-[0.25em] uppercase text-[#B8924E] font-bold">
              {isArabic ? 'مصعد ريلاكس' : 'RELAX ELEVATOR'}
            </span>
            <span className="text-[#3B1F14]">/</span>
            <span className="font-messiri text-xs sm:text-sm text-[#F3E9DA]/90 font-medium">
              {currentFloor === 7
                ? isArabic
                  ? 'الدور السابع — وصلت'
                  : 'Level Seven — Arrived'
                : isArabic
                ? `الصعود: الدور 0${currentFloor}`
                : `Ascending: Level 0${currentFloor}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentFloor < 7 ? (
              <button
                onClick={handleSkip}
                className="text-xs text-[#F3E9DA]/70 hover:text-[#B8924E] bg-[#1B0F0A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#3B1F14] hover:border-[#B8924E]/60 transition-all cursor-pointer shadow-md"
              >
                {isArabic ? 'ادخل على طول ←' : 'Skip into Seven →'}
              </button>
            ) : (
              <button
                onClick={handleReRide}
                className="text-xs text-[#B8924E] hover:text-[#F3E9DA] bg-[#1B0F0A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#B8924E]/40 hover:border-[#B8924E] transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                title="Re-ride the elevator"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isArabic ? 'إعادة تجربة المصعد' : 'Re-ride Elevator'}</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. CENTER ELEVATOR INTERACTION: BRASS MECHANICAL CALL STATION */}
        {/* ========================================================================= */}
        <div className="relative z-20 max-w-3xl mx-auto px-4 my-auto py-4 text-center flex flex-col items-center">
          
          {/* Circular Mechanical Brass Floor Gauge */}
          <motion.div
            animate={{
              scale: isAscending ? 1.04 : 1,
              borderColor: currentFloor === 7 ? '#B8924E' : 'rgba(184, 146, 78, 0.4)',
            }}
            transition={{ duration: 0.3 }}
            className="relative p-5 sm:p-7 rounded-3xl bg-[#1B0F0A]/95 border shadow-[0_0_60px_rgba(184,146,78,0.25)] mb-6 flex flex-col items-center backdrop-blur-md"
          >
            {/* Crown Octagonal Pause Mark */}
            <PauseMark
              size="lg"
              color="#B8924E"
              animate={isAscending}
              className="transition-transform duration-500"
            />

            {/* Mechanical Big Brass Numerals & Rolling Counter */}
            <div className="mt-3 flex items-center gap-3">
              <span className="font-cormorant text-xs uppercase tracking-[0.25em] text-[#F3E9DA]/40">
                LEVEL
              </span>
              <span className="font-cormorant font-bold text-5xl sm:text-7xl text-[#B8924E] tabular-nums tracking-wider drop-shadow-[0_0_20px_rgba(184,146,78,0.6)]">
                0{currentFloor}
              </span>
              <span className="font-cormorant text-xs uppercase tracking-[0.25em] text-[#F3E9DA]/40">
                / 07
              </span>
            </div>

            {/* Interactive Seven Floor Buttons Grid */}
            <div className="mt-4 pt-3.5 border-t border-[#3B1F14] flex items-center gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map(f => {
                const isActive = currentFloor === f;
                return (
                  <button
                    key={f}
                    onClick={() => goToFloor(f)}
                    disabled={isAscending}
                    className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-[#B8924E] text-[#1B0F0A] shadow-[0_0_15px_#B8924E] scale-110 ring-2 ring-[#F3E9DA]/40'
                        : 'bg-[#3B1F14]/70 hover:bg-[#3B1F14] text-[#F3E9DA]/60 hover:text-[#F3E9DA] border border-[#3B1F14]'
                    }`}
                    title={`Level 0${f}`}
                  >
                    0{f}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-2 text-[10px] text-[#B8924E]/70 font-cormorant uppercase tracking-widest">
              {currentFloor === 7 ? 'SANCTUARY REACHED' : 'SCROLL DOWN OR SELECT FLOOR'}
            </div>
          </motion.div>

          {/* Emotional Brand Narrative Transition */}
          <AnimatePresence mode="wait">
            {currentFloor < 7 ? (
              <motion.div
                key="ascending"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-4 max-w-lg"
              >
                <h1 className="font-messiri text-3xl sm:text-5xl font-bold text-[#F3E9DA] leading-tight drop-shadow-md">
                  اللي يهمك… مكانه فوق.
                </h1>
                <p className="text-sm sm:text-base text-[#F3E9DA]/75 font-light leading-relaxed max-w-md mx-auto">
                  {isArabic
                    ? 'اترك دوشة الشارع تحت واطلع للدور السابع بالأسانسير. مكان مغلق وهادئ صُمم عشان وقتك يرجع ليك.'
                    : 'Leave the noise of the city below and ascend to Level Seven by elevator. A calm enclosed space for genuine time.'}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAscendToSeven}
                    disabled={isAscending}
                    className="px-8 py-3.5 bg-[#B8924E] hover:bg-[#B8924E]/90 text-[#1B0F0A] font-bold text-sm sm:text-base rounded-xl transition-all shadow-[0_0_25px_rgba(184,146,78,0.4)] flex items-center gap-2.5 cursor-pointer"
                  >
                    <ArrowUp className="w-5 h-5" />
                    <span>
                      {isArabic
                        ? isAscending
                          ? 'الصعود جارٍ…'
                          : 'اطلع لـ Level Seven'
                        : isAscending
                        ? 'Ascending…'
                        : 'Ascend to Level Seven'}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="arrived"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 sm:space-y-5 max-w-xl"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B1F14]/90 border border-[#B8924E]/50 text-xs text-[#B8924E] shadow-lg">
                  <Check className="w-4 h-4" />
                  <span>{isArabic ? 'الدور السابع · أسانسير · سمالوط' : 'Level Seven · Samalout · Enclosed'}</span>
                </div>

                <h1 className="font-messiri text-4xl sm:text-6xl font-bold text-[#F3E9DA] tracking-tight leading-tight drop-shadow-xl">
                  فوق الزحمة.
                </h1>

                <p className="font-messiri text-lg sm:text-xl text-[#B8924E] font-medium">
                  {isArabic ? 'قعدة تهدي اليوم، واختيار معمول على مزاجك.' : 'A pause to calm your day, crafted to your mood.'}
                </p>

                <p className="text-xs sm:text-sm text-[#F3E9DA]/80 font-light leading-relaxed max-w-md mx-auto">
                  {isArabic
                    ? 'أسقف خشبية دافئة، عوارض داكنة، جلسات مريحة وإطلالة زجاجية هادئة على سمالوط. مكان مغلق وخصوصية تامة بدون تشتيت.'
                    : 'Warm timber ceiling beams, ambient amber pendants, terracotta seating, and calm glass overlook over Samalout.'}
                </p>

                {/* Experience Action CTAs */}
                <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSection('menu')}
                    className="px-6 py-3.5 bg-[#B8924E] text-[#1B0F0A] hover:bg-[#B8924E]/90 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_0_25px_rgba(184,146,78,0.4)] flex items-center gap-2 cursor-pointer"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>{isArabic ? 'شوف المنيو' : 'Explore Menu'}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSection('find')}
                    className="px-6 py-3.5 bg-[#3B1F14] text-[#F3E9DA] hover:bg-[#3B1F14]/80 border border-[#B8924E]/50 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-[#B8924E]" />
                    <span>{isArabic ? 'اختارلي على مزاجي' : 'Find Your Pause'}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSection('split')}
                    className="px-4 py-3.5 text-xs text-[#F3E9DA]/85 hover:text-[#B8924E] border border-[#3B1F14] hover:border-[#B8924E]/40 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer bg-[#1B0F0A]/80 backdrop-blur-sm"
                  >
                    <ReceiptText className="w-3.5 h-3.5 text-[#B8924E]" />
                    <span>{isArabic ? 'قسّم الحساب' : 'Split at Seven'}</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* 5. BOTTOM SCROLL CUE */}
        {/* ========================================================================= */}
        <div className="relative z-20 pb-4 flex flex-col items-center text-[#F3E9DA]/50 text-xs gap-1">
          <span className="font-cormorant text-[11px] uppercase tracking-widest text-[#B8924E]">
            {currentFloor < 7 ? (isArabic ? 'انزل بالصفحة للصعود' : 'Scroll down to ascend') : (isArabic ? 'تابع للأسفل' : 'Scroll down')}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#B8924E]" />
        </div>

      </div>
    </div>
  );
};
