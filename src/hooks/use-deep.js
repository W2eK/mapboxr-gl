import { useEffect, useRef } from 'react';
import { deepEqual } from '../utils';

const useEqual = (value, strict) => {
  const ref = useRef(value);
  if (!strict && !deepEqual(ref.current, value)) ref.current = value;
  return ref.current;
};

export const useDeepEffect = (callback, originalDependencies, strict) => {
  const memoizedDependencies = useEqual(originalDependencies, strict);
  const dependencies = strict ? originalDependencies : memoizedDependencies;
  useEffect(callback, dependencies);
};
