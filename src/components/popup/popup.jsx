import React, { Fragment, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { createPortal } from '!react-dom';
import { useMap } from '../context';
import {
  cloneChildren,
  getDependencies,
  isDev,
  buildLogger
} from '../../utils';
import { useHandlers } from '../../hooks';
import { withListeners } from '../../hoc';

function Popup({ children, parent, listeners, marker, ...props }) {
  // TODO: Make controlled component
  const { coordinates, trackPointer } = props;
  const { map } = useMap();
  const [popup, setPopup] = useState(null);
  const container = useRef(null);

  const l = buildLogger('popup', children.type || children);
  /* STATUS: */ l`rendering`;
  const handlers = {
    offset: value => popup.setOffset(value),
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
  const rest = useHandlers({
    handlers,
    props: { ...props }
  });

  useEffect(() => {
    /* STATUS: */ l`adding`;
    container.current = document.createElement('div');
    const popup = new mapboxgl.Popup(props);
    if (isDev()) window.popup = popup;
    popup.setDOMContent(container.current);
    if (trackPointer) {
      popup.trackPointer();
    } else {
      popup.setLngLat(coordinates);
    }
    if (marker) {
      marker.setPopup(popup);
    } else {
      popup.addTo(map);
    }
    setPopup(popup);

    return () => {
      if (parent.alive && parent.map.alive) {
        /* STATUS: */ l`removing`;
        popup.remove();
      } else {
        /* STATUS: */ l`deleted`;
      }
      setPopup(null);
    };
  }, getDependencies(rest));

  return (
    popup && (
      <Fragment>
        {cloneChildren(listeners, { instance: popup })}
        {createPortal(children, container.current)}
      </Fragment>
    )
  );
}

const Wrapped = withListeners(Popup);
export { Wrapped as Popup };
