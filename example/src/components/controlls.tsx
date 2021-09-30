import React from 'react';
import { ActionType, updateProp } from '../state/reducer';
import { State, Options } from '../state/state';
import Attributes from './attributes';

type Props = {
  state: State;
  dispatch: React.Dispatch<ActionType>;
};

function Controlls({ state, dispatch }: Props) {
  const checkboxes = (Object.keys(state) as Options[]).map(key => {
    const { checked, label, props } = state[key];
    const toggle = () => dispatch({ type: 'TOGGLE', payload: key });
    return (
      <li key={key}>
        <input
          type="checkbox"
          id={key}
          name={key}
          checked={checked}
          onChange={toggle}
        />
        <div>
          <span>{'<'}</span>
          <label htmlFor={key}>{label}</label>
          <Attributes values={props} category={key} dispatch={dispatch} />
          <span>{'/>'}</span>
        </div>
      </li>
    );
  });

  return (
    <div className="controlls">
      <h3>Components</h3>
      <ul className="components">{checkboxes}</ul>
    </div>
  );
}

export default Controlls;
