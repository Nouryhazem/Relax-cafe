import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PauseMark } from '../brand/PauseMark';
import {
  computeRecommendations,
  RecommendationPreferences,
  RecommendationOutput,
} from '../../lib/recommendation-engine';
import { MoodTag, TemperatureTag, CoffeeTag } from '../../data/menu';
import { soundManager } from '../../lib/sound-manager';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, RotateCcw, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { getDrinkPhotoData, DRINK_PHOTOS } from '../menu/MenuCravingVisuals';

export const FindYourPauseExperience: React.FC = () => {
  const { isArabic, addItemToSplit, setSection } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [prefs, setPrefs] = useState<RecommendationPreferences>({
    mood: 'chill',
    temperature: 'any',
    coffeeType: 'any',
    style: 'balanced',
    maxBudget: 100,
  });

  const [results, setResults] = useState<RecommendationOutput | null>(null);

  const handleInstantPick = () => {
    const moods: MoodTag[] = ['focus', 'chill', 'change_mood', 'sweet_tooth', 'discover'];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const instantPrefs: RecommendationPreferences = {
      mood: randomMood,
      temperature: 'any',
      coffeeType: 'any',
      style: 'balanced',
      maxBudget: 100,
    };
    setPrefs(instantPrefs);
    const recs = computeRecommendations(instantPrefs);
    setResults(recs);
    soundManager.playIceClink();
    setCurrentStep(5);
  };

  const handleMoodSelect = (mood: MoodTag) => {
    setPrefs(p => ({ ...p, mood }));
    setCurrentStep(1);
  };

  const handleTempSelect = (temperature: TemperatureTag | 'any') => {
    setPrefs(p => ({ ...p, temperature }));
    setCurrentStep(2);
  };

  const handleCoffeeSelect = (coffeeType: CoffeeTag | 'any') => {
    setPrefs(p => ({ ...p, coffeeType }));
    setCurrentStep(3);
  };

  const handleStyleSelect = (style: 'light' | 'balanced' | 'strong' | 'sweet') => {
    setPrefs(p => ({ ...p, style }));
    setCurrentStep(4);
  };

  const handleBudgetSelect = (maxBudget: number) => {
    const updated = { ...prefs, maxBudget };
    setPrefs(updated);
    const recs = computeRecommendations(updated);
    setResults(recs);
    soundManager.playIceClink();
    setCurrentStep(5);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-[#1B0F0A] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full">
        {/* ========================================================================= */}
        {/* HEADER & PAUSE SYMBOL PROGRESS */}
        {/* ========================================================================= */}
        <div className="text-center mb-8 sm:mb-12 space-y-2">
          <motion.div
            key={currentStep}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex p-3 rounded-2xl bg-[#3B1F14]/50 border border-[#B8924E]/40 mb-2 shadow-lg"
          >
            <PauseMark
              size="md"
              color={currentStep === 5 ? '#5C6650' : '#B8924E'}
              className="transition-all duration-300"
            />
          </motion.div>

          <h1 className="font-messiri text-3xl sm:text-4xl font-bold text-[#F3E9DA]">
            {isArabic ? 'القعدة اللي على مزاجك مش صدفة.' : 'A pause shaped to your mood.'}
          </h1>

          <p className="font-messiri text-sm sm:text-base text-[#B8924E] font-medium">
            {isArabic ? 'قولنا مودك، ونرشحلك اللي يليق بيه.' : 'Tell us your mood, and we will find what fits.'}
          </p>

          {currentStep < 5 && (
            <div className="flex items-center justify-center gap-1.5 pt-3">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentStep
                      ? 'w-6 bg-[#B8924E]'
                      : idx < currentStep
                      ? 'w-2 bg-[#B8924E]/60'
                      : 'w-2 bg-[#3B1F14]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* QUESTIONS CONTAINER WITH ANIMATEPRESENCE */}
        {/* ========================================================================= */}
        <div className="bg-[#3B1F14]/30 border border-[#3B1F14] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* QUESTION 1: محتاج إيه دلوقتي؟ */}
            {currentStep === 0 && (
              <motion.div
                key="q1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h2 className="font-messiri text-2xl font-bold text-center text-[#F3E9DA]">
                  {isArabic ? 'محتاج إيه دلوقتي؟' : 'What do you need right now?'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'focus', text: 'حاجة تفوقني' },
                    { id: 'chill', text: 'حاجة تروقني' },
                    { id: 'change_mood', text: 'عايز أغيّر مود' },
                    { id: 'sweet_tooth', text: 'عايز حاجة مسكرة' },
                    { id: 'discover', text: 'عايز أجرب حاجة جديدة' },
                  ].map(item => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMoodSelect(item.id as MoodTag)}
                      className="p-4 rounded-xl text-center bg-[#1B0F0A]/70 hover:bg-[#3B1F14] border border-[#3B1F14] hover:border-[#B8924E]/60 transition-all font-messiri text-base font-bold text-[#F3E9DA] hover:text-[#B8924E] cursor-pointer"
                    >
                      {item.text}
                    </motion.button>
                  ))}
                </div>

                {/* Instant "Show For Me" One-Click Option */}
                <div className="pt-2">
                  <button
                    onClick={handleInstantPick}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B8924E] to-[#8C6B2D] hover:from-[#C8A25E] hover:to-[#9C7B3D] text-[#1B0F0A] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-98"
                  >
                    <Sparkles className="w-4 h-4 text-[#1B0F0A]" />
                    <span>{isArabic ? 'اختارلي على مزاجك فوراً (Show For Me)' : 'Show For Me (Instant Pick)'}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* QUESTION 2: سخن ولا ساقع؟ */}
            {currentStep === 1 && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h2 className="font-messiri text-2xl font-bold text-center text-[#F3E9DA]">
                  {isArabic ? 'سخن ولا ساقع؟' : 'Warm or Chilled?'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'hot', text: 'سخن' },
                    { id: 'cold', text: 'ساقع' },
                    { id: 'any', text: 'مش فارقة' },
                  ].map(item => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTempSelect(item.id as TemperatureTag | 'any')}
                      className="p-4 rounded-xl text-center bg-[#1B0F0A]/70 hover:bg-[#3B1F14] border border-[#3B1F14] hover:border-[#B8924E]/60 transition-all font-messiri text-base font-bold text-[#F3E9DA] hover:text-[#B8924E] cursor-pointer"
                    >
                      {item.text}
                    </motion.button>
                  ))}
                </div>
                <div className="pt-2 flex justify-start">
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="text-xs text-[#F3E9DA]/60 hover:text-[#B8924E] flex items-center gap-1 cursor-pointer"
                  >
                    {isArabic ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                    <span>{isArabic ? 'السابق' : 'Back'}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* QUESTION 3: قهوة ولا من غير؟ */}
            {currentStep === 2 && (
              <motion.div
                key="q3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h2 className="font-messiri text-2xl font-bold text-center text-[#F3E9DA]">
                  {isArabic ? 'قهوة ولا من غير؟' : 'Coffee or Coffee-Free?'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'coffee', text: 'قهوة' },
                    { id: 'non-coffee', text: 'من غير قهوة' },
                    { id: 'any', text: 'ورّيني الاتنين' },
                  ].map(item => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCoffeeSelect(item.id as CoffeeTag | 'any')}
                      className="p-4 rounded-xl text-center bg-[#1B0F0A]/70 hover:bg-[#3B1F14] border border-[#3B1F14] hover:border-[#B8924E]/60 transition-all font-messiri text-base font-bold text-[#F3E9DA] hover:text-[#B8924E] cursor-pointer"
                    >
                      {item.text}
                    </motion.button>
                  ))}
                </div>
                <div className="pt-2 flex justify-start">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#F3E9DA]/60 hover:text-[#B8924E] flex items-center gap-1 cursor-pointer"
                  >
                    {isArabic ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                    <span>{isArabic ? 'السابق' : 'Back'}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* QUESTION 4: تحبها إزاي؟ */}
            {currentStep === 3 && (
              <motion.div
                key="q4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h2 className="font-messiri text-2xl font-bold text-center text-[#F3E9DA]">
                  {isArabic ? 'تحبها إزاي؟' : 'How do you prefer it?'}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'light', text: 'خفيفة' },
                    { id: 'balanced', text: 'مظبوطة' },
                    { id: 'strong', text: 'قوية' },
                    { id: 'sweet', text: 'مسكرة' },
                  ].map(item => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStyleSelect(item.id as 'light' | 'balanced' | 'strong' | 'sweet')}
                      className="p-4 rounded-xl text-center bg-[#1B0F0A]/70 hover:bg-[#3B1F14] border border-[#3B1F14] hover:border-[#B8924E]/60 transition-all font-messiri text-base font-bold text-[#F3E9DA] hover:text-[#B8924E] cursor-pointer"
                    >
                      {item.text}
                    </motion.button>
                  ))}
                </div>
                <div className="pt-2 flex justify-start">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-[#F3E9DA]/60 hover:text-[#B8924E] flex items-center gap-1 cursor-pointer"
                  >
                    {isArabic ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                    <span>{isArabic ? 'السابق' : 'Back'}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* QUESTION 5: ميزانيتك لحد كام؟ */}
            {currentStep === 4 && (
              <motion.div
                key="q5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h2 className="font-messiri text-2xl font-bold text-center text-[#F3E9DA]">
                  {isArabic ? 'ميزانيتك لحد كام؟' : 'What is your budget?'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { budget: 40, text: 'حتى 40 ج.م' },
                    { budget: 60, text: 'حتى 60 ج.م' },
                    { budget: 70, text: 'حتى 70 ج.م' },
                    { budget: 100, text: 'حتى 80 ج.م أو أكتر' },
                  ].map(item => (
                    <motion.button
                      key={item.budget}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBudgetSelect(item.budget)}
                      className="p-4 rounded-xl text-center bg-[#1B0F0A]/70 hover:bg-[#3B1F14] border border-[#3B1F14] hover:border-[#B8924E]/60 transition-all font-messiri text-base font-bold text-[#F3E9DA] hover:text-[#B8924E] cursor-pointer"
                    >
                      {item.text}
                    </motion.button>
                  ))}
                </div>
                <div className="pt-2 flex justify-start">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-xs text-[#F3E9DA]/60 hover:text-[#B8924E] flex items-center gap-1 cursor-pointer"
                  >
                    {isArabic ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                    <span>{isArabic ? 'السابق' : 'Back'}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* RESULTS VIEW */}
            {currentStep === 5 && results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {[results.closest, results.trusted, results.discovery].map((res, index) => {
                    const photoData = getDrinkPhotoData(res.item.category, res.item.id);
                    return (
                      <motion.div
                        key={res.item.id + index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.1 }}
                        whileHover={{ y: -2 }}
                        className="p-4 sm:p-5 rounded-2xl bg-[#1B0F0A] border border-[#3B1F14] hover:border-[#B8924E]/50 transition-all space-y-3 shadow-md group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#B8924E]">
                            {res.titleAr}
                          </span>
                          <div className="font-mono text-base font-bold text-[#F3E9DA]">
                            {res.item.price} <span className="text-xs font-normal text-[#F3E9DA]/50">{isArabic ? 'ج.م' : 'EGP'}</span>
                          </div>
                        </div>

                        <div className="flex gap-3.5 items-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#3B1F14] bg-[#140804] relative">
                            <img
                              src={photoData.url}
                              alt={res.item.nameAr}
                              loading="lazy"
                              onError={e => {
                                const fallback =
                                  DRINK_PHOTOS[res.item.category]?.url || DRINK_PHOTOS.drinks.url;
                                if (e.currentTarget.src !== fallback) {
                                  e.currentTarget.src = fallback;
                                }
                              }}
                              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-messiri text-xl font-bold text-[#F3E9DA] truncate">
                              {res.item.nameAr}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#F3E9DA]/75 font-light leading-relaxed line-clamp-2 mt-1">
                              {res.reasonAr}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#3B1F14] flex flex-wrap items-center justify-between gap-2">
                          <button
                            onClick={() => addItemToSplit(res.item)}
                            className="px-4 py-2 rounded bg-[#3B1F14] hover:bg-[#B8924E] text-[#F3E9DA] hover:text-[#1B0F0A] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{isArabic ? 'ضيفه لقعدتك' : 'Add to Split'}</span>
                          </button>

                          <button
                            onClick={() => setSection('menu')}
                            className="text-xs text-[#F3E9DA]/60 hover:text-[#B8924E] transition-colors py-1 cursor-pointer"
                          >
                            {isArabic ? 'شوفه في المنيو' : 'View in Menu'}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="pt-3 flex items-center justify-center">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded bg-[#3B1F14]/60 hover:bg-[#3B1F14] border border-[#B8924E]/40 text-xs font-medium text-[#F3E9DA] hover:text-[#B8924E] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'نجرب تاني' : 'Try Again'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
