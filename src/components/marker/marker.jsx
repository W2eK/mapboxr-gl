import React, { Fragment, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
import {
  cloneChildren,
  getDependencies,
  isDev,
  buildLogger
} from '../../utils';
import { createPortal } from 'react-dom';
import { useMap } from '../context';
import { withListeners } from '../../hoc';
import { useHandlers, useLifeCycleWithStatus } from '../../hooks';

// mapboxgl.workerClass = MapboxWorker;

function Marker({ children, listeners, parent, ...props }) {
  // TODO: Make controlled component
  const { coordinates, showPopup } = props;
  const { map, loaded } = useMap();
  const [marker, setMarker] = useState(null);
  const container = useRef(null);
  buildLogger('marker');

  const hasChildren = !!children && !!children?.some(Boolean);

  // prettier-ignore
  const render = loaded && (() => {
    container.current =
      hasChildren
          ? document.createElement('div')
          : null;
    const marker = new mapboxgl
      .Marker({...props,element: container.current});
    
    if (isDev()) window.marker = marker;
    marker.setLngLat(coordinates);
    marker.addTo(map);
    setMarker(marker);
    showPopup && setTimeout(() => marker.togglePopup());

    return () => {
      marker.remove();
    };
  })

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

  const dependencies = [loaded, hasChildren, ...getDependencies(rest)];

  const status = useLifeCycleWithStatus({ parent, render }, dependencies);

  return (
    status.alive && (
      <Fragment>
        {cloneChildren(listeners, { instance: marker })}
        {container.current &&
          createPortal(
            cloneChildren(children, { marker, parent: status }),
            container.current
          )}
      </Fragment>
    )
  );
}

const Wrapped = withListeners(Marker);
export { Wrapped as Marker };
