import { useLifeCycleWithCache } from '../../hooks';
import { buildLogger } from '../../utils';
import { useMap } from '../context';

export function Filter({
  rule,
  injected: injectedLayerName,
  layer: receivedLayerName,
  parent
}) {
  const { map } = useMap();
  const layer = injectedLayerName || receivedLayerName;
  buildLogger('filter', layer, JSON.stringify(rule));

  const init = () => map.getFilter(layer);
  const render = () => map.setFilter(layer, rule);
  const remove = initial => map.setFilter(layer, initial);

  const dependencies = [parent, receivedLayerName, JSON.stringify(rule)];
  useLifeCycleWithCache({ parent, init, render, remove }, dependencies);
  return null;
}
