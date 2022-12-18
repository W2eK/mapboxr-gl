import { useMemo } from 'react';

const counters: Record<string, number> = {};

export const useId = (id: string | undefined, prefix: string) => {
  if (!counters[prefix]) counters[prefix] = 0;
  return useMemo(() => id || `${prefix}-${counters[prefix]++}`, [id, prefix]);
};
