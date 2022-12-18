import React, { ComponentType } from 'react';
import {
  AllEventNames,
  AllHandlerPropNames,
  AllHandlerProps,
  CustomMapHandlers,
  eventNames,
  MapHandlers
} from '../interfaces/events';
import { Listener } from '../components/listener/listener';
import { getKeys, toList } from '../lib/utils';

const buildViewportHandler =
  (handler: CustomMapHandlers['viewport']): MapHandlers['move'] =>
  ({ target: map }) => {
    const center = map.getCenter().toArray() as [number, number];
    const zoom = map.getZoom();
    const bearing = map.getBearing();
    const pitch = map.getPitch();
    handler({ center, zoom, bearing, pitch, map });
  };

export const withListeners = <P extends Partial<AllHandlerProps> & {}>(
  WrappedComponent: ComponentType<WithListeners<P>>
): ComponentType<P> => {
  // TODO: Fix types
  // @ts-ignore
  return (props = {}): JSX.Element => {
    let counter = 0;
    const injectedProps: Record<string, any> = {};
    const listeners: JSX.Element[] = [];
    getKeys(props).forEach(key => {
      // debugger
      // * Check property name looks like handler name
      const pattern = /^(on(?:ce)?)(.*)/;
      const match = key.match(pattern) as [string, 'on' | 'once', AllEventNames] | null;
      if (match && eventNames.includes(match[2])) {
        const [, type, event] = match;
        // * Normalize handlers to Array
        const handlers = toList(props[key]);
        handlers.forEach((handler, i) => {
          if (handler === undefined) return;
          if (event === 'viewport')
            handler = buildViewportHandler(handler as CustomMapHandlers['viewport']);
          listeners.push(<Listener key={counter++} type={type} event={event} handler={handler} />);
        });
      } else {
        // * If not reassign it to injectedProps
        injectedProps[key] = props[key];
      }
    });
    // @ts-ignore
    return <WrappedComponent {...injectedProps} listeners={listeners} />;
  };
};

export type WithListeners<P extends Partial<AllHandlerProps>> = Omit<P, AllHandlerPropNames> & {
  listeners: JSX.Element[];
};
