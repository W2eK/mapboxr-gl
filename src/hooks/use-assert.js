import { useEffect, useRef } from 'react';

export function useAssert(dependencies) {
  const initial = useRef(null);
  useEffect(() => {
    if (initial.current) {
      const messages = [];
      Object.entries(dependencies).forEach(([key, value]) => {
        const prev = initial.current[key];
        if (prev !== value) {
          let message =
            `\n${key.toUpperCase()} PROPERTY in this component cannot  be changed:` +
            `    ${prev}    →    ${value}`;
          if (key === 'id')
            message +=
              `\nIf ID PROPERTY was not changed intentionally, but after changes in component tree, ` +
              `you should probably add the KEY PROPERTY to help React figure out ` +
              `which component to unmount and which to keep.`;
          messages.push(message);
        }
      });
      throw new Error(messages.join(''));
    } else {
      initial.current = dependencies;
    }
  }, Object.values(dependencies));
}
