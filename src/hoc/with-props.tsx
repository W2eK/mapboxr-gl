import React, { ComponentType, FC } from 'react';

function withProps<
  T extends { dynamic: { [P in keyof U]?: any } },
  U extends { [key: string]: (...args: any) => any }
>(WrappedComponent: FC<T>, handler: U) {
  const keys = new Set(Object.keys(handler));
  return function WrappedWithProps(
    props: Omit<T, 'dynamic'> & T['dynamic']
  ) {
    const injectedProps = Object.entries(props).reduce(
      (obj, [key, value]) => {
        if (keys.has(key)) {
          obj.dynamic[key as keyof U] = value;
        } else {
          // @ts-ignore
          obj[key] = value;
        }
        return obj;
      },
      { dynamic: {} } as T
    );
    return <WrappedComponent {...injectedProps} />;
  };
}

export default withProps;
