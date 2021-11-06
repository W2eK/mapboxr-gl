import { useLifeCycleWithCache, useParent } from '../../hooks';
import { buildLogger } from '../../utils';
import { useMap } from '../context';

const objectComparator = (prev = {}, state) => {
  return Object.entries(state).filter(([key, value]) => prev[key] !== value);
};

const primitiveComparator = (prev, next) => {
  if (prev === next) return [];
  const result = [];
  if (prev !== null) result.push([prev, { active: false }]);
  if (next !== null) result.push([next, { active: true }]);
  return result;
};

/**
 *
 * @param {import("./feature-state").FeatureStateProps} props
 * @returns {import("react").ReactElement}
 */
export function FeatureState({
  strict,
  state,
  source: receivedSourceName,
  sourceLayer = '',
  compareState = state instanceof Object
    ? objectComparator
    : primitiveComparator
}) {
  const { map } = useMap();
  const { source: injectedSourceName } = useParent();
  const source = receivedSourceName || injectedSourceName;
  buildLogger('state', source);

  const init = () => ({ current: {} });

  const render = prev => {
    const changes = compareState(prev?.current, state);
    if (!changes.length) return;
    changes.forEach(([id, state]) =>
      map.setFeatureState({ id, source, sourceLayer }, state)
    );
    prev.current = state;
  };

  const remove = (prev, alive) => {
    if (alive) {
      const keys =
        typeof prev.current === 'object'
          ? Object.keys(prev.current)
          : [prev.current];
      keys.forEach(id => map.removeFeatureState({ id, source, sourceLayer }));
    }
  };

  const dependencies = [source, sourceLayer, state];
  useLifeCycleWithCache({ init, render, remove, strict }, dependencies);
  return null;
}
