import React, { useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { dependenciesBuilder, isDev, buildLogger } from '../../utils';
import { createPortal } from 'react-dom';
import { useMap } from '../context';
import { withListeners } from '../../hoc';
import {
  buildHandlers,
  ParentProvider,
  useHandlers,
  useLifeCycleWithStatus
} from '../../hooks';

const getDependencies = (() => {
  const NUMBER_OF_PROPS = 14;
  const NUMBER_OF_HANDLERS = 8;
  return dependenciesBuilder(NUMBER_OF_PROPS - NUMBER_OF_HANDLERS);
})();

const handlers = buildHandlers({
  coordinates: 'setLngLat',
  offset: 'setOffset',
  draggable: 'setDraggable',
  rotation: 'setRotation',
  rotationAlignment: 'setRotationAlignment',
  pitchAlignment: 'setPitchAlignment',
  showPopup() {
    window.requestAnimationFrame(() => this?.togglePopup());
  },
  anchor(value) {
    this._anchor = value;
    this._update();
  }
});

/**
 *
 * @param {import("./marker").MarkerProps} props
 * @returns {import("react").ReactElement}
 */
function Marker({ children, listeners, ...props }) {
  // TODO: Make controlled component
  const { coordinates, showPopup } = props;
  const { map } = useMap();
  const [marker, setMarker] = useState(null);
  const container = useRef(null);
  buildLogger('marker');

  const hasChildren = Array.isArray(children)
    ? children?.some?.(Boolean)
    : !!children;
  const render = () => {
    container.current = hasChildren ? document.createElement('div') : null;
    const marker = new mapboxgl.Marker({
      ...props,
      element: container.current
    });

    if (isDev()) window.marker = marker;
    marker.setLngLat(coordinates);
    marker.addTo(map);
    setMarker(marker);
    showPopup && setTimeout(() => marker.togglePopup());

    return alive => alive && marker.remove();
  };

  const rest = useHandlers({ handlers, props, context: marker });
  const dependencies = getDependencies(rest, hasChildren);
  const status = useLifeCycleWithStatus({ render }, dependencies);

  return (
    status.alive && (
      <ParentProvider value={{ parent: status, instance: marker }}>
        {listeners}
        {container.current && createPortal(children, container.current)}
      </ParentProvider>
    )
  );
}

const Wrapped = withListeners(Marker);
export { Wrapped as Marker };
