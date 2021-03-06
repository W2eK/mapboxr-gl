import { Map } from 'mapbox-gl';
import { ComponentType } from 'react';

export function useMap(): { map: Map; loaded: boolean };

export const MapProvider: React.Context<Map>;

export function withMap<T>(
  WrappedComponent: ComponentType<T>
): ComponentType<T & Record<'map', Map>>;

export function withMapProvider<T>(
  WrappedComponent: ComponentType<T>
): ComponentType<T>;
