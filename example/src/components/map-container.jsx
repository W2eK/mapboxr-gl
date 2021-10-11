/* eslint-disable no-sequences */
import React from 'react';
import MapboxrGL, {
  Source,
  Layer,
  Property,
  Filter,
  FeatureState
} from 'mapboxr-gl';
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
  const { mapbox, source, layer, property, master, filter, state } =
    useStore().state;
  return (
    mapbox.checked && (
      <MapboxrGL
        {...parseAttributes(mapbox.props)}
        wrapper={{ style: { height: '100vh' } }}
        // onload={console.log}
        oncemousemove={originalConsoleLog}
      >
        {source.checked && (
          <Source key={source.name} {...parseAttributes(source.props)}>
            {state.checked && (
              <FeatureState
                key={state.name}
                {...parseAttributes(state.props)}
              />
            )}
            {layer.checked && (
              <Layer
                key={layer.name}
                {...parseAttributes(layer.props)}
                onmouseenter={console.log}
              >
                {property.checked && (
                  <Property
                    key={property.name}
                    {...parseAttributes(property.props)}
                  />
                )}
                {filter.checked && (
                  <Filter
                    key={filter.name}
                    {...parseAttributes(filter.props)}
                  />
                )}
              </Layer>
            )}
          </Source>
        )}
        {master.checked && (
          <Layer key={master.name} {...parseAttributes(master.props)} />
        )}
      </MapboxrGL>
    )
  );
};

export default MapContainer;
