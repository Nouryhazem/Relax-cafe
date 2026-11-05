import { MenuItem, MENU_ITEMS, MoodTag, TemperatureTag, CoffeeTag, StrengthTag, SweetnessTag } from '../data/menu';

export interface RecommendationPreferences {
  mood: MoodTag;
  temperature: TemperatureTag | 'any';
  coffeeType: CoffeeTag | 'any';
  style: 'light' | 'balanced' | 'strong' | 'sweet';
  maxBudget: number;
}

export interface RecommendationResultItem {
  item: MenuItem;
  tier: 'closest' | 'trusted' | 'discovery';
  titleAr: string;
  reasonAr: string;
  score: number;
}

export interface RecommendationOutput {
  closest: RecommendationResultItem;
  trusted: RecommendationResultItem;
  discovery: RecommendationResultItem;
}

export function computeRecommendations(prefs: RecommendationPreferences): RecommendationOutput | null {
  const availableItems = MENU_ITEMS.filter(item => item.available && item.price <= prefs.maxBudget);
  const pool = availableItems.length >= 3 ? availableItems : MENU_ITEMS.filter(i => i.available);

  const scored = pool.map(item => {
    let score = 0;

    // Strict temperature filter
    if (prefs.temperature !== 'any') {
      if (item.temperature === prefs.temperature) {
        score += 30;
      } else {
        score -= 50;
      }
    }

    // Strict coffee filter
    if (prefs.coffeeType !== 'any') {
      if (item.coffeeType === prefs.coffeeType) {
        score += 30;
      } else {
        score -= 50;
      }
    }

    // Style match (خفيفة، مظبوطة، قوية، مسكرة)
    if (prefs.style === 'light' && (item.strength === 'light' || item.strength === 'none')) {
      score += 20;
    } else if (prefs.style === 'balanced' && item.strength === 'balanced') {
      score += 20;
    } else if (prefs.style === 'strong' && item.strength === 'strong') {
      score += 20;
    } else if (prefs.style === 'sweet' && (item.sweetness === 'sweet' || item.sweetness === 'rich')) {
      score += 20;
    }

    // Mood alignment
    if (item.moods.includes(prefs.mood)) {
      score += 25;
    }

    // Signature boost for Relax Cocktail
    if (item.id === 'cocktail-relax') {
      score += 5;
    }

    return { item, score };
  }).sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;

  const closest = scored[0];

  // Trusted / Safe classic: reliable crowd favorite from a different category if possible
  const trustedCandidate = scored.slice(1).find(
    s => ['ice-latte', 'fresh-lemon-mint', 'cocktail-manhattan', 'fresh-mango', 'smoothie-watermelon'].includes(s.item.id) &&
      s.item.id !== closest.item.id
  ) || scored.slice(1).find(s => s.item.category !== closest.item.category) || scored[1] || closest;

  // Discovery / Something different
  const discoveryCandidate = scored.slice(1).find(
    s => s.item.id !== closest.item.id &&
      s.item.id !== trustedCandidate.item.id &&
      (s.item.category === 'matcha' || s.item.category === 'cocktails' || s.item.id === 'cocktail-relax' || s.item.moods.includes('discover'))
  ) || scored.slice(1).find(s => s.item.id !== closest.item.id && s.item.id !== trustedCandidate.item.id) || scored[scored.length - 1];

  // Specific natural Egyptian explanations from prompt
  const getExplanation = (tier: 'closest' | 'trusted' | 'discovery', style: string): string => {
    if (tier === 'closest') {
      if (style === 'sweet') return 'مسكر وتقيل شوية لو عايز حاجة تغيّر المود.';
      if (style === 'light') return 'اختيار خفيف يخلي القعدة أهدى.';
      return 'ساقع ومتوازن، ومناسب للمود اللي اخترته.';
    } else if (tier === 'trusted') {
      return 'اختيار بسيط ومضمون من غير تفكير كتير.';
    } else {
      return 'قريب من ذوقك، بس فيه تغيير صغير.';
    }
  };

  return {
    closest: {
      item: closest.item,
      tier: 'closest',
      titleAr: 'ده أقرب اختيار ليك',
      reasonAr: getExplanation('closest', prefs.style),
      score: closest.score,
    },
    trusted: {
      item: trustedCandidate.item,
      tier: 'trusted',
      titleAr: 'لو عايز حاجة مضمونة',
      reasonAr: getExplanation('trusted', prefs.style),
      score: trustedCandidate.score,
    },
    discovery: {
      item: discoveryCandidate.item,
      tier: 'discovery',
      titleAr: 'ولو حابب تغيّر',
      reasonAr: getExplanation('discovery', prefs.style),
      score: discoveryCandidate.score,
    },
  };
}
