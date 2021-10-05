import React from 'react';

const Attribute = ({ id, value, change }) => {
  value =
    typeof value === 'object'
      ? JSON.stringify(value)
      : typeof value === 'function'
      ? value.toString()
      : value;
  return (
    <li>
      <label>
        <em>{id} </em>
        <span>
          {' '}
          ={' '}
          <input
            name={id}
            onChange={change}
            type="text"
            value={value}
            placeholder="undefined"
          />
        </span>
      </label>
    </li>
  );
};

export default Attribute;
