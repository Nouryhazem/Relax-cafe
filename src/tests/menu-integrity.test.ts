import { describe, it, expect } from 'vitest';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';

describe('Menu Integrity and Pricing Tests', () => {
  it('contains all 9 chapters in strictly ascending order', () => {
    expect(CATEGORIES).toHaveLength(9);
    CATEGORIES.forEach((cat, idx) => {
      expect(cat.order).toBe(idx + 1);
      expect(cat.id).toBeDefined();
      expect(cat.nameAr).toBeDefined();
      expect(cat.nameEn).toBeDefined();
      expect(cat.priceRange).toMatch(/ج\.م/);
    });

    const categoryIds = CATEGORIES.map(c => c.id);
    expect(categoryIds).toContain('hot_drinks');
    expect(categoryIds).toContain('drinks');
    expect(categoryIds).toContain('iced_coffee');
    expect(categoryIds).toContain('matcha');
    expect(categoryIds).toContain('fresh');
    expect(categoryIds).toContain('cocktails');
    expect(categoryIds).toContain('smoothies');
    expect(categoryIds).toContain('ice_cream');
    expect(categoryIds).toContain('milkshakes');
  });

  it('contains exactly 27 authentic hot drinks matching the official menu with exact prices', () => {
    const hotDrinks = MENU_ITEMS.filter(item => item.category === 'hot_drinks');
    expect(hotDrinks).toHaveLength(27);

    const priceMap: Record<string, number> = {
      'شاي': 25,
      'شاي حليب': 35,
      'نسكافيه بلاك': 50,
      'نسكافيه حليب': 60,
      'قهوة تركي': 35,
      'قهوه تركى دبل': 45,
      'قهوة بندق': 40,
      'قهوة فرنساوي': 45,
      'اسبريسو سنجل': 40,
      'اسبريسو دبل': 50,
      'سحلب مكسرات': 70,
      'سحلب فواكه': 70,
      'هوت شوكلت سادة': 50,
      'هوت شوكلت حليب': 60,
      'كابتشينو': 60,
      'كابتشينو لاتيه': 60,
      'كابتشينو موكا': 60,
      'كابتشينو بندق': 60,
      'زنجبيل': 25,
      'ليمون سخن': 25,
      'كركديه': 25,
      'هوت سيدر (تفاح - قرفة)': 60,
      'اعشاب (قرفة - زنجبيل - ينسون)': 30,
      'قرفة': 25,
      'قرفة حليب': 35,
      'نعناع': 25,
      'ينسون': 25,
    };

    hotDrinks.forEach(drink => {
      expect(priceMap[drink.nameAr]).toBeDefined();
      expect(drink.price).toBe(priceMap[drink.nameAr]);
      expect(drink.price).toBeGreaterThan(0);
      expect(drink.ingredients).toBeTruthy();
    });
  });

  it('verifies all coffees have coffeeType set to enable the +5 EGP cake combo', () => {
    const coffeeItems = MENU_ITEMS.filter(
      item => item.nameAr.includes('قهوة') || item.nameAr.includes('اسبريسو') || item.nameAr.includes('كابتشينو') || item.nameAr.includes('نسكافيه')
    );
    expect(coffeeItems.length).toBeGreaterThan(0);
    coffeeItems.forEach(item => {
      expect(item.coffeeType).toBe('coffee');
    });
  });

  it('guarantees every item has unique ID, positive price, and valid category', () => {
    const idSet = new Set<string>();
    const validCatIds = new Set(CATEGORIES.map(c => c.id));

    MENU_ITEMS.forEach(item => {
      expect(idSet.has(item.id)).toBe(false);
      idSet.add(item.id);
      expect(validCatIds.has(item.category)).toBe(true);
      expect(item.price).toBeGreaterThan(0);
      expect(item.nameAr.trim().length).toBeGreaterThan(0);
      expect(item.keywords.length).toBeGreaterThan(0);
    });
  });
});
