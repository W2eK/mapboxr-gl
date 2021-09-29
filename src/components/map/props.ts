import mapboxgl from 'mapbox-gl';

type MapboxMap = mapboxgl.Map;

/*
Generate syntax error because
"key remapping via as" was introduced in TS v4.1,
but microbundle-crl use v3.7
type MapMethods = {
  [P in keyof MapboxMap as MapboxMap[P] extends (...args: any) => any
    ? P
    : never]: MapboxMap[P];
};
type MapHandlers = {
  [P in keyof MapboxMap as MapboxMap[P] extends { enable: any }
    ? P
    : never]: MapboxMap[P];
};
*/

/* Values Hardcoded */
type MapMethods = Pick<
  MapboxMap,
  | 'setMaxZoom'
  | 'setMinZoom'
  | 'setMinPitch'
  | 'setMaxPitch'
  | 'setStyle'
  | 'setRenderWorldCopies'
  | 'setMaxBounds'
>;

type MapHandlers = Pick<
  MapboxMap,
  | 'boxZoom'
  | 'doubleClickZoom'
  | 'dragPan'
  | 'dragRotate'
  | 'keyboard'
  | 'scrollZoom'
  | 'touchPitch'
  | 'touchZoomRotate'
>;

const buildSetter =
  <T extends keyof MapMethods>(method: T) =>
  (map: MapboxMap, ...rest: Parameters<MapMethods[T]>) =>
    // @ts-ignore
    map[method](...rest);

const buildHandler =
  <T extends keyof MapHandlers>(handler: T) =>
  (map: MapboxMap, state: boolean) =>
    map[handler][state ? 'enable' : 'disable']();

const propHandlers = {
  // Properties
  minZoom: buildSetter('setMaxZoom'),
  maxZoom: buildSetter('setMinZoom'),
  minPitch: buildSetter('setMinPitch'),
  maxPitch: buildSetter('setMaxPitch'),
  renderWorldCopies: buildSetter('setRenderWorldCopies'),
  mapStyle: buildSetter('setStyle'),
  maxBounds: buildSetter('setMaxBounds'),
  // User interaction handlers
  boxZoom: buildHandler('boxZoom'),
  doubleClickZoom: buildHandler('doubleClickZoom'),
  dragPan: buildHandler('dragPan'),
  dragRotate: buildHandler('dragRotate'),
  keyboard: buildHandler('keyboard'),
  scrollZoom: buildHandler('scrollZoom'),
  touchPitch: buildHandler('touchPitch'),
  touchZoomRotate: buildHandler('touchZoomRotate')
};

export type DynamicPropNames = keyof typeof propHandlers;
export default propHandlers;
