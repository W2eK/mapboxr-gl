import React from 'react';
import { State, ActionType, Options, Item } from './reducer';

type Props = {
  state: State;
  dispatch: React.Dispatch<ActionType>;
};

function Controlls({ state, dispatch }: Props) {
  const checkboxes = Object.keys(state).map(key => {
    const { checked, label } = state[key] as Item;
    const onChange = () =>
      dispatch({ type: 'TOGGLE', payload: key as Options });
    return (
      <li key={key}>
        <input
          type="checkbox"
          id={key}
          name={key}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={key}>{label}</label>
      </li>
    );
  });
  return (
    <div className="controlls">
      <h3>Components</h3>
      <ul>{checkboxes}</ul>
    </div>
  );
}

export default Controlls;
