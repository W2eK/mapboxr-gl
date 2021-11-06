import { PopupOptions, LngLatLike, Popup as MapboxPopup } from 'mapbox-gl';
import { EqualityCheck, NormalizeArray } from '../../utils/utils';

type PopupHandler<T extends 'close' | 'open'> = (props: {
  type: T;
  target: MapboxPopup;
}) => void;

// TODO: Rename handlers name to camel case
type PopupProps = PopupOptions & {
  onopen?: NormalizeArray<PopupHandler<'open'>>;
  onclose?: NormalizeArray<PopupHandler<'close'>>;
  coordinates?: LngLatLike;
  trackPointer?: boolean;
} & EqualityCheck;

export function Popup(props: PopupProps): JSX.Element;
