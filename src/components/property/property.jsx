import { useMap } from '../context';
import { buildLogger } from '../../utils';
import { useLifeCycleWithCache } from '../../hooks';

export function Property({
  id,
  type,
  value,
  injected: injectedLayerName,
  layer: receivedLayerName,
  parent
}) {
  const { map } = useMap();
  type = `${type[0].toUpperCase()}${type.slice(1)}Property`;
  const layer = injectedLayerName || receivedLayerName;
  buildLogger('property', layer, id);

  const init = () => map[`get${type}`](layer, id);
  const render = () => map[`set${type}`](layer, id, value);
  const remove = initial => map[`set${type}`](layer, id, initial);

  const dependencies = [parent, id, receivedLayerName, JSON.stringify(value)];
  useLifeCycleWithCache({ parent, init, render, remove }, dependencies);

  return null;
}
