/**
 *
 * @param {mapboxgl.Map} map
 * @param {string} id
 */
export const removeLayers = (map, id) => {
  const { layers, terrain } = map.getStyle();
  if (terrain?.source === id) map.setTerrain();
  layers
    .filter(({ source }) => source === id)
    .forEach(({ id }) => map.removeLayer(id));
};
