export enum Options {
  MAP = 'map',
  SOURCE = 'source',
  LAYER = 'layer'
}

export type Item = {
  checked: boolean;
  label: string;
};

export type State = {
  [key in Options]: Item;
};

export type ActionType = { type: 'TOGGLE'; payload: Options };

const initialState: State = {
  map: { checked: true, label: 'Mapboxr-GL' },
  source: { checked: true, label: 'Source' },
  layer: { checked: true, label: 'Circle Layer' }
};

function reducer(state: State, { type, payload }: ActionType) {
  switch (type) {
    case 'TOGGLE':
      const prev = state[payload];
      return { ...state, [payload]: { ...prev, checked: !prev.checked } };
    default:
      return state;
  }
}

export default reducer;
export { initialState };
