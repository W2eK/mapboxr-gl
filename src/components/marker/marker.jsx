import React, { Fragment, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { cloneChildren, getDependencies, isDev, logger } from '../../utils';
import { createPortal } from '!react-dom';
import { useMap } from '../context';
import { withListeners } from '../../hoc';
import { useHandlers } from '../../hooks';

function Marker({ children = null, listeners, parent, ...props }) {
  // TODO: Make controlled component
  const { coordinates, showPopup } = props;
  const { map } = useMap();
  const [marker, setMarker] = useState(null);
  const container = useRef(null);

  logger`MARKER: marker is rendering`;

  const handlers = {
    coordinates: marker?.setLngLat.bind(marker),
    offset: marker?.setOffset.bind(marker),
    draggable: marker?.setDraggable.bind(marker),
    rotation: marker?.setRotation.bind(marker),
    rotationAlignment: marker?.setRotationAlignment.bind(marker),
    pitchAlignment: marker?.setPitchAlignment.bind(marker),
    showPopup: () => window.requestAnimationFrame(() => marker?.togglePopup()),
    anchor: value => {
      marker._anchor = value;
      marker._update();
    }
  };
  useHandlers.props = ['MARKER', 'marker'];
  const rest = useHandlers({ handlers, props });
  useEffect(() => {
    logger`MARKER: marker is adding`;
    container.current = children ? document.createElement('div') : null;
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
      if (parent.alive && parent.map.alive) {
        logger`MARKER: marker is removing`;
        marker.remove();
      } else {
        logger`MARKER: marker is deleted`;
      }
      setMarker(null);
      container.current = null;
    };
  }, [!!children, ...getDependencies(rest)]);
  return (
    marker && (
      <Fragment>
        {cloneChildren(listeners, { subject: marker })}
        {container.current &&
          createPortal(cloneChildren(children, { marker }), container.current)}
      </Fragment>
    )
  );
}

const Wrapped = withListeners(Marker);
export { Wrapped as Marker };
