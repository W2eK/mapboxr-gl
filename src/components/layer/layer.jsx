import React, { Fragment } from 'react';
import { useMap } from '../context';
import { useId, useHandlers, useLifeCycleWithStatus } from '../../hooks';
import { withListeners } from '../../hoc';
import { buildLogger, cloneChildren, getDependencies } from '../../utils';

import Cursor from './cursor';

function Layer({
  id,
  children,
  parent,
  listeners,
  cursor,
  injected,
  beforeId,
  keepMaster,
  ...props
}) {
  id = useId(id, 'layer');
  const l = buildLogger('layer', id);

  const { map } = useMap();
  props['source-layer'] = props.sourceLayer || '';

  const handlers = {
    minzoom: value => map.setLayerZoomRange(id, value),
    maxzoom: value => map.setLayerZoomRange(id, null, value),
    filter: value => map.setFilter(id, value)
  };

  const rest = useHandlers({ handlers, props });

  // prettier-ignore
  const render = () => {
    let master = map.getLayer(id)?.serialize();
    const { cache } = parent.map;
    let index, layers;
    let layerProps = {...props}
    if (master) {
      layers = map.getStyle().layers;
      index = layers.findIndex(({ id: masterId }) => masterId === id);
      map.removeLayer(id);
    }
    if (cache[id]) {
      master = cache[id].master;
      index = cache[id].index;
    }
    beforeId = beforeId || layers?.[index + 1]?.id;
    /* STATUS: */ master && l`redrawing`;
    if (master) {
      const paint = { ...master.paint, ...props.paint };
      const layout = { ...master.layout, ...props.layout };
      layerProps = { ...master, ...layerProps, paint, layout };
      cache[id] = { master, index };
    }
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
      <Fragment>
        {cursor && <Cursor layer={id} cursor={cursor} />}
        {cloneChildren(listeners, { layer: id })}
        {cloneChildren(children, { injected: id, parent: status })}
      </Fragment>
    )
  );
}
const Wrapped = withListeners(Layer);
export { Wrapped as Layer };
