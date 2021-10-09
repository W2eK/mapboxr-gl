import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useMap } from '../context';
import { useId, useForce, useHandlers } from '../../hooks';
import { withListeners } from '../../hoc';
import { cloneChildren, getDependencies, logger } from '../../utils';

import Cursor from './cursor';

function Layer({
  children,
  parent,
  listeners,
  cursor,
  id,
  sourceLayer = '',
  beforeId,
  ...props
}) {
  const state = useRef({ alive: false });
  const [initialized, setInitialized] = useState(false);
  const { map, loaded } = useMap();

  const forceUpdate = useForce();
  id = useId(id, 'layer');

  const handlers = {
    minzoom: value => map.setLayerZoomRange(id, value),
    maxzoom: value => map.setLayerZoomRange(id, null, value),
    filter: value => map.setFilter(id, value)
  };

  useHandlers.props = ['LAYER', id];
  const rest = useHandlers({ handlers, props });

  useEffect(() => {
    if (!loaded) return;
    let master;
    props = { ...props, id, 'source-layer': sourceLayer };
    const { cache } = parent.map;
    if (cache[id]) {
      master = cache[id].master;
      beforeId = cache[id].beforeId;
    } else {
      const layers = map.getStyle().layers;
      const index = layers.findIndex(({ id: masterId }) => masterId === id);
      if (index > -1) {
        master = layers[index];
        beforeId = beforeId || layers[index + 1]?.id;
      }
    }
    logger`LAYER: ${id} is ${master ? 'redrawing master' : 'adding'}`;
    if (master) {
      const paint = { ...master.paint, ...props.paint };
      const layout = { ...master.layout, ...props.layout };
      props = { ...master, ...props, paint, layout };
      cache[id] || map.removeLayer(id);
      cache[id] = { master, beforeId };
    }
    map.addLayer(props, beforeId);
    setInitialized(true);
    state.current = {
      alive: true,
      map: parent.map
    };
    return () => {
      if (parent.alive && parent.map.alive) {
        logger`LAYER: ${id} is removing`;
        map.removeLayer(id);
      } else {
        logger`LAYER: ${id} is deleted`;
      }
      state.current.alive = false;
      setInitialized(false);
      forceUpdate();
    };
  }, [loaded, parent, id, beforeId, sourceLayer, ...getDependencies(rest)]);
  console.log(children);
  return (
    initialized && (
      <Fragment>
        {cursor && <Cursor layer={id} cursor={cursor} />}
        {cloneChildren(listeners, { layer: id })}
        {cloneChildren(children, { layer: id, parent: state.current })}
      </Fragment>
    )
  );
}
const Wrapped = withListeners(Layer);
export { Wrapped as Layer };
