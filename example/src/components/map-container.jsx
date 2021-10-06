/* eslint-disable no-sequences */
import React from 'react';
import MapboxrGL, { Source, Layer, Property } from 'mapboxr-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useStore } from '../store/context';

const parseAttributes = attributes => {
  const parseValue = value => {
    if (!value) return;
    if (typeof value === 'string') {
      if (isFinite(value)) return +value;
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
    return value;
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
              <Layer
                {...parseAttributes(layer.props)}
                onmouseenter={console.log}
              >
                {property.checked && (
                  <Property id="circle-color" type="paint" value="red" />
                )}
              </Layer>
            )}
          </Source>
        )}
      </MapboxrGL>
    )
  );
};

export default MapContainer;
