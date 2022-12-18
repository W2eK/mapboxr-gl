import { Map, MapboxOptions, MapEventType, PaddingOptions } from 'mapbox-gl';
import { BuildHandlerProps, CustomMapEventNames, MapEventNames } from '../../interfaces/events';
import { List } from '../../interfaces/utils';
import { DebugPropsKeys } from '../../lib/handlers/build-handlers';

export type MapboxrGLProps = Props & MapInstanceProps & MapOnHandlers & DebugProps;

type Props = {
  children?: React.ReactNode;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  mapStyle?: MapboxOptions['style'];
  // TODO: strict mode
  // strict?: boolean;
};

type MapInstanceProps = Omit<MapboxOptions, 'container' | 'style'>;
type DebugProps = Partial<Record<DebugPropsKeys, boolean>> & { padding?: Partial<PaddingOptions> };
type MapOnHandlers = BuildHandlerProps<MapEventNames | CustomMapEventNames>;
