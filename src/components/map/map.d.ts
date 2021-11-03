import { Map, MapEventType, MapboxOptions, PaddingOptions } from 'mapbox-gl';
import { PropsWithChildren } from 'react';
import { BuildHandlers } from '../../utils/utils';

type MapOnHandlers = BuildHandlers<MapEventType, 'on'>;
type MapOnceHandlers = BuildHandlers<MapEventType, 'once'>;

type ViewportHandler = (props: {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
  map: Map;
}) => any;

type MapViewportHandlers = Partial<
  Record<'onviewport' | 'onceviewport', ViewportHandler>
>;

type DebugFeatures = Partial<{
  showCollisionBoxes: boolean;
  showOverdrawInspector: boolean;
  showPadding: boolean;
  showTerrainWireframe: boolean;
  showTileBoundaries: boolean;
}>;

type MapboxrGLProps = Omit<MapboxOptions, 'container' | 'style'> &
  MapOnHandlers &
  MapOnceHandlers &
  MapViewportHandlers &
  DebugFeatures & {
    wrapper?: React.HTMLAttributes<HTMLDivElement>;
    mapStyle?: MapboxOptions['style'];
    padding?: Partial<PaddingOptions>;
    // strict?: boolean; // TODO: strict mode
  };

export function MapboxrGL(
  props: PropsWithChildren<MapboxrGLProps>
): JSX.Element;
