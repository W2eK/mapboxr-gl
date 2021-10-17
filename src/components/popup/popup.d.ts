import { PopupOptions, LngLatLike, Popup as MapboxPopup } from 'mapbox-gl';

type PopupHandler<T extends 'close' | 'open'> = (props: {
  type: T;
  target: MapboxPopup;
}) => void;

export type WithArray<T> = T | T[];

// TODO: Rename handlers name to camel case
type PopupProps = PopupOptions & {
  onopen?: WithArray<PopupHandler<'open'>>;
  onclose?: WithArray<PopupHandler<'close'>>;
  coordinates?: LngLatLike;
  trackPointer?: boolean;
};

export function Popup(props: PopupProps): JSX.Element;
