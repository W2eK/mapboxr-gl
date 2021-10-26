import {
  TerrainSpecification,
  Fog as MapboxFog,
  Light as MapboxLight
} from 'mapbox-gl';

type NormalizeProps<T extends Record<string, any>> = {
  [P in keyof T as ToCamelCase<P>]: T[P];
};

type ToCamelCase<T extends string | number | symbol> =
  T extends `${infer R}-${infer U}` ? `${R}${Capitalize<ToCamelCase<U>>}` : T;

type TerrainProps = TerrainSpecification;
export function Terrain(props: TerrainProps): JSX.Element;

type FogProps = NormalizeProps<MapboxFog>;
export function Fog(props: FogProps): JSX.Element;

type LightProps = NormalizeProps<MapboxLight>;
export function Light(props: FogProps): JSX.Element;
