import React from 'react';
import { useApp } from '../../context/AppContext';
import { RelaxLogo } from '../brand/RelaxLogo';
import { PauseMark } from '../brand/PauseMark';
import { MapPin, Clock, Phone, MessageSquare, ArrowUp, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const { isArabic, lang, toggleLang, setSection } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#140B07] border-t border-[#3B1F14] text-[#F3E9DA] pt-16 pb-24 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Signature Tagline (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <RelaxLogo layout="vertical" size="md" color="brass" showTagline={true} />
            <p className="font-editorial text-sm sm:text-base text-[#F3E9DA]/70 font-light italic text-center md:text-start max-w-sm mx-auto md:mx-0">
              “If it matters, take it to Seven.”
            </p>
            <p className="text-xs text-[#F3E9DA]/60 leading-relaxed font-light text-center md:text-start max-w-sm mx-auto md:mx-0">
              {isArabic
                ? 'ريلاكس كافيه — سمالوط، المنيا. ملاذ هادئ في الدور السابع، يُصعد إليه بالأسانسير للاستمتاع بوقت نوعي وخصوصية تامة بعيداً عن صخب الشارع.'
                : 'Relax Café — Samalout, Minya. An enclosed seventh-floor sanctuary accessed by elevator, designed for slow moments and unhurried hospitality.'}
            </p>
          </div>

          {/* Quick Experience Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-center md:text-start">
            <span className="font-cormorant text-xs uppercase tracking-[0.25em] text-[#B8924E] block">
              {isArabic ? 'التجارب الرقمية' : 'Experiences'}
            </span>
            <ul className="space-y-2 text-xs text-[#F3E9DA]/70">
              <li>
                <button
                  onClick={() => setSection('seven')}
                  className="hover:text-[#B8924E] transition-colors"
                >
                  {isArabic ? 'الدور السابع · تجربة الصعود' : 'Level Seven · Elevation'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSection('menu')}
                  className="hover:text-[#B8924E] transition-colors"
                >
                  {isArabic ? 'المنيو وقائمة المشروبات' : 'Interactive Menu'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSection('find')}
                  className="hover:text-[#B8924E] transition-colors"
                >
                  {isArabic ? 'اكتشف وقفتك · اختيار المشروب' : 'Find Your Pause'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSection('split')}
                  className="hover:text-[#B8924E] transition-colors"
                >
                  {isArabic ? 'قسّم الحساب · Split at Seven' : 'Split at Seven Calculator'}
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Elevation Details (4 cols) */}
          <div className="md:col-span-4 space-y-3.5 text-center md:text-start">
            <span className="font-cormorant text-xs uppercase tracking-[0.25em] text-[#B8924E] block">
              {isArabic ? 'الموقع ومواعيد العمل' : 'Location & Hours'}
            </span>

            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-[#F3E9DA]/80">
              <MapPin className="w-3.5 h-3.5 text-[#B8924E] shrink-0" />
              <a
                href="https://www.google.com/search?q=relax+cafe&rlz=1C9BKJA_enEG1232EG1232&oq=relax+cafe&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABixAxiABDIHCAIQABiABDIKCAMQABixAxiABDIHCAQQABiABDINCAUQABiDARixAxiABDIHCAYQABiABDINCAcQABiDARixAxiABDIHCAgQABiABDIHCAkQABiABNIBCDM5NDdqMGo3qAIYsAIB4gMEGAEgX_EFfIOcwcz3AlvxBXyDnMHM9wJb&hl=en-US&sourceid=chrome-mobile&source=chrome.ob&ie=UTF-8&sei=by_satiJD8umhbIPib6qoAk&dlnr=1#ebo=0&sv=CAMSwwEalgEKBwoDdWRtEgAQARoQcHYtL2cvMTFwejZkX3BnNyoXCg0vZy8xMXB6NmRfcGc3IgYKABACGAIyXgoKcmVsYXggY2FmZUjHq7_m-LWAgAhaFhAAEAEYACIKcmVsYXggY2FmZTICYXKSAQtjb2ZmZWVfc2hvcKoBAOoBHAoaCAoSFkNJSE0wb2dLRUlDQWdJRFdnUF9jY2cgJiokCg5sY2wtcGxhY2UtdGlsZRIQcHYtL2cvMTFwejZkX3BnNxgBMAEYCiDxzOe8DA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8924E] transition-colors underline decoration-[#B8924E]/40 underline-offset-2"
              >
                {isArabic ? 'سمالوط، المنيا — الدور السابع (خريطة جوجل ↗)' : 'Samalout, Minya — Level 7 (Google Maps ↗)'}
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-[#F3E9DA]/80">
              <Clock className="w-3.5 h-3.5 text-[#B8924E] shrink-0" />
              <span>{isArabic ? 'يومياً: من 10:00 صباحاً حتى 1:00 منتصف الليل' : 'Daily: 10:00 AM – 1:00 AM Midnight'}</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-[#F3E9DA]/80">
              <Phone className="w-3.5 h-3.5 text-[#B8924E] shrink-0" />
              <a
                href="tel:+201111727490"
                className="hover:text-[#B8924E] transition-colors dir-ltr font-mono"
              >
                +20 11 11727490
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center md:justify-start gap-3">
              <a
                href="https://wa.me/201111727490"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-[#3B1F14] hover:bg-[#B8924E] text-[#F3E9DA] hover:text-[#1B0F0A] transition-colors"
                aria-label="WhatsApp"
                title="WhatsApp Direct (+20 11 11727490)"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={toggleLang}
                className="px-2.5 py-1 text-xs border border-[#3B1F14] hover:border-[#B8924E] text-[#F3E9DA] rounded transition-colors"
              >
                {lang === 'ar' ? 'English' : 'عربي'}
              </button>
              <button
                onClick={scrollToTop}
                className="p-2 rounded border border-[#3B1F14] hover:border-[#B8924E] text-[#F3E9DA]/70 hover:text-[#B8924E] transition-colors"
                aria-label="Scroll to top"
                title="Top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal */}
        <div className="pt-8 border-t border-[#3B1F14]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F3E9DA]/50">
          <div className="flex items-center gap-2">
            <PauseMark size="sm" color="#B8924E" />
            <span>Relax Café · Level Seven · Samalout, Minya</span>
          </div>
          <span>{isArabic ? '«فوق الزحمة، وقتك بيرجع ليك.» جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
        </div>
      </div>
    </footer>
  );
};
