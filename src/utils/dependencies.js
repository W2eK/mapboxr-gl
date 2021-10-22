/**
 * @param {number} maxLength
 */
export function dependenciesBuilder(maxLength = 0) {
  /**
   * @param {object} obj
   * @param {array} initial
   */
  return (obj, ...initial) => {
    const length = initial.length;
    initial.length += maxLength;
    Object.values(obj).forEach((x, i) => {
      const value =
        typeof x === 'function'
          ? x.toString()
          : typeof x === 'object'
          ? JSON.stringify(x)
          : x;
      initial[length + i] = value;
    });
    return initial;
  };
}
