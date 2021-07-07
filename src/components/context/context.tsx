import React, { createContext, useContext } from 'react';
import 'mapbox-gl';

const MapContext = createContext<mapboxgl.Map | null>(null);

function useMap() {
  return useContext(MapContext);
}

const MapProvider: React.FC<{ map: mapboxgl.Map }> = ({ children, map }) => {
  return <MapContext.Provider value={map}>{children}</MapContext.Provider>;
};

export default useMap;
export { MapProvider as Provider };
