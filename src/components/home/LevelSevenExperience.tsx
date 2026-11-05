import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PauseMark } from '../brand/PauseMark';
import { soundManager } from '../../lib/sound-manager';
import { motion } from 'motion/react';
import { TheSeventhFrameSection } from './TheSeventhFrameSection';
import {
  ArrowUp,
  Coffee,
  Sparkles,
  ReceiptText,
  ChevronDown,
  Check,
} from 'lucide-react';

export const LevelSevenExperience: React.FC = () => {
  const { setSection, isArabic, introDone, setIntroDone } = useApp();
  const [currentFloor, setCurrentFloor] = useState<number>(introDone ? 7 : 1);
  const [isElevating, setIsElevating] = useState<boolean>(false);
  const [doorsOpen, setDoorsOpen] = useState<boolean>(introDone);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const lastFloorRef = useRef<number>(currentFloor);

  // Floor progression effect with audio triggers ONLY on button click
  const elevateToSeven = () => {
    if (isElevating) return;
    setIsElevating(true);
    setDoorsOpen(false);
    setCurrentFloor(1);
    soundManager.startElevatorHum();

    let floor = 1;
    const interval = setInterval(() => {
      floor += 1;
      setCurrentFloor(floor);
      lastFloorRef.current = floor;
      soundManager.playFloorTick();

      if (floor >= 7) {
        clearInterval(interval);
        soundManager.stopElevatorHum();
        soundManager.playLevelSevenChime();

        setTimeout(() => {
          setDoorsOpen(true);
          soundManager.playDoorsOpen();
          setIsElevating(false);
          setIntroDone(true);
        }, 350);
      }
    }, 550);
  };

  const skipToSeven = () => {
    soundManager.stopElevatorHum();
    setCurrentFloor(7);
    lastFloorRef.current = 7;
    setDoorsOpen(true);
    setIsElevating(false);
    setIntroDone(true);
  };

  const floorRatio = (currentFloor - 1) / 6; // 0 to 1
  const doorSeparation = doorsOpen ? 100 : floorRatio > 0.6 ? (floorRatio - 0.6) * 60 : 0;

  return (
    <div className="relative w-full overflow-hidden bg-[#1B0F0A] text-[#F3E9DA]">
      {/* ========================================================================= */}
      {/* 1. THE FIRST ELEVATOR EXPERIENCE (Beloved Sliding Doors & Pause Aperture) */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex flex-col justify-between items-center px-4 sm:px-6 py-8 md:py-12 border-b border-[#3B1F14] overflow-hidden"
      >
        {/* Layer 1: Ambient Lighting Bloom */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at 50% ${60 - floorRatio * 25}%, rgba(184, 146, 78, ${
              0.04 + floorRatio * 0.28
            }), rgba(59, 31, 20, ${0.2 + floorRatio * 0.5}) 65%, #1B0F0A 92%)`,
          }}
          aria-hidden="true"
        />

        {/* Real architectural atmosphere: Wood warmth */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: 0.15 + floorRatio * 0.45,
            backgroundImage: `
              radial-gradient(ellipse at 50% 20%, rgba(184,146,78,0.2) 0%, transparent 60%),
              linear-gradient(to bottom, #1B0F0A 0%, transparent 30%, transparent 70%, #1B0F0A 100%)
            `,
          }}
          aria-hidden="true"
        />

        {/* Layer 2: Foreground Elevator Sliding Door Panels with Aged Brass Trims */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#1B0F0A] border-r border-[#B8924E]/30 transition-transform duration-1000 ease-out pointer-events-none z-10"
          style={{ transform: `translateX(-${doorSeparation}%)` }}
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#3B1F14]/70 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[1px] bg-[#B8924E]/60 shadow-[0_0_12px_#B8924E]" />
        </div>
        <div
          className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#1B0F0A] border-l border-[#B8924E]/30 transition-transform duration-1000 ease-out pointer-events-none z-10"
          style={{ transform: `translateX(${doorSeparation}%)` }}
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#3B1F14]/70 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-[#B8924E]/60 shadow-[0_0_12px_#B8924E]" />
        </div>

        {/* Top Control Bar: Floor Indicator & "ادخل على طول" */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="font-cormorant text-xs tracking-[0.25em] uppercase text-[#B8924E]">
              {isArabic ? 'مصعد ريلاكس' : 'Relax Elevator'}
            </span>
            <span className="h-3 w-[1px] bg-[#3B1F14]" />
            <span className="text-xs text-[#F3E9DA]/50">
              {currentFloor === 7
                ? (isArabic ? 'وصلت للدور السابع' : 'Arrived at Level Seven')
                : (isArabic ? `طالع للدور ${currentFloor}` : `Ascending: Floor 0${currentFloor}`)}
            </span>
          </div>

          {currentFloor < 7 && (
            <button
              onClick={skipToSeven}
              className="text-xs text-[#F3E9DA]/60 hover:text-[#B8924E] border-b border-transparent hover:border-[#B8924E] transition-colors py-1 cursor-pointer"
            >
              {isArabic ? 'ادخل على طول' : 'Skip into Seven'}
            </button>
          )}
        </div>

        {/* Center Elevator Frame & Floor Reel */}
        <div className="relative z-20 flex flex-col items-center justify-center my-auto text-center max-w-2xl mx-auto py-10">
          {/* Pause Elevator Button & Aperture */}
          <motion.div
            className="relative mb-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={currentFloor < 7 ? elevateToSeven : undefined}
              disabled={isElevating}
              className={`p-6 sm:p-8 rounded-2xl bg-[#1B0F0A]/95 border ${
                currentFloor === 7 ? 'border-[#B8924E]' : 'border-[#B8924E]/40 hover:border-[#B8924E]'
              } shadow-[0_0_40px_rgba(184,146,78,0.18)] flex flex-col items-center transition-all cursor-pointer`}
              aria-label="Elevator Button"
            >
              <PauseMark
                size="lg"
                color="#B8924E"
                animate={isElevating}
                className="transition-colors duration-500"
              />

              {/* Floor Numbers Vertical Reel */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-[#F3E9DA]/40">LEVEL</span>
                <span className="font-cormorant font-bold text-4xl sm:text-5xl text-[#B8924E] tabular-nums tracking-wider">
                  0{currentFloor}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#F3E9DA]/40">/ 07</span>
              </div>
            </button>
          </motion.div>

          {/* Headline Transitions based on Floor Level */}
          {currentFloor < 7 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 max-w-lg"
            >
              <h1 className="font-messiri text-3xl sm:text-5xl font-semibold text-[#F3E9DA] leading-tight">
                {isArabic ? 'اللي يهمك… مكانه فوق.' : 'Where peace begins… is up here.'}
              </h1>
              <p className="text-sm sm:text-base text-[#F3E9DA]/70 font-light leading-relaxed max-w-md mx-auto">
                {isArabic
                  ? 'اترك دوشة الشارع تحت واطلع للدور السابع بالأسانسير. مكان مقفول وهادئ صُمم عشان وقتك يرجع ليك.'
                  : 'Leave the noise of the city below and take the elevator up to Level Seven.'}
              </p>

              <div className="pt-2">
                <button
                  onClick={elevateToSeven}
                  disabled={isElevating}
                  className="px-6 py-3.5 bg-[#3B1F14] hover:bg-[#B8924E] text-[#F3E9DA] hover:text-[#1B0F0A] border border-[#B8924E]/60 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 group shadow-xl mx-auto cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  <span>
                    {isArabic
                      ? isElevating
                        ? 'الصعود جارٍ…'
                        : 'اطلع لـ Level Seven'
                      : isElevating
                      ? 'Ascending…'
                      : 'Ascend to Level Seven'}
                  </span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Floor 07 Reached — Final Reveal State */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#3B1F14]/90 border border-[#B8924E]/50 text-xs text-[#B8924E]">
                <Check className="w-3.5 h-3.5" />
                <span>{isArabic ? 'الدور السابع · أسانسير' : 'Level Seven · Samalout'}</span>
              </div>

              <h1 className="font-messiri text-4xl sm:text-6xl font-bold text-[#F3E9DA] tracking-tight leading-tight">
                {isArabic ? 'فوق الزحمة.' : 'Above the Noise.'}
              </h1>

              <p className="font-messiri text-lg sm:text-xl text-[#B8924E] font-medium">
                {isArabic ? 'قعدة تهدي اليوم، واختيار معمول على مزاجك.' : 'A pause to calm your day, crafted to your mood.'}
              </p>

              <p className="text-sm text-[#F3E9DA]/70 font-light leading-relaxed max-w-md mx-auto">
                {isArabic
                  ? 'أسقف خشبية دافئة، عوارض داكنة، جلسات مريحة وإطلالة زجاجية هادئة على سمالوط. مكان مغلق وخصوصية تامة بدون تشتيت.'
                  : 'Dark exposed timber beams, warm layered evening illumination, terracotta seating, and calm glass perspective.'}
              </p>

              {/* Exact Actions */}
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setSection('menu')}
                  className="px-6 py-3 bg-[#B8924E] text-[#1B0F0A] hover:bg-[#B8924E]/90 font-semibold text-sm rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer hover:shadow-lg"
                >
                  <Coffee className="w-4 h-4" />
                  <span>{isArabic ? 'شوف المنيو' : 'Explore Menu'}</span>
                </button>

                <button
                  onClick={() => setSection('find')}
                  className="px-6 py-3 bg-[#3B1F14] text-[#F3E9DA] hover:bg-[#3B1F14]/80 border border-[#B8924E]/50 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#B8924E]" />
                  <span>{isArabic ? 'اختارلي على مزاجي' : 'Find Your Pause'}</span>
                </button>

                <button
                  onClick={() => setSection('split')}
                  className="px-4 py-3 text-xs text-[#F3E9DA]/80 hover:text-[#B8924E] border border-transparent hover:border-[#3B1F14] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ReceiptText className="w-3.5 h-3.5 text-[#B8924E]" />
                  <span>{isArabic ? 'قسّم الحساب' : 'Split at Seven'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Elevation Scroll Hint */}
        <div className="relative z-20 flex flex-col items-center text-[#F3E9DA]/40 text-xs">
          <ChevronDown className="w-4 h-4 animate-bounce text-[#B8924E]" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE THREE THINGS WE OFFER IN THE WEBSITE */}
      {/* ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#3B1F14]/60">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#B8924E] block">
            LEVEL SEVEN EXPERIENCES
          </span>
          <h2 className="font-messiri text-3xl font-semibold text-[#F3E9DA]">
            {isArabic ? 'ثلاثة أدوات لقعدتك' : 'Three Tools for Your Stay'}
          </h2>
        </div>

        {/* Narrative Cards with Framer Motion hover & elevation */}
        <div className="space-y-8">
          {/* Card 1: Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-2xl bg-[#3B1F14]/40 border border-[#3B1F14] hover:border-[#B8924E]/50 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          >
            <div className="space-y-2">
              <span className="font-cormorant text-xs tracking-[0.2em] text-[#B8924E] uppercase">
                01 · THE MENU
              </span>
              <h3 className="font-messiri text-2xl font-bold text-[#F3E9DA]">
                {isArabic ? 'المنيو وقائمة المشروبات' : 'Structured Interactive Menu'}
              </h3>
              <p className="text-sm text-[#F3E9DA]/70 font-light max-w-lg">
                {isArabic
                  ? 'منيو حقيقي بأسعاره المعتمدة بالجنيه المصري. تصفح 8 أقسام رئيسية من القهوة الساقعة، الماتشا، الكوكتيلات، والعصائر الفريش مع إمكانية الإضافة المباشرة لحساب القعدة.'
                  : 'Authentic items and verified EGP pricing. Search and filter across 8 distinct categories.'}
              </p>
            </div>
            <button
              onClick={() => setSection('menu')}
              className="px-5 py-2.5 rounded-lg bg-[#1B0F0A] hover:bg-[#3B1F14] border border-[#B8924E]/40 text-xs font-semibold text-[#F3E9DA] hover:text-[#B8924E] shrink-0 transition-colors cursor-pointer"
            >
              {isArabic ? 'شوف المنيو ←' : 'Open Menu →'}
            </button>
          </motion.div>

          {/* Card 2: Find Your Pause */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-2xl bg-[#3B1F14]/40 border border-[#3B1F14] hover:border-[#B8924E]/50 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          >
            <div className="space-y-2">
              <span className="font-cormorant text-xs tracking-[0.2em] text-[#B8924E] uppercase">
                02 · FIND YOUR PAUSE
              </span>
              <h3 className="font-messiri text-2xl font-bold text-[#F3E9DA]">
                {isArabic ? 'اختارلي على مزاجي' : 'Find Your Pause'}
              </h3>
              <p className="text-sm text-[#F3E9DA]/70 font-light max-w-lg">
                {isArabic
                  ? '«قولنا مودك، ونرشحلك اللي يليق بيه.» 5 أسئلة سريعة تقترح لك 3 اختيارات حقيقية من المنيو بالظبط تناسب مزاجك وميزانيتك.'
                  : 'Answer 5 quick mood questions to receive 3 deterministic real drink recommendations.'}
              </p>
            </div>
            <button
              onClick={() => setSection('find')}
              className="px-5 py-2.5 rounded-lg bg-[#1B0F0A] hover:bg-[#3B1F14] border border-[#B8924E]/40 text-xs font-semibold text-[#F3E9DA] hover:text-[#B8924E] shrink-0 transition-colors cursor-pointer"
            >
              {isArabic ? 'ابدأ الاختيار ←' : 'Find Drink →'}
            </button>
          </motion.div>

          {/* Card 3: Split at Seven */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-2xl bg-[#3B1F14]/40 border border-[#3B1F14] hover:border-[#B8924E]/50 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          >
            <div className="space-y-2">
              <span className="font-cormorant text-xs tracking-[0.2em] text-[#B8924E] uppercase">
                03 · SPLIT AT SEVEN
              </span>
              <h3 className="font-messiri text-2xl font-bold text-[#F3E9DA]">
                {isArabic ? 'الحساب من غير لخبطة' : 'Split at Seven Calculator'}
              </h3>
              <p className="text-sm text-[#F3E9DA]/70 font-light max-w-lg">
                {isArabic
                  ? '«كل واحد يدفع اللي عليه بالظبط.» حاسبة دقيقة مخصصة لقعدات الأصحاب، تقسم الطلبات المشتركة والجولات، بدون أي خطأ في القروش وبدون إحراج.'
                  : 'Exact integer-based check calculation for groups, zero discrepancy guaranteed.'}
              </p>
            </div>
            <button
              onClick={() => setSection('split')}
              className="px-5 py-2.5 rounded-lg bg-[#1B0F0A] hover:bg-[#3B1F14] border border-[#B8924E]/40 text-xs font-semibold text-[#F3E9DA] hover:text-[#B8924E] shrink-0 transition-colors cursor-pointer"
            >
              {isArabic ? 'قسّم الحساب ←' : 'Split Bill →'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. RELAX CAFÉ — “فوق الزحمة” THE SEVENTH FRAME EDITORIAL SECTION          */}
      {/* ========================================================================= */}
      <TheSeventhFrameSection />
    </div>
  );
};
