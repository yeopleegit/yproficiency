export type DecayStatus = 'fresh' | 'warming' | 'stale';

export function getDecayStatus(daysSince: number | null, decayDays: number): DecayStatus {
  if (daysSince === null) return 'stale';
  if (daysSince <= decayDays * 0.5) return 'fresh';
  if (daysSince <= decayDays) return 'warming';
  return 'stale';
}

export const statusColors: Record<DecayStatus, { bg: string; text: string; dot: string }> = {
  fresh:   { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500' },
  warming: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  stale:   { bg: 'bg-red-50',    text: 'text-red-700',    dot: 'bg-red-500' },
};

export const statusLabels: Record<DecayStatus, string> = {
  fresh: 'Fresh',
  warming: 'Warming',
  stale: 'Stale',
};
