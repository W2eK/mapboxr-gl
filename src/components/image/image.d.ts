import { Map } from 'mapbox-gl';

type ImageProps = {
  id: string;
  image: string; // Parameters<Map['addImage']>[1];
  options?: Parameters<Map['addImage']>[2];
};

export function Image(props: ImageProps): JSX.Element;
