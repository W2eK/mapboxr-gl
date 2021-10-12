import React from 'react';
import Attribute from './attribute';

const Component = ({ id, checked, name, toggle, change, props, open, fold }) => {
  const attributes = Object.entries(props).map(([key, value]) => (
    <Attribute key={key} id={key} value={value} change={change} />
  ));
  return (
    <li>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={toggle}
      />
      <details open={open}>
        <summary>
          <label htmlFor={id}>
            <strong>{name}</strong>
          </label>
        </summary>
        <ul className="attributes">{attributes}</ul>
      </details>
    </li>
  );
};

export default Component;
