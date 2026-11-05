import React from 'react';
import { useApp, ActiveSection } from '../../context/AppContext';
import { RelaxLogo } from '../brand/RelaxLogo';
import { PauseMark } from '../brand/PauseMark';
import { Volume2, VolumeX, Info, Building2, Coffee, Sparkles, ReceiptText } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    section,
    setSection,
    lang,
    toggleLang,
    isArabic,
    setUtilityOpen,
    soundEnabled,
    toggleSound,
    splitResult,
  } = useApp();

  const totalDueEGP = Math.round(splitResult.grandTotalPiasters / 100);

  const desktopNavItems: Array<{ id: ActiveSection; labelAr: string; labelEn: string }> = [
    { id: 'seven', labelAr: 'الدور السابع', labelEn: 'Level Seven' },
    { id: 'menu', labelAr: 'المنيو', labelEn: 'Menu' },
    { id: 'find', labelAr: 'Find Your Pause', labelEn: 'Find Your Pause' },
    { id: 'split', labelAr: 'Split at Seven', labelEn: 'Split at Seven' },
  ];

  return (
    <>
      {/* Desktop & Tablet Top Navigation */}
      <header className="sticky top-0 z-40 w-full bg-[#1B0F0A]/95 backdrop-blur-md border-b border-[#3B1F14]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Wordmark & Pause Mark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSection('seven')}
              className="text-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8924E] rounded flex items-center gap-3"
              aria-label="Relax Café"
            >
              <PauseMark size="sm" color="#B8924E" />
              <div className="flex flex-col leading-none">
                <span className="font-pinyon text-3xl md:text-4xl text-[#F3E9DA]">Relax</span>
                <span className="font-cormorant text-[10px] tracking-[0.2em] text-[#B8924E] uppercase -mt-0.5">
                  Café · Level Seven
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {desktopNavItems.map(item => {
              const isActive = section === item.id;
              const isSplit = item.id === 'split';
              return (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`group relative text-sm tracking-wide transition-colors py-2 flex items-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8924E] rounded ${
                    isActive ? 'text-[#F3E9DA] font-semibold' : 'text-[#F3E9DA]/70 hover:text-[#F3E9DA]'
                  }`}
                >
                  {isSplit && totalDueEGP > 0 && (
                    <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#B8924E]" />
                  )}
                  <span>{isArabic ? item.labelAr : item.labelEn}</span>
                  {isActive && <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#B8924E]" />}
                </button>
              );
            })}
          </nav>

          {/* Top Bar Right: Sound Control, Language Switch, Utility */}
          <div className="flex items-center gap-3">
            {/* Active split total pill if items exist */}
            {totalDueEGP > 0 && (
              <button
                onClick={() => setSection('split')}
                className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#3B1F14] border border-[#B8924E]/40 text-xs text-[#F3E9DA] hover:border-[#B8924E] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8924E]" />
                <span className="text-[#B8924E] font-medium">{isArabic ? 'الحساب:' : 'Check:'}</span>
                <span className="font-mono tabular-nums text-[#F3E9DA]">{totalDueEGP} {isArabic ? 'ج.م' : 'EGP'}</span>
              </button>
            )}

            {/* Sound Control */}
            <button
              onClick={toggleSound}
              className="p-2 rounded text-[#F3E9DA]/70 hover:text-[#B8924E] hover:bg-[#3B1F14]/50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8924E]"
              aria-label={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
              title={soundEnabled ? 'الصوت مفعّل' : 'الصوت مكتوم'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#B8924E]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Switch */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 text-xs tracking-wider uppercase rounded border border-[#3B1F14] hover:border-[#B8924E]/60 text-[#F3E9DA] hover:text-[#B8924E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8924E]"
            >
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>

            {/* Utility Drawer Button */}
            <button
              onClick={() => setUtilityOpen(true)}
              className="p-2 rounded border border-[#3B1F14] hover:border-[#B8924E]/50 text-[#F3E9DA]/80 hover:text-[#B8924E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8924E]"
              aria-label="الموقع ومواعيد العمل"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation (Seven, Menu, اختارلي, الحساب) */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#1B0F0A]/95 backdrop-blur-lg border-t border-[#3B1F14] pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1 px-3"
        aria-label="Mobile Navigation"
      >
        <div className="grid grid-cols-4 gap-1 items-center max-w-md mx-auto">
          {/* Seven */}
          <button
            onClick={() => setSection('seven')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all min-h-[48px] ${
              section === 'seven' ? 'text-[#B8924E] bg-[#3B1F14]/50 font-medium' : 'text-[#F3E9DA]/70 hover:text-[#F3E9DA]'
            }`}
          >
            <Building2 className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] leading-tight truncate">Seven</span>
            {section === 'seven' && <span className="w-3 h-0.5 bg-[#B8924E] rounded-full mt-0.5" />}
          </button>

          {/* Menu */}
          <button
            onClick={() => setSection('menu')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all min-h-[48px] ${
              section === 'menu' ? 'text-[#B8924E] bg-[#3B1F14]/50 font-medium' : 'text-[#F3E9DA]/70 hover:text-[#F3E9DA]'
            }`}
          >
            <Coffee className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] leading-tight truncate">Menu</span>
            {section === 'menu' && <span className="w-3 h-0.5 bg-[#B8924E] rounded-full mt-0.5" />}
          </button>

          {/* اختارلي */}
          <button
            onClick={() => setSection('find')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all min-h-[48px] ${
              section === 'find' ? 'text-[#B8924E] bg-[#3B1F14]/50 font-medium' : 'text-[#F3E9DA]/70 hover:text-[#F3E9DA]'
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] leading-tight truncate">{isArabic ? 'اختارلي' : 'Find'}</span>
            {section === 'find' && <span className="w-3 h-0.5 bg-[#B8924E] rounded-full mt-0.5" />}
          </button>

          {/* الحساب */}
          <button
            onClick={() => setSection('split')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all min-h-[48px] relative ${
              section === 'split' ? 'text-[#B8924E] bg-[#3B1F14]/50 font-medium' : 'text-[#F3E9DA]/70 hover:text-[#F3E9DA]'
            }`}
          >
            <div className="relative">
              <ReceiptText className="w-4 h-4 mb-0.5" />
              {totalDueEGP > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#B8924E] ring-2 ring-[#1B0F0A]" />
              )}
            </div>
            <span className="text-[10px] leading-tight truncate">
              {totalDueEGP > 0 ? `${totalDueEGP} ج` : (isArabic ? 'الحساب' : 'Split')}
            </span>
            {section === 'split' && <span className="w-3 h-0.5 bg-[#B8924E] rounded-full mt-0.5" />}
          </button>
        </div>
      </nav>
    </>
  );
};
