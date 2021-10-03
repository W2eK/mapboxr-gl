import { MapEventType, MapboxOptions } from 'mapbox-gl';

type Handlers<T, U extends 'on' | 'once'> = {
  [P in keyof T as `${U}${P}`]: (
    event: T[P]
  ) => void | ((event: T[P]) => void)[];
};

type MapOnHandlers = Handlers<MapEventType, 'on'>;
type MapOnceHandlers = Handlers<MapEventType, 'once'>;

type OnceHandlers = {
  [P in keyof MapEventType as `once${P}`]: (event: MapEventType[P]) => void;
};

type MapViewportHandlers = Record<
  'onviewport' | 'onceviewport',
  MapOnHandlers['onzoom']
>;

type MapboxrGLProps = Omit<MapboxOptions, 'container' | 'style'> & {
  wrapper?: React.HTMLAttributes<HTMLDivElement>;
  mapStyle?: MapboxOptions['style'];
} & MapOnHandlers &
  MapOnceHandlers &
  MapViewportHandlers;

export default function MapboxrGL(props: MapboxrGLProps): JSX.Element;
