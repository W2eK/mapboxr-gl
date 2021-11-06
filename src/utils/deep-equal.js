export function stringEqual(a, b) {
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object' && typeof a !== 'function') return a === b;
  if (typeof a === 'object') return JSON.stringify(a) === JSON.stringify(b);
  if (typeof a === 'function') return a.toSting() === b.toSting();
}

export function deepEqual(a, b) {
  if (b instanceof Object && 'alive' in b && 'map' in b) return true;
  if (typeof a !== typeof b) return false;
  // Have same typeof
  if (!(a instanceof Object) && typeof a !== 'function') return a === b;
  // Not a primitive value
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  // Either array or object or function
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    if (a.every((x, i) => deepEqual(x, b[i]))) return true;
    return false;
  } else if (a instanceof Object) {
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    if (keys.every(key => deepEqual(a[key], b[key]))) return true;
    return false;
  } else if (typeof a === 'function') {
    return a.toSting() === b.toString();
  } else {
    return false;
  }
}
