import { cloneElement } from 'react';

export const normalizeChildren = (children, callback) => {
  return (
    children &&
    (Array.isArray(children) ? children : [children])
      .filter(Boolean)
      .map(callback)
  );
};

export const cloneChildren = (children, props) => {
  return normalizeChildren(children, (child, i) =>
    cloneElement(child, { key: child.key || i, ...props })
  );
};
