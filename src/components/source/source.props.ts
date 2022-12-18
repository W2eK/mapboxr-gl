import { AnySourceData } from 'mapbox-gl';
import { IsStrict } from '../../interfaces/strict';

export type SourceProps = Props & AnySourceData & IsStrict;

type Props = {
  id?: string;
};
