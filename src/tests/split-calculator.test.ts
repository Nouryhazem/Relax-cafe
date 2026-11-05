import { describe, it, expect } from 'vitest';
import {
  calculateTableSplit,
  distributeIntegerPiasters,
  Participant,
  SplitItem,
  SplitFeeConfig,
  egpToPiasters,
} from '../lib/split-calculator';

describe('Split at Seven Calculator Tests', () => {
  it('distributes integer remainders deterministically with zero loss', () => {
    // 70 EGP (7000 piasters) split among 3 people: 2334, 2333, 2333 = 7000
    const map = distributeIntegerPiasters(7000, ['p1', 'p2', 'p3']);
    const sum = Array.from(map.values()).reduce((a, b) => a + b, 0);
    expect(sum).toBe(7000);
    expect(map.get('p1')).toBe(2334);
    expect(map.get('p2')).toBe(2333);
    expect(map.get('p3')).toBe(2333);
  });

  it('calculates individual items, shared items, rounds and verifies grand total invariant', () => {
    const participants: Participant[] = [
      { id: 'nuri', name: 'Nuri', isPaid: false },
      { id: 'salma', name: 'Salma', isPaid: false },
      { id: 'mariam', name: 'Mariam', isPaid: false },
    ];

    const items: SplitItem[] = [
      // Nuri has Ice Americano (60 EGP)
      {
        id: '1',
        nameAr: 'آيس أمريكانو',
        unitPricePiasters: egpToPiasters(60),
        quantity: 1,
        round: 1,
        splitMode: 'single',
        assignedParticipantIds: ['nuri'],
      },
      // Salma has Spanish Latte (80 EGP)
      {
        id: '2',
        nameAr: 'سبانش لاتيه',
        unitPricePiasters: egpToPiasters(80),
        quantity: 1,
        round: 1,
        splitMode: 'single',
        assignedParticipantIds: ['salma'],
      },
      // Mariam has Cocktail Relax (80 EGP)
      {
        id: '3',
        nameAr: 'ريلاكس',
        unitPricePiasters: egpToPiasters(80),
        quantity: 1,
        round: 1,
        splitMode: 'single',
        assignedParticipantIds: ['mariam'],
      },
      // Shared large water between Salma & Mariam (20 EGP)
      {
        id: '4',
        nameAr: 'مياه كبيرة',
        unitPricePiasters: egpToPiasters(20),
        quantity: 1,
        round: 2,
        splitMode: 'equal',
        assignedParticipantIds: ['salma', 'mariam'],
      },
    ];

    const fees: SplitFeeConfig = {
      servicePercentage: 10,
      taxPercentage: 5,
      tipMode: 'percentage',
      tipValue: 5,
      tipParticipantIds: ['nuri', 'salma', 'mariam'],
    };

    const result = calculateTableSplit(participants, items, fees);

    expect(result.subtotalPiasters).toBe(egpToPiasters(240));
    expect(result.invariantHolds).toBe(true);
    expect(result.invariantDifferencePiasters).toBe(0);

    const sumDue = result.participants.reduce((sum, p) => sum + p.finalDuePiasters, 0);
    expect(sumDue).toBe(result.grandTotalPiasters);
  });

  it('handles one participant covering another participant', () => {
    const participants: Participant[] = [
      { id: 'ahmed', name: 'Ahmed', isPaid: false },
      { id: 'kareem', name: 'Kareem', isPaid: false, coveredByParticipantId: 'ahmed' },
    ];

    const items: SplitItem[] = [
      {
        id: '1',
        nameAr: 'سبانش لاتيه',
        unitPricePiasters: egpToPiasters(80),
        quantity: 1,
        round: 1,
        splitMode: 'single',
        assignedParticipantIds: ['ahmed'],
      },
      {
        id: '2',
        nameAr: 'ميلك شيك مانجو',
        unitPricePiasters: egpToPiasters(80),
        quantity: 1,
        round: 1,
        splitMode: 'single',
        assignedParticipantIds: ['kareem'],
      },
    ];

    const fees: SplitFeeConfig = {
      servicePercentage: 0,
      taxPercentage: 0,
      tipMode: 'none',
      tipValue: 0,
      tipParticipantIds: [],
    };

    const result = calculateTableSplit(participants, items, fees);
    const ahmed = result.participants.find(p => p.participantId === 'ahmed')!;
    const kareem = result.participants.find(p => p.participantId === 'kareem')!;

    expect(kareem.finalDuePiasters).toBe(0);
    expect(kareem.coveredByOtherPiasters).toBe(egpToPiasters(80));
    expect(ahmed.finalDuePiasters).toBe(egpToPiasters(160));
    expect(result.invariantHolds).toBe(true);
  });
});
