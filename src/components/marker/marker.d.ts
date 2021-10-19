import { LngLatLike, MarkerOptions, Marker as MapboxMarker } from 'mapbox-gl';
import { FC, PropsWithChildren } from 'react';
import { WithArray } from '../popup';

// TODO Refactor Handlers Types
type MarkerHandler<T extends 'drag' | 'dragstart' | 'dragend'> = (props: {
  type: T;
  target: MapboxMarker;
}) => void;

type MarkerProps = Omit<MarkerOptions, 'element'> & {
  coordinates: LngLatLike;
  ondrag?: WithArray<MarkerHandler<'drag'>>;
  ondragstart?: WithArray<MarkerHandler<'dragstart'>>;
  ondragend?: WithArray<MarkerHandler<'dragend'>>;
  showPopup?: boolean;
};

export function Marker(props: PropsWithChildren<MarkerProps>): JSX.Element;
