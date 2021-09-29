import React, { Fragment, useRef, useEffect } from 'react';
import { withMap } from '../context';
import assert from '../../utils/assert';
import isEqual from '../../utils/deep-equal';
import { logger } from '../../utils/is-dev';
import cleanUp from '../../utils/clean-up';

type SourceProps = React.PropsWithChildren<
  {
    id: string;
    map: mapboxgl.Map;
  } & mapboxgl.AnySourceData
>;

const Source: React.FC<SourceProps> = ({ id, map, children, ...rest }) => {
  return <Fragment>{children}</Fragment>;
};

export default withMap<SourceProps>(Source);
// export default Source;
