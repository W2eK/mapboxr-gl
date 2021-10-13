import { useEffect, useRef } from 'react';
import { useMap } from '../context';
import { buildLogger } from '../../utils';

export function Property({ id, type, value, injected, layer, parent }) {
  const { map, loaded } = useMap();
  const initial = useRef(false);
  type = type[0].toUpperCase() + type.slice(1);
  const ownLayerName = layer;
  layer = injected || layer;

  const l = buildLogger('property', layer, id);
  /* STATUS: */ l`rendering`;
  useEffect(() => {
    if (!loaded) return;
    /* STATUS: */ l`${initial.current === false ? 'adding' : 'updating'}`;
    if (initial.current === false)
      initial.current = map[`get${type}Property`](layer, id);
    map[`set${type}Property`](layer, id, value);
  }, [loaded, parent, id, ownLayerName, JSON.stringify(value)]);

  // CLEANUP FUNCTION
  // prettier-ignore
  useEffect(() => () => {
    if (parent.alive && parent.map.alive) {
      /* STATUS: */ l`removing`;
      map[`set${type}Property`](layer, id, initial.current);
    } else {
      /* STATUS: */ l`deleted`;
    }
    initial.current = false;
  }, [parent, id, ownLayerName]);
  return null;
}
