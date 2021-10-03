import { Map } from 'mapbox-gl';
import { ComponentType } from 'react';

export function useMap(): Map;

export const MapProvider: React.Context<Map>;

export default function withMap<T>(
  WrappedCompnent: ComponentType<T>
): ComponentType<T & Record<'map', Map>>;
