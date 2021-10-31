import { useLifeCycle, useParent } from '../../hooks';
import { buildLogger, dependenciesBuilder, normalize } from '../../utils';
import { useMap } from '../context';

/**
 * @param {import("./ambient").TerrainProps} props
 * @returns {import("react").ReactElement}
 */
export function Terrain({ ...props }) {
  const { map } = useMap();
  const { source } = useParent();
  if (source) props.source = source;
  buildLogger('terrain', props.source);
  const dependencies = dependenciesBuilder(2)(props);
  const render = () => map.setTerrain(props);
  const clean = alive => alive && map.setTerrain();
  useLifeCycle({ render, clean }, dependencies);
  return null;
}

/**
 * @param {import("./ambient").FogProps} props
 * @returns {import("react").ReactElement}
 */
export function Fog(props = {}) {
  buildLogger('fog');
  props = normalize(props);
  const { map } = useMap();
  const dependencies = dependenciesBuilder(3)(props);
  const render = () => map.setFog(props);
  const clean = alive => alive && map.setFog();
  useLifeCycle({ render, clean }, dependencies);
  return null;
}

/**
 * @param {import("./ambient").LightProps} props
 * @returns {import("react").ReactElement}
 */
export function Light(props = {}) {
  buildLogger('light');
  props = normalize(props);
  const { map } = useMap();
  const dependencies = dependenciesBuilder(7)(props);
  const render =() =>  map.setLight(props);
  const clean = alive => alive && map.setLight();
  useLifeCycle({ render, clean }, dependencies);
  return null;
}
