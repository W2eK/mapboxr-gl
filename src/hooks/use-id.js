import { useMemo } from 'react';

let counter = 0;

export const useId = (id, prefix) => {
  return useMemo(() => id || `${prefix}-${counter++}`, [id]);
};
