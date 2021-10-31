import React, { cloneElement } from 'react';
import { useMap } from '../context';
import {
  useId,
  useHandlers,
  useLifeCycleWithStatus,
  useParent,
  ParentProvider
  // useAssert
} from '../../hooks';
import { withListeners } from '../../hoc';
import { buildLogger, dependenciesBuilder } from '../../utils';

import Cursor from './cursor';

const getDependencies = (() => {
  const NUMBER_OF_PROPS = 13;
  const NUMBER_OF_HANDLERS = 3;
  return dependenciesBuilder(NUMBER_OF_PROPS - NUMBER_OF_HANDLERS);
})();

/**
 * @param {import("./layer").LayerProps} props
 * @returns {import("react").ReactElement}
 */
function Layer({
  children,
  id,
  master,
  replaceMaster,
  restoreMaster,
  cursor,
  beforeId,
  listeners,
  ...props
}) {
  const type = !master
    ? 'new_layer'
    : replaceMaster
    ? 'replace_master'
    : 'copy_master';

  id = useId(replaceMaster && !id ? master : id, master || 'layer');
  const { map } = useMap();

  // prettier-ignore
  const {parent: {map: { cache } },
  source: injectedSourceName } = useParent();

  if (props.sourceLayer !== undefined) {
    props['source-layer'] = props.sourceLayer;
    delete props.sourceLayer;
  }

  const l = buildLogger('layer', id, type);

  const handlers = {
    minzoom: value => map.setLayerZoomRange(id, value),
    maxzoom: value => map.setLayerZoomRange(id, null, value),
    filter: value => map.setFilter(id, value),
    beforeId: value => {
      const predecessors = cache.register(id, beforeId);
      const position = cache.position(id);
      map.moveLayer(id, position);
      predecessors
        .slice(1)
        .forEach((name, i) => map.moveLayer(name, predecessors[i]));
    }
  };
  const rest = useHandlers({ handlers, props: { ...props, beforeId } });

  const init = () => {
    // if (type === 'replace_master') {
    //   cache.register(id, beforeId || master);
    //   if (cache.alive(master)) {
    //     map.removeLayer(master);
    //     cache.kill(master);
    //   }
    // } else {
    //   cache.register(id, beforeId);
    // }
  };
  const render = () => {
    const predecessors = cache.register(id, beforeId);
    const position = cache.position(id);
    if (type === 'new_layer') {
      map.addLayer({ source: injectedSourceName, ...props, id }, position);
    } else {
      l`redraw`;
      const cached = cache.data(master);
      const paint = { ...cached.paint, ...props.paint };
      const layout = { ...cached.layout, ...props.layout };
      const style = { ...cached, ...props, paint, layout, id };
      if (injectedSourceName) style.source = injectedSourceName;
      map.addLayer(style, position);
    }
    predecessors
      .slice(1)
      .forEach((name, i) => map.moveLayer(name, predecessors[i]));
  };
  const remove = alive => {
    alive && map.removeLayer(id);
    cache.kill(id, true);
  };
  const clean = alive => {
    if (alive && type === 'replace_master' && restoreMaster) {
      l`restore`;
      const style = cache.get(master).data;
      cache.revive(master);
      const beforeId = cache.after(master);
      map.addLayer(style, beforeId);
    }
    cache.kill(id, true);
  };
  const dependencies = getDependencies(rest, restoreMaster);
  const status = useLifeCycleWithStatus(
    { render, init, remove, clean },
    dependencies
  );
  // useAssert({ id, hasMaster: !!master, replaceMaster, restoreMaster });
  return (
    status.alive && (
      <ParentProvider value={{ layer: id, parent: status }}>
        {cursor && <Cursor layer={id} cursor={cursor} />}
        {listeners.map(listener => cloneElement(listener, { layer: id }))}
        {children}
      </ParentProvider>
    )
  );
}
const Wrapped = withListeners(Layer);
export { Wrapped as Layer };
