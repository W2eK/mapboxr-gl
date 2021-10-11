import { useEffect, useRef, useState } from 'react';
import { removeLayers } from './remove-layers';
import { useMap } from '../context';
import { cloneChildren, getDependencies, logger } from '../../utils';
import { useForce, useId, useHandlers } from '../../hooks';

export function Source({ children = null, id, parent, ...props }) {
  const { map, loaded } = useMap();
  const state = useRef({ alive: true });
  const [initialized, setInitialized] = useState(false);
  const forceUpdate = useForce();
  id = useId(id, 'source');
  logger`SOURCE: ${id} is rendering`;

  const handlers = {
    data: value => map.getSource(id).setData(value),
    tiles: value => map.getSource(id).setTiles(value)
    // TODO: add other handlers
  };

  useHandlers.props = ['SOURCE', id];
  const rest = useHandlers({
    handlers,
    props
  });

  useEffect(() => {
    if (!loaded) return;
    logger`SOURCE: ${id} is adding`;
    map.addSource(id, props);
    state.current = {
      alive: true,
      name: id,
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
  }, [loaded, parent, id, ...getDependencies(rest)]);

  return (
    initialized &&
    cloneChildren(children, { injected: id, parent: state.current })
  );
}
