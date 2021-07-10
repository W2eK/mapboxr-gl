import { useRef, useEffect } from 'react';
import { withMap } from '../context';
import assert from '../../utils/assert';
import isEqual from '../../utils/deep-equal';

/*
  TODO:
  1. add source and update source not for geojson sources
  2. mapboxgl.AnySourceData don't work with withMap HOC
*/
type SourceProps = {
  id: string;
  map: mapboxgl.Map;
} & mapboxgl.GeoJSONSourceRaw;

const Source: React.FC<SourceProps> = ({ id, map, children, ...rest }) => {
  const prev = useRef(rest.data);
  assert(rest.data !== undefined, 'Data prop is required for geojson-source');
  const source = map.getSource(id);
  /* On Update */
  if (source) {
    if (!isEqual(rest.data, prev.current))
      (source as mapboxgl.GeoJSONSource).setData(rest.data);
  } else {
    map.addSource(id, rest);
  }
  /* On Unmount */
  // prettier-ignore
  useEffect(() => () => { map.removeSource(id) }, []);
  prev.current = rest.data;
  return null;
};

export default withMap<SourceProps>(Source);
