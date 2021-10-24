import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapProvider } from '../context';
import { withListeners } from '../../hoc';
import { buildSwitcher, ParentProvider, useHandlers } from '../../hooks';
import { buildLogger, dependenciesBuilder, isDev } from '../../utils';
import { LayerList } from '../layer/linked-list';

const getDependencies = (() => {
  const NUMBER_OF_PROPS = 45;
  const NUMBER_OF_HANDLERS = 15;
  return dependenciesBuilder(NUMBER_OF_PROPS - NUMBER_OF_HANDLERS);
})();

/**
 * @param {import("./map").MapboxrGLProps} props
 * @returns {import("react").ReactElement}
 */
function MapboxrGL({ children = null, wrapper, listeners, ...props }) {
  // TODO: add strict
  // getDependencies.strict = props.strict;
  // TODO: Add PropTypes
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const state = useRef({ alive: false, cache: {} });

  const l = buildLogger('mapbox');

  // TODO: Add setTerrain
  const handlers = {
    // Properties
    minZoom: value => map.setMinZoom(value),
    maxZoom: value => map.setMaxZoom(value),
    minPitch: value => map.setMinPitch(value),
    maxPitch: value => map.setMaxPitch(value),
    mapStyle: value => map.setStyle(value),
    maxBounds: value => map.setMaxBounds(value),
    renderWorldCopies: value => map.setRenderWorldCopies(value),
    // TODO: add camera properties
    // User interaction handlers
    boxZoom: buildSwitcher(map?.boxZoom),
    doubleClickZoom: buildSwitcher(map?.doubleClickZoom),
    dragPan: buildSwitcher(map?.dragPan),
    dragRotate: buildSwitcher(map?.dragRotate),
    keyboard: buildSwitcher(map?.keyboard),
    scrollZoom: buildSwitcher(map?.scrollZoom),
    touchPitch: buildSwitcher(map?.touchPitch),
    touchZoomRotate: buildSwitcher(map?.touchZoomRotate)
  };

  const rest = useHandlers({ props, handlers });
  // props.
  useEffect(() => {
    /* STATUS: */ l`adding`;

    const map = new mapboxgl.Map({
      container: container.current,
      style: props.mapStyle || 'mapbox://styles/mapbox/streets-v11',
      ...props
    });
    if (isDev()) window.map = map;
    state.current = {
      alive: true,
      cache: {}
    };
    state.current.map = state.current;
    setMap(map);
    map.once('styledata', () => {
      const { layers } = map.getStyle();
      const cache = new LayerList();
      layers.forEach(layer => cache.insert(layer));
      state.current.cache = cache;
      setLoaded(true);
    });
    map.on('error', () => {});

    // TODO: should to keep?
    // window.requestAnimationFrame(() => map.fire('move'));

    return () => {
      /* STATUS: */ l`removing`;
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
        // TODO: Wrap with Error Boundary
        <MapProvider value={{ map, loaded }}>
          <ParentProvider value={{ parent: state.current }}>
            {listeners}
            {children}
          </ParentProvider>
        </MapProvider>
      )}
    </div>
  );
}
const Wrapped = withListeners(MapboxrGL);
export { Wrapped as MapboxrGL };
