import React from 'react';

export default function withProps(WrappedComponent, handlers) {
  const keys = new Set(Object.keys(handlers));
  return function WrappedWithProps(props) {
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
  };
}
