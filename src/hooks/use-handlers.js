import { useCallback, useRef } from 'react';
import { logger, stringEqual } from '../utils';

// prettier-ignore
export const buildSetter = name => (subject, value) =>
    subject[name](value);

export const buildSwitcher = name => (subject, state) =>
  subject[name][state ? 'enable' : 'disable']();

export const useHandlers = ({
  handlers,
  props,
  subject,
  component = 'component',
  id = 'unnamed'
}) => {
  const prev = useRef(props);
  const keys = Object.keys(handlers);
  const rest = Object.entries(props).reduce((rest, [key, value]) => {
    if (!keys.includes(key)) {
      rest[key] = value;
      return rest;
    } else if (subject && !stringEqual(value, prev.current[key])) {
      logger`${component.toUpperCase()}: ${id} is updating ${key}`;
      handlers[key](subject, value, props);
    }
    return rest;
  }, {});
  prev.current = props;
  return rest;
};
