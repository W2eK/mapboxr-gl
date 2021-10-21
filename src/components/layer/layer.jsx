import React, { cloneElement } from 'react';
import { useMap } from '../context';
import {
  useId,
  useHandlers,
  useLifeCycleWithStatus,
  useParent,
  ParentProvider
} from '../../hooks';
import { withListeners } from '../../hoc';
import { buildLogger, getDependencies } from '../../utils';

import Cursor from './cursor';

/**
 *
 * @param {import("./layer").LayerProps} props
 * @returns {import("react").ReactElement}
 */
function Layer({
  id,
  children,
  listeners,
  cursor,
  beforeId,
  keepMaster,
  ...props
}) {
  id = useId(id, 'layer');
  const l = buildLogger('layer', id);

  const { map } = useMap();
  const { parent, injected } = useParent();

  const handlers = {
    minzoom: value => map.setLayerZoomRange(id, value),
    maxzoom: value => map.setLayerZoomRange(id, null, value),
    filter: value => map.setFilter(id, value)
  };

  const rest = useHandlers({ handlers, props });

  const render = () => {
    let master = map.getLayer(id)?.serialize();
    const layers = map.getStyle().layers;
    let index = layers.length;
    const { cache } = parent.map;
    let layerProps = {...props}
    // debugger
    if (cache[id]) {
      master = cache[id].master;
      index = cache[id].index;
      // beforeId = beforeId || cache[id].beforeId
    } else if (master) {
      index = layers.findIndex(({ id: layerId }) => layerId === id) + 1;
      map.removeLayer(id);
    }
    beforeId = beforeId || layers[index]?.id;
    layerProps['source-layer'] = master?.['source-layer'] || props.sourceLayer || ''
    /* STATUS: */ master && l`redrawing`;
    if (master) {
      const paint = { ...master.paint, ...props.paint };
      const layout = { ...master.layout, ...props.layout };
      layerProps = { ...master, ...layerProps, paint, layout };
    }
    cache[id] = { master, index };
    layerProps = { source: injected, ...layerProps, id };
    map.addLayer(layerProps, beforeId);
    return () => {
      map.removeLayer(id);
      if(keepMaster && cache[id]) {
        /* STATUS: */ l`restoring master`;
        map.addLayer(cache[id].master, beforeId);
      }
    };
  }
  const dependencies = [parent, id, beforeId, ...getDependencies(rest)];
  const status = useLifeCycleWithStatus({ parent, render }, dependencies);
  return (
    status.alive && (
      <ParentProvider value={{ injected: id, parent: status }}>
        {cursor && <Cursor layer={id} cursor={cursor} />}
        {listeners.map(listener => cloneElement(listener, { layer: id }))}
        {children}
      </ParentProvider>
    )
  );
}
const Wrapped = withListeners(Layer);
export { Wrapped as Layer };
