import MapboxrGL from 'mapboxr-gl';
import { ComponentProps } from 'react';

export enum Options {
  MAP = 'map',
  // SOURCE = 'source',
  // LAYER = 'layer'
}

type Item = {
  checked: boolean;
  label: string;
};

type MapItem = Item & {
  props: Partial<Record<keyof ComponentProps<typeof MapboxrGL>, string>>;
};
type SourceItem = Item & { props?: { [key: string]: any } };
type LayerItem = Item & { props?: { [key: string]: any } };

export type State = {
  [Options.MAP]: MapItem;
  // source: SourceItem;
  // layer: LayerItem;
};

export const initialState: State = {
  map: {
    checked: true,
    label: 'MapboxrGL',
    props: {
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      minZoom: '0',
      maxZoom: '22'
    }
  },
  // source: { checked: true, label: 'Source' },
  // layer: { checked: true, label: 'Circle Layer' }
};
