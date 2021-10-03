import React, { createContext, useContext } from 'react';

const MapContext = createContext(null);

export const MapProvider = MapContext.Provider;

export function useMap() {
  return useContext(MapContext);
}

export default function withMap(WrappedComponent) {
  return function WrappedWithMap(props) {
    const map = useMap();
    return <WrappedComponent {...props} map={map} />;
  };
}
