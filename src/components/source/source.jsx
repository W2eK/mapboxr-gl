import { useEffect, useRef, useState } from 'react';
import { removeLayers } from './remove-layers';
import { useMap } from '../context';
import { cloneChildren, getDependencies, logger } from '../../utils';
import { useForce, useId, useHandlers, buildSetter } from '../../hooks';

const handlers = {
  data: buildSetter('setData')
  // TODO: add other handlers
};

export function Source({ children = null, id, parent, ...props }) {
  const { map, loaded } = useMap();
  const state = useRef({ alive: true });
  const [initialized, setInitialized] = useState(false);
  const [source, setSource] = useState(null);
  const forceUpdate = useForce();
  id = useId(id, 'source');
  logger`SOURCE: ${id} is rendering`;

  const rest = useHandlers({
    handlers,
    props,
    subject: source,
    component: 'source',
    id
  });

  useEffect(() => {
    if (!loaded) return;
    logger`SOURCE: ${id} is adding`;
    map.addSource(id, props);
    state.current = {
      alive: true,
      map: parent.map
    };
    setSource(map.getSource(id));
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
  }, [loaded, parent, id, ...getDependencies(rest)]);

  return (
    initialized &&
    cloneChildren(children, { source: id, parent: state.current })
  );
}
