import { cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { useMap } from '../../hoc/with-map';
import {
  cleanUp,
  cloneChildren,
  getDependencies,
  logger,
  normalizeChildren
} from '../../utils';
import { buildSetter, useHandlers } from '../../hooks/use-handlers';
import { useForce } from '../../hooks/use-force';

const handlers = {
  data: buildSetter('setData')
  // TODO: add other handlers
};

/**
 *
 * @param {mapboxgl.Map} map
 * @param {string} id
 */
const removeLayers = (map, id) => {
  const { layers } = map.getStyle();
  layers
    .filter(({ source }) => source === id)
    .forEach(({ id }) => map.removeLayer(id));
};

let counter = 0;
function Source({ children = null, id, parent, ...props }) {
  const { map, loaded } = useMap();
  const state = useRef({ alive: true });
  id = useMemo(() => id || `source-${counter++}`, [id]);

  const [initialized, setInitialized] = useState(false);
  const forceUpdate = useForce();

  logger`SOURCE: ${id} is rendering`;

  useEffect(() => {
    if (!loaded) return;
    logger`SOURCE: ${id} is adding`;
    map.addSource(id, props);
    state.current = {
      alive: true,
      map: parent.map
    };
    setInitialized(true);
    return () => {
      if (parent.alive && parent.map.alive) {
        logger`SOURCE: ${id} is removing`;
        removeLayers(map, id);
        map.removeSource(id);
      } else {
        logger`SOURCE: ${id} is deleted`;
      }
      state.current.alive = false;
      setInitialized(false);
      forceUpdate();
    };
  }, [loaded, parent, id]);
  /*

  logger`SOURCE: ${id} is rendering`;
  const [source, setSource] = useState(null);
  const initialized = useRef(loaded);
  initialized.current = loaded;

  const rest = useHandlers({
    handlers,
    props,
    subject: source,
    component: 'source',
    id
  });

  useEffect(() => {
    if (!initialized.current) return;
    logger`SOURCE: ${id} is adding`; // * adding
    map.addSource(id, props);
    setSource(map.getSource(id));
    return cleanUp(() => {
      // map.style && map.style._loaded && map.getSource(id)
      if (!initialized.current || !map.style) return;
      logger`SOURCE: ${id} is removing`; // ! removing
      map.removeSource(id);

      // setSource(null);
    });
  }, [initialized.current, id, ...getDependencies(rest)]);
  */
  return (
    initialized &&
    cloneChildren(children, { source: id, parent: state.current })
  );
}

export default Source;
