import { useEffect } from 'react';
import { useMap } from '../context';
import { logger } from '../../utils';

export function Property({ id, type, value, layer, parent }) {
  const { map, loaded } = useMap();
  type = type[0].toUpperCase() + type.slice(1);
  logger`PROPERTY: ${id} is rendering ${layer}`;

  useEffect(() => {
    if (!loaded) return;
    logger`PROPERTY: ${id} is adding ${layer}`;
    const original = map[`get${type}Property`](layer, id);
    map[`set${type}Property`](layer, id, value);
    return () => {
      if (parent.alive && parent.map.alive) {
        logger`PROPERTY: ${id} is removing ${layer}`;
        map[`set${type}Property`](layer, id, original);
      } else {
        logger`PROPERTY: ${id} is deleted ${layer}`;
      }
    };
  }, [loaded, parent, id, type, layer, JSON.stringify(value)]);
  return null;
}
