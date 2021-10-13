import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useMap } from '../context';
import { useId, useForce, useHandlers } from '../../hooks';
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
  const state = useRef({ alive: false });
  const [initialized, setInitialized] = useState(false);
  const { map, loaded } = useMap();
  const forceUpdate = useForce();
  id = useId(id, 'layer');

  const l = buildLogger('layer', id);
  props['source-layer'] = props.sourceLayer || '';

  const handlers = {
    minzoom: value => map.setLayerZoomRange(id, value),
    maxzoom: value => map.setLayerZoomRange(id, null, value),
    filter: value => map.setFilter(id, value)
  };

  useHandlers.l = l;
  const rest = useHandlers({ handlers, props });
  /* STATUS: */ l`rendering`;
  useEffect(() => {
    if (!loaded) return;
    let master = map.getLayer(id)?.serialize();
    const { cache } = parent.map;
    let index, layers;
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
    /* STATUS: */ l`${master ? 'redrawing' : 'adding'}`;
    if (master) {
      const paint = { ...master.paint, ...props.paint };
      const layout = { ...master.layout, ...props.layout };
      props = { ...master, ...props, paint, layout };
      cache[id] = { master, index };
    }
    props = { source: injected, ...props, id };
    map.addLayer(props, beforeId);
    setInitialized(true);
    state.current = {
      alive: true,
      map: parent.map
    };
    return () => {
      if (parent.alive && parent.map.alive) {
        if (keepMaster && cache[id]) {
          /* STATUS: */ l`restoring`;
          map.removeLayer(id);
          map.addLayer(cache[id].master, beforeId);
        } else {
          /* STATUS: */ l`removing`;
          map.removeLayer(id);
        }
      } else {
        /* STATUS: */ l`deleted`;
      }
      state.current.alive = false;
      setInitialized(false);
      forceUpdate();
    };
  }, [loaded, parent, id, beforeId, ...getDependencies(rest)]);
  return (
    initialized && (
      <Fragment>
        {cursor && <Cursor layer={id} cursor={cursor} />}
        {cloneChildren(listeners, { STATUS: id })}
        {cloneChildren(children, { injected: id, parent: state.current })}
      </Fragment>
    )
  );
}
const Wrapped = withListeners(Layer);
export { Wrapped as Layer };
