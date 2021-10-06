import React, { Fragment, useCallback } from 'react';
import { Listener, useMap } from '../..';

function Cursor({ cursor, layer }) {
  const { map } = useMap();

  cursor = cursor === true ? 'pointer' : cursor;

  const changeCursor = useCallback(
    () => (map.getCanvas().style.cursor = cursor),
    [map, cursor]
  );

  const resetCursor = useCallback(
    () => (map.getCanvas().style.cursor = ''),
    [map, cursor]
  );
  
  return (
    <Fragment>
      <Listener
        type="on"
        event="mouseenter"
        layer={layer}
        handler={changeCursor}
      />
      <Listener
        type="on"
        event="mouseleave"
        layer={layer}
        handler={resetCursor}
      />
    </Fragment>
  );
}

export default Cursor;
