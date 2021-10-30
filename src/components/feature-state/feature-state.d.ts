type FeatureStateProps<
  T extends string | number | { [key: string]: U } | U[],
  U extends { [key: string | number]: unknown } | boolean | number | string
> = {
  state: T;
  getChanges?: (a: T, b: T) => [string | number, U][];
  source?: string;
  sourceLayer?: string;
};

export function FeatureState<
  T extends string | number | { [key: string]: U } | U[],
  U extends { [key: string | number]: unknown } | boolean | number | string
>(props: FeatureStateProps<T, U>): JSX.Element;
