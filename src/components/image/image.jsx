import { useLifeCycleWithCache, useParent } from '../../hooks';
import { buildLogger } from '../../utils';
import { useMap } from '../context';

/**
 * @param {import("./image").ImageProps} props
 * @returns {import("react").ReactElement}
 */
export function Image({ id, image, options }) {
  const { map } = useMap();
  const { parent } = useParent();
  buildLogger('image', id);
  const callback = (err, image) => {
    if (err) throw err;
    map.addImage(id, image, options);
  };
  const render = () => map.loadImage(image, callback);
  const remove = () => map.removeImage(id);
  // debugger
  const dependencies = [id, image, JSON.stringify(options)];
  useLifeCycleWithCache({ parent, render, remove }, dependencies);

  return null;
}
