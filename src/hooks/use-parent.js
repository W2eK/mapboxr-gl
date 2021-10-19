import { createContext, useContext } from 'react';

const ParentContext = createContext(null);
ParentContext.displayName = 'ParentContext'

export const ParentProvider = ParentContext.Provider;

export function useParent() {
  return useContext(ParentContext);
}
