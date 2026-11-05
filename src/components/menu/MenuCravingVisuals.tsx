import React, { useState } from 'react';
import { MenuCategory } from '../../data/menu';

interface VisualProps {
  className?: string;
  category?: MenuCategory;
  name?: string;
  badge?: string;
  customImgUrl?: string;
}

export interface PhotoData {
  url: string;
  alt: string;
  labelEn: string;
  labelAr: string;
  sensoryTag: string;
}

/**
 * Curated realistic photography for Relax Cafe menu categories.
 * Category 1 (drinks / مشروبات) is strictly cold sodas, soft drinks, and mineral water (NOT coffee).
 * Only iced_coffee contains coffee imagery.
 */
export const DRINK_PHOTOS: Record<MenuCategory, PhotoData> = {
  // 01. مشروبات ساخنة: Hot specialty coffee, tea, Turkish coffee, herbs, cappuccino
  hot_drinks: {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=720&q=75&auto=format',
    alt: 'Steaming freshly brewed artisan cappuccino and Turkish coffee in ceramic cups',
    labelEn: 'AUTHENTIC HOT BREWS & SPECIALTY COFFEE',
    labelAr: 'مشروبات ساخنة وقهوة مختصة دافئة',
    sensoryTag: '☕ بخار دافئ ونكهات بن وأعشاب طبيعية لروقان الدور السابع',
  },
  // 02. مشروبات: Cold sodas, soft drinks, mineral water (Pepsi, 7up, Schweppes, Birell, Red Bull, Water)
  drinks: {
    url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=720&q=75&auto=format',
    alt: 'Chilled soft drink in glass with crystal ice cubes, bubbles and condensation',
    labelEn: 'COLD REFRESHING DRINKS & SODAS',
    labelAr: 'مشروبات غازية ومنعشات مثلجة',
    sensoryTag: '🧊 صودا منعشة مع ثلج مكعب وفقاعات فوارة',
  },
  // 02. ايس كوفي: Chilled specialty coffee, Spanish latte, caramel macchiato
  iced_coffee: {
    url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=720&q=75&auto=format',
    alt: 'Iced Spanish Latte in chilled ribbed glass with marbling espresso and condensed milk',
    labelEn: 'ICED SPANISH LATTE & COLD BREW',
    labelAr: 'آيس كوفي وإسبريسو مثلج',
    sensoryTag: '☕ إسبريسو متوازن مع حليب مثلج وكراميل',
  },
  // 03. ماتشا: Ceremonial Japanese matcha green tea latte (NOT coffee)
  matcha: {
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=720&q=75&auto=format',
    alt: 'Ceremonial Japanese matcha latte layered over chilled oat milk with ice',
    labelEn: 'CEREMONIAL MATCHA CLOUD',
    labelAr: 'سحابة ماتشا يابانية خضراء',
    sensoryTag: '🍵 فوم ياباني أخضر نقي وحليب نباتي مثلج',
  },
  // 04. فريش: 100% Cold-pressed fresh fruit juices (Orange, Mango, Strawberry, Lemon Mint)
  fresh: {
    url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=720&q=75&auto=format',
    alt: 'Cold-pressed fresh citrus orange juice with real orange slice and condensation',
    labelEn: 'COLD-PRESSED FRESH JUICE',
    labelAr: 'عصائر طبيعية فريش بالطلب',
    sensoryTag: '🍊 فاكهة طبيعية 100% معصورة طازجة',
  },
  // 05. كوكتيل: Layered fruit mocktails, Florida, Havana, Sunset Mojito, Fruit Salad
  cocktails: {
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=720&q=75&auto=format',
    alt: 'Sparkling layered craft fruit cocktail with mint sprig, crushed ice and lime wheel',
    labelEn: 'RELAX CRAFT FRUIT COCKTAILS',
    labelAr: 'كوكتيلات فواكه استوائية منعشة',
    sensoryTag: '🌅 طبقات ألوان طبيعية وثلج مجروش ونعناع',
  },
  // 06. سموزي: Thick frozen fruit smoothies (Watermelon, Strawberry, Mango, Kiwi)
  smoothies: {
    url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=720&q=75&auto=format',
    alt: 'Thick velvety blended strawberry and mango fruit smoothie',
    labelEn: 'RICH BLENDED FRUIT SMOOTHIE',
    labelAr: 'سموزي فواكه مثلج غني ومكثف',
    sensoryTag: '🍓 قوام سميك ومثلج من الفواكه الطبيعية',
  },
  // 07. ايس كريم: Artisanal Italian gelato scoops, dessert cups, sundaes (NOT coffee)
  ice_cream: {
    url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=720&q=75&auto=format',
    alt: 'Artisanal Italian gelato scoops in dessert coupe with crisp wafer and spoon',
    labelEn: 'ARTISANAL GELATO SCOOPS',
    labelAr: 'آيس كريم وجيلاتو إيطالي فاخر',
    sensoryTag: '🍦 جيلاتو كريمي ناعم مع صوصات فواكه ومقرمشات',
  },
  // 08. ميلك شيك: Thick gourmet milkshakes (Oreo, Chocolate, Strawberry, Vanilla, Mango)
  milkshakes: {
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=720&q=75&auto=format',
    alt: 'Thick gourmet milkshake in vintage ribbed glass with whipped cream and cookie crumbles',
    labelEn: 'GOURMET INDULGENT MILKSHAKES',
    labelAr: 'ميلك شيك كريمي تقيل بالكريمة',
    sensoryTag: '✨ كريمة مخفوقة غنية وبسكويت مقرمش',
  },
};

/**
 * Comprehensive item-specific photo dictionary matching real drinks:
 * Sodas, water, fresh fruit juices, matcha, smoothies, gelato, milkshakes, and iced coffee.
 */
export const ITEM_SPECIFIC_PHOTOS: Record<string, PhotoData> = {
  // --- Category: مشروبات ساخنة (Hot Drinks - 27 Authentic Menu Items) ---
  'hot-tea': {
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Traditional freshly brewed Egyptian red tea in clear ribbed glass with steam',
    labelEn: 'AUTHENTIC EGYPTIAN RED TEA',
    labelAr: 'شاي أحمر مصري أصيل',
    sensoryTag: '☕ لون كهرماني صافي وبخار دافئ يظبط المزاج',
  },
  'hot-tea-milk': {
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Creamy hot tea with milk in classic glass cup',
    labelEn: 'HOT TEA WITH FRESH MILK',
    labelAr: 'شاي حليب بلبن ساخن',
    sensoryTag: '🥛 شاي مخدر بحليب بلدي ساخن وقوام ناعم',
  },
  'hot-nescafe-black': {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hot rich black Nescafe in porcelain mug with rising steam',
    labelEn: 'HOT NESCAFE BLACK',
    labelAr: 'نسكافيه بلاك كلاسيك مركز',
    sensoryTag: '☕ قهوة فورية سادة مركزة لصفاء الذهن',
  },
  'hot-nescafe-milk': {
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Frothy hot Nescafe with milk in large glass cup',
    labelEn: 'HOT NESCAFE WITH STEAMED MILK',
    labelAr: 'نسكافيه حليب برغوة غنية',
    sensoryTag: '✨ فوم ناعم وحليب ساخن متناغم',
  },
  'hot-turkish': {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Authentic Turkish coffee served in ornate porcelain demitasse cup with thick crema foam',
    labelEn: 'AUTHENTIC TURKISH COFFEE',
    labelAr: 'قهوة تركي محوجة بوش كريمي',
    sensoryTag: '☕ بن محوج بوش متماسك وريحة تعدل اليوم',
  },
  'hot-turkish-double': {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Double shot rich Turkish coffee in wide finjan',
    labelEn: 'DOUBLE TURKISH COFFEE',
    labelAr: 'قهوة تركي دبل تقيلة',
    sensoryTag: '🔥 دبل شوت بن محوج مركز لأقصى تركيز',
  },
  'hot-hazelnut-coffee': {
    url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hazelnut flavored Turkish coffee with roasted nut aroma',
    labelEn: 'ROASTED HAZELNUT COFFEE',
    labelAr: 'قهوة بالبندق المحمص الفاخر',
    sensoryTag: '🌰 نكهة البندق الدافئة تذوب في كل رشفة',
  },
  'hot-french': {
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'French cafe au lait coffee in warm ceramic cup',
    labelEn: 'FRENCH CAFE AU LAIT',
    labelAr: 'قهوة فرنساوي بالحليب ورغوة ناعمة',
    sensoryTag: '🥛 نعومة الحليب مع مذاق القهوة الفرنسية',
  },
  'hot-espresso-single': {
    url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Single shot espresso with thick golden hazelnut crema in ceramic demitasse',
    labelEn: 'SINGLE ESPRESSO SHOT',
    labelAr: 'إسبريسو سنجل نقي ومركز',
    sensoryTag: '☕ شوت إسبريسو بكريمة عسلية كثيفة',
  },
  'hot-espresso-double': {
    url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Double shot rich espresso with dark crema',
    labelEn: 'DOUBLE ESPRESSO DOPIO',
    labelAr: 'إسبريسو دبل فائق التركيز',
    sensoryTag: '⚡ طاقة فورية ونكهة حبوب قهوة نقية',
  },
  'hot-sahlab-nuts': {
    url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hot thick Egyptian sahlab drink topped with shredded coconut, cinnamon and mixed nuts',
    labelEn: 'HOT SAHLAB WITH CRUNCHY NUTS',
    labelAr: 'سحلب مصري كريمي بالمكسرات والقرفة',
    sensoryTag: '🥜 قوام كريمي دافئ مكسو بالفستق وجوز الهند والقرفة',
  },
  'hot-sahlab-fruits': {
    url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hot sahlab dessert cup garnished with sliced fruits',
    labelEn: 'HOT SAHLAB WITH FRESH FRUITS',
    labelAr: 'سحلب ساخن غني بقطع الفواكه',
    sensoryTag: '🍓 دفء السحلب مع حلاوة الفواكه الطبيعية',
  },
  'hot-chocolate-plain': {
    url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hot dark chocolate with rich cocoa steam',
    labelEn: 'HOT BELGIAN CHOCOLATE (DARK)',
    labelAr: 'هوت شوكلت سادة غني ومركز',
    sensoryTag: '🍫 شوكولاتة بلجيكية داكنة تذوب في الدفء',
  },
  'hot-chocolate-milk': {
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Steaming hot chocolate with frothy whole milk',
    labelEn: 'HOT MILK CHOCOLATE INDULGENCE',
    labelAr: 'هوت شوكلت حليب بالرغوة الدافئة',
    sensoryTag: '🥛 شوكولاتة ناعمة مخفوقة بالحليب الساخن',
  },
  'hot-cappuccino': {
    url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Artisan hot cappuccino with delicate heart latte art microfoam',
    labelEn: 'SPECIALTY HOT CAPPUCCINO',
    labelAr: 'كابتشينو برغوة مخملية ولاتيه آرت',
    sensoryTag: '☕ توازن الإسبريسو الإيطالي مع فوم الحليب المخملي',
  },
  'hot-cappuccino-latte': {
    url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Creamy hot cappuccino latte in ceramic mug',
    labelEn: 'HOT CAPPUCCINO LATTE',
    labelAr: 'كابتشينو لاتيه ناعم وخفيف',
    sensoryTag: '✨ طبقات حريرية من الحليب والإسبريسو',
  },
  'hot-cappuccino-mocha': {
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hot chocolate cappuccino mocha with cocoa powder dusting',
    labelEn: 'HOT CAPPUCCINO MOCHA',
    labelAr: 'كابتشينو موكا بالشوكولاتة الساخنة',
    sensoryTag: '🍫 كاكاو داكن مع إسبريسو وفوم ساخن',
  },
  'hot-cappuccino-hazelnut': {
    url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hazelnut cappuccino with roasted hazelnut syrup',
    labelEn: 'HOT HAZELNUT CAPPUCCINO',
    labelAr: 'كابتشينو بندق عطري ودافئ',
    sensoryTag: '🌰 بندق محمص مع رغوة الكابتشينو الإيطالي',
  },
  'hot-ginger': {
    url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Steaming hot fresh ginger tea in transparent glass cup',
    labelEn: 'STEAMING PURE GINGER INFUSION',
    labelAr: 'زنجبيل طبيعي حار ودافئ',
    sensoryTag: '🔥 حرارة لاذعة تفتح الصدر وتدفي القعدة',
  },
  'hot-lemon': {
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hot lemon slices brewed with warm steam in glass',
    labelEn: 'WARM CITRUS HOT LEMON',
    labelAr: 'ليمون سخن طبيعي مهدئ',
    sensoryTag: '🍋 شرائح ليمون فريش مغلية تريح البال',
  },
  'hot-hibiscus': {
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Deep ruby hot hibiscus tea with floral steam',
    labelEn: 'RUBY HOT HIBISCUS INFUSION',
    labelAr: 'كركديه بلدي ساخن ياقوتي',
    sensoryTag: '🌺 لون ياقوتي طبيعي وطعم حمضي مظبوط',
  },
  'hot-cider': {
    url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Spiced hot apple cider with cinnamon stick in mug',
    labelEn: 'SPICED HOT APPLE CIDER',
    labelAr: 'هوت سيدر تفاح وقرفة شتوي',
    sensoryTag: '🍎 عصير تفاح ساخن مع أعواد القرفة والقرنفل',
  },
  'hot-herbs-mix': {
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hot herbal blend of cinnamon, ginger and anise in cup',
    labelEn: 'HERBAL TRIO (CINNAMON - GINGER - ANISE)',
    labelAr: 'أعشاب مشكلة (قرفة - زنجبيل - ينسون)',
    sensoryTag: '🌿 توليفة مهدئة ومنعشة تجمع تلات أعشاب أصيلة',
  },
  'hot-cinnamon': {
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hot aromatic cinnamon bark tea with steam',
    labelEn: 'WARM CINNAMON BARK TEA',
    labelAr: 'قرفة مغلية دافئة وعطرة',
    sensoryTag: '🪵 عطر القرفة الأصيل يملأ الأجواء دفء',
  },
  'hot-cinnamon-milk': {
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hot milk with infused cinnamon and cinnamon powder dusting',
    labelEn: 'HOT CINNAMON WITH STEAMED MILK',
    labelAr: 'قرفة حليب بلبن كامل الدسم',
    sensoryTag: '🥛 حليب بلدي مبخر مع دفء القرفة وحلاوتها',
  },
  'hot-mint': {
    url: 'https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Fresh green mint leaves brewed in hot boiling water',
    labelEn: 'HOT FRESH GARDEN MINT',
    labelAr: 'نعناع بلدي أخضر ساخن',
    sensoryTag: '🍃 أوراق نعناع فريش تريح الأعصاب وتصفي الذهن',
  },
  'hot-anise': {
    url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Steaming hot anise seed tea with pale golden glow',
    labelEn: 'WARM GOLDEN ANISE SEED TEA',
    labelAr: 'ينسون دافئ مهدئ ومريح',
    sensoryTag: '✨ ينسون طبيعي برائحة مهدئة وقوام صافي',
  },

  // --- Category: مشروبات (Sodas, Soft Drinks, Mineral Water) ---
  'drink-pepsi': {
    url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled Pepsi cola in glass with ice cubes and condensation',
    labelEn: 'CHILLED PEPSI COLA',
    labelAr: 'بيبسي ساقع بالثلج',
    sensoryTag: '🧊 كولا فوارة مثلجة مع قطرات تكثيف',
  },
  'drink-7up': {
    url: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Sparkling lemon-lime 7UP soda on clear ice cubes with lime wheel',
    labelEn: '7UP LEMON-LIME SODA',
    labelAr: 'سفن أب منعش مع ليمون وثلج',
    sensoryTag: '🍋 صودا ليمون صافية وفقاعات منعشة',
  },
  'drink-sprite': {
    url: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Crisp cold Sprite soda poured over ice',
    labelEn: 'SPRITE CRISP CITRUS SODA',
    labelAr: 'اسبرايت بارد ومنعش',
    sensoryTag: '🧊 انتعاش الليمون البارد',
  },
  'drink-mirinda': {
    url: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled sparkling orange soda in glass with ice',
    labelEn: 'MIRINDA SPARKLING ORANGE',
    labelAr: 'ميرندا برتقال فوارة',
    sensoryTag: '🍊 طعم البرتقال الفوار المنعش',
  },
  'drink-schweppes-pineapple': {
    url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Schweppes Gold Pineapple sparkling drink on ice',
    labelEn: 'SCHWEPPES GOLD PINEAPPLE',
    labelAr: 'شويبس جولد أناناس فوار',
    sensoryTag: '🍍 أناناس ذهبي فوار مع ثلج',
  },
  'drink-schweppes-pomegranate': {
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Schweppes sparkling pomegranate with ruby ice',
    labelEn: 'SCHWEPPES POMEGRANATE',
    labelAr: 'شويبس رمان ياقوتي',
    sensoryTag: '🍷 نكهة الرمان الفوارة المنعشة',
  },
  'drink-birell': {
    url: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled malt beverage with creamy foam in glass',
    labelEn: 'BIRELL NON-ALCOHOLIC MALT',
    labelAr: 'بريل شعير مثلج برغوة غنية',
    sensoryTag: '🌾 شعير طبيعي مثلج مع رغوة كثيفة',
  },
  'drink-fayrouz': {
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Crisp cold Fayrouz apple malt drink with condensation',
    labelEn: 'FAYROUZ SPARKLING APPLE MALT',
    labelAr: 'فيروز تفاح فوار ومنعش',
    sensoryTag: '🍏 تفاح وشعير فوار مثلج',
  },
  'drink-redbull': {
    url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Cold Red Bull energy drink poured over ice with condensation',
    labelEn: 'RED BULL ENERGY ON ICE',
    labelAr: 'ريد بل مثلج طاقة وتركيز',
    sensoryTag: '⚡ طاقة فورية مع ثلج مكعب',
  },
  'drink-twist': {
    url: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Cold Twist sparkling refreshment',
    labelEn: 'TWIST SPARKLING REFRESHER',
    labelAr: 'تويست منعش بالثلج',
    sensoryTag: '🧊 طعم خفيف ومنعش',
  },
  'drink-water-large': {
    url: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled pure mineral water in a clear glass with clear ice cubes',
    labelEn: 'PURE MINERAL WATER (LARGE)',
    labelAr: 'مياه معدنية نقية كبيرة مثلجة',
    sensoryTag: '💧 مياه نقية مثلجة لروقان القعدة',
  },
  'drink-water-small': {
    url: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled pure mineral water in a clear glass with clear ice cubes',
    labelEn: 'PURE MINERAL WATER (SMALL)',
    labelAr: 'مياه معدنية نقية صغيرة مثلجة',
    sensoryTag: '💧 نقاء وانتعاش فوري',
  },

  // --- Category: ايس كوفي (Chilled Coffee) ---
  'spanish-latte': {
    url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Iced Spanish Latte with marbling espresso and condensed milk',
    labelEn: 'ICED SPANISH LATTE',
    labelAr: 'آيس سبانيش لاتيه ساقع',
    sensoryTag: '🧊 قطرات تكثيف وإسبريسو متوازن',
  },
  'ice-caramel': {
    url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Iced Caramel Macchiato with golden caramel drizzle',
    labelEn: 'ICED CARAMEL MACCHIATO',
    labelAr: 'آيس كراميل بالصوص الذهبي',
    sensoryTag: '🍯 صوص كراميل دافئ وحليب مثلج',
  },
  'ice-latte': {
    url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled iced latte with espresso layers and ice cubes',
    labelEn: 'ICED SPECIALTY LATTE',
    labelAr: 'آيس لاتيه كلاسيك مثلج',
    sensoryTag: '☕ حليب بارد مع دبل شوت إسبريسو',
  },
  'ice-mocha': {
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled iced mocha with rich cocoa and coffee swirls',
    labelEn: 'ICED CHOCOLATE MOCHA',
    labelAr: 'آيس موكا بالشوكولاتة الغنية',
    sensoryTag: '🍫 كاكاو داكن مع إسبريسو وحليب بارد',
  },
  'ice-chocolate': {
    url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled dark iced chocolate with ice cubes and cocoa',
    labelEn: 'ICED BELGIAN CHOCOLATE',
    labelAr: 'آيس شوكولاتة مثلجة فاخرة',
    sensoryTag: '🍫 شوكولاتة بلجيكية غنية مع ثلج',
  },
  'ice-vanilla': {
    url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Iced vanilla latte with sweet Madagascar vanilla',
    labelEn: 'ICED VANILLA LATTE',
    labelAr: 'آيس فانيليا لاتيه ناعم',
    sensoryTag: '✨ فانيليا ناعمة وحليب مثلج متناغم',
  },
  'ice-americano': {
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled bold black Americano on clear ice',
    labelEn: 'ICED BLACK AMERICANO',
    labelAr: 'آيس أمريكانو سادة مثلج',
    sensoryTag: '☕ قهوة سوداء نقية وقوية على الثلج',
  },
  'coffee-with-cake': {
    url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Artisan specialty coffee paired with a fresh rich cake slice on a warm wooden café table',
    labelEn: 'COFFEE WITH FRESH CAKE (+5 EGP)',
    labelAr: 'كوفي مع كيك فاخرة طازجة',
    sensoryTag: '🍰 قهوة اسبريسو مختصة مع قطعة كيك (+5 ج.م فقط)',
  },

  // --- Category: ماتشا (Japanese Ceremonial Matcha - Green Tea) ---
  'ice-matcha-latte': {
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Ceremonial iced matcha latte with jade green foam over cold oat milk',
    labelEn: 'CEREMONIAL ICED MATCHA',
    labelAr: 'سحابة ماتشا يابانية مثلجة',
    sensoryTag: '🍵 فوم ياباني أخضر وحليب نباتي مثلج',
  },
  'matcha-latte-hot': {
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Warm artisanal matcha latte in ceramic bowl with green microfoam',
    labelEn: 'HOT CEREMONIAL MATCHA LATTE',
    labelAr: 'ماتشا لاتيه يابانية ساخنة',
    sensoryTag: '🍵 ماتشا دافئة مخملية تريح الأعصاب',
  },
  'ice-matcha-chocolate': {
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Layered iced matcha with white and dark chocolate',
    labelEn: 'ICED CHOCO-MATCHA FUSION',
    labelAr: 'آيس ماتشا شوكولاتة فاخرة',
    sensoryTag: '🍫 توازن الماتشا مع الشوكولاتة الذائبة',
  },
  'ice-matcha-vanilla': {
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Iced vanilla matcha latte in clear glass',
    labelEn: 'ICED VANILLA MATCHA LATTE',
    labelAr: 'آيس ماتشا فانيليا ناعمة',
    sensoryTag: '✨ لمسة فانيليا عطرية مع ماتشا مثلجة',
  },
  'ice-matcha-caramel': {
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Iced matcha with golden caramel ribbons',
    labelEn: 'ICED CARAMEL MATCHA',
    labelAr: 'آيس ماتشا بالكراميل الذهبي',
    sensoryTag: '🍯 حلاوة الكراميل مع خضار الماتشا النقي',
  },
  'spanish-matcha-latte': {
    url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Spanish matcha latte with sweetened condensed milk',
    labelEn: 'SPANISH MATCHA LATTE',
    labelAr: 'اسبانش ماتشا لاتيه غني',
    sensoryTag: '🍵 حليب مكثف محلى مع بودرة الماتشا الأصلية',
  },

  // --- Category: فريش (Fresh Cold-Pressed Juices) ---
  'fresh-orange': {
    url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Fresh cold-pressed orange juice with orange slice on iced glass',
    labelEn: 'COLD-PRESSED ORANGE JUICE',
    labelAr: 'عصير برتقال فريش معصور فوراً',
    sensoryTag: '🍊 برتقال طازج 100% غني بفيتامين C',
  },
  'fresh-mango': {
    url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Thick pure golden mango juice in tall glass with mango slice',
    labelEn: 'PURE GOLDEN MANGO NECTAR',
    labelAr: 'عصير مانجو فريش طبيعي تقيل',
    sensoryTag: '🥭 مانجو مصرية طبيعية قوام ناعم وغني',
  },
  'fresh-strawberry': {
    url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Fresh strawberry juice with crushed ice and fresh berries',
    labelEn: 'FRESH STRAWBERRY CRUSH',
    labelAr: 'عصير فراولة طبيعي مثلج',
    sensoryTag: '🍓 فراولة طازجة بلون أحمر ياقوتي وقوام غني',
  },
  'fresh-strawberry-milk': {
    url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Fresh strawberry blended with cold milk',
    labelEn: 'STRAWBERRY MILK NECTAR',
    labelAr: 'فراولة فريش بالحليب البارد',
    sensoryTag: '🥛 حليب مثلج مع حبات الفراولة الطبيعية',
  },
  'fresh-lemon': {
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Cold fresh lemonade with ice and lemon wheel',
    labelEn: 'FRESH COLD LEMONADE',
    labelAr: 'عصير ليمون فريش ساقع',
    sensoryTag: '🍋 ليمون طازج مع ثلج مكعب وانتعاش فوري',
  },
  'fresh-lemon-mint': {
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Frosty lemonade with green mint leaves and crushed ice',
    labelEn: 'FROSTY LEMON MINT',
    labelAr: 'ليمون نعناع مثلج منعش',
    sensoryTag: '🍃 نعناع بلدي طازج مع ليمون وثلج مجروش',
  },
  'fresh-watermelon': {
    url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled fresh watermelon juice in tall glass with mint',
    labelEn: 'FRESH CHILLED WATERMELON',
    labelAr: 'عصير بطيخ ساقع يروي العطش',
    sensoryTag: '🍉 بطيخ طازج مبرد ينعش القعدة في الصيف',
  },
  'fresh-kiwi': {
    url: 'https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Fresh green kiwi juice with kiwi wheel garnish',
    labelEn: 'PURE GREEN KIWI JUICE',
    labelAr: 'عصير كيوي طبيعي أخضر',
    sensoryTag: '🥝 كيوي طازج بلون أخضر زمردي منعش',
  },
  'fresh-kiwi-milk': {
    url: 'https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Kiwi blended with cold creamy milk',
    labelEn: 'KIWI WITH CHILLED MILK',
    labelAr: 'كيوي فريش بالحليب البارد',
    sensoryTag: '🥛 قوام متوازن بين حموضة الكيوي ودسامة الحليب',
  },
  'fresh-guava': {
    url: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Pure white fresh guava juice in iced glass',
    labelEn: 'PURE WHITE GUAVA JUICE',
    labelAr: 'عصير جوافة فريش طبيعي',
    sensoryTag: '🍐 جوافة مصرية فواحة طازجة بقوام سلس',
  },
  'fresh-guava-milk': {
    url: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Fresh guava juice blended with creamy cold milk',
    labelEn: 'GUAVA WITH CHILLED MILK',
    labelAr: 'جوافة فريش بالحليب المثلج',
    sensoryTag: '🥛 حليب كريمي مع جوافة طازجة ناعمة',
  },
  'fresh-banana-milk': {
    url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Creamy banana milkshake in tall glass',
    labelEn: 'FRESH BANANA MILK NECTAR',
    labelAr: 'موز بالحليب الطازج',
    sensoryTag: '🍌 موز ناضج مهروس مع حليب بلدي بارد',
  },
  'fresh-dates-milk': {
    url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Rich dates blended with cold whole milk',
    labelEn: 'DATES WITH WHOLE MILK',
    labelAr: 'بلح بالحليب مغذي وغني',
    sensoryTag: '🌴 تمر طبيعي حلو مع حليب بارد وطاقة تدوم',
  },
  'fresh-borio': {
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled Borio chocolate biscuit shake',
    labelEn: 'FRESH BORIO BISCUIT CRUSH',
    labelAr: 'عصير بوريو بالشوكولاتة واللبن',
    sensoryTag: '🍪 بسكويت بوريو مقرمش ممزوج مع حليب بارد',
  },
  'fresh-cantaloupe': {
    url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Sweet cantaloupe melon juice on ice',
    labelEn: 'SWEET CANTALOUPE NECTAR',
    labelAr: 'عصير كنتلوب مثلج طازج',
    sensoryTag: '🍈 كنتلوب بلدي بارد بطعم سكري طبيعي',
  },
  'fresh-berry': {
    url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Deep red-purple fresh wild berry juice with ice',
    labelEn: 'WILD BERRY COLD JUICE',
    labelAr: 'عصير توت بري مثلج طبيعي',
    sensoryTag: '🫐 توت بري منعش بمذاق حمضي سكري ساحر',
  },
  'fresh-peach': {
    url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Sweet fresh peach juice in glass with peach slice',
    labelEn: 'GOLDEN PEACH JUICE',
    labelAr: 'عصير خوخ طبيعي مبرد',
    sensoryTag: '🍑 خوخ طبيعي معصور بلون ذهبي دافئ',
  },
  'fresh-yogurt-blender': {
    url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chilled creamy yogurt smoothie drink in glass',
    labelEn: 'FROSTY YOGURT BLENDER',
    labelAr: 'زبادي خلاط منعش ومهضم',
    sensoryTag: '🥛 زبادي بلدي مثلج ومخفوق بعسل النحل',
  },
  'fresh-yogurt-fruits': {
    url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Fruit yogurt shake with berries and fruits',
    labelEn: 'YOGURT WITH MIXED FRUITS',
    labelAr: 'زبادي خلاط بالفواكه الطبيعية',
    sensoryTag: '🍓 فواكه مشكلة مخفوقة مع زبادي مثلج',
  },

  // --- Category: كوكتيل (Fruit Cocktails & Mocktails - NOT coffee) ---
  'cocktail-florida': {
    url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Florida cocktail with layers of mango, orange and guava on ice',
    labelEn: 'FLORIDA TROPICAL COCKTAIL',
    labelAr: 'كوكتيل فلوريدا (مانجو - برتقال - جوافة)',
    sensoryTag: '🍹 ثلاث طبقات ألوان طبيعية غنية بالانتعاش',
  },
  'cocktail-havana': {
    url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Havana cocktail with strawberry, banana and creamy milk',
    labelEn: 'HAVANA STRAWBERRY BANANA',
    labelAr: 'كوكتيل هافانا (فراولة - موز - لبن)',
    sensoryTag: '🍓 فراولة طازجة مع موز ناعم وحليب مثلج',
  },
  'cocktail-sunshine': {
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Sunshine mocktail with Sprite, lemon and ruby grenadine',
    labelEn: 'SUNSHINE SPARKLING MOCKTAIL',
    labelAr: 'كوكتيل صن شاين (سبرايت - ليمون - جراندين)',
    sensoryTag: '🌅 فوران السبرايت مع تدرج أحمر منعش وثلج',
  },
  'cocktail-kiwi': {
    url: 'https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Kiwi green apple cocktail on crushed ice',
    labelEn: 'KIWI APPLE CHILL COCKTAIL',
    labelAr: 'كوكتيل كيوي (كيوي - تفاح - لبن - ثلج)',
    sensoryTag: '🥝 مزيج أخضر مثلج يوقظ الحواس',
  },
  'cocktail-manhattan': {
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Manhattan cocktail with dates, milk and Borio biscuits',
    labelEn: 'MANHATTAN DATES & BORIO',
    labelAr: 'كوكتيل منهاتن (بلح - لبن - بوريو)',
    sensoryTag: '🌴 حلاوة التمر مع قرمشة بسكويت البوريو',
  },
  'cocktail-latino': {
    url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Latino layered cocktail with mango, banana and strawberry',
    labelEn: 'LATINO THREE-FRUIT COCKTAIL',
    labelAr: 'كوكتيل لاتينو (مانجو - موز - فراولة)',
    sensoryTag: '🍹 ثلاث فواكه استوائية بطبقات متدرجة ومبهجة',
  },
  'fruit-salad': {
    url: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Freshly sliced vibrant fruit salad in glass bowl with ice cream',
    labelEn: 'RELAX FRESH FRUIT SALAD',
    labelAr: 'سلطة فواكه طازجة مشكلة مع عصير',
    sensoryTag: '🍎 قطع فواكه موسمية طازجة تفتح النفس',
  },
  'cocktail-marina': {
    url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Marina cocktail with banana, milk, dates and kiwi',
    labelEn: 'MARINA SPECIAL COCKTAIL',
    labelAr: 'كوكتيل مارينا (موز - لبن - بلح - كيوي)',
    sensoryTag: '🍌 كوكتيل مغذي بقوام ثقيل وطعم مميز',
  },
  'cocktail-asleya': {
    url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Asleya cocktail with orange, guava, lemon and natural honey',
    labelEn: 'ASLEYA HONEY CITRUS COCKTAIL',
    labelAr: 'كوكتيل عسلية (برتقال - جوافة - ليمون - عسل)',
    sensoryTag: '🍯 عسل نحل نقي مع حمضيات مبردة',
  },
  'cocktail-tia-maria': {
    url: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Tia Maria cocktail with dates, mango and honey',
    labelEn: 'TIA MARIA MANGO DATES',
    labelAr: 'كوكتيل تي ماريا (بلح - مانجو - عسل)',
    sensoryTag: '🥭 مانجو فاخرة مع حلاوة البلح وعسل النحل',
  },
  'cocktail-relax': {
    url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Relax signature cocktail with banana, vanilla gelato and espresso drop',
    labelEn: 'RELAX SIGNATURE DESSERT COCKTAIL',
    labelAr: 'كوكتيل ريلاكس الخاص (موز - آيس كريم - إسبريسو)',
    sensoryTag: '🍨 جيلاتو فانيليا مع موز ولمسة إسبريسو خاصة',
  },

  // --- Category: سموزي (Frozen Blended Smoothies - NOT coffee) ---
  'smoothie-watermelon': {
    url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Frozen watermelon slush smoothie with crushed ice and mint',
    labelEn: 'FROZEN WATERMELON SMOOTHIE',
    labelAr: 'سموزي بطيخ مثلج منعش',
    sensoryTag: '🍉 بطيخ مثلج مجروش ينزل يطري على القلب',
  },
  'smoothie-strawberry': {
    url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Thick frozen blended strawberry smoothie with berry texture',
    labelEn: 'THICK STRAWBERRY SMOOTHIE',
    labelAr: 'سموزي فراولة مثلج غني وكثيف',
    sensoryTag: '🍓 قوام مثلج كثيف بحلاوة الفراولة الطبيعية',
  },
  'smoothie-mango': {
    url: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Thick frozen golden mango smoothie in tall glass',
    labelEn: 'FROZEN GOLDEN MANGO SMOOTHIE',
    labelAr: 'سموزي مانجو مثلج ثقيل ومركز',
    sensoryTag: '🥭 مانجو مثلجة ومضروبة بقوام كريمي تقيل',
  },
  'smoothie-guava': {
    url: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Frozen blended guava smoothie with crushed ice',
    labelEn: 'FROZEN GUAVA SMOOTHIE',
    labelAr: 'سموزي جوافة مثلج وبارد',
    sensoryTag: '🍐 جوافة فريش مثلجة بمذاق هادئ ومريح',
  },
  'smoothie-kiwi': {
    url: 'https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Thick frosty green kiwi smoothie',
    labelEn: 'FROSTY GREEN KIWI SMOOTHIE',
    labelAr: 'سموزي كيوي مثلج لاذع ومنعش',
    sensoryTag: '🥝 سموزي كيوي أخضر مثلج يغير المود تماماً',
  },
  'smoothie-peach': {
    url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Frozen golden peach smoothie with peach wedge',
    labelEn: 'FROZEN PEACH SMOOTHIE',
    labelAr: 'سموزي خوخ مثلج ناعم',
    sensoryTag: '🍑 نكهة الخوخ المبرد بقوام سلاش ثلجي',
  },
  'smoothie-lemon-mint': {
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Frozen lemon mint slush smoothie with crushed ice crystals',
    labelEn: 'FROZEN LEMON MINT SLUSH',
    labelAr: 'سموزي ليمون نعناع مثلج سلاش',
    sensoryTag: '🧊 سلاش ليمون ونعناع مثلج لانتعاش فوري',
  },

  // --- Category: ايس كريم (Artisanal Gelato & Ice Cream Scoops - NOT coffee) ---
  'ice-cream-chocolate': {
    url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Rich Belgian chocolate gelato scoops in glass cup with chocolate curls',
    labelEn: 'DARK CHOCOLATE GELATO SCOOPS',
    labelAr: 'آيس كريم شوكولاتة بلجيكية فاخرة',
    sensoryTag: '🍫 شوكولاتة كريمية غنية تذوب ببطء',
  },
  'ice-cream-vanilla': {
    url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Madagascar vanilla bean gelato scoops with crisp wafer',
    labelEn: 'VANILLA BEAN GELATO SCOOPS',
    labelAr: 'آيس كريم فانيليا طبيعية ناعمة',
    sensoryTag: '🍨 فانيليا طبيعية بحبيبات الفانيليا السوداء',
  },
  'ice-cream-mango': {
    url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Vibrant golden mango sorbet gelato scoops in dessert coupe',
    labelEn: 'MANGO SORBET GELATO',
    labelAr: 'آيس كريم مانجو استوائي منعش',
    sensoryTag: '🥭 طعم المانجو الطبيعي بنعومة الجيلاتو',
  },
  'ice-cream-strawberry': {
    url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Pink strawberry gelato scoops with real berry puree',
    labelEn: 'STRAWBERRY SWIRL GELATO',
    labelAr: 'آيس كريم فراولة طبيعية وردية',
    sensoryTag: '🍓 نكهة الفراولة الطازجة مع حلاوة متوازنة',
  },
  'ice-cream-mix': {
    url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Trio of mixed gelato scoops (chocolate, vanilla, strawberry)',
    labelEn: 'TRIO MIX GELATO SCOOPS',
    labelAr: 'آيس كريم ميكس ثلاث بولات مشكلة',
    sensoryTag: '🍧 تشكيلة نكهات مختارة في كأس واحد',
  },
  'ice-cream-choc-caramel': {
    url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Chocolate gelato topped with warm golden caramel drizzle',
    labelEn: 'CHOCOLATE GELATO CARAMEL SAUCE',
    labelAr: 'آيس كريم شوكولاتة بصوص كراميل',
    sensoryTag: '🍯 صوص كراميل دافئ يسيل على شوكولاتة مثلجة',
  },
  'ice-cream-vanilla-berry': {
    url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Vanilla gelato with wild berry coulis drizzle',
    labelEn: 'VANILLA GELATO BERRY COULIS',
    labelAr: 'آيس كريم فانيليا بصوص توت بري',
    sensoryTag: '🫐 صوص التوت الأحمر اللاذع مع نعومة الفانيليا',
  },
  'ice-cream-vanilla-caramel': {
    url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Vanilla gelato topped with rich caramel syrup',
    labelEn: 'VANILLA GELATO CARAMEL SAUCE',
    labelAr: 'آيس كريم فانيليا بصوص كراميل ذهبي',
    sensoryTag: '🍯 كراميل ناعم وغني على فانيليا مثلجة',
  },
  'ice-cream-vanilla-choc': {
    url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Vanilla gelato topped with warm Belgian fudge chocolate sauce',
    labelEn: 'VANILLA GELATO CHOCOLATE FUDGE',
    labelAr: 'آيس كريم فانيليا بصوص شوكولاتة فدج',
    sensoryTag: '🍫 صوص شوكولاتة بلجيكية غنية تسيل على الآيس كريم',
  },
  'ice-cream-vanilla-watermelon': {
    url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Vanilla gelato with sweet watermelon sauce',
    labelEn: 'VANILLA GELATO WATERMELON SAUCE',
    labelAr: 'آيس كريم فانيليا بصوص بطيخ صيفي',
    sensoryTag: '🍉 طعم صيفي مبتكر يجمع البطيخ والفانيليا',
  },
  'ice-cream-vanilla-kiwi': {
    url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Vanilla gelato with fresh kiwi fruit sauce',
    labelEn: 'VANILLA GELATO KIWI SAUCE',
    labelAr: 'آيس كريم فانيليا بصوص كيوي أخضر',
    sensoryTag: '🥝 حموضة الكيوي الخفيفة مع حلاوة الفانيليا',
  },
  'ice-cream-vanilla-pineapple': {
    url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Vanilla gelato with tropical pineapple sauce',
    labelEn: 'VANILLA GELATO PINEAPPLE SAUCE',
    labelAr: 'آيس كريم فانيليا بصوص أناناس',
    sensoryTag: '🍍 لمسة استوائية لذيذة على آيس كريم مثلج',
  },

  // --- Category: ميلك شيك (Gourmet Creamy Milkshakes - NOT coffee) ---
  'shake-mango': {
    url: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Creamy thick mango milkshake with whipped cream top',
    labelEn: 'THICK MANGO MILKSHAKE',
    labelAr: 'ميلك شيك مانجو كريمي بالكريمة',
    sensoryTag: '🥭 مانجو مخفوقة مع آيس كريم فانيليا وكريمة مخفوقة',
  },
  'shake-strawberry': {
    url: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Pink strawberry milkshake with whipped cream and strawberry slice',
    labelEn: 'PINK STRAWBERRY MILKSHAKE',
    labelAr: 'ميلك شيك فراولة وردي غني بالكريمة',
    sensoryTag: '🍓 فراولة طازجة مخفوقة مع جيلاتو وكريمة ناعمة',
  },
  'shake-vanilla': {
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Classic thick vanilla bean milkshake with whipped cream',
    labelEn: 'CLASSIC VANILLA BEAN SHAKE',
    labelAr: 'ميلك شيك فانيليا كلاسيك ثقيل',
    sensoryTag: '🍨 قوام كريمي تقيل بنكهة الفانيليا الغنية',
  },
  'shake-chocolate': {
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Thick chocolate fudge milkshake with whipped cream and chocolate drizzle',
    labelEn: 'BELGIAN CHOCOLATE FUDGE SHAKE',
    labelAr: 'ميلك شيك شوكولاتة فدج بالكريمة',
    sensoryTag: '🍫 كاكاو بلجيكي مع صوص فدج وكريمة مخفوقة',
  },
  'shake-oreo': {
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Cookies and cream Oreo milkshake topped with whipped cream and crushed Oreos',
    labelEn: 'OREO COOKIES & CREAM SHAKE',
    labelAr: 'ميلك شيك أوريو بقطع البسكويت',
    sensoryTag: '🍪 بسكويت أوريو مقرمش مخفوق مع حليب وكريمة',
  },
  'shake-hohos': {
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Hohos chocolate cake milkshake with whipped cream',
    labelEn: 'HOHOS CHOCOLATE CAKE SHAKE',
    labelAr: 'ميلك شيك هوهوز كيك شوكولاتة',
    sensoryTag: '🍰 كيك هوهوز شوكولاتة مخفوق مع آيس كريم ناعم',
  },
  'shake-blueberry': {
    url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Purple blueberry milkshake with whipped cream top',
    labelEn: 'WILD BLUEBERRY MILKSHAKE',
    labelAr: 'ميلك شيك بلوبيري توت أزرق',
    sensoryTag: '🫐 توت أزرق طبيعي مخفوق بقوام كثيف ولون بنفسجي',
  },
  'shake-watermelon': {
    url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Watermelon creamy milkshake with ice cream',
    labelEn: 'SUMMER WATERMELON SHAKE',
    labelAr: 'ميلك شيك بطيخ صيفي مبرد',
    sensoryTag: '🍉 بطيخ مخفوق مع جيلاتو فانيليا وكريمة ناعمة',
  },
  'shake-kiwi': {
    url: 'https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&w=360&q=75&auto=format',
    alt: 'Green kiwi milkshake with whipped cream',
    labelEn: 'GREEN KIWI MILKSHAKE',
    labelAr: 'ميلك شيك كيوي استوائي',
    sensoryTag: '🥝 كيوي طازج ممزوج بآيس كريم ناعم ولذيذ',
  },
};

/**
 * Universal Realistic Photo Card Component
 * Renders real food & drink photography with graceful fallback, warm vignette, and tactile details.
 */
export const RealisticDrinkCard: React.FC<{
  imageUrl: string;
  alt: string;
  labelEn: string;
  labelAr?: string;
  sensoryTag?: string;
  className?: string;
}> = ({ imageUrl, alt, labelEn, labelAr, sensoryTag, className = 'w-full h-full' }) => {
  const [currentSrc, setCurrentSrc] = useState(imageUrl);

  React.useEffect(() => {
    setCurrentSrc(imageUrl);
  }, [imageUrl]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#140804] border border-[#3B1F14]/80 shadow-2xl group ${className}`}
    >
      {/* Realistic Photography Image */}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onError={() => {
          if (currentSrc !== DRINK_PHOTOS.drinks.url) {
            setCurrentSrc(DRINK_PHOTOS.drinks.url);
          }
        }}
        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
      />

      {/* Subtle Warm Vignette Overlay to blend seamlessly with Relax Warm Ivory & Espresso Shadow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-gradient-to-t from-[#140804]/90 via-[#140804]/25 to-transparent"
        aria-hidden="true"
      />

      {/* Aged Brass Corner Accent */}
      <div className="absolute top-3 end-3 px-2 py-0.5 rounded-full bg-[#140804]/80 backdrop-blur-md border border-[#B8924E]/40 text-[10px] font-mono text-[#D8C7A5] tracking-wider uppercase flex items-center gap-1.5 shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8924E] animate-pulse" />
        <span>RELAX SEVEN</span>
      </div>

      {/* Bottom Editorial Caption */}
      <div className="absolute bottom-3 start-3 end-3 flex flex-col gap-1 z-10">
        {sensoryTag && (
          <span className="text-[11px] font-messiri text-[#F3E9DA] font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {sensoryTag}
          </span>
        )}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#F4E0C0]">
          <span className="font-bold tracking-wider">{labelEn}</span>
          {labelAr && <span className="font-messiri text-xs text-[#B8924E]">{labelAr}</span>}
        </div>
      </div>
    </div>
  );
};

/**
 * 01. AUTHENTIC HOT BREWS & SPECIALTY COFFEE (مشروبات ساخنة)
 * Realistic steaming artisan coffee, cappuccino and herbs in ceramic cups.
 */
export const HotDrinksCravingVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  const photo = DRINK_PHOTOS.hot_drinks;
  return (
    <RealisticDrinkCard
      imageUrl={photo.url}
      alt={photo.alt}
      labelEn={photo.labelEn}
      labelAr={photo.labelAr}
      sensoryTag={photo.sensoryTag}
      className={className}
    />
  );
};

/**
 * 02. COLD REFRESHING DRINKS & SODAS (مشروبات غازية ومنعشات باردة)
 * Realistic frosty glass of cold soda with ice cubes, effervescence and condensation.
 */
export const DrinksRefreshingCravingVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  const photo = DRINK_PHOTOS.drinks;
  return (
    <RealisticDrinkCard
      imageUrl={photo.url}
      alt={photo.alt}
      labelEn={photo.labelEn}
      labelAr={photo.labelAr}
      sensoryTag={photo.sensoryTag}
      className={className}
    />
  );
};

// Backwards compatibility alias
export const DrinksHotCravingVisual = DrinksRefreshingCravingVisual;

/**
 * 02. ICED SPANISH LATTE & COLD BREW (ايس كوفي)
 * Realistic chilled iced coffee photo with crystal ice cubes, marbling espresso and condensation.
 */
export const IcedCoffeeCravingVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  const photo = DRINK_PHOTOS.iced_coffee;
  return (
    <RealisticDrinkCard
      imageUrl={photo.url}
      alt={photo.alt}
      labelEn={photo.labelEn}
      labelAr={photo.labelAr}
      sensoryTag={photo.sensoryTag}
      className={className}
    />
  );
};

/**
 * 03. CEREMONIAL JADE MATCHA CLOUD (ماتشا)
 * Realistic iced matcha latte photo with vivid jade green foam over cold oat milk (NOT coffee).
 */
export const MatchaCravingVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  const photo = DRINK_PHOTOS.matcha;
  return (
    <RealisticDrinkCard
      imageUrl={photo.url}
      alt={photo.alt}
      labelEn={photo.labelEn}
      labelAr={photo.labelAr}
      sensoryTag={photo.sensoryTag}
      className={className}
    />
  );
};

/**
 * 04. COLD-PRESSED FRESH JUICE (عصائر فريش)
 * Realistic cold-pressed citrus juice with real orange wheel slice and condensation droplets.
 */
export const FreshCravingVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  const photo = DRINK_PHOTOS.fresh;
  return (
    <RealisticDrinkCard
      imageUrl={photo.url}
      alt={photo.alt}
      labelEn={photo.labelEn}
      labelAr={photo.labelAr}
      sensoryTag={photo.sensoryTag}
      className={className}
    />
  );
};

/**
 * 05. SUNSET PASSION MOJITO & COCKTAILS (كوكتيل)
 * Realistic sparkling sunset cocktail with crushed ice, fresh mint, lime wheel, glowing amber layers.
 */
export const CocktailCravingVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  const photo = DRINK_PHOTOS.cocktails;
  return (
    <RealisticDrinkCard
      imageUrl={photo.url}
      alt={photo.alt}
      labelEn={photo.labelEn}
      labelAr={photo.labelAr}
      sensoryTag={photo.sensoryTag}
      className={className}
    />
  );
};

/**
 * 06. THICK BLENDED SMOOTHIES (سموزي)
 * Realistic thick fruit smoothie with strawberry and mango swirl and natural fruit texture.
 */
export const SmoothieCravingVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  const photo = DRINK_PHOTOS.smoothies;
  return (
    <RealisticDrinkCard
      imageUrl={photo.url}
      alt={photo.alt}
      labelEn={photo.labelEn}
      labelAr={photo.labelAr}
      sensoryTag={photo.sensoryTag}
      className={className}
    />
  );
};

/**
 * 07. ARTISANAL GELATO ICE CREAM (آيس كريم)
 * Realistic vanilla bean & berry gelato in coupe with crisp wafer (NOT coffee).
 */
export const IceCreamCravingVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  const photo = DRINK_PHOTOS.ice_cream;
  return (
    <RealisticDrinkCard
      imageUrl={photo.url}
      alt={photo.alt}
      labelEn={photo.labelEn}
      labelAr={photo.labelAr}
      sensoryTag={photo.sensoryTag}
      className={className}
    />
  );
};

/**
 * 08. INDULGENT GOURMET MILKSHAKES (ميلك شيك)
 * Realistic thick gourmet milkshake topped with whipped cream and cookie crumbles.
 */
export const MilkshakeCravingVisual: React.FC<VisualProps> = ({ className = 'w-full h-full' }) => {
  const photo = DRINK_PHOTOS.milkshakes;
  return (
    <RealisticDrinkCard
      imageUrl={photo.url}
      alt={photo.alt}
      labelEn={photo.labelEn}
      labelAr={photo.labelAr}
      sensoryTag={photo.sensoryTag}
      className={className}
    />
  );
};

/**
 * Helper to get a realistic photo for any menu item or category.
 * If specific item ID is defined in ITEM_SPECIFIC_PHOTOS, returns its exact photo.
 * Otherwise, falls back to the exact category photo (NOT coffee unless category is iced_coffee).
 */
export const getDrinkPhotoData = (category: MenuCategory, itemId?: string): PhotoData => {
  if (itemId && ITEM_SPECIFIC_PHOTOS[itemId]) {
    return ITEM_SPECIFIC_PHOTOS[itemId];
  }

  // Fallback strictly based on the drink's real category
  const catPhoto = DRINK_PHOTOS[category] || DRINK_PHOTOS.drinks;
  return catPhoto;
};
