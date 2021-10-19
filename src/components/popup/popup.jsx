import React, { useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import { createPortal } from 'react-dom';
import { useMap } from '../context';
import { getDependencies, isDev, buildLogger } from '../../utils';
import {
  ParentProvider,
  useHandlers,
  useLifeCycleWithStatus,
  useParent
} from '../../hooks';
import { withListeners } from '../../hoc';

function Popup({ children, listeners, ...props }) {
  // TODO: Make controlled component
  const { coordinates, trackPointer } = props;
  const { map } = useMap();
  const { parent, instance: marker } = useParent();
  const [popup, setPopup] = useState(null);
  const container = useRef(null);

  buildLogger('popup', children.type || children);

  const render = () => {
    container.current = document.createElement('div');
    const popup = new mapboxgl.Popup(props);
    if (isDev()) window.popup = popup;
    popup.setDOMContent(container.current);
    trackPointer ? popup.trackPointer() : popup.setLngLat(coordinates);
    marker ? marker.setPopup(popup) : popup.addTo(map);
    setPopup(popup);
    return () => popup.remove();
  };

  const handlers = {
    offset: value => popup.setMaxWidth(value),
    maxWidth: value => popup.setMaxWidth(value),
    coordinates: value => trackPointer || popup.setLngLat(value),
    trackPointer: value =>
      value ? popup.trackPointer() : popup.setLngLat(coordinates),
    className: (next, prev = '') => {
      next = next.trim().split(' ');
      prev = prev.trim().split(' ');
      next
        .filter(name => !prev.includes(name))
        .forEach(name => popup.addClassName(name));
      prev
        .filter(name => !next.includes(name))
        .forEach(name => popup.addClassName(name));
    },
    anchor: next => {
      popup.options.anchor = next;
      popup._update();
    }
  };

  const rest = useHandlers({ handlers, props });

  const dependencies = getDependencies(rest);

  const status = useLifeCycleWithStatus({ parent, render }, dependencies);

  return (
    status.alive && (
      <ParentProvider value={{ instance: popup }}>
        {listeners}
        {createPortal(children, container.current)}
      </ParentProvider>
    )
  );
}

const Wrapped = withListeners(Popup);
export { Wrapped as Popup };
