import { initialState, Options, State } from './state';

const verbose = false;

export type ActionType =
  | { type: 'TOGGLE'; payload: Options }
  | {
      type: 'UPDATE';
      payload: {
        option: Options;
        key: keyof State[Options]['props'];
        value: string;
      };
    };

export const updateProp = <
  T extends Options,
  U extends keyof State[T]['props']
>({
  option,
  key,
  value
}: {
  option: T;
  key: U;
  value: State[T]['props'][U];
}) => ({ type: 'UPDATE', payload: { option, key, value } });

function reducer(state = initialState, action: ActionType) {
  verbose && console.log(action);
  switch (action.type) {
    case 'TOGGLE': {
      const prev = state[action.payload];
      return {
        ...state,
        [action.payload]: { ...prev, checked: !prev.checked }
      };
    }
    case 'UPDATE': {
      const { option, key, value } = action.payload;
      const prev = state[option];
      return {
        ...state,
        [option]: { ...prev, props: { ...prev.props, [key]: value } }
      };
    }
    default:
      return state;
  }
}

export default (...args: Parameters<typeof reducer>) => {
  const state = reducer(...args);
  verbose && console.log(state);
  return state;
};
export { initialState };
