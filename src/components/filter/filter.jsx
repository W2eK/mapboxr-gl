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
  const { parent, injected: injectedLayerName } = useParent();
  const layer = injectedLayerName || receivedLayerName;
  buildLogger('filter', layer, JSON.stringify(rule));

  const init = () => map.getFilter(layer);
  const render = () => map.setFilter(layer, rule);
  const remove = initial => map.setFilter(layer, initial);

  const dependencies = [parent, receivedLayerName, JSON.stringify(rule)];
  useLifeCycleWithCache({ parent, init, render, remove }, dependencies);
  return null;
}
