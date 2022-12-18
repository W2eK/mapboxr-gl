import { MapEventType, MapLayerEventType } from 'mapbox-gl';
import {
  AllEventNames,
  CustomMapEventNames,
  CustomMapHandlers,
  LayerEventNames,
  LayerHandlers,
  MapAndLayerEventNames,
  MapEventNames,
  MapHandlers
} from '../../interfaces/events';

export type ListenerProps<T extends AllEventNames> = {
  type: 'on' | 'once';
  event: T;
  handler: T extends CustomMapEventNames
    ? CustomMapHandlers[T]
    : T extends MapEventNames & LayerEventNames
    ? MapHandlers[T] | LayerHandlers[T]
    : T extends LayerEventNames
    ? LayerHandlers[T]
    : T extends MapEventNames
    ? MapHandlers[T]
    : never;
  layer?: T extends LayerEventNames ? string | undefined : never;
};
