import React from 'react';

const Attribute = ({ id, value, change }) => {
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
