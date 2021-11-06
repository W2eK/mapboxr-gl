import { AnyLayout, AnyPaint } from 'mapbox-gl';
import { EqualityCheck, UnionToIntersection, ValueOf } from '../../utils/utils';

type BuildPropertyType<T extends 'layout' | 'paint', U> = {
  [P in keyof U]: { type: T; name: P; value: U[P] };
};

type PaintProperties = ValueOf<
  BuildPropertyType<'paint', UnionToIntersection<AnyPaint>>
>;
type LayoutProperties = ValueOf<
  BuildPropertyType<'layout', UnionToIntersection<AnyLayout>>
>;

type PropertyProps = {
  layer?: string;
} & EqualityCheck &
  (PaintProperties | LayoutProperties);

export function Property(props: PropertyProps): JSX.Element;
