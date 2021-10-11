import { useEffect, useRef } from 'react';
import { useMap } from '../context';
import { logger } from '../../utils';

export function Property({ id, type, value, layer, parent }) {
  const { map, loaded } = useMap();
  const initial = useRef(false);
  type = type[0].toUpperCase() + type.slice(1);

  logger`PROPERTY: ${id} is rendering ${layer}`;
  
  useEffect(() => {
    if (!loaded) return;
    logger`PROPERTY: ${id} is ${
      initial.current === false ? 'adding' : 'updating'
    } ${layer}`;
    if (initial.current === false)
      initial.current = map[`get${type}Property`](layer, id);
    map[`set${type}Property`](layer, id, value);
  }, [loaded, parent, id, layer, JSON.stringify(value)]);

  // CLEANUP FUNCTION
  // prettier-ignore
  useEffect(() => () => {
    if (parent.alive && parent.map.alive) {
      logger`PROPERTY: ${id} is removing ${layer}`;
      map[`set${type}Property`](layer, id, initial.current);
    } else {
      logger`PROPERTY: ${id} is deleted ${layer}`;
    }
    initial.current = false;
  }, [parent, id, layer]);
  return null;
}
