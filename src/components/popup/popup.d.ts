import { PopupOptions, LngLatLike, Popup as MapboxPopup } from 'mapbox-gl';

type MarkerHandler<T extends 'close' | 'open'> = (props: {
  type: T;
  target: MapboxPopup;
}) => void;

type WithArray<T> = T | T[];

// TODO: Rename handlers name to camel case
type PopupProps = PopupOptions & {
  onopen?: WithArray<MarkerHandler<'open'>>;
  onclose?: WithArray<MarkerHandler<'close'>>;
  coordinates?: LngLatLike;
  trackPointer?: boolean;
};

export function Popup(props: PopupProps): JSX.Element;
