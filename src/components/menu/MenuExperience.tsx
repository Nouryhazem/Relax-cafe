import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MENU_ITEMS, CATEGORIES, MenuItem, MenuCategory } from '../../data/menu';
import { PauseMark } from '../brand/PauseMark';
import { soundManager } from '../../lib/sound-manager';
import { motion, AnimatePresence } from 'motion/react';
import {
  HotDrinksCravingVisual,
  DrinksRefreshingCravingVisual,
  DrinksHotCravingVisual,
  IcedCoffeeCravingVisual,
  MatchaCravingVisual,
  FreshCravingVisual,
  CocktailCravingVisual,
  SmoothieCravingVisual,
  IceCreamCravingVisual,
  MilkshakeCravingVisual,
  RealisticDrinkCard,
  DRINK_PHOTOS,
  ITEM_SPECIFIC_PHOTOS,
  getDrinkPhotoData,
} from './MenuCravingVisuals';
import {
  ElevatorShaftIllustration,
  TimberCeilingIllustration,
  HandsSharingIllustration,
  ArabicaBranchIllustration,
  LoungeTerracottaIllustration,
  ContinuousStoryFoldLine,
} from './RelaxIllustrationSystem';
import {
  Search,
  Plus,
  Check,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Coffee,
  Sun,
  Flame,
  Star,
  Award,
} from 'lucide-react';

export const MenuExperience: React.FC = () => {
  const {
    isArabic,
    addItemToSplit,
    addManualItemToSplit,
    participants,
    setSection,
    soundEnabled,
    toggleSound,
  } = useApp();

  // Tab mode: 'most_ordered' or category index (0 to 7)
  const [activeTab, setActiveTab] = useState<'most_ordered' | number>('most_ordered');
  const [isFoldCoverOpen, setIsFoldCoverOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [selectedItemForSheet, setSelectedItemForSheet] = useState<MenuItem | null>(null);
  const [withCakeOption, setWithCakeOption] = useState<boolean>(false);

  const [targetParticipantId, setTargetParticipantId] = useState<string>(
    participants.length > 0 ? participants[0].id : ''
  );

  // Requirement: "when are you click on the menu? It should start from the start"
  useEffect(() => {
    setActiveTab('most_ordered');
    setSearchQuery('');
    setIsFoldCoverOpen(true);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Most Ordered Bestsellers Curated Ranking from verified MENU_ITEMS
  const mostOrderedItems = useMemo(() => {
    const list: {
      rank: number;
      item: MenuItem;
      orderBadgeAr: string;
      orderBadgeEn: string;
      cravingQuoteAr: string;
      visual: React.ReactNode;
    }[] = [
      {
        rank: 1,
        item: MENU_ITEMS.find(i => i.id === 'spanish-latte') || MENU_ITEMS[0],
        orderBadgeAr: 'الأكثر طلباً على الإطلاق ⭐',
        orderBadgeEn: 'All-Time #1 Most Ordered',
        cravingQuoteAr: 'قهوة ساقعة متوازنة مع طبقات الحليب المكثف والكراميل.. بتظبط اليوم من أول رشفة.',
        visual: (
          <RealisticDrinkCard
            imageUrl={ITEM_SPECIFIC_PHOTOS['spanish-latte'].url}
            alt="Iced Spanish Latte"
            labelEn="ICED SPANISH LATTE"
            labelAr="آيس سبانيش لاتيه ساقع"
            sensoryTag="🧊 قطرات تكثيف وإسبريسو متوازن"
            className="w-full h-44 sm:h-52"
          />
        ),
      },
      {
        rank: 2,
        item: MENU_ITEMS.find(i => i.id === 'ice-caramel') || MENU_ITEMS[1],
        orderBadgeAr: 'عشاق الكراميل 🍯',
        orderBadgeEn: 'Caramel Favorite',
        cravingQuoteAr: 'صوص الكراميل الذهبي مع الإسبريسو والثلج المكعب.. طعم غني ومحبوب في سمالوط.',
        visual: (
          <RealisticDrinkCard
            imageUrl={ITEM_SPECIFIC_PHOTOS['ice-caramel'].url}
            alt="Iced Caramel Macchiato"
            labelEn="ICED CARAMEL MACCHIATO"
            labelAr="آيس كراميل بالصوص الذهبي"
            sensoryTag="🍯 صوص كراميل دافئ وحليب مثلج"
            className="w-full h-44 sm:h-52"
          />
        ),
      },
      {
        rank: 3,
        item: MENU_ITEMS.find(i => i.id === 'ice-matcha-latte') || MENU_ITEMS[2],
        orderBadgeAr: 'تريند الروقان 🍵',
        orderBadgeEn: 'Trending Zen',
        cravingQuoteAr: 'فوم ماتشا أوجي الياباني الأخضر مع حليب مثلج.. هدوء ونقاء بطعم مميز جداً.',
        visual: (
          <RealisticDrinkCard
            imageUrl={ITEM_SPECIFIC_PHOTOS['ice-matcha-latte'].url}
            alt="Iced Matcha Latte"
            labelEn="CEREMONIAL MATCHA CLOUD"
            labelAr="سحابة ماتشا يابانية مثلجة"
            sensoryTag="🍵 فوم ياباني أخضر وحليب مثلج"
            className="w-full h-44 sm:h-52"
          />
        ),
      },
      {
        rank: 4,
        item: MENU_ITEMS.find(i => i.category === 'cocktails') || MENU_ITEMS[3],
        orderBadgeAr: 'انتعاش الغروب 🌅',
        orderBadgeEn: 'Sunset Refreshment',
        cravingQuoteAr: 'كوكتيل فوار بطعم الفواكه الطبيعية وشرايح الليمون والنعناع.. يديك طاقة وانتعاش.',
        visual: <CocktailCravingVisual className="w-full h-44 sm:h-52" />,
      },
      {
        rank: 5,
        item: MENU_ITEMS.find(i => i.category === 'milkshakes') || MENU_ITEMS[4],
        orderBadgeAr: 'حلو ومتقن 🍦',
        orderBadgeEn: 'Decadent Indulgence',
        cravingQuoteAr: 'قوام تقيل وكريمي مع جيلاتو فانيليا فاخر ودوامات زبدية لذيذة تليق بالقعدة.',
        visual: <MilkshakeCravingVisual className="w-full h-44 sm:h-52" />,
      },
      {
        rank: 6,
        item: MENU_ITEMS.find(i => i.category === 'fresh') || MENU_ITEMS[5],
        orderBadgeAr: 'فريش طبيعي 100% 🍊',
        orderBadgeEn: '100% Cold-Pressed',
        cravingQuoteAr: 'عصير فريش طازج معصور بالطلب بدون أي إضافات صناعية.. طعم الفاكهة الأصلي.',
        visual: <FreshCravingVisual className="w-full h-44 sm:h-52" />,
      },
    ];
    return list;
  }, []);

  const currentCategoryMeta = typeof activeTab === 'number' ? CATEGORIES[activeTab] : null;

  // Natural Egyptian evocative mood phrases
  const moodPhrases = [
    'يروقك من أول رشفة.',
    'ساقع ومظبوط على المود.',
    'اختيار تقيل يستاهل القعدة.',
    'خفيف، فريش، وداخل في وقته.',
    'معمول بحرفية وهدوء في الدور السابع.',
  ];

  const getMoodPhraseForItem = (itemId: string, index: number) => {
    return moodPhrases[(itemId.length + index) % moodPhrases.length];
  };

  const handleSelectTab = (tab: 'most_ordered' | number) => {
    soundManager.playPaperUnfold();
    setActiveTab(tab);
    setSearchQuery('');
  };

  // Get items for current view
  const displayItems = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return MENU_ITEMS.filter(it => {
        return (
          it.nameAr.toLowerCase().includes(q) ||
          it.ingredients?.toLowerCase().includes(q) ||
          it.keywords.some(k => k.toLowerCase().includes(q))
        );
      });
    }

    if (activeTab === 'most_ordered') {
      return mostOrderedItems.map(m => m.item);
    }

    const cat = CATEGORIES[activeTab];
    return MENU_ITEMS.filter(it => it.category === cat.id);
  }, [activeTab, searchQuery, mostOrderedItems]);

  const renderCategoryHeroVisual = (catId: MenuCategory, itemId?: string) => {
    if (itemId && ITEM_SPECIFIC_PHOTOS[itemId]) {
      const data = getDrinkPhotoData(catId, itemId);
      return (
        <RealisticDrinkCard
          imageUrl={data.url}
          alt={data.alt}
          labelEn={data.labelEn}
          labelAr={data.labelAr}
          sensoryTag={data.sensoryTag}
          className="w-full h-full min-h-[320px] sm:min-h-[420px]"
        />
      );
    }
    switch (catId) {
      case 'hot_drinks':
        return <HotDrinksCravingVisual className="w-full h-full min-h-[320px] sm:min-h-[420px]" />;
      case 'drinks':
        return <DrinksRefreshingCravingVisual className="w-full h-full min-h-[320px] sm:min-h-[420px]" />;
      case 'iced_coffee':
        return <IcedCoffeeCravingVisual className="w-full h-full min-h-[320px] sm:min-h-[420px]" />;
      case 'matcha':
        return <MatchaCravingVisual className="w-full h-full min-h-[320px] sm:min-h-[420px]" />;
      case 'fresh':
        return <FreshCravingVisual className="w-full h-full min-h-[320px] sm:min-h-[420px]" />;
      case 'cocktails':
        return <CocktailCravingVisual className="w-full h-full min-h-[320px] sm:min-h-[420px]" />;
      case 'smoothies':
        return <SmoothieCravingVisual className="w-full h-full min-h-[320px] sm:min-h-[420px]" />;
      case 'ice_cream':
        return <IceCreamCravingVisual className="w-full h-full min-h-[320px] sm:min-h-[420px]" />;
      case 'milkshakes':
        return <MilkshakeCravingVisual className="w-full h-full min-h-[320px] sm:min-h-[420px]" />;
      default:
        return <DrinksRefreshingCravingVisual className="w-full h-full min-h-[320px] sm:min-h-[420px]" />;
    }
  };

  const handleItemHover = (item: MenuItem) => {
    setHoveredItemId(item.id);
    if (item.temperature === 'cold') {
      soundManager.playIceClink();
    } else if (item.category === 'ice_cream') {
      soundManager.playSpoonTouch();
    }
  };

  const handleAddItem = (item: MenuItem) => {
    addItemToSplit(item, targetParticipantId ? [targetParticipantId] : undefined);
    soundManager.playAddClick();
  };

  // Find next and prev drinks for mobile vertical swipe
  const currentSheetIndex = useMemo(() => {
    if (!selectedItemForSheet) return -1;
    return displayItems.findIndex(it => it.id === selectedItemForSheet.id);
  }, [selectedItemForSheet, displayItems]);

  const handleNextSheetDrink = () => {
    if (currentSheetIndex >= 0 && currentSheetIndex < displayItems.length - 1) {
      soundManager.playPaperUnfold();
      setSelectedItemForSheet(displayItems[currentSheetIndex + 1]);
    }
  };

  const handlePrevSheetDrink = () => {
    if (currentSheetIndex > 0) {
      soundManager.playPaperUnfold();
      setSelectedItemForSheet(displayItems[currentSheetIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#140804] text-[#1B0F0A] py-6 sm:py-10 px-3 sm:px-6 lg:px-8 selection:bg-[#B8924E]/30 relative overflow-x-hidden font-messiri">
      {/* Background radial ambiance */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 15%, rgba(184, 146, 78, 0.12) 0%, rgba(20, 8, 4, 0.95) 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* TOP EDITORIAL UTILITY BAR */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#3B1F14]/70 text-xs text-[#F3E9DA]/70">
          <div className="flex items-center gap-3">
            <span className="font-pinyon text-2xl sm:text-3xl text-[#B8924E]">Relax</span>
            <span className="hidden sm:inline font-cormorant tracking-[0.25em] uppercase text-[#B8924E] text-[11px] font-bold">
              THE RELAX FOLDOUT EDITION
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={isArabic ? 'ابحث باسم المشروب…' : 'Search drink…'}
                className="bg-[#1C0E07] border border-[#3B1F14] focus:border-[#B8924E] rounded-full py-1.5 ps-8 pe-6 text-xs text-[#F3E9DA] placeholder-[#F3E9DA]/40 outline-none w-36 sm:w-56 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#B8924E] absolute start-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute end-2 top-1/2 -translate-y-1/2 text-[#F3E9DA]/50 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sound Toggle (sound always enabled by default) */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-[#1C0E07] border border-[#3B1F14] hover:border-[#B8924E] text-[#B8924E] transition-colors cursor-pointer"
              aria-label={soundEnabled ? 'Mute' : 'Enable Sound'}
              title={soundEnabled ? 'كتم الصوت' : 'تفعيل المؤثرات الصوتية'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SLIM EDITORIAL CHAPTER INDEX: Starting with "الأكثر طلباً (Most Ordered)" */}
        {/* ========================================================================= */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#1C0E07]/90 border border-[#3B1F14] backdrop-blur-md w-max mx-auto shadow-xl">
            {/* 1. MOST ORDERED TAB */}
            <button
              onClick={() => handleSelectTab('most_ordered')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'most_ordered' && !searchQuery
                  ? 'bg-gradient-to-r from-[#B8924E] to-[#9A7228] text-[#1B0F0A] shadow-[0_2px_12px_rgba(184,146,78,0.4)] scale-102 font-black'
                  : 'text-[#B8924E] hover:text-[#F3E9DA] hover:bg-[#3B1F14]/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{isArabic ? 'الأكثر طلباً' : 'Most Ordered'}</span>
            </button>

            <span className="w-[1px] h-4 bg-[#3B1F14]" />

            {/* 2. THE 8 CATEGORY CHAPTERS */}
            {CATEGORIES.map((cat, idx) => {
              const isActive = activeTab === idx && !searchQuery;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectTab(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#FDFBF7] text-[#1B0F0A] shadow-[0_2px_12px_rgba(184,146,78,0.3)] scale-102'
                      : 'text-[#F3E9DA]/70 hover:text-[#B8924E] hover:bg-[#3B1F14]/50'
                  }`}
                >
                  <span className="font-cormorant text-[10px] opacity-60">0{cat.order}</span>
                  <span>{cat.nameAr}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: THE MOST ORDERED LIST ("الأكثر طلباً في ريلاكس") */}
        {/* ========================================================================= */}
        {activeTab === 'most_ordered' && !searchQuery && (
          <div className="space-y-8 mb-12">
            {/* Editorial Heading */}
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B1F14] border border-[#B8924E]/50 text-xs font-bold text-[#B8924E]">
                <Flame className="w-3.5 h-3.5 fill-current text-[#D9381E]" />
                <span>{isArabic ? 'اختيارات زوار الدور السابع المفضلة' : 'Samalout Crowd Favorites'}</span>
              </div>
              <h2 className="font-messiri text-3xl sm:text-5xl font-bold text-[#FDFBF7]">
                {isArabic ? 'الأكثر طلباً في ريلاكس' : 'Most Ordered at Relax'}
              </h2>
              <p className="text-xs sm:text-sm text-[#D8C7A5] font-light max-w-md mx-auto">
                {isArabic
                  ? 'المشروبات اللي مفيش حد بيجي الدور السابع ومبيطلبهاش. اتعملت بحرفية عشان تعدل مزاجك.'
                  : 'The verified top-selling favorites that define the Relax experience.'}
              </p>
            </div>

            {/* Most Ordered Visual Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mostOrderedItems.map(mo => (
                <div
                  key={mo.rank}
                  onClick={() => setSelectedItemForSheet(mo.item)}
                  className="group cursor-pointer rounded-3xl bg-[#FDFBF7] border-2 border-[#D8C7A5] hover:border-[#B8924E] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(184,146,78,0.25)] hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Visual with Rank Overlay */}
                    <div className="relative">
                      {mo.visual}
                      {/* Gold Foil Rank Badge */}
                      <div className="absolute top-3 start-3 px-3 py-1 rounded-xl bg-[#1B0F0A]/90 backdrop-blur-md border border-[#B8924E] text-[#B8924E] font-bold text-xs flex items-center gap-1.5 shadow-lg">
                        <Star className="w-3.5 h-3.5 fill-current text-[#B8924E]" />
                        <span>#{mo.rank} {isArabic ? 'الأكثر طلباً' : 'Most Ordered'}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#9A7228] uppercase tracking-wider">
                          {isArabic ? mo.orderBadgeAr : mo.orderBadgeEn}
                        </span>
                        <div className="font-mono text-xl sm:text-2xl font-bold text-[#1B0F0A]">
                          {mo.item.price}{' '}
                          <span className="text-xs font-normal text-[#5C3A28] font-sans">
                            {isArabic ? 'ج.م' : 'EGP'}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-messiri text-2xl font-bold text-[#1B0F0A] group-hover:text-[#9A7228] transition-colors leading-tight">
                        {mo.item.nameAr}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#5C3A28] font-light leading-relaxed">
                        {mo.cravingQuoteAr}
                      </p>
                    </div>
                  </div>

                  {/* Add to check action */}
                  <div className="p-5 sm:p-6 pt-0">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleAddItem(mo.item);
                      }}
                      className="w-full py-3 rounded-xl bg-[#1B0F0A] group-hover:bg-[#B8924E] text-[#FDFBF7] group-hover:text-[#1B0F0A] font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#B8924E] group-hover:text-[#1B0F0A]" />
                      <span>{isArabic ? 'ضيفه لحساب القعدة' : 'Add to Table Check'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: THE 8 CATEGORY FOLDOUT PANELS */}
        {/* ========================================================================= */}
        {activeTab !== 'most_ordered' && currentCategoryMeta && !searchQuery && (
          <div className="relative">
            <div className="relative rounded-3xl bg-[#FDFBF7] border-2 border-[#D8C7A5] shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-6 pointer-events-none opacity-40">
                <ContinuousStoryFoldLine className="w-full h-full" color="#8C6B2D" />
              </div>
              <div className="absolute inset-2 rounded-2xl border border-[#B8924E]/30 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
                {/* Visual Column */}
                <div className="lg:col-span-5 relative bg-[#1A0B05] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-e border-[#D8C7A5]/80 overflow-hidden">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl mb-6">
                    {renderCategoryHeroVisual(currentCategoryMeta.id)}
                  </div>

                  <div className="space-y-3 relative z-10 text-[#FDFBF7]">
                    <div className="flex items-center gap-2">
                      <span className="font-cormorant text-xs tracking-[0.25em] uppercase text-[#B8924E] font-bold">
                        CHAPTER 0{currentCategoryMeta.order} OF 09
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#B8924E]" />
                      <span className="font-mono text-xs text-[#FDFBF7]/60">
                        {currentCategoryMeta.priceRange}
                      </span>
                    </div>

                    <h2 className="font-messiri text-3xl sm:text-5xl font-bold text-[#FDFBF7] leading-tight">
                      {currentCategoryMeta.nameAr}
                    </h2>

                    <p className="font-messiri text-sm sm:text-base text-[#D8C7A5] font-light leading-relaxed">
                      “{currentCategoryMeta.shortCopyAr}”
                    </p>

                    <div className="pt-2 flex items-center gap-3 opacity-60">
                      <ElevatorShaftIllustration className="w-12 h-12" color="#B8924E" />
                      <div className="text-[11px] font-mono text-[#D8C7A5] leading-tight">
                        LEVEL 07 · ARCHITECTURAL REFUGE
                        <br />
                        <span className="text-[#B8924E]">SAMALOUT SKYLINE PERSPECTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Column */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-[#FDFBF7] relative">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8DEC8]">
                      <div>
                        <span className="font-cormorant text-xs tracking-[0.2em] uppercase text-[#8C6B2D] font-bold block">
                          AUTHENTIC SPECIALTY ITEMS
                        </span>
                        <h3 className="font-messiri text-xl sm:text-2xl font-bold text-[#1B0F0A]">
                          {isArabic ? `قائمة ${currentCategoryMeta.nameAr}` : `${currentCategoryMeta.nameEn} Selection`}
                        </h3>
                      </div>

                      <span className="font-mono text-xs text-[#5C3A28] font-bold bg-[#FAF4EA] px-3 py-1 rounded-lg border border-[#E8DEC8]">
                        {displayItems.length} {isArabic ? 'مشروب' : 'Items'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {displayItems.map((item, index) => {
                        const isHovered = hoveredItemId === item.id;
                        const moodCopy = getMoodPhraseForItem(item.id, index);
                        const photoData = getDrinkPhotoData(item.category, item.id);

                        return (
                          <div
                            key={item.id}
                            onMouseEnter={() => handleItemHover(item)}
                            onMouseLeave={() => setHoveredItemId(null)}
                            onClick={() => {
                              setSelectedItemForSheet(item);
                              setWithCakeOption(item.id === 'coffee-with-cake');
                            }}
                            className={`p-3 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer border select-none group ${
                              isHovered
                                ? 'bg-[#FAF4EA] border-[#B8924E] shadow-[0_8px_24px_rgba(184,146,78,0.15)] translate-x-1 rtl:-translate-x-1'
                                : 'bg-transparent border-transparent hover:border-[#E8DEC8]'
                            }`}
                          >
                            <div className="flex items-center gap-3.5 sm:gap-4">
                              {/* Realistic Drink Photo Thumbnail */}
                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#D8C7A5]/80 bg-[#140804] shadow-sm relative">
                                <img
                                  src={photoData.url}
                                  alt={item.nameAr}
                                  loading="lazy"
                                  onError={e => {
                                    const fallback =
                                      DRINK_PHOTOS[item.category]?.url || DRINK_PHOTOS.drinks.url;
                                    if (e.currentTarget.src !== fallback) {
                                      e.currentTarget.src = fallback;
                                    }
                                  }}
                                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4
                                    className={`font-messiri text-lg sm:text-xl font-bold transition-colors truncate ${
                                      isHovered ? 'text-[#9A7228]' : 'text-[#1B0F0A]'
                                    }`}
                                  >
                                    {item.nameAr}
                                  </h4>
                                  <span className="text-[10px] text-[#4F6348] font-bold px-1.5 py-0.5 rounded bg-[#EBF2E8] border border-[#C5DAC0] shrink-0">
                                    {isArabic ? 'متاح' : 'Available'}
                                  </span>
                                </div>

                                <div
                                  className={`h-[1px] bg-gradient-to-r from-[#B8924E] to-transparent my-1 transition-all duration-300 ${
                                    isHovered ? 'w-36 opacity-100' : 'w-0 opacity-0'
                                  }`}
                                />

                                {item.ingredients ? (
                                  <p className="text-xs text-[#5C3A28] font-light leading-relaxed line-clamp-1">
                                    <span className="font-semibold text-[#8C6B2D] me-1">
                                      {isArabic ? 'المكونات:' : 'Notes:'}
                                    </span>
                                    {item.ingredients}
                                  </p>
                                ) : (
                                  <p className="text-xs text-[#5C3A28]/80 font-light line-clamp-1">
                                    {moodCopy}
                                  </p>
                                )}
                              </div>

                              <div className="text-end shrink-0 flex flex-col items-end">
                                <div className="font-mono text-xl sm:text-2xl font-bold text-[#9A7228] tabular-nums">
                                  {item.price}{' '}
                                  <span className="text-xs font-normal text-[#5C3A28] font-sans">
                                    {isArabic ? 'ج.م' : 'EGP'}
                                  </span>
                                </div>

                                <button
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleAddItem(item);
                                  }}
                                  className="mt-1.5 px-3 py-1 rounded-lg bg-[#FAF4EA] hover:bg-[#B8924E] border border-[#D8C7A5] hover:border-[#B8924E] text-xs font-bold text-[#1B0F0A] hover:text-[#FDFBF7] transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                                  title="إضافة لحساب القعدة"
                                >
                                  <Plus className="w-3.5 h-3.5 text-[#9A7228] group-hover:text-white" />
                                  <span>{isArabic ? 'ضيفه' : 'Add'}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Between Folds */}
                  <div className="mt-8 pt-6 border-t border-[#E8DEC8] flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (typeof activeTab === 'number') {
                          handleSelectTab(activeTab > 0 ? activeTab - 1 : 'most_ordered');
                        }
                      }}
                      className="text-xs font-bold text-[#5C3A28] hover:text-[#9A7228] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                      <span>{isArabic ? 'القسم السابق' : 'Previous Fold'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (typeof activeTab === 'number') {
                          handleSelectTab(activeTab < CATEGORIES.length - 1 ? activeTab + 1 : 0);
                        }
                      }}
                      className="text-xs font-bold text-[#5C3A28] hover:text-[#9A7228] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isArabic ? 'القسم التالي' : 'Next Fold'}</span>
                      {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: SEARCH RESULTS (IF ACTIVE) */}
        {/* ========================================================================= */}
        {searchQuery && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#FDFBF7] border-2 border-[#D8C7A5] shadow-2xl space-y-6">
            <h3 className="font-messiri text-xl sm:text-2xl font-bold text-[#1B0F0A]">
              {isArabic ? `نتائج البحث عن: "${searchQuery}"` : `Search Results for "${searchQuery}"`} ({displayItems.length})
            </h3>
            {displayItems.length === 0 ? (
              <p className="text-xs text-[#5C3A28]">
                {isArabic ? 'لم نجد مشروب بهذا الاسم، جرب كلمة أخرى.' : 'No items matched your search.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayItems.map(item => {
                  const photoData = getDrinkPhotoData(item.category, item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItemForSheet(item)}
                      className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E8DEC8] hover:border-[#B8924E] cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#D8C7A5]/80 bg-[#140804] relative">
                          <img
                            src={photoData.url}
                            alt={item.nameAr}
                            loading="lazy"
                            onError={e => {
                              const fallback =
                                DRINK_PHOTOS[item.category]?.url || DRINK_PHOTOS.drinks.url;
                              if (e.currentTarget.src !== fallback) {
                                e.currentTarget.src = fallback;
                              }
                            }}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-messiri text-lg font-bold text-[#1B0F0A] truncate">{item.nameAr}</h4>
                          </div>
                          <p className="text-xs text-[#5C3A28] mt-1 line-clamp-1">{item.ingredients || 'مشروب طازج يعد فوراً.'}</p>
                          <span className="font-mono text-base font-bold text-[#9A7228] block mt-1">{item.price} ج.م</span>
                        </div>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleAddItem(item);
                        }}
                        className="mt-3 py-1.5 rounded-lg bg-[#FAF4EA] hover:bg-[#B8924E] hover:text-white text-xs font-bold text-[#1B0F0A] transition-colors flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isArabic ? 'ضيفه لقعدتك' : 'Add to Split'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* AT THE END: FIND YOUR PAUSE CTA */}
        {/* ========================================================================= */}
        <div className="mt-12 text-center py-10 px-4 rounded-3xl bg-[#1C0E07] border border-[#3B1F14] shadow-2xl space-y-4">
          <span className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#B8924E] font-bold block">
            THE PAUSE RITUAL
          </span>
          <h3 className="font-messiri text-2xl sm:text-3xl font-bold text-[#FDFBF7]">
            {isArabic ? 'مش متأكد تشرب إيه النهاردة؟' : 'Unsure what to order today?'}
          </h3>
          <p className="text-sm text-[#D8C7A5] font-light max-w-md mx-auto">
            {isArabic
              ? 'جاوب 5 أسئلة سريعة عن مودك وميزانيتك أو اضغط على اختارلي فوراً ونرشحلك 3 اختيارات حقيقية.'
              : 'Answer quick mood questions or tap instant pick for 3 curated recommendations from the real menu.'}
          </p>
          <button
            onClick={() => setSection('find')}
            className="px-6 py-3 rounded-full bg-[#B8924E] hover:bg-[#C8A25E] text-[#1B0F0A] font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 mx-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isArabic ? 'اختارلي على مزاجي (Find Your Pause)' : 'Find Your Pause'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN EDITORIAL PRODUCT SHEET */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedItemForSheet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-[#140804]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#FDFBF7] border-2 border-[#D8C7A5] p-6 sm:p-8 text-[#1B0F0A] shadow-[0_30px_100px_rgba(0,0,0,0.9)] space-y-6"
            >
              <button
                onClick={() => setSelectedItemForSheet(null)}
                className="absolute top-5 end-5 p-2 rounded-full bg-[#FAF4EA] text-[#5C3A28] hover:text-[#1B0F0A] border border-[#E8DEC8] cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="rounded-2xl overflow-hidden shadow-inner border border-[#E8DEC8]">
                {renderCategoryHeroVisual(selectedItemForSheet.category, selectedItemForSheet.id)}
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-[#E8DEC8] pb-4">
                <div>
                  <span className="font-cormorant text-xs tracking-[0.2em] uppercase text-[#9A7228] font-bold block mb-1">
                    {selectedItemForSheet.category.replace('_', ' ')}
                  </span>
                  <h3 className="font-messiri text-2xl sm:text-3xl font-bold text-[#1B0F0A]">
                    {selectedItemForSheet.nameAr}
                  </h3>
                </div>

                <div className="text-end">
                  <span className="font-mono text-3xl font-bold text-[#9A7228]">
                    {selectedItemForSheet.price +
                      (withCakeOption && selectedItemForSheet.id !== 'coffee-with-cake' ? 5 : 0)}
                  </span>
                  <span className="text-xs text-[#5C3A28] ms-1">{isArabic ? 'ج.م' : 'EGP'}</span>
                  {withCakeOption && selectedItemForSheet.id !== 'coffee-with-cake' && (
                    <span className="block text-[11px] text-[#4F6348] font-semibold">
                      {isArabic ? '(شامل الكيك +5 ج.م)' : '(Incl. Cake +5 EGP)'}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF4EA] border border-[#E8DEC8] space-y-2">
                <p className="font-messiri text-sm font-semibold text-[#8C6B2D]">
                  “{getMoodPhraseForItem(selectedItemForSheet.id, 0)}”
                </p>
                {selectedItemForSheet.ingredients && (
                  <p className="text-xs text-[#5C3A28] font-light leading-relaxed">
                    <span className="font-medium text-[#1B0F0A]">{isArabic ? 'المكونات: ' : 'Ingredients: '}</span>
                    {selectedItemForSheet.ingredients}
                  </p>
                )}
              </div>

              {/* Extra Cake Add-on for Coffee */}
              {selectedItemForSheet.coffeeType === 'coffee' &&
                selectedItemForSheet.id !== 'coffee-with-cake' && (
                  <div
                    onClick={() => setWithCakeOption(!withCakeOption)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                      withCakeOption
                        ? 'bg-[#B8924E]/15 border-[#B8924E] shadow-sm'
                        : 'bg-[#FAF4EA] border-[#E8DEC8] hover:border-[#B8924E]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          withCakeOption
                            ? 'bg-[#B8924E] border-[#B8924E] text-[#1B0F0A]'
                            : 'border-[#9A7228]/40 bg-white'
                        }`}
                      >
                        {withCakeOption && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="font-messiri text-sm font-bold text-[#1B0F0A] block">
                          {isArabic ? 'ضيف قطعة كيك طازجة فاخرة 🍰' : 'Add Fresh Cake Slice 🍰'}
                        </span>
                        <span className="text-[11px] text-[#5C3A28]">
                          {isArabic ? 'عرض خاص مع القهوة (+5 ج.م فقط)' : 'Special combo (+5 EGP only)'}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#9A7228]">
                      +5 {isArabic ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                )}

              {participants.length > 1 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1B0F0A] block">
                    {isArabic ? 'مين هيتحمل الطلب في القعدة؟' : 'Assign in Table Check:'}
                  </label>
                  <select
                    value={targetParticipantId}
                    onChange={e => setTargetParticipantId(e.target.value)}
                    className="w-full bg-white border border-[#D8C7A5] focus:border-[#9A7228] rounded-xl p-2.5 text-xs text-[#1B0F0A] outline-none shadow-sm"
                  >
                    <option value="">{isArabic ? 'مشترك بين كل القعدة بالتساوي' : 'Split equally among all'}</option>
                    {participants.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    if (withCakeOption && selectedItemForSheet.id !== 'coffee-with-cake') {
                      addManualItemToSplit(
                        `${selectedItemForSheet.nameAr} مع كيك`,
                        selectedItemForSheet.price + 5,
                        targetParticipantId ? [targetParticipantId] : undefined
                      );
                    } else {
                      handleAddItem(selectedItemForSheet);
                    }
                    setSelectedItemForSheet(null);
                    setWithCakeOption(false);
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#B8924E] hover:bg-[#C8A25E] text-[#1B0F0A] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {withCakeOption && selectedItemForSheet.id !== 'coffee-with-cake'
                      ? isArabic
                        ? `ضيف ${selectedItemForSheet.nameAr} مع كيك لحساب القعدة (${selectedItemForSheet.price + 5} ج.م)`
                        : `Add ${selectedItemForSheet.nameAr} with Cake (${selectedItemForSheet.price + 5} EGP)`
                      : isArabic
                      ? 'ضيفه لحساب القعدة (Split at Seven)'
                      : 'Add to Table Check'}
                  </span>
                </button>

                <div className="flex items-center justify-between text-xs text-[#5C3A28] pt-2">
                  <button
                    onClick={handlePrevSheetDrink}
                    disabled={currentSheetIndex <= 0}
                    className="flex items-center gap-1 hover:text-[#9A7228] disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span>{isArabic ? 'المشروب السابق' : 'Previous Drink'}</span>
                  </button>

                  <span className="font-mono text-[11px] text-[#5C3A28]/60">
                    {currentSheetIndex + 1} / {displayItems.length}
                  </span>

                  <button
                    onClick={handleNextSheetDrink}
                    disabled={currentSheetIndex >= displayItems.length - 1}
                    className="flex items-center gap-1 hover:text-[#9A7228] disabled:opacity-40 cursor-pointer"
                  >
                    <span>{isArabic ? 'المشروب التالي' : 'Next Drink'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
