import { useRef } from 'react';
import { AnyFunction } from '../../interfaces/utils';
import { deepEqual } from '../deep-equal';
import { getEntries, getKeys } from '../utils';

type UseHandlersProps = {
  handlers: Record<string, AnyFunction>;
  props: Record<any, any>;
  context: any;
  strict: boolean;
};

export const useHandlers = ({ handlers, props, context, strict }: UseHandlersProps) => {
  // * Choose equality function
  const equalityFn = strict ? (a: unknown, b: unknown) => a === b : deepEqual;
  // * Previous state of props
  const prev = useRef(props);
  // * All handlers keys
  const handlerKeys = new Set(getKeys(handlers));
  const handledKeys = new Set();

  const rest: Record<any, any> = {};
  getEntries(props).forEach(([key, value]) => {
    handledKeys.add(key);
    // * Filtering keys without handler
    if (!handlerKeys.has(key)) {
      rest[key] = value;
      return;
    }
    if (!equalityFn(value, prev.current[key])) {
      handlers[key].call(context, value);
    }
  });

  // * Reset values if key is missed
  getKeys(prev.current)
    .filter(key => handlerKeys.has(key) && !handledKeys.has(key))
    .forEach(key => {
      handlers[key].call(context, undefined);
    });
  return rest;
};
