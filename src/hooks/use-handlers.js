import { useRef } from 'react';
import { deepEqual, getLogger, stringEqual } from '../utils';

export const buildSwitcher = key =>
  function switcher(state) {
    this[key][state ? 'enable' : 'disable']();
  };

export const buildSetter = key =>
  function setState(state) {
    this[key] = state;
  };

export const buildHandlers = handlers => {
  return Object.entries(handlers).reduce((obj, [key, value]) => {
    if (typeof value === 'string') {
      obj[key] = function (x) {
        this[value](x);
      };
    } else {
      obj[key] = value;
    }
    return obj;
  }, {});
};

export const useHandlers = ({ handlers, props, context, strict }) => {
  const l = getLogger();
  const equalityFn = strict ? (a, b) => a === b : deepEqual;
  const prev = useRef(props);
  const keys = new Set(Object.keys(handlers));
  const handled = new Set();

  const rest = Object.entries(props).reduce((rest, [key, value]) => {
    handled.add(key);
    if (!keys.has(key)) {
      rest[key] = value;
      return rest;
    }
    if (!equalityFn(value, prev.current[key])) {
      l`update ${key}`;
      handlers[key].call(context, value);
    }
    return rest;
  }, {});

  Object.entries(prev.current)
    .filter(([key]) => keys.has(key) && !handled.has(key))
    .forEach(([key, value]) => {
      l`update ${key}`;
      handlers[key].call(context, undefined);
    });
  prev.current = props;
  return rest;
};
