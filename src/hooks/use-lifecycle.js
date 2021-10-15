import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForce } from './use-force';
import { useMap } from '../components/context';
import { getLogger } from '../utils';

export function useLifeCycleWithStatus(
  { parent, render, remove, clean },
  dependencies
) {
  const { loaded } = useMap();
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
  }, [loaded, ...dependencies]);
  return status.current;
}

export function useLifeCycleWithCache(
  { parent, init, render, remove },
  dependencies
) {
  const { loaded } = useMap();
  const cache = useRef(null);
  const l = getLogger();

  useEffect(() => {
    if (!loaded) return;
    /* STATUS: */ l`${cache.current === null ? 'adding' : 'updating'}`;
    if (cache.current === null) cache.current = init();
    render(cache.current);
  }, [loaded, ...dependencies]);

  useEffect(() => {
    return () => {
      const alive = parent.alive && parent.map.alive;
      /* STATUS: */ l`${alive ? 'removing' : 'deleted'}`;
      alive && remove && remove(cache.current);
      cache.current = null;
    };
  }, dependencies.slice(0, -1));
}
