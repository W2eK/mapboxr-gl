import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl';

import { getDependencies, isDev, logger } from '../../utils';
import { buildSetter, buildSwitcher, useHandlers } from '../../hooks/use-handlers';

import { MapProvider } from '../../hoc/with-map';
import withListeners from '../../hoc/with-listeners';
import Listener from '../listener/listener';

const handlers = {
  // Properties
  minZoom: buildSetter('setMinZoom'),
  maxZoom: buildSetter('setMaxZoom'),
  minPitch: buildSetter('setMinPitch'),
  maxPitch: buildSetter('setMaxPitch'),
  mapStyle: buildSetter('setStyle'),
  maxBounds: buildSetter('setMaxBounds'),
  renderWorldCopies: buildSetter('setRenderWorldCopies'),
  // User interaction handlers
  boxZoom: buildSwitcher('boxZoom'),
  doubleClickZoom: buildSwitcher('doubleClickZoom'),
  dragPan: buildSwitcher('dragPan'),
  dragRotate: buildSwitcher('dragRotate'),
  keyboard: buildSwitcher('keyboard'),
  scrollZoom: buildSwitcher('scrollZoom'),
  touchPitch: buildSwitcher('touchPitch'),
  touchZoomRotate: buildSwitcher('touchZoomRotate')
};

function MapboxrGL({ children, wrapper, listeners, ...props }) {
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const [loaded, setLoaded] = useState(false);

  logger`MAPBOX: map is rendering`;

  const rest = useHandlers({
    handlers,
    props,
    subject: map,
    component: 'mapbox',
    id: 'container'
  });

  useEffect(() => {
    /* On Mount: */
    logger`MAPBOX: map is adding`;

    const map = new mapboxgl.Map({
      container: container.current,
      style: props.mapStyle || 'mapbox://styles/mapbox/streets-v11',
      ...props
    });
    if (isDev()) window.map = map;

    setMap(map);
    map.on('load', () => setLoaded(true));

    // TODO: should to keep?
    // window.requestAnimationFrame(() => map.fire('move'));

    /* On Unmount: */
    return () => {
      logger`MAPBOX: map is removing`;
      setLoaded(false);
      setMap(null);
      map.remove();
    };
  }, getDependencies(rest));

  return (
    <div ref={container} {...wrapper}>
      {map && (
        <MapProvider value={{ map, loaded }}>
          {listeners.map((props, i) => (
            <Listener key={props.event + i} {...props} />
          ))}
          {children}
        </MapProvider>
      )}
    </div>
  );
}

export default withListeners(MapboxrGL);
