import { AnyLayer } from 'mapbox-gl';
import { PropsWithChildren } from 'react';

type LayerProps = AnyLayer & {
  id?: string;
  beforeId?: string;
};

export default function Layer(
  props: PropsWithChildren<LayerProps>
): JSX.Element;
