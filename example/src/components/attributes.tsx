import React, { FC } from 'react';
import { ActionType, updateProp } from '../state/reducer';
import { Options, State } from '../state/state';

type Props = {
  category: Options;
  values: State[Options]['props'];
  dispatch: React.Dispatch<ActionType>;
};

const Attributes: FC<Props> = ({ values, dispatch, category }) => {
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      // @ts-ignore
      updateProp({
        option: category,
        key: target.name as keyof Props['values'],
        value: target.value
      })
    );
  const items = Object.entries(values).map(([key, value]) => (
    <li key={key}>
      <label className="attribute">
        <em>{key}{' '}</em>
        <span>
          {' '}
          ={' '}
          <input
            name={key}
            onChange={onChange}
            type="text"
            value={value}
            placeholder="undefined"
          />
        </span>
      </label>
    </li>
  ));
  return <ul>{items}</ul>;
};

export default Attributes;
