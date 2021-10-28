import { MapEventType, MapboxOptions } from 'mapbox-gl';
import { PropsWithChildren } from 'react';
import { BuildHandlers } from '../../utils/utils';

type MapOnHandlers = BuildHandlers<MapEventType, 'on'>;
type MapOnceHandlers = BuildHandlers<MapEventType, 'once'>;

// ! REMOVE onviewport
type MapViewportHandlers = Partial<
  Record<'onviewport' | 'onceviewport', MapOnHandlers['onzoom']>
>;

type MapboxrGLProps = Omit<MapboxOptions, 'container' | 'style'> & {
  wrapper?: React.HTMLAttributes<HTMLDivElement>;
  mapStyle?: MapboxOptions['style'];
  // strict?: boolean; // TODO: strict mode
} & MapOnHandlers &
  MapOnceHandlers &
  MapViewportHandlers;

export function MapboxrGL(
  props: PropsWithChildren<MapboxrGLProps>
): JSX.Element;
