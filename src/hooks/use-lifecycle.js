import { useEffect, useRef } from 'react';
import { useForce } from './use-force';
import { useMap } from '../components/context';
import { getLogger } from '../utils';
import { useParent } from './use-parent';

/**
 * @param {object} callbacks
 * @param {function} callbacks.init
 * @param {function} callbacks.render
 * @param {function} callbacks.remove
 * @param {function} callbacks.clean
 * @param {array} renderDependencies
 * @param {array} removeDependencies
 */
export function useLifeCycle(
  { init, render, remove, clean },
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
    /* STATUS: */ l`initializing`;
    callback();
  };

  const buildRender = callback => () => {
    if (!loaded) return;
    /* STATUS: */ l`adding`;
    const remove = callback();
    if (typeof remove === 'function') return buildRemove(remove)();
  };

  const buildRemove = callback => () => () => {
    if (!loaded) return;
    const alive = parent.alive && parent.map.alive;
    /* STATUS: */ l`${alive ? 'removing' : 'deleted'}`;
    alive && callback();
  };

  const buildClean = callback => () => () => {
    const alive = parent.alive && parent.map.alive;
    /* STATUS: */ l`cleaning`;
    callback(alive);
  };

  init && useEffect(buildInit(init), [loaded]);
  render && useEffect(buildRender(render), renderDependencies);
  remove && useEffect(buildRemove(remove), removeDependencies);
  clean && useEffect(buildClean(clean), []);
}

/**
 * @param {object} callbacks
 * @param {function} callbacks.init
 * @param {function} callbacks.render
 * @param {function} callbacks.remove
 * @param {function} callbacks.clean
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

  const remove = () => {
    status.current.alive = false;
    callbacks.remove?.();
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
 * @param {array} renderDependencies
 */
export function useLifeCycleWithCache(callbacks, renderDependencies) {
  const cache = useRef(null);
  const init = () => (cache.current = callbacks.init?.());
  const render = () => callbacks.render?.(cache.current);
  const remove = () => callbacks.remove?.(cache.current);
  const clean = () => {
    callbacks.clean?.(cache.current);
    cache.current = null;
  };
  const removeDependencies = renderDependencies.slice(0, -1);
  useLifeCycle(
    { init, render, remove, clean },
    renderDependencies,
    removeDependencies
  );
}
