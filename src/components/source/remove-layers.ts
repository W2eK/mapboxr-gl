import { Map } from 'mapbox-gl';

export const removeLayersWithSource = (map: Map, sourceId: string) => {
  const { layers, terrain } = map.getStyle();
  if (terrain?.source === sourceId) map.setTerrain();
  layers
    .filter(layer => 'source' in layer && layer.source === sourceId)
    .forEach(({ id }) => map.removeLayer(id));
};
