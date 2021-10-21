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
  const { parent, injected: injectedLayerName } = useParent();
  const layer = injectedLayerName || receivedLayerName;
  buildLogger('property', layer, id);

  const init = () => map[`get${type}`](layer, id);
  const render = () => map[`set${type}`](layer, id, value);
  const remove = initial => map[`set${type}`](layer, id, initial);

  const dependencies = [parent, id, receivedLayerName, JSON.stringify(value)];
  useLifeCycleWithCache(
    { parent, init, render, remove },
    dependencies,
    dependencies.slice(0, -1)
  );

  return null;
}
