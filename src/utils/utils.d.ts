// * Type Conversions
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type UnionToIntersection<T> = (
  T extends any ? (x: T) => any : never
) extends (x: infer R) => any
  ? R
  : never;

export type ValueOf<T> = T[keyof T];

// * Normalization
export type ToCamelCase<T extends string | number | symbol> =
  T extends `${infer R}-${infer U}` ? `${R}${Capitalize<ToCamelCase<U>>}` : T;

export type NormalizeProps<T extends Record<string, any>> = {
  [P in keyof T as ToCamelCase<P>]: T[P];
};

export type NormalizeArray<T> = T | T[];

// * Type Builders
export type BuildHandlers<
  T extends Record<string, any>,
  U extends 'on' | 'once'
> = {
  [P in keyof T as `${U}${string & P}`]?: (
    event: T[P]
  ) => void | ((event: T[P]) => void)[];
};

// * Common Types
type StrictEqualityCheck = boolean;
export type EqualityCheck = {
  strict?: StrictEqualityCheck;
};
