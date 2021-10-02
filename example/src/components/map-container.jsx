/* eslint-disable no-sequences */
import React from 'react';
import MapboxrGL from 'mapboxr-gl';
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

const MapContainer = () => {
  const { mapbox } = useStore().state;
  return mapbox.checked ? (
    <MapboxrGL
      {...parseAttributes(mapbox.props)}
      wrapper={{ style: { height: '100vh' } }}
    />
  ) : null;
};

export default MapContainer;
