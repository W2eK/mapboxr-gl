import { useEffect } from 'react';
import { useMap } from '../../context/map-context';
import { useParent } from '../../context/parent-context';
import { AllEventNames, LayerEventNames, MapEventNames } from '../../interfaces/events';
import { buildLogger } from '../../lib/logger';
import { ListenerProps } from './listener.props';

type LayerListenerProps = [LayerEventNames, string, (...args: any[]) => void];
type MapListenerProps = [MapEventNames, (...args: any[]) => void];

export const Listener = <T extends AllEventNames>({
  type,
  event,
  handler,
  layer: receivedLayerName
}: ListenerProps<T>) => {
  const { map } = useMap();
  let { instance, layer: injectedLayerName } = useParent();
  const layer = receivedLayerName || injectedLayerName;
  const visibleLayerName = layer || instance?.constructor?.name?.toLowerCase() || 'mapbox';
  const l = buildLogger('listener', visibleLayerName, event);
  // @ts-ignore
  event = event === 'viewport' ? 'move' : event;
  const instanceOrMap = instance || map;

  useEffect(() => {
    if (!instance) return;
    /* STATUS: */ l`render`;
    const props = [event, layer || handler, layer ? handler : undefined] as
      | LayerListenerProps
      | MapListenerProps;
    // @ts-ignore
    instanceOrMap[type](...props);
    return () => {
      /* STATUS: */ l`remove`;
      // @ts-ignore
      instanceOrMap!.off(...props);
    };
  }, [map, instance, handler, type, event, layer]);
  return null;
};
