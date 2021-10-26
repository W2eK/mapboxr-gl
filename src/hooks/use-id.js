import { useMemo } from 'react';

const counters = {};

export const useId = (id, prefix) => {
  if (!counters[prefix]) counters[prefix] = 0;
  return useMemo(() => id || `${prefix}-${counters[prefix]++}`, [id, prefix]);
};
