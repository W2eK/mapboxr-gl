import { AnyLayer, MapLayerEventType } from 'mapbox-gl';
import { StandardLonghandProperties } from 'csstype';
import { PropsWithChildren } from 'react';
import { Handlers } from '../map/map';

type LayerOnHandlers = Handlers<MapLayerEventType, 'on'>;
type LayerOnceHandlers = Handlers<MapLayerEventType, 'once'>;

type LayerProps = AnyLayer & {
  id?: string;
  beforeId?: string;
  cursor?: boolean | StandardLonghandProperties['cursor'];
  keepMaster?: boolean;
} & LayerOnHandlers &
  LayerOnceHandlers;

export function Layer(
  props: PropsWithChildren<LayerProps>
): JSX.Element;
