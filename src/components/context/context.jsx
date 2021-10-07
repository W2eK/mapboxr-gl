import React, { createContext, useContext } from 'react';
import { withDisplayName } from '../../hoc/with-name';

const MapContext = createContext(null);

export const MapProvider = MapContext.Provider;

export function useMap() {
  return useContext(MapContext);
}

export default function withMap(WrappedComponent) {
  function WrappedWithMap(props) {
    const { map, loaded } = useMap();
    return loaded && <WrappedComponent {...props} map={map} />;
  }
  return withDisplayName(WrappedWithMap, WrappedComponent);
}
