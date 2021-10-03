import { useEffect } from 'react';
import { useMap } from '../../hoc/with-map';
import { logger } from '../../utils';

export function Listener({ type, event, handler, layer }) {
  const map = useMap();
  logger`LISTENER: ${event} is rendering ${layer}`;
  useEffect(() => {
    logger`LISTENER: ${event} is mounting ${layer}`;
    const props = [event, layer || handler, layer ? handler : undefined];
    map[type](...props);
    return () => {
      logger`LISTENER: ${event} is unmounting ${layer}`;
      map.off(...props);
    };
  }, [map, handler]);
  return null;
}

export default Listener;
