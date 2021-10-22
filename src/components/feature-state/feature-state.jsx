import { useLifeCycleWithCache, useParent } from '../../hooks';
import { buildLogger } from '../../utils';
import { useMap } from '../context';

const defaultGetChanges = (prev, state) => {
  return Object.entries(state).filter(([key, value]) => prev[key] !== value);
};

/**
 *
 * @param {import("./feature-state").FeatureStateProps} props
 * @returns {import("react").ReactElement}
 */
export function FeatureState({
  state,
  source: receivedSourceName,
  sourceLayer = '',
  getChanges = defaultGetChanges
}) {
  const { map } = useMap();
  const { injected: injectedSourceName } = useParent();
  const source = injectedSourceName || receivedSourceName;
  buildLogger('state', source);

  const init = () => ({ current: {} });

  const render = prev => {
    const changes = getChanges(prev?.current || {}, state);
    if (!changes.length) return;
    changes.forEach(([id, state]) =>
      map.setFeatureState({ id, source, sourceLayer }, state)
    );
    prev.current = state;
  };

  const remove = prev => {
    Object.keys(prev.current).forEach(id =>
      map.removeFeatureState({ id, source, sourceLayer })
    );
  };

  const dependencies = [source, sourceLayer, JSON.stringify(state)];
  useLifeCycleWithCache({ init, render, remove }, dependencies);
  return null;
}
