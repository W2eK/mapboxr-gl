export function getDependencies(obj) {
  return Object.values(obj).map(x =>
    typeof x === 'function'
      ? x.toString()
      : typeof x === 'object'
      ? JSON.stringify(x)
      : x
  );
}
