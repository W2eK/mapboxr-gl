import React from 'react';
import { removeLayers } from './remove-layers';
import { useMap } from '../context';
import { buildLogger, dependenciesBuilder } from '../../utils';
import {
  useId,
  useHandlers,
  useLifeCycleWithStatus,
  ParentProvider,
  buildHandlers
} from '../../hooks';

const getDependencies = (() => {
  const NUMBER_OF_PROPS = 27;
  const NUMBER_OF_HANDLERS = 2;
  return dependenciesBuilder(NUMBER_OF_PROPS - NUMBER_OF_HANDLERS);
})();

const handlers = buildHandlers({
  data: 'setData',
  tiles: 'setTiles'
  // TODO: add other handlers
});

/**
 *
 * @param {import("./source").SourceProps} props
 * @returns {import("react").ReactElement}
 */
export function Source({ children, id, strict = false, ...props }) {
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

  const rest = useHandlers({
    handlers,
    props,
    context: map.getSource(id),
    strict
  });
  const dependencies = getDependencies(rest, id);

  const status = useLifeCycleWithStatus(
    { render, remove, strict },
    dependencies
  );

  return (
    status.alive && (
      <ParentProvider value={{ source: id, parent: status }}>
        {children}
      </ParentProvider>
    )
  );
}
