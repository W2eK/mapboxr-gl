import { AnySourceImpl, GeoJSONSource, Map, Source, VideoSource } from 'mapbox-gl';
import {
  AnyFunction,
  FilterKeyByValueType,
  KeysMatching,
  KeysOfUnion
} from '../../interfaces/utils';
import { getEntries } from '../utils';

type HandlerFn = (arg: any) => void;
type Handlers = Record<string, string | HandlerFn>;
// export const buildHandlers = (handlers: Handlers) => {};

// !MAPBOX.D.TS BUG: showOverdraw missed in mapbox types
export type DebugPropsKeys = KeysMatching<Map, boolean> | 'showOverdraw';

export const debugPropsKeys: (DebugPropsKeys | 'padding')[] = [
  'padding',
  'showCollisionBoxes',
  'showOverdraw',
  'showPadding',
  'showTerrainWireframe',
  'showTileBoundaries'
];

export const buildToggler = (key: DebugPropsKeys) =>
  function (this: Map, state?: boolean) {
    this[key as Exclude<DebugPropsKeys, 'showOverdraw'>] = !!state;
  };

type SwitchPropKeys = KeysMatching<Map, { enable(): void; disable(): void }>;

export const buildSwitcher = (key: SwitchPropKeys) =>
  function (this: Map, state: boolean) {
    this[key][state ? 'enable' : 'disable']();
  };

export const buildHandlers = <T extends Record<string, string | AnyFunction>>(
  handlers: T
): Record<string, AnyFunction> => {
  const result: Record<string, AnyFunction> = {};
  getEntries(handlers).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[key] = function (this: any, x: any) {
        this[value](x);
      };
    } else {
      result[key] = value;
    }
  });
  return result;
};

export const buildSetter = <T extends Map | AnySourceImpl = Map>(
  key: keyof FilterKeyByValueType<T, Function>
) =>
  function (this: T, value: any) {
    const t = this[key] as Function;
    t(value);
  };
