export const toggleComponent = payload => ({ type: 'TOGGLE', payload });

// prettier-ignore
export const changeAttribute = (component, key, value) =>
  ({ type: 'CHANGE', payload: { key, value, component } });
