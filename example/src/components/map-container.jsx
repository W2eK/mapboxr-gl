/* eslint-disable no-sequences */
import React from 'react';
import MapboxrGL, { Source } from 'mapboxr-gl';
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

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [3.33984375, 6.577303118123887]
      }
    }
  ]
};

const MapContainer = () => {
  const { mapbox, source } = useStore().state;
  return (
    <MapboxrGL
      {...parseAttributes(mapbox.props)}
      wrapper={{ style: { height: '100vh' } }}
      // onload={console.log}
      oncemousemove={console.log}
    >
      {source.checked && (
        <Source {...parseAttributes(source.props)} />
      )}
    </MapboxrGL>
  );
};

export default MapContainer;
