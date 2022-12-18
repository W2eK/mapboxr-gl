import { AnySourceData } from 'mapbox-gl';
import { FC } from 'react';
import { useMap } from '../../context/map-context';
import { useId } from '../../hooks/use-id';
import { buildDependencies } from '../../lib/build-dependencies';
import { useHandlers } from '../../lib/handlers/use-handlers';
import { removeLayersWithSource } from './remove-layers';
import { sourceHandlers } from './source.handlers';
import { SourceProps } from './source.props';

// const dependencyArray = new Array(1e2).fill(0);

export const Source: FC<SourceProps> = ({ id: receivedId, strict = false, ...props }) => {
  const id = useId(receivedId, props.type);

  const { map } = useMap();

  // * Adding Source to Map
  const init = () => map.addSource(id, props as AnySourceData);

  // * Remove Source from Map
  const cleanup = (alive: boolean) => {
    if (alive) {
      // * Remove nested layers before removing the source if source is alive
      removeLayersWithSource(map, id);
      map.removeSource(id);
    }
  };

  // * Check for for changes in a props, handle them if it has dedicated handler
  // * Handle them if it has dedicated handler
  // * Return rest unhandled props and use them as dependency in useEffect
  const rest = useHandlers({ handlers: sourceHandlers, props, context: map.getSource(id), strict });
  const dependencies = buildDependencies(rest, id);

  return null;
};
