export const getEntries = <T extends string | number | symbol, U>(obj: Record<T, U>) => {
  return Object.entries(obj) as [T, U][];
};

export const getValues = <T extends string | number | symbol, U>(obj: Record<T, U>) => {
  return Object.values(obj) as U[];
};

export const getKeys = <T extends string | number | symbol, U>(obj: Partial<Record<T, U>>) => {
  return Object.keys(obj) as T[];
};

export const toList = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);
