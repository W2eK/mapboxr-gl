export const removeLayers = (map, id) => {
  const { layers } = map.getStyle();
  layers
    .filter(({ source }) => source === id)
    .forEach(({ id }) => map.removeLayer(id));
};
