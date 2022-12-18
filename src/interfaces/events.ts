import { Map, MapEventType, MapLayerEventType } from 'mapbox-gl';
import { List } from './utils';

// prettier-ignore
export const eventNames = [
  'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'mouseenter',
  'mouseleave', 'click', 'dblclick', 'contextmenu', 'touchstart', 'touchend',
  'touchcancel', 'wheel', 'resize', 'remove', 'touchmove', 'movestart', 'move',
  'moveend', 'dragstart', 'drag', 'dragend', 'zoomstart', 'zoom', 'zoomend',
  'rotatestart', 'rotate', 'rotateend', 'pitchstart', 'pitch', 'pitchend',
  'boxzoomstart', 'boxzoomend', 'boxzoomcancel', 'webglcontextlost',
  'webglcontextrestored', 'render', 'idle', 'error', 'data', 'styledata',
  'sourcedata', 'dataloading', 'styledataloading', 'sourcedataloading',
  'styleimagemissing', 'load', 'open', 'close', 'tiledataloading', 'viewport'
];

// * Event Names
export type MapEventNames = keyof MapEventType;
export type LayerEventNames = keyof MapLayerEventType;
export type DefaultEventNames = MapEventNames | LayerEventNames;
export type MapAndLayerEventNames = MapEventNames & LayerEventNames;

export type CustomMapEventNames = keyof CustomMapHandlers;

export type AllEventNames = DefaultEventNames | CustomMapEventNames;

// * Map Handlers
export type MapHandlers = DefaultMapHandlers & CustomMapHandlers;

type DefaultMapHandlers = {
  [P in MapEventNames]: (args: MapEventType[P]) => any;
};

export type CustomMapHandlers = {
  viewport: (props: {
    center: [number, number];
    zoom: number;
    bearing: number;
    pitch: number;
    map: Map;
  }) => void;
};

// * Layer Handlers
export type LayerHandlers = {
  [P in LayerEventNames]: (args: MapLayerEventType[P]) => any;
};

type AllHandlers = MapHandlers & LayerHandlers;

export type AllHandlerNames = `on${AllEventNames}` | `once${AllEventNames}`;

// * Tools
export type BuildHandlerProps<T extends MapEventNames | LayerEventNames | CustomMapEventNames> = {
  [P in T as `on${P}`]?: List<AllHandlers[P]>;
} & {
  [P in T as `once${P}`]?: List<AllHandlers[P]>;
};

export type AllHandlerProps = BuildHandlerProps<AllEventNames>;
export type AllHandlerPropNames = keyof AllHandlerProps;
