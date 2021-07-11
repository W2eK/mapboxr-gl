import React, { Fragment, useRef, useEffect } from 'react';
// import { withMap } from '../context';
import useMap from '../context';
import assert from '../../utils/assert';
import isEqual from '../../utils/deep-equal';
import { logger } from '../../utils/is-dev';

type SourceProps = {
  id: string;
} & mapboxgl.GeoJSONSourceRaw;

const Source: React.FC<SourceProps> = ({ id, children, ...rest }) => {
  /* TODO: handle non geojson-source */
  const map = useMap();
  assert(rest.data !== undefined, 'Data prop is required for geojson-source');
  const prev = useRef(rest.data);
  const source = map.getSource(id);
  logger('source', id, 'rendering');
  if (source) {
    /* On Update */
    if (!isEqual(rest.data, prev.current)) {
      logger('source', id, 'updating');
      (source as mapboxgl.GeoJSONSource).setData(rest.data);
    }
  } else {
    /* On Mount */
    logger('source', id, 'adding');
    map.addSource(id, rest);
  }
  /* On Unmount */
  useEffect(
    () => () => {
      requestAnimationFrame(() => {
        logger('source', id, 'removing');
        map.removeSource(id);
      });
    },
    []
  );
  prev.current = rest.data;
  return <Fragment>{children}</Fragment>;
};

export default Source;
/* FIXME: union of types with mapboxgl.AnySourceData  don't work with withMap HOC */
// export default withMap<SourceProps>(Source);
