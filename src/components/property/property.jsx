import { useEffect } from 'react';
import { useMap } from '../../hoc/with-map';
import { logger } from '../../utils';

function Property({ id, type, value, layer, parent }) {
  const { map, loaded } = useMap();
  logger`PROPERTY: ${id} is rendering`;

  useEffect(() => {
    if (!loaded) return;
    logger`PROPERTY: ${id} is adding`;
    map.setPaintProperty(layer, id, value);
    return () => {
      if (parent.alive && parent.map.alive) {
        logger`PROPERTY: ${id} is removing`;
        map.setPaintProperty(layer, id, 'green');
      } else {
        logger`PROPERTY: ${id} is deleted`;
      }
    };
  }, [loaded, parent, id]);
  return null;
}

export default Property;
