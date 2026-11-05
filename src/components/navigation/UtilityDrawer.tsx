import React from 'react';
import { useApp } from '../../context/AppContext';
import { RelaxLogo } from '../brand/RelaxLogo';
import { PauseMark } from '../brand/PauseMark';
import { X, MapPin, Clock, Phone, MessageSquare, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const UtilityDrawer: React.FC = () => {
  const { utilityOpen, setUtilityOpen, isArabic, lang, toggleLang } = useApp();

  if (!utilityOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setUtilityOpen(false)}
        className="fixed inset-0 bg-[#1B0F0A]/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isArabic ? 'بيانات ريلاكس كافيه' : 'Relax Café Details'}
        className="relative z-10 w-full max-w-md bg-[#1B0F0A] border-s border-[#3B1F14] text-[#F3E9DA] flex flex-col justify-between p-6 sm:p-8 shadow-2xl overflow-y-auto"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#3B1F14]">
            <RelaxLogo layout="horizontal" size="sm" />
            <button
              onClick={() => setUtilityOpen(false)}
              className="p-2 rounded hover:bg-[#3B1F14] text-[#F3E9DA]/70 hover:text-[#F3E9DA] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8924E]"
              aria-label={isArabic ? 'إغلاق' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Brand Positioning */}
          <div className="py-6 border-b border-[#3B1F14]">
            <div className="flex items-center gap-2 text-[#B8924E] text-xs font-semibold uppercase tracking-widest mb-1.5">
              <PauseMark size="sm" color="#B8924E" />
              <span>{isArabic ? 'الهوية والرسالة' : 'The Elevation'}</span>
            </div>
            <h3 className="font-messiri text-xl font-bold text-[#F3E9DA] mb-1">
              {isArabic ? 'فوق الزحمة، وقتك بيرجع ليك.' : 'Seven floors above the noise.'}
            </h3>
            <p className="text-sm text-[#F3E9DA]/70 leading-relaxed font-light">
              {isArabic
                ? 'ريلاكس كافيه في سمالوط، المنيا، يقع في الدور السابع ويُصعد إليه بالأسانسير. مكان مغلق هادئ ومريح، مجهز بجدران زجاجية وأسقف خشبية دافئة، مصمم لتبتعد عن دوشة الشارع وتستمتع بوقتك.'
                : 'Relax Café is an established local refuge in Samalout, Minya, perched on Level Seven and accessed by elevator. An enclosed, climate-controlled sanctuary with timber beams, terracotta seats, and glass walls overlooking the city.'}
            </p>
          </div>

          {/* Hours & Elevation Details */}
          <div className="py-6 space-y-5 border-b border-[#3B1F14]">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded bg-[#3B1F14] text-[#B8924E] shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#F3E9DA]/50 block">
                  {isArabic ? 'مواعيد العمل' : 'Opening Hours'}
                </span>
                <p className="text-sm font-medium text-[#F3E9DA] mt-0.5">
                  {isArabic ? 'يومياً: من 10:00 صباحاً حتى 1:00 منتصف الليل' : 'Daily: 10:00 AM until 1:00 AM Midnight'}
                </p>
                <span className="text-xs text-[#5C6650] mt-0.5 block">
                  {isArabic ? 'خدمة هادئة ومساحة مريحة للقعدة والتركيز' : 'Quiet hospitality and calm seating'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded bg-[#3B1F14] text-[#B8924E] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#F3E9DA]/50 block">
                  {isArabic ? 'العنوان والوصول' : 'Location & Access'}
                </span>
                <p className="text-sm font-medium text-[#F3E9DA] mt-0.5">
                  {isArabic ? 'سمالوط، محافظة المنيا — الدور السابع (أسانسير)' : 'Samalout, Minya Governorate — Level 7 (Elevator)'}
                </p>
                <p className="text-xs text-[#F3E9DA]/60 mt-0.5">
                  {isArabic ? 'طابق داخلي مغلق بالكامل بإطلالة زجاجية هادئة' : 'Fully enclosed indoor level with glass perspective'}
                </p>
                <a
                  href="https://www.google.com/search?q=relax+cafe&rlz=1C9BKJA_enEG1232EG1232&oq=relax+cafe&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABixAxiABDIHCAIQABiABDIKCAMQABixAxiABDIHCAQQABiABDINCAUQABiDARixAxiABDIHCAYQABiABDINCAcQABiDARixAxiABDIHCAgQABiABDIHCAkQABiABNIBCDM5NDdqMGo3qAIYsAIB4gMEGAEgX_EFfIOcwcz3AlvxBXyDnMHM9wJb&hl=en-US&sourceid=chrome-mobile&source=chrome.ob&ie=UTF-8&sei=by_satiJD8umhbIPib6qoAk&dlnr=1#ebo=0&sv=CAMSwwEalgEKBwoDdWRtEgAQARoQcHYtL2cvMTFwejZkX3BnNyoXCg0vZy8xMXB6NmRfcGc3IgYKABACGAIyXgoKcmVsYXggY2FmZUjHq7_m-LWAgAhaFhAAEAEYACIKcmVsYXggY2FmZTICYXKSAQtjb2ZmZWVfc2hvcKoBAOoBHAoaCAoSFkNJSE0wb2dLRUlDQWdJRFdnUF9jY2cgJiokCg5sY2wtcGxhY2UtdGlsZRIQcHYtL2cvMTFwejZkX3BnNxgBMAEYCiDxzOe8DA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#B8924E] hover:underline mt-1.5 font-medium"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'افتح الموقع على خريطة جوجل' : 'Open on Google Maps'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded bg-[#3B1F14] text-[#B8924E] shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#F3E9DA]/50 block">
                  {isArabic ? 'التواصل المباشر' : 'Direct Contact'}
                </span>
                <a
                  href="tel:+201111727490"
                  className="text-sm font-medium text-[#F3E9DA] hover:text-[#B8924E] mt-0.5 dir-ltr block text-start transition-colors"
                >
                  +20 11 11727490
                </a>
                <a
                  href="https://wa.me/201111727490"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#B8924E] hover:underline mt-1 font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'محادثة واتساب مباشرة' : 'WhatsApp Direct Message'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Hospitality Code & Private Events */}
          <div className="py-6">
            <div className="p-4 rounded bg-[#3B1F14]/40 border border-[#3B1F14] text-xs text-[#F3E9DA]/70 space-y-2">
              <div className="flex items-center gap-2 text-[#F3E9DA] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#B8924E]" />
                <span>{isArabic ? 'الحجوزات والمناسبات في الدور السابع' : 'Reservations & Events'}</span>
              </div>
              <p>
                {isArabic
                  ? 'متاح الحجز المسبق لأعياد الميلاد والمؤتمرات والفعاليات الخاصة مع تجهيز متكامل للمكان لضمان راحة وخصوصية تامة.'
                  : 'Advance reservations are available for birthdays, conferences, and private gatherings with dedicated arrangements.'}
              </p>
              <a
                href="https://wa.me/201111727490?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%AD%D8%A7%D8%A8%D8%A8%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%B1%20%D8%B9%D9%86%20%D8%AD%D8%AC%D8%B2%20%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A9%20%D9%81%D9%8A%20%D8%B1%D9%8A%D9%84%D8%A7%D9%83%D8%B3%20%D9%83%D8%A7%D9%81%D9%8A%D9%87"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#B8924E] hover:underline font-medium pt-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isArabic ? 'احجز مناسبتك أو مؤتمرك عبر واتساب' : 'Book event via WhatsApp'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer actions inside drawer */}
        <div className="pt-6 border-t border-[#3B1F14] flex items-center justify-between text-xs text-[#F3E9DA]/60">
          <button
            onClick={toggleLang}
            className="text-[#B8924E] hover:underline uppercase tracking-wider"
          >
            {lang === 'ar' ? 'English Version' : 'النسخة العربية'}
          </button>
          <span>Relax Café © Level Seven</span>
        </div>
      </div>
    </div>
  );
};
