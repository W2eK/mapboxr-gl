import React, { useRef, useState, useEffect, cloneElement } from 'react';
import mapboxgl from '!mapbox-gl';
import { MapProvider } from '../context';
import { withListeners } from '../../hoc';
import { buildSetter, buildSwitcher, useHandlers } from '../../hooks';
import { cloneChildren, getDependencies, isDev, logger } from '../../utils';

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

function MapboxrGL({ children = null, wrapper, listeners, ...props }) {
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const state = useRef({ alive: false });

  logger`MAPBOX: container is rendering`;

  const rest = useHandlers({
    handlers,
    props,
    subject: map,
    component: 'mapbox',
    id: 'container'
  });

  useEffect(() => {
    /* On Mount: */
    // console.log('111')
    logger`MAPBOX: container is adding`;

    const map = new mapboxgl.Map({
      container: container.current,
      style: props.mapStyle || 'mapbox://styles/mapbox/streets-v11',
      ...props
    });
    if (isDev()) window.map = map;
    state.current = {
      alive: true
    };
    state.current.map = state.current;
    setMap(map);
    // TODO: choose other event
    map.on('load', () => setLoaded(true));

    // TODO: should to keep?
    // window.requestAnimationFrame(() => map.fire('move'));

    /* On Unmount: */
    return () => {
      logger`MAPBOX: container is removing`;
      state.current.alive = false;
      state.current.map = false;
      setLoaded(false);
      setMap(null);
      map.remove();
    };
  }, getDependencies(rest));
  return (
    <div ref={container} {...wrapper}>
      {map && (
        <MapProvider value={{ map, loaded }}>
          {listeners}
          {cloneChildren(children, { parent: state.current })}
        </MapProvider>
      )}
    </div>
  );
}

const Wrapped = withListeners(MapboxrGL);
export { Wrapped as MapboxrGL };
