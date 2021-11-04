import { useLifeCycleWithCache, useParent } from '../../hooks';
import { buildLogger } from '../../utils';
import { useMap } from '../context';

/**
 *
 * @param {import("./filter").FilterProps} props
 * @returns {import("react").ReactElement}
 */
export function Filter({ rule, layer: receivedLayerName }) {
  const { map } = useMap();
  const { layer: injectedLayerName } = useParent();
  const layer = receivedLayerName || injectedLayerName;
  buildLogger('filter', layer, JSON.stringify(rule));

  const init = () => map.getFilter(layer);
  const render = () => map.setFilter(layer, rule);
  const remove = (initial, alive) => alive && map.setFilter(layer, initial);

  const dependencies = [receivedLayerName, JSON.stringify(rule)];
  useLifeCycleWithCache({ init, render, remove }, dependencies);
  return null;
}
