import { useEffect, useMemo, useRef } from 'react';
import { useMap } from '../../hoc/with-map';
import { getDependencies, logger } from '../../utils';
import { buildSetter, useHandlers } from '../../hooks/use-handlers';

const handlers = {
  data: buildSetter('setData')
  // TODO: add other handlers
};

let counter = 0;
/** @param {{map: mapboxgl.Map}} props */
function Source({ id, ...props }) {
  const { map, loaded } = useMap();
  id = useMemo(() => id || `source-${counter++}`, [id]);

  logger`SOURCE: ${id} is rendering`;
  const source = useRef(null);
  const initialized = useRef(loaded);
  initialized.current = loaded;

  const rest = useHandlers({
    handlers,
    props,
    subject: source.current,
    component: 'source',
    id
  });

  useEffect(() => {
    if (!initialized.current) return;
    logger`SOURCE: ${id} is adding`; // * adding
    map.addSource(id, props);
    source.current = map.getSource(id);
    return () => {
      if (!initialized.current) return;
      logger`SOURCE: ${id} is removing`; // ! removing
      map.removeSource(id);
      source.current = null;
    };
  }, [initialized.current, id, ...getDependencies(rest)]);

  return null;
}

export default Source;
