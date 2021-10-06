import React, {
  cloneElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { useMap } from '../../hoc/with-map';
import { useForce } from '../../hooks/use-force';
import {
  cleanUp,
  cloneChildren,
  getDependencies,
  logger,
  normalizeChildren
} from '../../utils';

function Layer({ children = null, source, parent, id, ...props }) {
  const state = useRef({ alive: false });
  const [initialized, setInitialized] = useState(false);
  const { map, loaded } = useMap();
  const forceUpdate = useForce();
  logger`LAYER: ${id} is rendering`;

  useEffect(() => {
    if (!loaded) return;
    logger`LAYER: ${id} is adding`;
    map.addLayer({ id, source, ...props });
    setInitialized(true);
    state.current = {
      alive: true,
      map: parent.map
    };
    return () => {
      if (parent.alive && parent.map.alive) {
        logger`LAYER: ${id} is removing`;
        map.removeLayer(id);
      } else {
        logger`LAYER: ${id} is deleted`;
      }
      state.current.alive = false;
      setInitialized(false);
      forceUpdate();
    };
  }, [loaded, parent, id]);
  /*
  const { map, loaded } = useMap();
  const initialized = useRef(loaded);

  useEffect(() => {
    // if (!map.loaded()) return;
    if (!initialized.current) return;
    logger`LAYER: ${id} is adding`;
    map.addLayer({ id, ...props });
    return cleanUp(() => {
      logger`LAYER: ${id} is removing`;
      map.removeLayer(id);
    });
  }, [id, getDependencies(props)]);
  */
  //  console.log(self)

  return (
    initialized &&
    cloneChildren(children, { layer: id, parent: state.current })
  );
}

export default Layer;
