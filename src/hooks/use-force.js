import { useCallback, useState } from 'react';

export const useForce = () => {
  const [, updateState] = useState();
  return useCallback(() => updateState({}), []);
};
