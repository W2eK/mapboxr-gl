import { PopupOptions, LngLatLike, Popup as MapboxPopup } from 'mapbox-gl';

type PopupHandler = (props: {
  type: 'close' | 'open';
  target: MapboxPopup;
}) => void;

// TODO: Rename handlers name to camel case
type PopupProps = PopupOptions & {
  onclose?: PopupHandler | PopupHandler[];
  onopen?: PopupHandler | PopupHandler[];
  coordinates?: LngLatLike;
  trackPointer?: boolean;
};

export function Popup(props: PopupProps): JSX.Element;
