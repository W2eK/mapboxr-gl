import { useEffect } from 'react';
import { logger } from '../../utils';
import { useMap } from '../context';

export function Filter({ rule, layer, parent }) {
  const { map, loaded } = useMap();
  const name = JSON.stringify(rule);
  logger`FILTER: ${name} is rendering ${layer}`;

  useEffect(() => {
    if (!loaded) return;
    logger`FILTER: ${name} is adding ${layer}`;
    const original = map.getFilter(layer);
    map.setFilter(layer, rule);
    return () => {
      if (parent.alive && parent.map.alive) {
        logger`FILTER: ${name} is removing ${layer}`;
        map.setFilter(layer, original);
      } else {
        logger`FILTER: ${name} is deleted ${layer}`;
      }
    };
  }, [loaded, parent, layer, JSON.stringify(rule)]);
  return null;
}
