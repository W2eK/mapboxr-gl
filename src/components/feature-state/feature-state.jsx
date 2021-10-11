import { useEffect, useRef } from 'react';
import { logger } from '../../utils';
import { useMap } from '../context';

const defaultGetChanges = (prev, state) => {
  return Object.entries(state).filter(([key, value]) => prev[key] !== value);
};

export function FeatureState({
  state,
  source,
  sourceLayer = '',
  getChanges = defaultGetChanges,
  parent
}) {
  const { map, loaded } = useMap();
  const prev = useRef({});
  logger`STATE: ${source} is rendering`;
  useEffect(() => {
    if (!loaded) return;
    const changes = getChanges(prev.current, state);
    if (!changes.length) return;
    logger`STATE: ${source} is updating`;
    changes.forEach(([id, state]) =>
      map.setFeatureState({ id, source, sourceLayer }, state)
    );
    prev.current = state;
    return () => {
      if (parent.alive && parent.map.alive) {
        logger`STATE: ${source} is removing`;
        Object.keys(prev.current).forEach(id =>
          map.removeFeatureState({ id, source, sourceLayer })
        );
      } else {
        logger`STATE: ${source} is deleted`;
      }
    };
  }, [loaded, source, sourceLayer, parent, state]);
  return null;
}
