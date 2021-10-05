import { AnySourceData } from 'mapbox-gl';

type SourceProps = AnySourceData & {
  id?: string;
};

export default function Source(props: SourceProps): JSX.Element;
