import React, { createContext, useContext } from 'react';

const MapContext = createContext(null);
export const MapProvider = MapContext.Provider;
export function useMap(params) {
  return useContext(MapContext);
}

export default function withMap(WrappedCompnent) {
  return function WrappedWithMap(props) {
    const map = useMap();
    return <WrappedCompnent {...props} map={map} />;
  };
}
