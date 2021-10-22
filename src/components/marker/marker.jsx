import React, { useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { dependenciesBuilder, isDev, buildLogger } from '../../utils';
import { createPortal } from 'react-dom';
import { useMap } from '../context';
import { withListeners } from '../../hoc';
import {
  ParentProvider,
  useHandlers,
  useLifeCycleWithStatus
} from '../../hooks';

const getDependencies = (() => {
  const NUMBER_OF_PROPS = 14;
  const NUMBER_OF_HANDLERS = 8;
  return dependenciesBuilder(NUMBER_OF_PROPS - NUMBER_OF_HANDLERS);
})();

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

  const hasChildren = !!children && children?.some?.(Boolean);
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

    return () => {
      marker.remove();
    };
  };

  const handlers = {
    coordinates: value => marker.setLngLat(value),
    offset: value => marker.setOffset(value),
    draggable: value => marker.setDraggable(value),
    rotation: value => marker.setRotation(value),
    rotationAlignment: value => marker.setRotationAlignment(value),
    pitchAlignment: value => marker.setPitchAlignment(value),
    showPopup: () => window.requestAnimationFrame(() => marker?.togglePopup()),
    anchor: value => {
      marker._anchor = value;
      marker._update();
    }
  };
  const rest = useHandlers({ handlers, props });
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
