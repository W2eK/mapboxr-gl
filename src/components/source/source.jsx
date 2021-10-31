import React from 'react';
import { removeLayers } from './remove-layers';
import { useMap } from '../context';
import { buildLogger, dependenciesBuilder } from '../../utils';
import {
  useId,
  useHandlers,
  useLifeCycleWithStatus,
  ParentProvider
} from '../../hooks';

const getDependencies = (() => {
  const NUMBER_OF_PROPS = 27;
  const NUMBER_OF_HANDLERS = 2;
  return dependenciesBuilder(NUMBER_OF_PROPS - NUMBER_OF_HANDLERS);
})();

/**
 *
 * @param {import("./source").SourceProps} props
 * @returns {import("react").ReactElement}
 */
export function Source({ children, id, ...props }) {
  id = useId(id, props.type);
  buildLogger('source', id);
  const { map } = useMap();

  const render = () => map.addSource(id, props);

  const remove = alive => {
    if (alive) {
      removeLayers(map, id);
      map.removeSource(id);
    }
  };
  const handlers = {
    data: value => map.getSource(id).setData(value),
    tiles: value => map.getSource(id).setTiles(value)
    // TODO: add other handlers
  };
  const rest = useHandlers({ handlers, props });
  const dependencies = getDependencies(rest, id);

  const status = useLifeCycleWithStatus({ render, remove }, dependencies);

  return (
    status.alive && (
      <ParentProvider value={{ source: id, parent: status }}>
        {children}
      </ParentProvider>
    )
  );
}
