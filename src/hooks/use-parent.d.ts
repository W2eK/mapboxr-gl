import { AnyLayer, Marker, Popup } from 'mapbox-gl';
import { LayerList } from '../components/layer/linked-list';

type Parent = {
  alive: boolean;
  map: ParentMap;
};

type ParentMap = Parent & {
  cache: LayerList;
};

export function useParent(): {
  parent: Parent;
  injected?: string;
  instance?: Marker | Popup;
};

export const ParentProvider: React.Context<Parent>;
