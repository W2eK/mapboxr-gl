import { useMap } from '../context';
import { buildLogger } from '../../utils';
import { useLifeCycleWithCache, useParent } from '../../hooks';

/**
 *
 * @param {import("./property").PropertyProps} props
 * @returns {import("react").ReactElement}
 */
export function Property({
  name,
  type,
  value,
  strict,
  layer: receivedLayerName
}) {
  const { map } = useMap();
  type = `${type[0].toUpperCase()}${type.slice(1)}Property`;
  const { layer: injectedLayerName } = useParent();
  const layer = receivedLayerName || injectedLayerName;
  buildLogger('property', layer, name);

  const init = () => map[`get${type}`](layer, name);
  const render = () => map[`set${type}`](layer, name, value);
  const remove = (initial, alive) =>
    alive && map[`set${type}`](layer, name, initial);

  const dependencies = [name, receivedLayerName, value];
  useLifeCycleWithCache({ init, render, remove, strict }, dependencies);

  return null;
}
