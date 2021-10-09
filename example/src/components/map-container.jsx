/* eslint-disable no-sequences */
import React from 'react';
import MapboxrGL, { Source, Layer, Property, Filter } from 'mapboxr-gl';
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
  const { mapbox, source, layer, property, master, filter } = useStore().state;
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
                  <Property key="unique-property" {...parseAttributes(property.props)} />
                )}
                {filter.checked && (
                  <Filter key="unique-filter" {...parseAttributes(filter.props)} />
                )}
              </Layer>
            )}
          </Source>
        )}
        {master.checked && <Layer {...parseAttributes(master.props)} />}
      </MapboxrGL>
    )
  );
};

export default MapContainer;
