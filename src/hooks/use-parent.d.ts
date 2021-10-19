import { AnyLayer, Marker, Popup } from 'mapbox-gl';

type Parent = {
  alive: boolean;
  map: ParentMap;
};

type ParentMap = Parent & {
  cache: {
    [key: string]: {
      index: number;
      master: AnyLayer;
    };
  };
};

export function useParent(): {
  parent: Parent;
  injected?: string;
  instance?: Marker | Popup;
};

export const ParentProvider: React.Context<Parent>;
