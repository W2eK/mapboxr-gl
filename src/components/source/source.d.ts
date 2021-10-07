import { AnySourceData } from 'mapbox-gl';
import { PropsWithChildren } from 'react';

type SourceProps = AnySourceData & {
  id?: string;
};

export function Source(
  props: PropsWithChildren<SourceProps>
): JSX.Element;
