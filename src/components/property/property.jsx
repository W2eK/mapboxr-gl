import { useMap } from '../context';
import { buildLogger } from '../../utils';
import { useLifeCycleWithCache, useParent } from '../../hooks';

/**
 *
 * @param {import("./property").PropertyProps} props
 * @returns {import("react").ReactElement}
 */
export function Property({ id, type, value, layer: receivedLayerName }) {
  const { map } = useMap();
  type = `${type[0].toUpperCase()}${type.slice(1)}Property`;
  const { layer: injectedLayerName } = useParent();
  const layer = receivedLayerName || injectedLayerName;
  buildLogger('property', layer, id);

  const init = () => map[`get${type}`](layer, id);
  const render = () => map[`set${type}`](layer, id, value);
  const remove = (initial, alive) =>
    alive && map[`set${type}`](layer, id, initial);

  const dependencies = [id, receivedLayerName, JSON.stringify(value)];
  useLifeCycleWithCache({ init, render, remove }, dependencies);

  return null;
}
