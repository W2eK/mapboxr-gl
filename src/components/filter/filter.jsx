import { useEffect, useRef } from 'react';
import { logger } from '../../utils';
import { useMap } from '../context';

export function Filter({ rule, layer, parent }) {
  const { map, loaded } = useMap();
  const initial = useRef(false);
  const name = JSON.stringify(rule);
  logger`FILTER: ${name} is rendering ${layer}`;

  useEffect(() => {
    if (!loaded) return;
    logger`FILTER: ${name} is ${
      initial.current === false ? 'adding' : 'updating'
    } ${layer}`;
    if (initial.current === false) initial.current = map.getFilter(layer);
    map.setFilter(layer, rule);
  }, [loaded, parent, layer, JSON.stringify(rule)]);

  // CLEANUP FUNCTION
  // prettier-ignore
  useEffect(() => () => {
    if (parent.alive && parent.map.alive) {
      logger`FILTER: ${name} is removing ${layer}`;
      map.setFilter(layer, initial.current);
    } else {
      logger`FILTER: ${name} is deleted ${layer}`;
    }
    initial.current = false
  }, [parent, layer]);
  return null;
}
