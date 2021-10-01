import * as mapboxgl from 'mapbox-gl';
import { ReactNode } from 'react';

type MapboxOptions = mapboxgl.MapboxOptions;

type MapboxrGLProps = Omit<MapboxOptions, 'container' | 'style'> & {
  wrapper?: React.HTMLAttributes<HTMLDivElement>;
  mapStyle?: MapboxOptions['style'];
};

export default function MapboxrGL(props: MapboxrGLProps): JSX.Element;
