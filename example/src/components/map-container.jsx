/* eslint-disable no-sequences */
import React from 'react';
import MapboxrGL, {
  Source,
  Layer,
  Property,
  Filter,
  FeatureState,
  Popup,
  Marker,
  Terrain,
  Fog,
  Listener,
  Image
} from 'mapboxr-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useStore } from '../store/context';
import MapLayers from './map-layers';

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
  const {
    mapbox,
    image,
    popup,
    marker,
    icon,
    content,
    source,
    layer,
    property,
    master,
    filter,
    state,
    terrain
  } = useStore().state;
  return (
    mapbox.checked && (
      <MapboxrGL
        {...parseAttributes(mapbox.props)}
        wrapper={{ style: { height: '100vh' } }}
        oncemousemove={originalConsoleLog}
      >
        <MapLayers />
        {image.checked && <Image {...parseAttributes(image.props)} />}
        {marker.checked && (
          <Marker {...parseAttributes(marker.props)} ondragend={console.log}>
            {content.checked && (
              <div
                style={{
                  backgroundColor: 'lightgreen',
                  padding: '.5rem',
                  borderRadius: '50%'
                }}
              >
                Test
              </div>
            )}
            {popup.checked && (
              <Popup
                {...parseAttributes(popup.props)}
                onopen={console.log}
                closeOnClick={false}
              >
                {content.checked ? (
                  <div style={{ backgroundColor: 'lightcoral' }}>
                    Test Test Test Test Test
                  </div>
                ) : (
                  'Test Test'
                )}
              </Popup>
            )}
          </Marker>
        )}

        {source.checked && (
          <Source {...parseAttributes(source.props)}>
            {state.checked && (
              <FeatureState {...parseAttributes(state.props)} />
            )}
            {icon.checked && <Layer {...parseAttributes(icon.props)} />}
            {layer.checked && (
              <Layer
                {...parseAttributes(layer.props)}
                onmouseenter={console.log}
              >
                {property.checked && (
                  <Property {...parseAttributes(property.props)} />
                )}
                {filter.checked && (
                  <Filter {...parseAttributes(filter.props)} />
                )}
              </Layer>
            )}
          </Source>
        )}
        {master.checked && <Layer {...parseAttributes(master.props)} />}
        <Fog range={[1.0, 12.0]} color="red" horizonBlend={0.1} />
        {terrain.checked && (
          <Source
            id="mapbox-dem"
            type="raster-dem"
            url="mapbox://mapbox.mapbox-terrain-dem-v1"
            tileSize={512}
            maxzoom={14}
          >
            <Terrain {...parseAttributes(terrain.props)} />
          </Source>
        )}
      </MapboxrGL>
    )
  );
};

export default MapContainer;
