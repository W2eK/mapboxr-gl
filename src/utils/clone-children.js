import { Children, cloneElement } from 'react';

export const normalizeChildren = (children, callback) => {
  if (!children) return null;
  const normalized = (Array.isArray(children) ? children : [children]).filter(
    Boolean
  );
  return Children.map(normalized, callback);
};

export const cloneChildren = (children, props) => {
  if (children && !Array.isArray(children))
    return cloneElement(children, props);
  return normalizeChildren(children, child =>
    cloneElement(child, { ...props })
  );
};
