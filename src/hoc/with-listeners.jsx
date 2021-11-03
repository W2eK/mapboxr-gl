import { MapboxEvent } from 'mapbox-gl';
import React from 'react';
import { Listener } from '../components/listener';
import { withDisplayName } from './with-name';

// prettier-ignore
const EVENTS = new Set([
  'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'mouseenter',
  'mouseleave', 'click', 'dblclick', 'contextmenu', 'touchstart', 'touchend',
  'touchcancel', 'wheel', 'resize', 'remove', 'touchmove', 'movestart', 'move',
  'moveend', 'dragstart', 'drag', 'dragend', 'zoomstart', 'zoom', 'zoomend',
  'rotatestart', 'rotate', 'rotateend', 'pitchstart', 'pitch', 'pitchend',
  'boxzoomstart', 'boxzoomend', 'boxzoomcancel', 'webglcontextlost',
  'webglcontextrestored', 'render', 'idle', 'error', 'data', 'styledata',
  'sourcedata', 'dataloading', 'styledataloading', 'sourcedataloading',
  'styleimagemissing', 'load', 'open', 'close'
]);

/**
 * @param {import("../components/map/map").ViewportHandler} handler
 * @return {import("../components/map/map").MapOnHandlers['onmove']}
 */
const buildViewportHandler = handler => {
  return ({ target: map }) => {
    const center = map.getCenter().toArray();
    const zoom = map.getZoom();
    const bearing = map.getBearing();
    const pitch = map.getPitch();
    handler({ center, zoom, bearing, pitch, map });
  };
};

export function withListeners(WrappedComponent) {
  function WrappedWithListeners(props = {}) {
    const injectedProps = Object.entries(props).reduce(
      (obj, [key, value]) => {
        const [, type, event] = key.match(/^(on(?:ce)?)(.*)/) || [];
        if (event && !Array.isArray(value)) value = [value];
        const has = EVENTS.has(event);
        if (has) {
          obj.listeners.push(
            ...value.map(handler => ({ type, event, handler }))
          );
        } else if (event === 'viewport') {
          obj.listeners.push(
            ...value.map(handler => ({
              type,
              event: 'viewport',
              handler: buildViewportHandler(handler)
            }))
          );
        } else {
          obj[key] = value;
        }
        return obj;
      },
      { listeners: [] }
    );
    injectedProps.listeners = injectedProps.listeners.map((pros, i) => (
      <Listener key={i} {...pros} />
    ));
    return <WrappedComponent {...injectedProps} />;
  }
  return withDisplayName(WrappedWithListeners, WrappedComponent);
}
