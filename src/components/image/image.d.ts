import { Map } from 'mapbox-gl';
import { EqualityCheck } from '../../utils/utils';

type ImageProps = {
  id: string;
  image: string; // Parameters<Map['addImage']>[1];
  options?: Parameters<Map['addImage']>[2];
} & EqualityCheck;

export function Image(props: ImageProps): JSX.Element;
