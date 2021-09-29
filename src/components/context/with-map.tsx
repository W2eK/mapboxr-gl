import React from 'react';
import useMap from './context';

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

function withMap<T>(Component: React.FC<T>) {
  // type Props = Omit<T, 'map'>;
  // type X = Exclude<T, 'map'>;
  const ComponentWithMap = (props: DistributiveOmit<T, 'map'>) => {
    const map = useMap();
    // @ts-ignore
    return <Component {...props} map={map} />;
  };
  return ComponentWithMap;
}

/*
interface WithMap {
  map: mapboxgl.Map;
}

const withMap = <T extends WithMap>(
  WrappedComponent: React.ComponentType<T>
) => {
  const ComponentWithMap = (props: Omit<T, keyof WithMap>) => {
    const map = useMap();
    return <WrappedComponent {...(props as T)} map={map} />;
  };
  return ComponentWithMap;
};
// */
export default withMap;
