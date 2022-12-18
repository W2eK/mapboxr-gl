import { Map, Marker, Popup } from 'mapbox-gl';
import { createContext, useContext } from 'react';

export interface Status {
  alive: boolean;
}

export interface Parent {
  parent: Status;
  source?: string;
  layer?: string;
  instance?: Marker | Popup;
}

const ParentContext = createContext<Parent | null>(null);
ParentContext.displayName = 'ParentContext';

export const ParentProvider = ParentContext.Provider;

export function useParent() {
  // TODO: Remove ! assertion
  return useContext(ParentContext)!;
}
