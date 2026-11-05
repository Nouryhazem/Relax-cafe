import React, { useState } from 'react';
import { motion, Variants } from 'motion/react';
import { PauseMark } from '../brand/PauseMark';
import { soundManager } from '../../lib/sound-manager';
import { ChevronRight, ChevronLeft, MoveHorizontal, Camera } from 'lucide-react';

interface RelaxSwipeShowcaseProps {
  isArabic: boolean;
}

interface SlideItem {
  id: string;
  numberTag: string;
  tagAr: string;
  tagEn: string;
  titleAr: string;
  titleEn: string;
  storyAr: string;
  storyEn: string;
  metric: string;
  images: Array<{
    webpUrl: string;
    pngUrl: string;
    captionAr: string;
    captionEn: string;
  }>;
}

export const RelaxSwipeShowcase: React.FC<RelaxSwipeShowcaseProps> = ({ isArabic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
  });

  const slides: SlideItem[] = [
    {
      id: 'space',
      numberTag: '01',
      tagAr: '01 — المكان',
      tagEn: '01 — THE SPACE',
      titleAr: 'قعدة على مزاجك',
      titleEn: 'A Setting at Your Own Pace',
      storyAr:
        'قعدة مع أصحابك، وقت لنفسك، أو استراحة في نص يوم طويل. في Relax هتلاقي مكان تقعد فيه براحتك.',
      storyEn:
        'A gathering with friends, quiet personal time, or a break in the middle of a long day. At Relax, you will find a place to unwind in complete comfort.',
      metric: 'LEVEL SEVEN · TIMBER CEILING · SAMALOUT',
      images: [
        {
          webpUrl: '/assets/aistudio/relax-space-hall.webp',
          pngUrl: '/assets/aistudio/95678FF7-D598-4824-AC80-F39391E0A6EC_d136a697.png',
          captionAr: 'الصالة الرئيسية بالأسقف الخشبية والكراسي المريحة',
          captionEn: 'Main sanctuary hall with timber vaulted roof & plush seating',
        },
        {
          webpUrl: '/assets/aistudio/relax-work-laptop.webp',
          pngUrl: '/assets/aistudio/C5866845-2E27-4EE1-B93B-15B61D8EB9F9_7969579e.png',
          captionAr: 'وقت لنفسك والشغل في هدوء مع فنجان قهوة مضبوط',
          captionEn: 'Personal focus and coffee ritual at your private table',
        },
      ],
    },
    {
      id: 'details',
      numberTag: '02',
      tagAr: '02 — التفاصيل',
      tagEn: '02 — THE DETAILS',
      titleAr: 'كل ركن ليه جوّه',
      titleEn: 'Every Corner Has Its Soul',
      storyAr:
        'من الإضاءة الدافية والكراسي المريحة، للتفاصيل اللي حواليك… كل ركن في Relax له طابعه الخاص.',
      storyEn:
        'From warm layered lighting and plush chairs to the crafted textures around you… every corner at Relax holds its own distinct atmosphere.',
      metric: 'ARTISANAL STONE BAR · AMBIENT WARMTH',
      images: [
        {
          webpUrl: '/assets/aistudio/relax-bar-counter.webp',
          pngUrl: '/assets/aistudio/814E046E-1873-47EB-B8DB-51B9C574AA5F_82a92bde.png',
          captionAr: 'بار القهوة الحجري وتفاصيل الإضاءة الدافئة',
          captionEn: 'Rustic stone coffee bar and curated warm lighting',
        },
        {
          webpUrl: '/assets/aistudio/relax-coffee-table.webp',
          pngUrl: '/assets/aistudio/A4819858-4D3A-4BC6-91CB-984EAD7179B8_50b344ea.png',
          captionAr: 'فنجان قهوة ريلاكس مع الكوكيز في جو هادئ ومريح',
          captionEn: 'Relax artisan cups & confectionery on polished dark tables',
        },
      ],
    },
    {
      id: 'level-seven',
      numberTag: '03',
      tagAr: '03 — الدور السابع',
      tagEn: '03 — LEVEL SEVEN',
      titleAr: 'الدنيا من فوق مختلفة',
      titleEn: 'The World Looks Different From Above',
      storyAr:
        'على الدور السابع، بعيد شوية عن زحمة الشارع، تقدر تهدى وتستمتع بوقتك، سواء جاي لقعدة طويلة أو قهوة سريعة.',
      storyEn:
        'On Level Seven, elevated above the bustling street, you can slow down and savor your time, whether staying for hours or grabbing a quick brew.',
      metric: 'PANORAMIC GLASS · ABOVE THE NOISE',
      images: [
        {
          webpUrl: '/assets/aistudio/relax-level-seven-view.webp',
          pngUrl: '/assets/aistudio/32CCBBFE-041E-4800-86BD-34171C1C4A26_94ea44b5.png',
          captionAr: 'واجهة زجاجية بانورامية وإطلالة هادئة على سمالوط',
          captionEn: 'Floor-to-ceiling glass panoramic perspective over Samalout',
        },
      ],
    },
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prev => {
      let next = prev + newDirection;
      if (next < 0) next = slides.length - 1;
      if (next >= slides.length) next = 0;
      return next;
    });
    soundManager.playFloorTick();
  };

  const currentSlide = slides[currentIndex];
  const currentPhotoIdx = activePhotoIndex[currentIndex] || 0;
  const currentPhoto = currentSlide.images[currentPhotoIdx] || currentSlide.images[0];

  const handleTogglePhoto = (slideIdx: number, photoIdx: number) => {
    setActivePhotoIndex(prev => ({ ...prev, [slideIdx]: photoIdx }));
    soundManager.playPaperUnfold();
  };

  // Motion animation variants for fluid swipe
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? (isArabic ? -250 : 250) : (isArabic ? 250 : -250),
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? (isArabic ? -250 : 250) : (isArabic ? 250 : -250),
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none space-y-8">
      {/* Editorial Header matching user's exact brief */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#3B1F14]">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B1F14]/70 border border-[#B8924E]/40 text-xs text-[#B8924E]">
            <PauseMark size="sm" color="#B8924E" />
            <span className="font-cormorant tracking-[0.25em] uppercase font-semibold">
              {isArabic ? 'فوق الزحمة.' : 'ABOVE THE NOISE.'}
            </span>
          </div>

          <h2 className="font-messiri text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F3E9DA] leading-snug">
            {isArabic
              ? 'في قلب سمالوط، وعلى الدور السابع، Relax مكان تاخد فيه وقتك بعيد عن دوشة اليوم.'
              : 'In the heart of Samalout, on Level Seven, Relax is a sanctuary to take your time away from the noise.'}
          </h2>
        </div>

        {/* Swipe Hint & Navigation Controls */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#F3E9DA]/50 font-light">
            <MoveHorizontal className="w-4 h-4 text-[#B8924E] animate-pulse" />
            <span>{isArabic ? 'اسحب للتصفح' : 'Swipe or click'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(isArabic ? 1 : -1)}
              className="w-10 h-10 rounded-full bg-[#3B1F14] hover:bg-[#B8924E] text-[#F3E9DA] hover:text-[#1B0F0A] border border-[#B8924E]/40 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              onClick={() => paginate(isArabic ? -1 : 1)}
              className="w-10 h-10 rounded-full bg-[#3B1F14] hover:bg-[#B8924E] text-[#F3E9DA] hover:text-[#1B0F0A] border border-[#B8924E]/40 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Tabs for direct clicking */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
              soundManager.playFloorTick();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              idx === currentIndex
                ? 'bg-[#B8924E] text-[#140804] shadow-md font-bold'
                : 'bg-[#3B1F14]/60 text-[#F3E9DA]/70 hover:text-[#F3E9DA] border border-[#3B1F14]'
            }`}
          >
            <span>{isArabic ? s.tagAr : s.tagEn}</span>
          </button>
        ))}
      </div>

      {/* Interactive Swipeable Card Frame with Touch / Drag Handlers */}
      <div className="relative overflow-hidden rounded-3xl bg-[#140804] border border-[#B8924E]/40 shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -100 || offset.x < -80) {
              paginate(isArabic ? -1 : 1);
            } else if (swipe > 100 || offset.x > 80) {
              paginate(isArabic ? 1 : -1);
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-0 cursor-grab active:cursor-grabbing"
        >
          {/* Visual Real Photo Column */}
          <div className="lg:col-span-7 h-80 sm:h-96 lg:h-[480px] relative overflow-hidden bg-[#0A0503] group">
            <picture className="w-full h-full block">
              <source srcSet={currentPhoto.webpUrl} type="image/webp" />
              <img
                src={currentPhoto.pngUrl}
                alt={currentSlide.titleAr}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 block"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('.webp')) {
                    target.src = currentPhoto.pngUrl;
                  } else if (target.src.includes('.png')) {
                    target.src = currentPhoto.webpUrl;
                  }
                }}
              />
            </picture>

            {/* Subtle Vignette Overlay to blend with Espresso Shadow & Warm Ivory identity */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#140804]/90 via-[#140804]/20 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Corner Badge */}
            <div className="absolute top-4 start-4 px-3 py-1 rounded-full bg-[#140804]/80 backdrop-blur-md border border-[#B8924E]/40 text-[11px] text-[#F3E9DA] flex items-center gap-2 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8924E] animate-pulse" />
              <span className="font-messiri font-bold text-[#B8924E]">{currentSlide.tagAr}</span>
            </div>

            {/* Photo Perspective Selector if multiple images available */}
            {currentSlide.images.length > 1 && (
              <div className="absolute top-4 end-4 flex items-center gap-1.5 z-10">
                {currentSlide.images.map((img, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={e => {
                      e.stopPropagation();
                      handleTogglePhoto(currentIndex, pIdx);
                    }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer backdrop-blur-md flex items-center gap-1 ${
                      currentPhotoIdx === pIdx
                        ? 'bg-[#B8924E] text-[#140804] shadow-md font-bold'
                        : 'bg-[#140804]/80 text-[#F3E9DA]/80 border border-[#3B1F14] hover:border-[#B8924E]/50'
                    }`}
                  >
                    <Camera className="w-3 h-3" />
                    <span>{pIdx === 0 ? (isArabic ? 'زاوية 1' : 'View 1') : (isArabic ? 'زاوية 2' : 'View 2')}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Photo Caption */}
            <div className="absolute bottom-4 start-4 end-4 z-10">
              <p className="text-xs text-[#F3E9DA]/90 font-light bg-[#140804]/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#3B1F14]/80 inline-block shadow-lg">
                📍 {isArabic ? currentPhoto.captionAr : currentPhoto.captionEn}
              </p>
            </div>
          </div>

          {/* Editorial Story Column */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-[#1C0E07] to-[#140804] border-t lg:border-t-0 lg:border-s border-[#3B1F14]">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-cormorant tracking-[0.25em] uppercase text-[#B8924E] font-bold">
                  {isArabic ? currentSlide.tagAr : currentSlide.tagEn}
                </span>
                <span className="font-mono text-[11px] text-[#F3E9DA]/40">
                  0{currentIndex + 1} / 0{slides.length}
                </span>
              </div>

              <h3 className="font-messiri text-3xl sm:text-4xl font-bold text-[#F3E9DA] leading-snug">
                {isArabic ? currentSlide.titleAr : currentSlide.titleEn}
              </h3>

              <p className="text-sm sm:text-base text-[#F3E9DA]/85 font-light leading-relaxed">
                {isArabic ? currentSlide.storyAr : currentSlide.storyEn}
              </p>
            </div>

            {/* Bottom Meta & Slide Indicators */}
            <div className="pt-6 border-t border-[#3B1F14] flex items-center justify-between">
              <span className="font-mono text-[10px] sm:text-xs text-[#B8924E] tracking-wider">
                {currentSlide.metric}
              </span>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                      soundManager.playFloorTick();
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex ? 'w-8 bg-[#B8924E]' : 'w-2 bg-[#3B1F14] hover:bg-[#B8924E]/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Required Signature: RELAX CAFÉ · LEVEL SEVEN · SAMALOUT */}
      <div className="text-center pt-2">
        <span className="font-cormorant text-xs sm:text-sm tracking-[0.3em] uppercase text-[#B8924E]/80 font-semibold block">
          RELAX CAFÉ · LEVEL SEVEN · SAMALOUT
        </span>
      </div>
    </div>
  );
};
