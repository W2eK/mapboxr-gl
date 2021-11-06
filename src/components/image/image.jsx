import { useLifeCycle } from '../../hooks';
import { buildLogger } from '../../utils';
import { useMap } from '../context';

/**
 * @param {import("./image").ImageProps} props
 * @returns {import("react").ReactElement}
 */
export function Image({ id, image, options, strict }) {
  const { map } = useMap();
  buildLogger('image', id);
  const callback = (err, image) => {
    if (err) throw err;
    map.addImage(id, image, options);
  };
  const render = () => map.loadImage(image, callback);
  const remove = alive => alive && map.removeImage(id);

  const dependencies = [id, image, options];
  useLifeCycle({ render, remove, strict }, dependencies);

  return null;
}
