import React from 'react';
import { removeLayers } from './remove-layers';
import { useMap } from '../context';
import { buildLogger, getDependencies } from '../../utils';
import {
  useId,
  useHandlers,
  useLifeCycleWithStatus,
  useParent,
  ParentProvider
} from '../../hooks';

export function Source({ children, id, ...props }) {
  const { parent } = useParent();
  id = useId(id, 'source');
  buildLogger('source', id);
  const { map, loaded } = useMap();

  const render = loaded && (() => map.addSource(id, props));

  const remove = () => {
    removeLayers(map, id);
    map.removeSource(id);
  };

  const handlers = {
    data: value => map.getSource(id).setData(value),
    tiles: value => map.getSource(id).setTiles(value)
    // TODO: add other handlers
  };

  const rest = useHandlers({ handlers, props });

  const dependencies = [loaded, parent, id, ...getDependencies(rest)];

  const status = useLifeCycleWithStatus(
    { parent, render, remove },
    dependencies
  );

  return (
    status.alive && (
      <ParentProvider value={{ injected: id, parent: status }}>
        {children}
      </ParentProvider>
    )
  );
}
