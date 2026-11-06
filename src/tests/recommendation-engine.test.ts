import { describe, it, expect } from 'vitest';
import { computeRecommendations, RecommendationPreferences } from '../lib/recommendation-engine';
import { MENU_ITEMS } from '../data/menu';

describe('Find Your Pause Recommendation Engine Tests', () => {
  it('returns exactly three distinct recommendations (closest, trusted, discovery)', () => {
    const prefs: RecommendationPreferences = {
      mood: 'chill',
      temperature: 'cold',
      coffeeType: 'coffee',
      style: 'balanced',
      maxBudget: 100,
    };

    const result = computeRecommendations(prefs);
    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.closest).toBeDefined();
    expect(result.trusted).toBeDefined();
    expect(result.discovery).toBeDefined();

    // Verify all 3 are distinct
    const ids = [result.closest.item.id, result.trusted.item.id, result.discovery.item.id];
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(3);

    // Verify items exist in MENU_ITEMS
    const allMenuIds = new Set(MENU_ITEMS.map(i => i.id));
    ids.forEach(id => {
      expect(allMenuIds.has(id)).toBe(true);
    });
  });

  it('respects hot beverage preference for coffee lovers looking for focus', () => {
    const prefs: RecommendationPreferences = {
      mood: 'focus',
      temperature: 'hot',
      coffeeType: 'coffee',
      style: 'strong',
      maxBudget: 60,
    };

    const result = computeRecommendations(prefs);
    expect(result).not.toBeNull();
    if (!result) return;

    // Closest match should align with hot coffee
    expect(result.closest.item.temperature).toBe('hot');
    expect(result.closest.item.coffeeType).toBe('coffee');
    expect(result.closest.item.price).toBeLessThanOrEqual(60);
  });

  it('handles non-coffee and sweet preferences appropriately', () => {
    const prefs: RecommendationPreferences = {
      mood: 'sweet_tooth',
      temperature: 'cold',
      coffeeType: 'non-coffee',
      style: 'sweet',
      maxBudget: 90,
    };

    const result = computeRecommendations(prefs);
    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.closest.item.coffeeType).toBe('non-coffee');
    expect(result.closest.titleAr).toBeTruthy();
    expect(result.closest.reasonAr).toBeTruthy();
  });
});
