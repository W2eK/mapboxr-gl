import { useEffect } from 'react';
// import { withMap } from '../context';
import useMap from '../context';
import { logger } from '../../utils/is-dev';

const Layer: React.FC<mapboxgl.AnyLayer> = ({ id, ...rest }) => {
  const map = useMap();
  // logger.group(``);
  /* On Mount */
  logger('layer', id, 'rendering');
  useEffect(() => {
    logger('layer', id, 'adding');
    map.addLayer({ id, ...rest });
    /* On Remove */
    return () => {
      logger('layer', id, 'removing');
      map.removeLayer(id);
    };
  }, []);

  /* TODO: On Master */
  // 1. Copy Style from master
  // 2. Apply overrides
  // 3. Keep in position

  /* TODO: On Update */
  // UPDATE PROPERTIES SEPARATELY?
  // 1. Filter property
  // 2. Zoom range
  // 3. Paint properties
  // 4. Layour properties

  /* TODO: On Unmount */
  // a. Remove layer
  // b. Remove layer, keep position
  // c. Hide layer, keep position

  /* TODO: Add Context to Layer-ID */
  // logger.groupEnd();
  return null;
};

export default Layer;
/* FIXME: union of types with mapboxgl.AnyLayer  don't work with withMap HOC */
// export default withMap<LayerProps>(Layer);
