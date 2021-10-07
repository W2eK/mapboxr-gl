export function deepMerge(source, overrides) {
  const result = Array.isArray(source) ? [...source] : { ...source };
  for (const [key, a] of Object.entries(overrides)) {
    const b = overrides[key];
    if (typeof a !== 'object' || typeof b !== 'object' || b === null) {
      result[key] = b;
    } else {
      result[key] = deepMerge(a, b);
    }
  }
  return result;
}