import { AnyLayer, MapLayerEventType } from 'mapbox-gl';
import { StandardLonghandProperties } from 'csstype';
import { PropsWithChildren } from 'react';
import { Handlers } from '../map/map';

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

type LayerOnHandlers = Handlers<MapLayerEventType, 'on'>;
type LayerOnceHandlers = Handlers<MapLayerEventType, 'once'>;

type LayerProps = DistributiveOmit<AnyLayer, 'source-layer'> & {
  id?: string;
  beforeId?: string;
  cursor?: boolean | StandardLonghandProperties['cursor'];
  sourceLayer?: string;
} & LayerOnHandlers &
  LayerOnceHandlers;

export function Layer(props: PropsWithChildren<LayerProps>): JSX.Element;
