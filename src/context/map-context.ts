import { Map } from 'mapbox-gl';
import React, { createContext, useContext } from 'react';
// import { withDisplayName } from '../../hoc/with-name';

export interface MapContext {
  map: Map;
  loaded: boolean;
}

const MapContext = createContext<MapContext | null>(null);
MapContext.displayName = 'MapContext';

export const MapProvider = MapContext.Provider;

export function useMap() {
  // TODO: Remove !
  return useContext(MapContext)!;
}

/*
export default function withMap(WrappedComponent) {
  function WrappedWithMap(props) {
    const { map, loaded } = useMap();
    return loaded && <WrappedComponent {...props} map={map} />;
  }
  return withDisplayName(WrappedWithMap, WrappedComponent);
}

export function withMapProvider(WrappedComponent) {
  function WrappedWithMapProvider(props) {
    return (
      <MapContext.Provider value={{ map: {} }}>
        <WrappedComponent {...props} />
      </MapContext.Provider>
    );
  }
  return withDisplayName(WrappedWithMapProvider, WrappedComponent);
}
*/
