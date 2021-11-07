import { AnyLayer, Expression, MapLayerEventType } from 'mapbox-gl';
import { StandardLonghandProperties } from 'csstype';
import { PropsWithChildren } from 'react';
import {
  BuildHandlers,
  DistributiveOmit,
  EqualityCheck
} from '../../utils/utils';

type LayerOnHandlers = BuildHandlers<MapLayerEventType, 'on'>;
type LayerOnceHandlers = BuildHandlers<MapLayerEventType, 'once'>;

type LayerProps = {
  id?: string;
  beforeId?: string;
  master?: string;
  replaceMaster?: boolean;
  restoreMaster?: boolean;
  cursor?: boolean | StandardLonghandProperties['cursor'];
  sourceLayer?: string;
  type?: string;
  filter?: Expression | null;
} & DistributiveOmit<AnyLayer, 'source-layer' | 'id' | 'filter'> &
  LayerOnHandlers &
  LayerOnceHandlers &
  EqualityCheck;

export function Layer(props: PropsWithChildren<LayerProps>): JSX.Element;
