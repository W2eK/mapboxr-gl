import React from 'react';
import Attribute from './attribute';

const Component = ({ id, checked, name, toggle, change, props }) => {
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
      <div>
        <span>{'<'}</span>
        <label htmlFor={id}>
          <strong>{name}</strong>
        </label>
        <ul className="attributes">{attributes}</ul>
        <span>{'/>'}</span>
      </div>
    </li>
  );
};

export default Component;
