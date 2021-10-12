import { useEffect } from 'react';
import { useMap } from '../context';
import { logger } from '../../utils';

export function Listener({ type, event, handler, layer, subject }) {
  let { map } = useMap();
  map = subject || map;
  const name =
    layer || subject?.constructor?.name?.toLowerCase() || 'container';
  logger`LISTENER: ${event} is rendering ${name}`;
  useEffect(() => {
    if (!map) return;
    logger`LISTENER: ${event} is adding ${name}`;
    const props = [event, layer || handler, layer ? handler : undefined];
    map[type](...props);
    return () => {
      logger`LISTENER: ${event} is removing ${name}`;
      map.off(...props);
    };
  }, [map, handler, type, event, layer, subject]);
  return null;
}
