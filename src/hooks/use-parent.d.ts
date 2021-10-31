import { Marker, Popup } from 'mapbox-gl';
import { LayerCache } from '../components/layer/linked-list';

type Parent = {
  alive: boolean;
  map: ParentMap;
};

type ParentMap = Parent & {
  cache: LayerCache;
};

export function useParent(): {
  parent: Parent;
  source?: string;
  layer?: string;
  instance?: Marker | Popup;
};

export const ParentProvider: React.Context<Parent>;
