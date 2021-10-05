import { useEffect, useMemo, useRef } from 'react';
import { useMap, withMap } from '../..';
import { cleanUp, getDependencies, logger } from '../../utils';

let counter = 0;

/** @param {{map: mapboxgl.Map}} props */
function Source({ id, data, ...rest }) {
  const { map, loaded } = useMap();
  id = useMemo(() => id || `source-${counter++}`, [id]);
  logger`SOURCE: ${id} is rendering`;
  const initialized = useRef(loaded);
  initialized.current = loaded;

  useEffect(() => {
    if (!initialized.current) return;
    logger`SOURCE: ${id} is adding`;
    map.addSource(id, { data, ...rest });
    return () => {
      if (!initialized.current) return;
      logger`SOURCE: ${id} is removing`;
      map.removeSource(id);
    };
  }, [initialized.current, id, ...getDependencies(rest)]);
  return null;
}

export default Source;
