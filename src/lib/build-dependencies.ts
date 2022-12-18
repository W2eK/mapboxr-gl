import { getValues } from './utils';

export const buildDependencies = (args: Record<any, any>, ...dependencies: unknown[]) => {
  const { length: initialLength } = dependencies;
  dependencies.length = 1e2;
  getValues(args).forEach((value, i) => (dependencies[initialLength + i] = value));
  return dependencies;
};
