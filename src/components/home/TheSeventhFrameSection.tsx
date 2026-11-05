import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PauseMark } from '../brand/PauseMark';
import { soundManager } from '../../lib/sound-manager';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, MoveHorizontal, Camera, Check } from 'lucide-react';

interface PhotoItem {
  id: string;
  chapterNumber: string;
  chapterTagAr: string;
  chapterTagEn: string;
  subTitleAr: string;
  subTitleEn: string;
  titleAr: string;
  titleEn: string;
  storyAr: string;
  storyEn: string;
  metric: string;
  webpUrl: string;
  thumbUrl: string;
  pngUrl: string;
  captionAr: string;
  captionEn: string;
}

export const TheSeventhFrameSection: React.FC = () => {
  const { isArabic } = useApp();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  // The 5 authentic user-provided photographs mapped directly to the 3 chapters
  const photos: PhotoItem[] = [
    {
      id: 'space-hall',
      chapterNumber: '01',
      chapterTagAr: '01 — المكان',
      chapterTagEn: '01 — THE SPACE',
      subTitleAr: 'الصالة الرئيسية',
      subTitleEn: 'Main Sanctuary Hall',
      titleAr: 'قعدة على مزاجك',
      titleEn: 'A Setting at Your Own Pace',
      storyAr:
        'قعدة مع أصحابك، وقت لنفسك، أو استراحة في نص يوم طويل. في Relax هتلاقي مكان تقعد فيه براحتك.',
      storyEn:
        'A gathering with friends, quiet personal time, or a break in the middle of a long day. At Relax, you will find a place to unwind in complete comfort.',
      metric: 'TIMBER VAULTED ROOF · LEVEL 07',
      webpUrl: '/assets/aistudio/relax-space-hall.webp',
      thumbUrl: '/assets/aistudio/thumb-space-hall.webp',
      pngUrl: '/assets/aistudio/95678FF7-D598-4824-AC80-F39391E0A6EC_d136a697.png',
      captionAr: 'الصالة الرئيسية بالأسقف الخشبية الدافئة وإضاءة هادئة',
      captionEn: 'Main hall with timber ceilings and gentle lighting',
    },
    {
      id: 'space-laptop',
      chapterNumber: '01',
      chapterTagAr: '01 — المكان',
      chapterTagEn: '01 — THE SPACE',
      subTitleAr: 'وقت لنفسك وشغل',
      subTitleEn: 'Focus & Work',
      titleAr: 'قعدة على مزاجك',
      titleEn: 'A Setting at Your Own Pace',
      storyAr:
        'قعدة مع أصحابك، وقت لنفسك، أو استراحة في نص يوم طويل. في Relax هتلاقي مكان تقعد فيه براحتك.',
      storyEn:
        'A gathering with friends, quiet personal time, or a break in the middle of a long day. At Relax, you will find a place to unwind in complete comfort.',
      metric: 'QUIET FOCUS TABLE · ESPRESSO & PAUSE',
      webpUrl: '/assets/aistudio/relax-work-laptop.webp',
      thumbUrl: '/assets/aistudio/thumb-work-laptop.webp',
      pngUrl: '/assets/aistudio/C5866845-2E27-4EE1-B93B-15B61D8EB9F9_7969579e.png',
      captionAr: 'مساحة مريحة للتركيز والشغل مع فنجان قهوة وكوكيز',
      captionEn: 'Comfortable work & study corner with artisan coffee',
    },
    {
      id: 'details-bar',
      chapterNumber: '02',
      chapterTagAr: '02 — التفاصيل',
      chapterTagEn: '02 — THE DETAILS',
      subTitleAr: 'البار الحجري',
      subTitleEn: 'Artisanal Stone Bar',
      titleAr: 'كل ركن ليه جوّه',
      titleEn: 'Every Corner Has Its Soul',
      storyAr:
        'من الإضاءة الدافية والكراسي المريحة، للتفاصيل اللي حواليك… كل ركن في Relax له طابعه الخاص.',
      storyEn:
        'From warm layered lighting and plush chairs to the crafted textures around you… every corner at Relax holds its own distinct atmosphere.',
      metric: 'HAND-LAID STONE BAR · ILLUMINATED CELLAR',
      webpUrl: '/assets/aistudio/relax-bar-counter.webp',
      thumbUrl: '/assets/aistudio/thumb-bar-counter.webp',
      pngUrl: '/assets/aistudio/814E046E-1873-47EB-B8DB-51B9C574AA5F_82a92bde.png',
      captionAr: 'بار القهوة الحجري المعماري وتفاصيل الإضاءة الدافئة',
      captionEn: 'Architectural stone coffee bar and ambient illumination',
    },
    {
      id: 'details-coffee',
      chapterNumber: '02',
      chapterTagAr: '02 — التفاصيل',
      chapterTagEn: '02 — THE DETAILS',
      subTitleAr: 'فنجان القهوة والجلسة',
      subTitleEn: 'Coffee Ritual & Tables',
      titleAr: 'كل ركن ليه جوّه',
      titleEn: 'Every Corner Has Its Soul',
      storyAr:
        'من الإضاءة الدافية والكراسي المريحة، للتفاصيل اللي حواليك… كل ركن في Relax له طابعه الخاص.',
      storyEn:
        'From warm layered lighting and plush chairs to the crafted textures around you… every corner at Relax holds its own distinct atmosphere.',
      metric: 'ARTISAN ROAST · POLISHED TABLES',
      webpUrl: '/assets/aistudio/relax-coffee-table.webp',
      thumbUrl: '/assets/aistudio/thumb-coffee-table.webp',
      pngUrl: '/assets/aistudio/A4819858-4D3A-4BC6-91CB-984EAD7179B8_50b344ea.png',
      captionAr: 'كوب القهوة المطبوع بشعار Relax والجلسات الوثيرة',
      captionEn: 'Signature Relax branded cups on polished coffee tables',
    },
    {
      id: 'level-seven-view',
      chapterNumber: '03',
      chapterTagAr: '03 — الدور السابع',
      chapterTagEn: '03 — LEVEL SEVEN',
      subTitleAr: 'الإطلالة البانورامية',
      subTitleEn: 'Panoramic View',
      titleAr: 'الدنيا من فوق مختلفة',
      titleEn: 'The World Looks Different From Above',
      storyAr:
        'على الدور السابع، بعيد شوية عن زحمة الشارع، تقدر تهدى وتستمتع بوقتك، سواء جاي لقعدة طويلة أو قهوة سريعة.',
      storyEn:
        'On Level Seven, elevated above the bustling street, you can slow down and savor your time, whether staying for hours or grabbing a quick brew.',
      metric: 'FLOOR-TO-CEILING GLASS · 24.5M HIGH',
      webpUrl: '/assets/aistudio/relax-level-seven-view.webp',
      thumbUrl: '/assets/aistudio/thumb-level-seven-view.webp',
      pngUrl: '/assets/aistudio/32CCBBFE-041E-4800-86BD-34171C1C4A26_94ea44b5.png',
      captionAr: 'واجهة زجاجية كاملة تكشف أضواء المدينة في هدوء تام',
      captionEn: 'Panoramic glass facade looking over city lights in serenity',
    },
  ];

  const currentPhoto = photos[activeIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex(prev => {
      let next = prev + newDirection;
      if (next < 0) next = photos.length - 1;
      if (next >= photos.length) next = 0;
      return next;
    });
    soundManager.playFloorTick();
  };

  const selectPhoto = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    soundManager.playFloorTick();
  };

  // Chapter jumping shortcuts (01 -> photo 0, 02 -> photo 2, 03 -> photo 4)
  const chapters = [
    { number: '01', labelAr: '01 — المكان', labelEn: '01 — The Space', photoIndex: 0 },
    { number: '02', labelAr: '02 — التفاصيل', labelEn: '02 — The Details', photoIndex: 2 },
    { number: '03', labelAr: '03 — الدور السابع', labelEn: '03 — Level Seven', photoIndex: 4 },
  ];

  return (
    <section
      id="about-relax-section"
      className="relative bg-[#1B0F0A] text-[#F3E9DA] border-t border-[#3B1F14] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 select-none overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#B8924E]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto space-y-10">
        {/* ================================================================= */}
        {/* EDITORIAL HEADER: EXACT USER COPY                                 */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#3B1F14]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B1F14]/70 border border-[#B8924E]/40 text-xs text-[#B8924E]">
              <PauseMark size="sm" color="#B8924E" />
              <span className="font-cormorant tracking-[0.25em] uppercase font-semibold">
                {isArabic ? 'فوق الزحمة.' : 'ABOVE THE NOISE.'}
              </span>
            </div>

            <h2 className="font-messiri text-3xl sm:text-5xl font-bold text-[#F3E9DA] leading-tight">
              {isArabic ? 'فوق الزحمة.' : 'Above the Noise.'}
            </h2>

            <p className="font-messiri text-base sm:text-xl text-[#D8C7A5] font-light leading-relaxed">
              {isArabic
                ? 'في قلب سمالوط، وعلى الدور السابع، Relax مكان تاخد فيه وقتك بعيد عن دوشة اليوم.'
                : 'In the heart of Samalout, on Level Seven, Relax is a sanctuary to take your time away from the noise.'}
            </p>
          </div>

          {/* Swipe & Arrow Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#F3E9DA]/50 font-light">
              <MoveHorizontal className="w-4 h-4 text-[#B8924E] animate-pulse" />
              <span>{isArabic ? 'اسحب للتصفح' : 'Swipe photos'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => paginate(isArabic ? 1 : -1)}
                className="w-11 h-11 rounded-full bg-[#3B1F14] hover:bg-[#B8924E] text-[#F3E9DA] hover:text-[#1B0F0A] border border-[#B8924E]/40 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous Photo"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                onClick={() => paginate(isArabic ? -1 : 1)}
                className="w-11 h-11 rounded-full bg-[#3B1F14] hover:bg-[#B8924E] text-[#F3E9DA] hover:text-[#1B0F0A] border border-[#B8924E]/40 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Next Photo"
                title="Next"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CHAPTER TABS (01 — المكان / 02 — التفاصيل / 03 — الدور السابع)     */}
        {/* ================================================================= */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {chapters.map(c => {
            const isChapterActive = currentPhoto.chapterNumber === c.number;
            return (
              <button
                key={c.number}
                onClick={() => selectPhoto(c.photoIndex)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                  isChapterActive
                    ? 'bg-[#B8924E] text-[#140804] border-[#B8924E] shadow-lg font-bold'
                    : 'bg-[#3B1F14]/60 text-[#F3E9DA]/70 hover:text-[#F3E9DA] hover:bg-[#3B1F14] border-[#3B1F14]'
                }`}
              >
                <span>{isArabic ? c.labelAr : c.labelEn}</span>
                {isChapterActive && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* MAIN SWIPEABLE SHOWCASE CARD                                     */}
        {/* ================================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-[#140804] border border-[#B8924E]/40 shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, x: direction > 0 ? (isArabic ? -80 : 80) : (isArabic ? 80 : -80) }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? (isArabic ? -80 : 80) : (isArabic ? 80 : -80) }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -80 || offset.x < -60) {
                paginate(isArabic ? -1 : 1);
              } else if (swipe > 80 || offset.x > 60) {
                paginate(isArabic ? 1 : -1);
              }
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-0 cursor-grab active:cursor-grabbing"
          >
            {/* Visual Photo Column */}
            <div className="lg:col-span-7 h-80 sm:h-96 lg:h-[480px] relative overflow-hidden bg-[#0A0503] group">
              <picture className="w-full h-full block">
                <source srcSet={currentPhoto.webpUrl} type="image/webp" />
                <img
                  src={currentPhoto.webpUrl}
                  alt={currentPhoto.titleAr}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 block"
                  loading="eager"
                  decoding="async"
                  onError={e => {
                    const target = e.currentTarget;
                    if (target.src.includes('.webp')) {
                      target.src = currentPhoto.pngUrl;
                    }
                  }}
                />
              </picture>

              {/* Cinematic Vignette */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#140804]/90 via-[#140804]/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Corner Badge */}
              <div className="absolute top-4 start-4 px-3.5 py-1.5 rounded-full bg-[#140804]/85 backdrop-blur-md border border-[#B8924E]/50 text-xs text-[#F3E9DA] flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#B8924E] animate-pulse" />
                <span className="font-messiri font-bold text-[#B8924E]">{currentPhoto.chapterTagAr}</span>
                <span className="text-[#F3E9DA]/40">·</span>
                <span className="font-messiri text-xs text-[#F3E9DA]/80">{currentPhoto.subTitleAr}</span>
              </div>

              {/* Perspective Indicator Pill */}
              <div className="absolute top-4 end-4 px-3 py-1 rounded-full bg-[#140804]/85 backdrop-blur-md border border-[#3B1F14] text-[11px] font-mono text-[#D8C7A5] flex items-center gap-1.5 shadow-md">
                <Camera className="w-3.5 h-3.5 text-[#B8924E]" />
                <span>0{activeIndex + 1} / 0{photos.length}</span>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 start-4 end-4 z-10">
                <p className="text-xs text-[#F3E9DA]/90 font-light bg-[#140804]/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#3B1F14] inline-block shadow-lg">
                  📍 {isArabic ? currentPhoto.captionAr : currentPhoto.captionEn}
                </p>
              </div>
            </div>

            {/* Editorial Story Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-[#1C0E07] to-[#140804] border-t lg:border-t-0 lg:border-s border-[#3B1F14]">
              <div className="space-y-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-cormorant tracking-[0.25em] uppercase text-[#B8924E] font-bold">
                    {isArabic ? currentPhoto.chapterTagAr : currentPhoto.chapterTagEn}
                  </span>
                  <span className="font-mono text-[11px] text-[#F3E9DA]/40">
                    PHOTO 0{activeIndex + 1} OF 0{photos.length}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-[#B8924E] font-messiri block">
                    {isArabic ? currentPhoto.subTitleAr : currentPhoto.subTitleEn}
                  </span>
                  <h3 className="font-messiri text-3xl sm:text-4xl font-bold text-[#F3E9DA] leading-snug">
                    {isArabic ? currentPhoto.titleAr : currentPhoto.titleEn}
                  </h3>
                </div>

                <blockquote className="p-4 rounded-2xl bg-[#3B1F14]/40 border-s-4 border-[#B8924E] text-sm sm:text-base text-[#F3E9DA]/90 font-light leading-relaxed">
                  «{isArabic ? currentPhoto.storyAr : currentPhoto.storyEn}»
                </blockquote>
              </div>

              {/* Bottom Meta & Navigation Dots */}
              <div className="pt-6 border-t border-[#3B1F14] flex items-center justify-between mt-6">
                <span className="font-mono text-[10px] sm:text-xs text-[#B8924E] tracking-wider">
                  {currentPhoto.metric}
                </span>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectPhoto(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeIndex
                          ? 'w-7 bg-[#B8924E]'
                          : 'w-2 bg-[#3B1F14] hover:bg-[#B8924E]/50'
                      }`}
                      aria-label={`Photo ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================================================================= */}
        {/* ALL 5 PHOTOS QUICK THUMBNAIL STRIP: FAST 20KB LIGHTWEIGHT WEBP    */}
        {/* ================================================================= */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-[#F3E9DA]/60">
            <span className="font-messiri font-medium text-[#B8924E]">
              {isArabic ? 'معرض صور ريلاكس (5 صور حقيقية)' : 'Relax Real Gallery (5 Authentic Photos)'}
            </span>
            <span className="font-mono text-[11px] text-[#F3E9DA]/40">
              {isArabic ? 'اضغط على أي صورة للتكبير' : 'Click any photo to enlarge'}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {photos.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => selectPhoto(idx)}
                  className={`relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? 'border-[#B8924E] ring-2 ring-[#B8924E] scale-102 shadow-lg shadow-[#B8924E]/20'
                      : 'border-[#3B1F14] opacity-60 hover:opacity-100 hover:border-[#B8924E]/50'
                  }`}
                  aria-label={`Select photo ${idx + 1}: ${item.subTitleAr}`}
                >
                  <img
                    src={item.thumbUrl}
                    alt={item.subTitleAr}
                    className="w-full h-full object-cover block"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={300}
                  />

                  {/* Micro Badge */}
                  <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-[#140804]/90 to-transparent">
                    <span className="text-[9px] sm:text-[11px] font-mono text-[#F3E9DA] truncate block text-center">
                      0{idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* MANDATORY SIGNATURE STAMP                                        */}
        {/* ================================================================= */}
        <div className="text-center pt-6 sm:pt-10 border-t border-[#3B1F14]/60">
          <span className="font-cormorant text-xs sm:text-sm tracking-[0.3em] uppercase text-[#B8924E] font-bold block">
            RELAX CAFÉ · LEVEL SEVEN · SAMALOUT
          </span>
        </div>
      </div>
    </section>
  );
};
