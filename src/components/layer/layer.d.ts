import { AnyLayer, MapLayerEventType } from 'mapbox-gl';
import { StandardLonghandProperties } from 'csstype';
import { PropsWithChildren } from 'react';
import { Handlers, DistributiveOmit } from '../../utils/utils';

type LayerOnHandlers = Handlers<MapLayerEventType, 'on'>;
type LayerOnceHandlers = Handlers<MapLayerEventType, 'once'>;

type LayerProps = {
  id?: string;
  beforeId?: string;
  master?: string;
  replaceMaster?: boolean;
  restoreMaster?: boolean;
  cursor?: boolean | StandardLonghandProperties['cursor'];
  sourceLayer?: string;
} & DistributiveOmit<AnyLayer, 'source-layer' | 'id'> &
  LayerOnHandlers &
  LayerOnceHandlers;

export function Layer(props: PropsWithChildren<LayerProps>): JSX.Element;
