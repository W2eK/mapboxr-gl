import { LngLatLike, MarkerOptions, Marker as MapboxMarker } from 'mapbox-gl';
import { PropsWithChildren } from 'react';
import { NormalizeArray } from '../../utils/utils';

// TODO Refactor Handlers Types
type MarkerHandler<T extends 'drag' | 'dragstart' | 'dragend'> = (props: {
  type: T;
  target: MapboxMarker;
}) => void;

type MarkerProps = Omit<MarkerOptions, 'element'> & {
  coordinates: LngLatLike;
  ondrag?: NormalizeArray<MarkerHandler<'drag'>>;
  ondragstart?: NormalizeArray<MarkerHandler<'dragstart'>>;
  ondragend?: NormalizeArray<MarkerHandler<'dragend'>>;
  showPopup?: boolean;
};

export function Marker(props: PropsWithChildren<MarkerProps>): JSX.Element;
