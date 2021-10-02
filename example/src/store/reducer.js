const debug = false;

function reducer(state, { type, payload }) {
  debug && console.log({ type, payload });
  switch (type) {
    case 'TOGGLE': {
      const prev = state[payload];
      return { ...state, [payload]: { ...prev, checked: !prev.checked } };
    }
    case 'CHANGE': {
      const { key, value, component } = payload;
      const prev = state[component];
      return {
        ...state,
        [component]: {
          ...prev,
          props: { ...prev.props, [key]: value }
        }
      };
    }
    default:
      return state;
  }
}

export default (...args) => {
  const state = reducer(...args);
  debug && console.log(state);
  return state;
};
