import {
  AnySourceData, GeoJSONSource, VectorSourceImpl
} from 'mapbox-gl';
import { KeysOfUnion } from '../../interfaces/utils';
import { buildSetter } from '../../lib/handlers/build-handlers';

// type SourceHandlers = 'setData' | 'setTiles'

// AvailableKeys will basically be keyof Foo | keyof Bar
// so it will be  "foo" | "bar"

type HandledProps = KeysOfUnion<AnySourceData>;
export const sourceHandlers = {
  data: buildSetter<GeoJSONSource>('setData'),
  tiles: buildSetter<VectorSourceImpl>('setTiles')
} satisfies Partial<Record<HandledProps, any>>;

type SourceHandlers = typeof sourceHandlers;
