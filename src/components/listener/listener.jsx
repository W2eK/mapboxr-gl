import { useEffect } from 'react';
import { useMap } from '../context';
import { buildLogger } from '../../utils';

export function Listener({ type, event, handler, layer, instance }) {
  const { map } = useMap();
  
  const l = buildLogger(
    'listener',
    layer || instance?.constructor?.name?.toLowerCase() || 'mapbox',
    event
  );

  instance = instance || map;

  useEffect(() => {
    if (!instance) return;
    /* STATUS: */ l`adding`;
    const props = [event, layer || handler, layer ? handler : undefined];
    instance[type](...props);
    return () => {
      /* STATUS: */ l`removing`;
      instance.off(...props);
    };
  }, [map, instance, handler, type, event, layer]);
  return null;
}
