type FeatureStateProps<
  T extends Record<string | number, U> | string | number | null,
  U extends Record<string, boolean | number | string>
> = {
  state: T;
  compareState?: (a: T, b: T) => [string | number, U][];
  source?: string;
  sourceLayer?: string;
};

export function FeatureState<
  T extends Record<string | number, U> | string | number | null,
  U extends Record<string, boolean | number | string>
>(props: FeatureStateProps<T, U>): JSX.Element;
