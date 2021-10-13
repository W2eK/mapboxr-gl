import { useEffect, useRef } from 'react';
import { buildLogger } from '../../utils';
import { useMap } from '../context';

export function Filter({ rule, injected, layer, parent }) {
  const { map, loaded } = useMap();
  const initial = useRef(false);
  const ownLayerName = layer;
  layer = injected || layer;
  const l = buildLogger('filter', layer, JSON.stringify(rule));
  /* STATUS: */ l`rendering`;
  useEffect(() => {
    if (!loaded) return;
    /* STATUS: */ l`${initial.current === false ? 'adding' : 'updating'}`;
    if (initial.current === false) initial.current = map.getFilter(layer);
    map.setFilter(layer, rule);
  }, [loaded, parent, ownLayerName, JSON.stringify(rule)]);

  // CLEANUP FUNCTION
  // prettier-ignore
  useEffect(() => () => {
    if (parent.alive && parent.map.alive) {
      /* STATUS: */ l`removing`;
      map.setFilter(layer, initial.current);
    } else {
      /* STATUS: */ l`deleted`;
    }
    initial.current = false
  }, [parent, ownLayerName]);
  return null;
}
