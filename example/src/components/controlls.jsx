import React from 'react';
import { changeAttribute, toggleComponent } from '../store/actions';
import { useStore } from '../store/context';
import Component from './component';

const Controlls = () => {
  const { state, dispatch } = useStore();
  const components = Object.entries(state).map(([key, value]) => {
    const toggle = () => dispatch(toggleComponent(key));
    const change = ({ target }) =>
      dispatch(changeAttribute(key, target.name, target.value));
    return (
      <Component
        key={key}
        id={key}
        {...value}
        toggle={toggle}
        change={change}
      />
    );
  });
  return (
    <>
      <h3>Components</h3>
      <ul className="components">{components}</ul>
    </>
  );
};

export default Controlls;
