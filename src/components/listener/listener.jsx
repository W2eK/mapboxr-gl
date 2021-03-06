import { useEffect } from 'react';
import { useMap } from '../context';
import { buildLogger } from '../../utils';
import { useParent } from '../../hooks';

/**
 *
 * @param {import("./listener").ListenerProps} props
 * @returns {import("react").ReactElement}
 */
export function Listener({ type, event, handler, layer: receivedLayerName }) {
  const { map } = useMap();
  let { instance, layer: injectedLayerName } = useParent();
  const layer = receivedLayerName || injectedLayerName;

  const l = buildLogger(
    'listener',
    layer || instance?.constructor?.name?.toLowerCase() || 'mapbox',
    event
  );
  event = event === 'viewport' ? 'move' : event;
  instance = instance || map;

  useEffect(() => {
    if (!instance) return;
    /* STATUS: */ l`render`;
    const props = [event, layer || handler, layer ? handler : undefined];
    instance[type](...props);
    return () => {
      /* STATUS: */ l`remove`;
      instance.off(...props);
    };
  }, [map, instance, handler, type, event, layer]);
  return null;
}
