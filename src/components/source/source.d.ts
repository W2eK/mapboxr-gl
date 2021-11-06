import { AnySourceData } from 'mapbox-gl';
import { PropsWithChildren } from 'react';
import { EqualityCheck } from '../../utils/utils';

type SourceProps = AnySourceData & {
  id?: string;
} & EqualityCheck;

// TODO: Restrict certain children:
// TODO: https://stackoverflow.com/questions/44475309/how-do-i-restrict-the-type-of-react-children-in-typescript-using-the-newly-adde

export function Source(props: PropsWithChildren<SourceProps>): JSX.Element;
