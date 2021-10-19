type FeatureStateProps<
  T extends { [key: string]: U } | U[],
  U extends { [key: string]: unknown }
> = {
  state: T;
  getChanges?: (a: T, b: T) => [string, U][];
  source?: string;
  sourceLayer?: string;
};

export function FeatureState<
  T extends { [key: string]: U } | U[],
  U extends { [key: string]: unknown }
>(props: FeatureStateProps<T, U>): JSX.Element;
