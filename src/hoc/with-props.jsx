import React from 'react';
import withDisplayName from './with-name';

export default function withProps(WrappedComponent, handlers) {
  const keys = new Set(Object.keys(handlers));
  function WrappedWithProps(props) {
    const injectedProps = Object.entries(props).reduce(
      (obj, [key, value]) => {
        if (keys.has(key)) {
          obj.dynamic[key] = value;
        } else {
          obj[key] = value;
        }
        return obj;
      },
      { dynamic: {} }
    );
    return <WrappedComponent {...injectedProps} />;
  }
  return withDisplayName(WrappedWithProps, WrappedComponent);
}
