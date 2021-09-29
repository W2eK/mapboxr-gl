import { useEffect } from 'react';
// import { withMap } from '../context';
import { withMap } from '../context';
import { logger } from '../../utils/is-dev';
import cleanUp from '../../utils/clean-up';
import type { StandardLonghandProperties } from 'csstype';
import mapboxgl from 'mapbox-gl';

type LayerProps = {
  // id: string;
  map: mapboxgl.Map;
  // source: string;
  beforeId?: string;
  cursor?: boolean | StandardLonghandProperties['cursor'];
  'source-layer': string;
} & mapboxgl.AnyLayer;


const Layer: React.FC<LayerProps> = props => {
  const {
    children,
    // id,
    map,
    // beforeId,
    cursor,
    // listeners,
    // 'source-layer': sourceLayer,
    ...rest
  } = props;
  // function Layer({ id, map, ...rest }: Layer) {
  // const map = useMap();

  /* On Mount */
  // logger('layer', id, 'rendering');
  // useEffect(() => {
  //   logger('layer', id, 'adding');
  //   map.addLayer({ id, ...rest });
  //   /* On Remove */
  //   return cleanUp(() => map.removeLayer(id), 'layer', id);
  // }, []);

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

  /* TODO: Inject layer name */
  return null;
};

export default withMap<LayerProps>(Layer);
