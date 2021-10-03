import { MapEventType, MapLayerEventType } from 'mapbox-gl';

type ListenerProps<T extends keyof MapEventType | keyof MapLayerEventType> = {
  type: 'on' | 'once';
} & (
  | {
      event: T;
      handler: (event: MapEventType[T]) => void;
    }
  | {
      event: T;
      handler: (event: MapLayerEventType[T]) => void;
      layer?: string;
    }
);

export default function Listener<
  T extends keyof MapEventType | keyof MapLayerEventType
>(props: ListenerProps<T>): JSX.Element;
