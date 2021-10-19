import { useRef } from 'react';
import { getLogger, stringEqual } from '../utils';

export const buildSwitcher = handler => state =>
  handler[state ? 'enable' : 'disable']();

export const useHandlers = ({ handlers, props }) => {
  const l = getLogger();
  const prev = useRef(props);
  const keys = Object.keys(handlers);
  // TODO: Handle removed props from prev.current
  const rest = Object.entries(props).reduce((rest, [key, value]) => {
    if (!keys.includes(key)) {
      rest[key] = value;
      return rest;
    } else if (!stringEqual(value, prev.current[key])) {
      l`updating ${key}`;
      handlers[key](value, prev.current[key]);
    }
    return rest;
  }, {});
  prev.current = props;
  return rest;
};
