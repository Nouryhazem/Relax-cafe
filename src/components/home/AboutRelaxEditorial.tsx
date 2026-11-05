import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PauseMark } from '../brand/PauseMark';
import { motion, useScroll, useTransform } from 'motion/react';
import { Coffee, Sparkles } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* REAL PHOTO CARD: CHAPTER 01 — المكان                                      */
/* -------------------------------------------------------------------------- */
const SpacePhotoCard: React.FC = () => {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden bg-[#160B07] border border-[#B8924E]/40 shadow-2xl group">
      <picture className="w-full h-full block">
        <source srcSet="/assets/aistudio/relax-space-hall.webp" type="image/webp" />
        <img
          src="/assets/aistudio/95678FF7-D598-4824-AC80-F39391E0A6EC_d136a697.png"
          alt="Relax Café Interior Space"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 block"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-[#140804]/90 via-[#140804]/25 to-transparent pointer-events-none" />

      {/* Floating Tag */}
      <div className="absolute bottom-6 start-6 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B0F0A]/90 border border-[#B8924E]/40 text-xs text-[#F3E9DA] backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#B8924E] animate-pulse" />
        <span className="font-messiri text-xs text-[#B8924E] font-bold">
          01 — المكان · الصالة الرئيسية
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* REAL PHOTO CARD: CHAPTER 02 — التفاصيل                                    */
/* -------------------------------------------------------------------------- */
const DetailsPhotoCard: React.FC = () => {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden bg-[#160B07] border border-[#B8924E]/40 shadow-2xl group">
      <picture className="w-full h-full block">
        <source srcSet="/assets/aistudio/relax-bar-counter.webp" type="image/webp" />
        <img
          src="/assets/aistudio/814E046E-1873-47EB-B8DB-51B9C574AA5F_82a92bde.png"
          alt="Relax Café Details & Artisanal Stone Bar"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 block"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-[#140804]/90 via-[#140804]/25 to-transparent pointer-events-none" />

      {/* Floating Tag */}
      <div className="absolute bottom-6 start-6 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B0F0A]/90 border border-[#B8924E]/40 text-xs text-[#F3E9DA] backdrop-blur-md">
        <Coffee className="w-3.5 h-3.5 text-[#B8924E]" />
        <span className="font-messiri text-xs text-[#B8924E] font-bold">
          02 — التفاصيل · البار الحجري والإضاءة
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* REAL PHOTO CARD: CHAPTER 03 — الدور السابع                                */
/* -------------------------------------------------------------------------- */
const LevelSevenPhotoCard: React.FC = () => {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden bg-[#160B07] border border-[#B8924E]/40 shadow-2xl group">
      <picture className="w-full h-full block">
        <source srcSet="/assets/aistudio/relax-level-seven-view.webp" type="image/webp" />
        <img
          src="/assets/aistudio/32CCBBFE-041E-4800-86BD-34171C1C4A26_94ea44b5.png"
          alt="Relax Café Panoramic Glass View"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 block"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-[#140804]/90 via-[#140804]/25 to-transparent pointer-events-none" />

      {/* Floating Tag */}
      <div className="absolute bottom-6 start-6 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B0F0A]/90 border border-[#B8924E]/40 text-xs text-[#F3E9DA] backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#B8924E] animate-pulse" />
        <span className="font-messiri text-xs text-[#B8924E] font-bold">
          03 — الدور السابع · الإطلالة الزجاجية
        </span>
      </div>
    </div>
  );
};

/* ========================================================================== */
/* MAIN EDITORIAL SECTION COMPONENT: LEVEL SEVEN — ABOUT RELAX                */
/* ========================================================================== */
export const AboutRelaxEditorial: React.FC = () => {
  const { isArabic, setSection } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#1B0F0A] overflow-hidden border-t border-[#3B1F14]"
    >
      {/* Background Architectural Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full flex justify-between px-8">
          <div className="w-[1px] h-full bg-gradient-to-b from-[#B8924E]/20 via-[#B8924E]/60 to-transparent" />
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#B8924E]/40 to-transparent hidden md:block" />
          <div className="w-[1px] h-full bg-gradient-to-b from-[#B8924E]/20 via-[#B8924E]/60 to-transparent" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =================================================================== */}
        {/* EDITORIAL HEADER: MATCHING USER BRIEF */}
        {/* =================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B1F14]/70 border border-[#B8924E]/40 text-xs text-[#B8924E] shadow-lg"
          >
            <PauseMark size="sm" color="#B8924E" />
            <span className="font-cormorant tracking-[0.25em] font-semibold uppercase">
              {isArabic ? 'فوق الزحمة.' : 'ABOVE THE NOISE.'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-messiri text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F3E9DA] leading-tight"
          >
            {isArabic
              ? 'في قلب سمالوط، وعلى الدور السابع، Relax مكان تاخد فيه وقتك بعيد عن دوشة اليوم.'
              : 'In the heart of Samalout, on Level Seven, Relax is a sanctuary to take your time away from the noise.'}
          </motion.h2>
        </div>

        {/* Central Vertical Brass Pinstripe Guide (Desktop) */}
        <div className="relative">
          <div
            className="hidden lg:block absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[1.5px] bg-[#3B1F14]"
            aria-hidden="true"
          >
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#B8924E] via-[#F3E9DA] to-[#B8924E] shadow-[0_0_10px_#B8924E]"
            />
          </div>

          <div className="space-y-24 sm:space-y-36">
            {/* =============================================================== */}
            {/* CHAPTER 01: المكان */}
            {/* =============================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Text Side */}
              <div className="lg:text-end space-y-4 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 text-xs font-cormorant tracking-[0.25em] text-[#B8924E] uppercase font-bold">
                  <span>01</span>
                  <span>—</span>
                  <span>المكان</span>
                </div>

                <h3 className="font-messiri text-3xl sm:text-4xl font-bold text-[#F3E9DA]">
                  {isArabic ? 'قعدة على مزاجك' : 'A Setting at Your Own Pace'}
                </h3>

                <blockquote className="p-4 sm:p-5 rounded-2xl bg-[#3B1F14]/50 border-s-4 border-[#B8924E] text-[#F3E9DA] font-messiri text-lg sm:text-xl font-medium leading-relaxed shadow-lg">
                  {isArabic
                    ? '«قعدة مع أصحابك، وقت لنفسك، أو استراحة في نص يوم طويل. في Relax هتلاقي مكان تقعد فيه براحتك.»'
                    : '“A gathering with friends, quiet personal time, or a break in the middle of a long day. At Relax, you will find a place to unwind in complete comfort.”'}
                </blockquote>
              </div>

              {/* Artwork Side */}
              <div className="order-1 lg:order-2">
                <SpacePhotoCard />
              </div>
            </motion.div>

            {/* =============================================================== */}
            {/* CHAPTER 02: التفاصيل */}
            {/* =============================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Artwork Side */}
              <div className="order-1">
                <DetailsPhotoCard />
              </div>

              {/* Text Side */}
              <div className="space-y-4 order-2">
                <div className="inline-flex items-center gap-2 text-xs font-cormorant tracking-[0.25em] text-[#B8924E] uppercase font-bold">
                  <span>02</span>
                  <span>—</span>
                  <span>التفاصيل</span>
                </div>

                <h3 className="font-messiri text-3xl sm:text-4xl font-bold text-[#F3E9DA]">
                  {isArabic ? 'كل ركن ليه جوّه' : 'Every Corner Has Its Soul'}
                </h3>

                <blockquote className="p-4 sm:p-5 rounded-2xl bg-[#3B1F14]/50 border-s-4 border-[#B8924E] text-[#F3E9DA] font-messiri text-lg sm:text-xl font-medium leading-relaxed shadow-lg">
                  {isArabic
                    ? '«من الإضاءة الدافية والكراسي المريحة، للتفاصيل اللي حواليك… كل ركن في Relax له طابعه الخاص.»'
                    : '“From warm layered lighting and plush chairs to the crafted textures around you… every corner at Relax holds its own distinct atmosphere.”'}
                </blockquote>
              </div>
            </motion.div>

            {/* =============================================================== */}
            {/* CHAPTER 03: الدور السابع */}
            {/* =============================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Text Side */}
              <div className="lg:text-end space-y-4 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 text-xs font-cormorant tracking-[0.25em] text-[#B8924E] uppercase font-bold">
                  <span>03</span>
                  <span>—</span>
                  <span>الدور السابع</span>
                </div>

                <h3 className="font-messiri text-3xl sm:text-4xl font-bold text-[#F3E9DA]">
                  {isArabic ? 'الدنيا من فوق مختلفة' : 'The World Looks Different From Above'}
                </h3>

                <blockquote className="p-4 sm:p-5 rounded-2xl bg-[#3B1F14]/50 border-s-4 border-[#B8924E] text-[#F3E9DA] font-messiri text-lg sm:text-xl font-medium leading-relaxed shadow-lg">
                  {isArabic
                    ? '«على الدور السابع، بعيد شوية عن زحمة الشارع، تقدر تهدى وتستمتع بوقتك، سواء جاي لقعدة طويلة أو قهوة سريعة.»'
                    : '“On Level Seven, elevated above the bustling street, you can slow down and savor your time, whether staying for hours or grabbing a quick brew.”'}
                </blockquote>
              </div>

              {/* Artwork Side */}
              <div className="order-1 lg:order-2">
                <LevelSevenPhotoCard />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Required Signature: RELAX CAFÉ · LEVEL SEVEN · SAMALOUT */}
        <div className="text-center pt-24 sm:pt-32">
          <span className="font-cormorant text-xs sm:text-sm tracking-[0.3em] uppercase text-[#B8924E]/80 font-semibold block">
            RELAX CAFÉ · LEVEL SEVEN · SAMALOUT
          </span>
        </div>
      </div>
    </section>
  );
};
