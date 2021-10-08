import { useEffect } from 'react';
import { useMap } from '../context';
import { logger } from '../../utils';

export function Property({ id, type, value, layer, parent }) {
  const { map, loaded } = useMap();
  logger`PROPERTY: ${id} is rendering ${layer}`;

  useEffect(() => {
    if (!loaded) return;
    logger`PROPERTY: ${id} is adding ${layer}`;
    map.setPaintProperty(layer, id, value);
    return () => {
      if (parent.alive && parent.map.alive) {
        logger`PROPERTY: ${id} is removing ${layer}`;
        map.setPaintProperty(layer, id, 'green');
      } else {
        logger`PROPERTY: ${id} is deleted ${layer}`;
      }
    };
  }, [loaded, parent, id]);
  return null;
}