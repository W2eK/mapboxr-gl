/* eslint-disable no-sequences */
import React from 'react';
import MapboxrGL, { Source, Layer, Property } from 'mapboxr-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useStore } from '../store/context';

const parseAttributes = attributes => {
  const parseValue = value => {
    if (!value) return;
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  };
  return Object.entries(attributes).reduce(
    (obj, [key, value]) => ((obj[key] = parseValue(value)), obj),
    {}
  );
};

const originalConsoleLog = console.log;

const MapContainer = () => {
  const { mapbox, source, layer, property } = useStore().state;
  return (
    mapbox.checked && (
      <MapboxrGL
        {...parseAttributes(mapbox.props)}
        wrapper={{ style: { height: '100vh' } }}
        // onload={console.log}
        oncemousemove={originalConsoleLog}
      >
        {source.checked && (
          <Source {...parseAttributes(source.props)}>
            {layer.checked && (
              <Layer {...layer.props}>
                {property.checked && <Property id="circle-color" type="paint" value="red"/>}
              </Layer>
            )}
          </Source>
        )}
        {/* {source.checked && <Source {...parseAttributes(source.props)} id="dots-1"/>} */}
      </MapboxrGL>
    )
  );
};

export default MapContainer;
