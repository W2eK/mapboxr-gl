import { AnyLayout, AnyPaint } from 'mapbox-gl';

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never;

type BuildTypes<T extends 'layout' | 'paint', U> = {
  [P in keyof U]: { type: T; id: P; value: U[P] };
};

type ValueOf<T> = T[keyof T];

type PaintProperties = ValueOf<
  BuildTypes<'paint', UnionToIntersection<AnyPaint>>
>;
type LayoutProperties = ValueOf<
  BuildTypes<'layout', UnionToIntersection<AnyLayout>>
>;

type PropertyProps = {
  layer?: string;
} & (PaintProperties | LayoutProperties);

export function Property(props: PropertyProps): JSX.Element;
