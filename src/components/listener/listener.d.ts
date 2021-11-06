import { MapEventType, MapLayerEventType, MapboxEvent, Map } from 'mapbox-gl';

type Handler<T extends MapboxEvent<any>> = <U extends Record<string, unknown> = {}>(
  event: T & U
) => void | any;

type ImageMissingHandler = (event: {
  id: string;
  type: 'styleimagemissing';
  target: Map;
  style: Record<string, any>;
}) => void | any;

export type MapHandlers = {
  [P in keyof MapEventType]: Handler<MapEventType[P]>;
} & {
  styleimagemissing: ImageMissingHandler;
};

export type LayerHandlers = {
  [P in keyof MapLayerEventType]: Handler<MapLayerEventType[P]>;
};

type HandlersNames = keyof LayerHandlers | keyof MapHandlers;

type ListenerProps<T extends HandlersNames> = {
  type: 'on' | 'once';
  event: T;
  handler: T extends keyof LayerHandlers
    ? T extends keyof MapHandlers
      ? MapHandlers[T] | LayerHandlers[T]
      : LayerHandlers[T]
    : T extends keyof MapHandlers
    ? MapHandlers[T]
    : never;
  layer?: T extends keyof LayerHandlers
    ? T extends keyof MapHandlers
      ? string | undefined
      : string
    : never;
};

export function Listener<T extends HandlersNames>(
  props: ListenerProps<T>
): JSX.Element;
