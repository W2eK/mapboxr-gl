import React, { useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import { createPortal } from 'react-dom';
import { useMap } from '../context';
import { isDev, buildLogger, dependenciesBuilder } from '../../utils';
import {
  buildHandlers,
  ParentProvider,
  useHandlers,
  useLifeCycleWithStatus,
  useParent
} from '../../hooks';
import { withListeners } from '../../hoc';

const getDependencies = (() => {
  const NUMBER_OF_PROPS = 12;
  const NUMBER_OF_HANDLERS = 6;
  return dependenciesBuilder(NUMBER_OF_PROPS - NUMBER_OF_HANDLERS);
})();

/**
 *
 * @param {import("./popup").PopupProps} props
 * @returns {import("react").ReactElement}
 */
function Popup({ children, listeners, ...props }) {
  // TODO: Make controlled component
  const { coordinates, trackPointer } = props;
  const { map } = useMap();
  const { instance: marker } = useParent();
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
    return alive => alive && popup.remove();
  };

  const handlers = buildHandlers({
    offset: 'setOffset',
    maxWidth: 'setMaxWidth',
    coordinates(value) {
      trackPointer || this.setLngLat(value);
    },
    trackPointer(value) {
      value ? this.trackPointer() : this.setLngLat(coordinates);
    },
    /*
    className: (next, prev = '') => {
      next = next.trim().split(' ');
      prev = prev.trim().split(' ');
      next
        .filter(name => !prev.includes(name))
        .forEach(name => this.addClassName(name));
      prev
        .filter(name => !next.includes(name))
        .forEach(name => this.addClassName(name));
    },
    */
    anchor(next) {
      this.options.anchor = next;
      this._update();
    }
  });

  const rest = useHandlers({ handlers, props, context: popup });

  const dependencies = getDependencies(rest);
  const status = useLifeCycleWithStatus({ render }, dependencies);

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
