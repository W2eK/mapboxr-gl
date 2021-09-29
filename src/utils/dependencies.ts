const getDependencies = <T extends { [key: string]: any }>(rest: T) =>
  Object.values(rest).map(x =>
    typeof x === 'function'
      ? x.toString()
      : typeof x === 'object'
      ? JSON.stringify(x)
      : x
  );

export default getDependencies;
