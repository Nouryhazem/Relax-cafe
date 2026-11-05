/**
 * Relax Café — Split at Seven Calculator
 * Integer-based accounting in Piasters (1 EGP = 100 Piasters).
 * Ensures sum(individual shares) === grandTotal with exact piaster precision.
 */

export interface Participant {
  id: string;
  name: string;
  isPaid: boolean;
  coveredByParticipantId?: string; // If another participant covers this person's bill
}

export type SplitMode = 'single' | 'equal' | 'custom_percentage' | 'custom_amount';

export interface SplitItemAllocation {
  participantId: string;
  percentage?: number; // 0 - 100 for custom_percentage
  amountPiasters?: number; // integer piasters for custom_amount
}

export interface SplitItem {
  id: string;
  nameAr: string;
  nameEn?: string;
  unitPricePiasters: number; // in piasters (price * 100)
  quantity: number;
  round: number; // 1 = First Round, 2 = Second Round, etc.
  splitMode: SplitMode;
  assignedParticipantIds: string[]; // For single (1 item) or equal share (1 or more)
  customAllocations?: SplitItemAllocation[];
}

export interface SplitFeeConfig {
  servicePercentage: number; // default 0
  taxPercentage: number; // default 0
  tipMode: 'none' | 'fixed' | 'percentage';
  tipValue: number; // percentage or piasters
  tipParticipantIds: string[]; // which participants share the tip (default: all)
}

export interface ParticipantBreakdown {
  participantId: string;
  name: string;
  itemsSubtotalPiasters: number;
  servicePiasters: number;
  taxPiasters: number;
  tipPiasters: number;
  grossTotalPiasters: number;
  coveredForOtherPiasters: number; // amounts this person is paying on behalf of others
  coveredByOtherPiasters: number; // amount of this person's share paid by someone else
  finalDuePiasters: number; // amount this person physically pays
  isPaid: boolean;
  itemDetails: Array<{
    itemId: string;
    nameAr: string;
    sharePiasters: number;
    quantity: number;
  }>;
}

export interface TableSplitResult {
  subtotalPiasters: number;
  servicePiasters: number;
  taxPiasters: number;
  tipPiasters: number;
  grandTotalPiasters: number;
  totalPaidPiasters: number;
  totalRemainingPiasters: number;
  participants: ParticipantBreakdown[];
  invariantHolds: boolean;
  invariantDifferencePiasters: number;
  roundsCount: number;
}

/**
 * Distributes an integer amount of piasters across N participants according to integer or equal weights.
 * Handles integer division remainders deterministically.
 */
export function distributeIntegerPiasters(
  totalPiasters: number,
  participantIds: string[],
  weights?: number[]
): Map<string, number> {
  const result = new Map<string, number>();
  if (participantIds.length === 0 || totalPiasters <= 0) {
    participantIds.forEach(id => result.set(id, 0));
    return result;
  }

  if (!weights || weights.length !== participantIds.length) {
    // Equal distribution
    const count = participantIds.length;
    const baseShare = Math.floor(totalPiasters / count);
    const remainder = totalPiasters % count;

    participantIds.forEach((id, idx) => {
      // distribute 1 extra piaster to the first `remainder` participants
      const extra = idx < remainder ? 1 : 0;
      result.set(id, baseShare + extra);
    });
    return result;
  }

  // Weighted distribution
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  if (totalWeight <= 0) {
    return distributeIntegerPiasters(totalPiasters, participantIds);
  }

  let distributedSum = 0;
  const shares: { id: string; raw: number; floor: number; fraction: number }[] = [];

  for (let i = 0; i < participantIds.length; i++) {
    const raw = (totalPiasters * weights[i]) / totalWeight;
    const floor = Math.floor(raw);
    distributedSum += floor;
    shares.push({
      id: participantIds[i],
      raw,
      floor,
      fraction: raw - floor,
    });
  }

  let remainder = totalPiasters - distributedSum;
  // Sort descending by highest fractional part to give extra piaster
  const sortedByFraction = [...shares].sort((a, b) => b.fraction - a.fraction);
  const extraPiasters = new Set<string>();

  for (let i = 0; i < remainder && i < sortedByFraction.length; i++) {
    extraPiasters.add(sortedByFraction[i].id);
  }

  shares.forEach(s => {
    const finalShare = s.floor + (extraPiasters.has(s.id) ? 1 : 0);
    result.set(s.id, finalShare);
  });

  return result;
}

/**
 * Main pure calculation function for Split at Seven
 */
export function calculateTableSplit(
  participants: Participant[],
  items: SplitItem[],
  fees: SplitFeeConfig
): TableSplitResult {
  const participantMap = new Map<string, Participant>(participants.map(p => [p.id, p]));
  const participantIds = participants.map(p => p.id);

  // 1. Calculate each item's allocation across participants
  const participantItemTotals = new Map<string, number>();
  const participantItemBreakdowns = new Map<
    string,
    Array<{ itemId: string; nameAr: string; sharePiasters: number; quantity: number }>
  >();

  participantIds.forEach(id => {
    participantItemTotals.set(id, 0);
    participantItemBreakdowns.set(id, []);
  });

  let subtotalPiasters = 0;
  let maxRound = 1;

  for (const item of items) {
    if (item.round > maxRound) maxRound = item.round;
    const itemTotalPiasters = item.unitPricePiasters * item.quantity;
    subtotalPiasters += itemTotalPiasters;

    if (item.splitMode === 'single') {
      const targetId = item.assignedParticipantIds[0] || participantIds[0];
      if (targetId && participantItemTotals.has(targetId)) {
        participantItemTotals.set(targetId, (participantItemTotals.get(targetId) || 0) + itemTotalPiasters);
        participantItemBreakdowns.get(targetId)?.push({
          itemId: item.id,
          nameAr: item.nameAr,
          sharePiasters: itemTotalPiasters,
          quantity: item.quantity,
        });
      }
    } else if (item.splitMode === 'equal') {
      const targets = item.assignedParticipantIds.filter(id => participantMap.has(id));
      const activeTargets = targets.length > 0 ? targets : participantIds;
      const distributed = distributeIntegerPiasters(itemTotalPiasters, activeTargets);

      distributed.forEach((share, id) => {
        participantItemTotals.set(id, (participantItemTotals.get(id) || 0) + share);
        participantItemBreakdowns.get(id)?.push({
          itemId: item.id,
          nameAr: item.nameAr,
          sharePiasters: share,
          quantity: item.quantity,
        });
      });
    } else if (item.splitMode === 'custom_percentage') {
      const allocs = item.customAllocations || [];
      const validAllocs = allocs.filter(a => participantMap.has(a.participantId));
      const weights = validAllocs.map(a => Math.max(0, a.percentage || 0));
      const targetIds = validAllocs.map(a => a.participantId);

      const distributed = distributeIntegerPiasters(
        itemTotalPiasters,
        targetIds.length > 0 ? targetIds : participantIds,
        weights.length > 0 ? weights : undefined
      );

      distributed.forEach((share, id) => {
        participantItemTotals.set(id, (participantItemTotals.get(id) || 0) + share);
        participantItemBreakdowns.get(id)?.push({
          itemId: item.id,
          nameAr: item.nameAr,
          sharePiasters: share,
          quantity: item.quantity,
        });
      });
    } else if (item.splitMode === 'custom_amount') {
      const allocs = item.customAllocations || [];
      let allocatedTotal = 0;
      allocs.forEach(a => {
        if (participantMap.has(a.participantId)) {
          const amt = Math.max(0, Math.round(a.amountPiasters || 0));
          allocatedTotal += amt;
          participantItemTotals.set(a.participantId, (participantItemTotals.get(a.participantId) || 0) + amt);
          participantItemBreakdowns.get(a.participantId)?.push({
            itemId: item.id,
            nameAr: item.nameAr,
            sharePiasters: amt,
            quantity: item.quantity,
          });
        }
      });
      // If sum of custom amounts is less than itemTotal, distribute remainder equally to active targets
      const remainingPiasters = itemTotalPiasters - allocatedTotal;
      if (remainingPiasters > 0 && participantIds.length > 0) {
        const remainderDist = distributeIntegerPiasters(remainingPiasters, participantIds);
        remainderDist.forEach((share, id) => {
          participantItemTotals.set(id, (participantItemTotals.get(id) || 0) + share);
        });
      }
    }
  }

  // 2. Fees calculation (Service and Tax)
  // Overall table service
  const servicePiasters = Math.round((subtotalPiasters * (fees.servicePercentage || 0)) / 100);
  const taxPiasters = Math.round(((subtotalPiasters + servicePiasters) * (fees.taxPercentage || 0)) / 100);

  // Distribute service and tax proportionally according to each participant's item subtotal
  const participantSubtotals = participantIds.map(id => participantItemTotals.get(id) || 0);
  const serviceMap = distributeIntegerPiasters(servicePiasters, participantIds, participantSubtotals);
  const taxMap = distributeIntegerPiasters(taxPiasters, participantIds, participantSubtotals);

  // 3. Tip calculation
  let tipPiasters = 0;
  if (fees.tipMode === 'percentage' && fees.tipValue > 0) {
    tipPiasters = Math.round((subtotalPiasters * fees.tipValue) / 100);
  } else if (fees.tipMode === 'fixed' && fees.tipValue > 0) {
    tipPiasters = Math.round(fees.tipValue);
  }

  // Decide who shares tip
  const tipEligibleIds =
    fees.tipParticipantIds.length > 0
      ? fees.tipParticipantIds.filter(id => participantMap.has(id))
      : participantIds;

  const tipEligibleSubtotals = tipEligibleIds.map(id => participantItemTotals.get(id) || 0);
  const tipMap = distributeIntegerPiasters(tipPiasters, tipEligibleIds, tipEligibleSubtotals);

  // 4. Assemble participant breakdowns
  const grandTotalPiasters = subtotalPiasters + servicePiasters + taxPiasters + tipPiasters;

  const participantBreakdowns: ParticipantBreakdown[] = participants.map(p => {
    const itemSubtotal = participantItemTotals.get(p.id) || 0;
    const serv = serviceMap.get(p.id) || 0;
    const tx = taxMap.get(p.id) || 0;
    const tp = tipMap.get(p.id) || 0;
    const gross = itemSubtotal + serv + tx + tp;

    return {
      participantId: p.id,
      name: p.name,
      itemsSubtotalPiasters: itemSubtotal,
      servicePiasters: serv,
      taxPiasters: tx,
      tipPiasters: tp,
      grossTotalPiasters: gross,
      coveredForOtherPiasters: 0,
      coveredByOtherPiasters: 0,
      finalDuePiasters: gross,
      isPaid: p.isPaid,
      itemDetails: participantItemBreakdowns.get(p.id) || [],
    };
  });

  // 5. Apply "Covering" (one person pays for another)
  const breakdownById = new Map<string, ParticipantBreakdown>(
    participantBreakdowns.map(pb => [pb.participantId, pb])
  );

  participants.forEach(p => {
    if (p.coveredByParticipantId && p.coveredByParticipantId !== p.id && breakdownById.has(p.coveredByParticipantId)) {
      const payer = breakdownById.get(p.coveredByParticipantId)!;
      const target = breakdownById.get(p.id)!;
      const coveredAmount = target.grossTotalPiasters;

      target.coveredByOtherPiasters += coveredAmount;
      target.finalDuePiasters = 0;

      payer.coveredForOtherPiasters += coveredAmount;
      payer.finalDuePiasters += coveredAmount;
    }
  });

  // 6. Invariant check: sum(finalDuePiasters) === grandTotalPiasters
  const sumOfFinalDues = participantBreakdowns.reduce((sum, p) => sum + p.finalDuePiasters, 0);
  const invariantHolds = sumOfFinalDues === grandTotalPiasters;
  const invariantDifference = sumOfFinalDues - grandTotalPiasters;

  // Paid / Remaining status
  const totalPaidPiasters = participantBreakdowns
    .filter(p => p.isPaid)
    .reduce((sum, p) => sum + p.finalDuePiasters, 0);

  const totalRemainingPiasters = Math.max(0, grandTotalPiasters - totalPaidPiasters);

  return {
    subtotalPiasters,
    servicePiasters,
    taxPiasters,
    tipPiasters,
    grandTotalPiasters,
    totalPaidPiasters,
    totalRemainingPiasters,
    participants: participantBreakdowns,
    invariantHolds,
    invariantDifferencePiasters: invariantDifference,
    roundsCount: maxRound,
  };
}

/**
 * Currency conversion & formatting utilities
 */
export function piastersToEGP(piasters: number): number {
  return piasters / 100;
}

export function egpToPiasters(egp: number): number {
  return Math.round(egp * 100);
}

export function formatEGP(piasters: number, isArabic = true): string {
  const egp = piastersToEGP(piasters);
  const formatted = egp % 1 === 0 ? egp.toLocaleString('en-US') : egp.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return isArabic ? `${formatted} ج.م` : `${formatted} EGP`;
}
