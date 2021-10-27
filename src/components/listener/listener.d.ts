import { MapEventType, MapLayerEventType } from 'mapbox-gl';

type ListenerProps<T> = {
  type: 'on' | 'once';
  event: T extends keyof MapEventType | keyof MapLayerEventType ? T : never;
  handler: T extends keyof MapEventType
    ? (event: MapEventType[T]) => void
    : T extends keyof MapLayerEventType
    ? (event: MapLayerEventType[T]) => void
    : never;
  layer: T extends keyof MapLayerEventType
    ? string
    : never;
};

export function Listener<T>(props: ListenerProps<T>): JSX.Element;
