import { useEffect, useRef } from 'react';
import { useForce } from './use-force';
import { useMap } from '../components/context';
import { getLogger } from '../utils';
import { useParent } from '.';

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
    if (!loaded) return;
    /* STATUS: */ l`cleaning`;
    callback();
  };

  init && useEffect(buildInit(init), [loaded]);
  render && useEffect(buildRender(render), renderDependencies);
  remove && useEffect(buildRemove(remove), removeDependencies);
  clean && useEffect(buildClean(clean), []);
}

export function useLifeCycleWithStatus(callbacks, dependencies) {
  const { parent } = useParent();
  const status = useRef({ alive: false });
  const forceUpdate = useForce();

  const buildRemove = callback => {
    if (typeof callback === 'function') {
      return () => {
        callback();
        status.current.alive = false;
      };
    }
  };

  const render = () => {
    status.current = {
      alive: true,
      map: parent.map
    };
    forceUpdate();
    const callback = callbacks.render();
    return buildRemove(callback);
  };

  const remove = buildRemove(callbacks.remove);

  useLifeCycle({ ...callbacks, render, remove }, dependencies);
  return status.current;
}

export function useLifeCycleWithCache(callbacks, renderDependencies) {
  const cache = useRef(null);
  const init = () => (cache.current = callbacks.init());
  const render = () => callbacks.render(cache.current);
  const remove = () => callbacks.remove(cache.current);
  const clean = () => {
    cache.current = null;
    callbacks.clean?.();
  };
  // TODO: Possible bug
  const removeDependencies = renderDependencies.slice(0, -1);
  useLifeCycle(
    { init, render, remove, clean },
    renderDependencies,
    removeDependencies
  );
}
