import {
  TerrainSpecification,
  Fog as MapboxFog,
  Light as MapboxLight
} from 'mapbox-gl';

import { NormalizeProps } from '../../utils/utils';

type TerrainProps = TerrainSpecification;
export function Terrain(props: TerrainProps): JSX.Element;

type FogProps = NormalizeProps<MapboxFog>;
export function Fog(props: FogProps): JSX.Element;

type LightProps = NormalizeProps<MapboxLight>;
export function Light(props: FogProps): JSX.Element;
