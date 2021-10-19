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
  Image
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
    state
  } = useStore().state;
  return (
    mapbox.checked && (
      <MapboxrGL
        {...parseAttributes(mapbox.props)}
        wrapper={{ style: { height: '100vh' } }}
        oncemousemove={originalConsoleLog}
      >
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
          <Source key={source.name} {...parseAttributes(source.props)}>
            {state.checked && (
              <FeatureState
                key={state.name}
                {...parseAttributes(state.props)}
              />
            )}
            {icon.checked && <Layer {...parseAttributes(icon.props)}/>}
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
