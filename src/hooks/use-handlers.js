import { useRef } from 'react';
import { logger, stringEqual } from '../utils';

export const buildSwitcher = handler => state =>
  handler[state ? 'enable' : 'disable']();

export const useHandlers = ({ handlers, props }) => {
  const prev = useRef(props);
  const keys = Object.keys(handlers);
  const rest = Object.entries(props).reduce((rest, [key, value]) => {
    if (!keys.includes(key)) {
      rest[key] = value;
      return rest;
    } else if (!stringEqual(value, prev.current[key])) {
      const [component = '', name = ''] =
        useHandlers.props || [];
      logger`${component}: ${name} is updating ${key}`;
      handlers[key](value);
    }
    return rest;
  }, {});
  prev.current = props;
  return rest;
};
