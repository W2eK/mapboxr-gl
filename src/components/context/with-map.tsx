import React from 'react';
import useMap from './context';

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

export default withMap;
