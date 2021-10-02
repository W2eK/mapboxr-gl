import { createContext, useContext } from 'react';

const StoreContext = createContext({ state: null, dispatch: null });

export default StoreContext.Provider;

export const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};
