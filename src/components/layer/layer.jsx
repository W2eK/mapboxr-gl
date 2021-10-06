import React, { Fragment, useEffect, useRef, useState } from 'react';
import withListeners from '../../hoc/with-listeners';
import { useMap } from '../../hoc/with-map';
import { useForce } from '../../hooks/use-force';
import { useId } from '../../hooks/use-id';
import { cloneChildren, logger, getDependencies } from '../../utils';
import Cursor from './cursor';

function Layer({
  children = null,
  source,
  parent,
  listeners,
  cursor,
  id,
  beforeId,
  ...props
}) {
  const state = useRef({ alive: false });
  const [initialized, setInitialized] = useState(false);
  const { map, loaded } = useMap();
  const forceUpdate = useForce();
  id = useId(id, 'layer');

  useEffect(() => {
    if (!loaded) return;
    logger`LAYER: ${id} is adding`;
    map.addLayer({ id, source, ...props });
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
  }, [loaded, parent, id, ...getDependencies(props)]);

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

export default withListeners(Layer);
