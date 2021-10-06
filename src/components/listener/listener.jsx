import { useEffect } from 'react';
import { useMap } from '../../hoc/with-map';
import { logger } from '../../utils';

export function Listener({ type, event, handler, layer }) {
  const { map } = useMap();
  logger`LISTENER: ${event} is rendering ${layer}`;
  useEffect(() => {
    if (!map) return;
    logger`LISTENER: ${event} is adding ${layer}`;
    const props = [event, layer || handler, layer ? handler : undefined];
    map[type](...props);
    return () => {
      logger`LISTENER: ${event} is removing ${layer}`;
      map.off(...props);
    };
  }, [map, handler, type, event, layer]);
  return null;
}

export default Listener;
