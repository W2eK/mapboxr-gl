import { useEffect, useRef } from 'react';
import { useForce } from './use-force';
import { useMap } from '../components/context';
import { getLogger } from '../utils';
import { useParent } from './use-parent';
import { useDeepEffect } from './use-deep';

/**
 * @param {object} callbacks
 * @param {function} callbacks.init
 * @param {function} callbacks.render
 * @param {function} callbacks.remove
 * @param {function} callbacks.clean
 * @param {boolean} callbacks.strict
 * @param {array} renderDependencies
 * @param {array} removeDependencies
 */
export function useLifeCycle(
  { init, render, remove, clean, strict },
  renderDependencies,
  removeDependencies = renderDependencies
) {
  const { parent } = useParent();
  const { loaded } = useMap();
  const l = getLogger();
  renderDependencies.push(parent, loaded);
  if (renderDependencies !== removeDependencies)
    removeDependencies.push(parent);

  const buildInit = callback => () => {
    if (!loaded) return;
    /* STATUS: */ l`init`;
    callback();
  };

  const buildRender = callback => () => {
    if (!loaded) return;
    /* STATUS: */ l`render`;
    const remove = callback();
    if (typeof remove === 'function') return buildRemove(remove)();
  };

  const buildRemove = callback => () => () => {
    if (!loaded) return;
    const alive = parent.alive && parent.map.alive;
    /* STATUS: */ l`${alive ? 'remove' : 'deleted'}`;
    callback(alive);
  };

  const buildClean = callback => () => () => {
    const alive = parent.alive && parent.map.alive;
    /* STATUS: */ l`clean`;
    callback(alive);
  };

  init && useEffect(buildInit(init), [loaded]);
  render && useDeepEffect(buildRender(render), renderDependencies, strict);
  remove && useDeepEffect(buildRemove(remove), removeDependencies, strict);
  clean && useEffect(buildClean(clean), []);
}

/**
 * @param {object} callbacks
 * @param {function} callbacks.init
 * @param {function} callbacks.render
 * @param {function} callbacks.remove
 * @param {function} callbacks.clean
 * @param {boolean} callbacks.strict
 * @param {array} dependencies
 * @returns {import('./use-parent').Parent}
 */
export function useLifeCycleWithStatus(callbacks, dependencies) {
  const { parent } = useParent();
  const status = useRef({ alive: false });
  const forceUpdate = useForce();

  const render = () => {
    status.current = {
      alive: true,
      map: parent.map
    };
    forceUpdate();
    return callbacks.render();
  };

  const remove = alive => {
    status.current.alive = false;
    callbacks.remove?.(alive);
  };
  const clean = alive => {
    status.current.alive = false;
    callbacks.clean?.(alive);
  };

  useLifeCycle({ ...callbacks, render, remove, clean }, dependencies);
  return status.current;
}

// const

/**
 * @param {object} callbacks
 * @param {function} callbacks.init
 * @param {function} callbacks.render
 * @param {function} callbacks.remove
 * @param {function} callbacks.clean
 * @param {boolean} callbacks.strict
 * @param {array} renderDependencies
 */
export function useLifeCycleWithCache(callbacks, renderDependencies) {
  const cache = useRef(null);
  const strict = callbacks.strict;
  const init = () => (cache.current = callbacks.init?.());
  const render = () => callbacks.render?.(cache.current);
  const remove = alive => callbacks.remove?.(cache.current, alive);
  const clean = () => {
    callbacks.clean?.(cache.current);
    cache.current = null;
  };
  const removeDependencies = renderDependencies.slice(0, -1);
  useLifeCycle(
    { init, render, remove, clean, strict },
    renderDependencies,
    removeDependencies
  );
}
