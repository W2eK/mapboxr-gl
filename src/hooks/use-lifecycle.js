import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForce } from './use-force';
import { useMap } from '../components/context';
import { getLogger } from '../utils';
import { useParent } from '.';

export function useLifeCycle({ render, remove, clean }, dependencies) {
  const { loaded } = useMap();
  const { parent } = useParent();
  dependencies.push(loaded, parent);
  const l = getLogger();
  const forceUpdate = useForce();
  useEffect(() => {
    if (!loaded) return;
    /* STATUS: */ l`adding`;
    render();
    forceUpdate();
    return () => {
      const alive = parent.alive && parent.map.alive;
      /* STATUS: */ l`${alive ? 'removing' : 'deleted'}`;
      alive && remove();
      clean && clean();
    };
  }, dependencies);
}

export function useLifeCycleWithStatus(
  { render, remove, clean },
  dependencies
) {
  const { loaded } = useMap();
  const { parent } = useParent();
  dependencies.push(loaded, parent);
  const l = getLogger();
  const status = useRef({ alive: false });
  const forceUpdate = useForce();
  useEffect(() => {
    if (!loaded) return;
    /* STATUS: */ l`adding`;
    status.current = {
      alive: true,
      map: parent.map
    };
    const callback = render();
    remove = remove || callback;
    forceUpdate();
    return () => {
      const alive = parent.alive && parent.map.alive;
      /* STATUS: */ l`${alive ? 'removing' : 'deleted'}`;
      alive && remove();
      clean && clean();
      status.current.alive = false;
    };
  }, dependencies);
  return status.current;
}

export function useLifeCycleWithCache(
  { init, render, remove },
  renderDependencies,
  removeDependencies = renderDependencies.slice(0, -1)
) {
  const { loaded } = useMap();
  const { parent } = useParent();
  const cache = useRef(null);
  const l = getLogger();
  renderDependencies.push(loaded, parent);
  useEffect(() => {
    if (!loaded) return;
    /* STATUS: */ l`${cache.current === null ? 'adding' : 'updating'}`;
    if (cache.current === null) cache.current = init?.() || null;
    render(cache.current);
  }, renderDependencies);

  useEffect(() => {
    return () => {
      const alive = parent.alive && parent.map.alive;
      /* STATUS: */ l`${alive ? 'removing' : 'deleted'}`;
      alive && remove && remove(cache.current);
      cache.current = null;
    };
  }, removeDependencies);
}
