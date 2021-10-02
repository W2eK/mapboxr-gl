// prettier-ignore
const buildSetter = name => (map, value) =>
    map[name](value);

const buildSwitcher = name => (map, state) =>
  map[name][state ? 'enable' : 'disable']();

const handlers = {
  // Properties
  minZoom: buildSetter('setMinZoom'),
  maxZoom: buildSetter('setMaxZoom'),
  minPitch: buildSetter('setMinPitch'),
  maxPitch: buildSetter('setMaxPitch'),
  mapStyle: buildSetter('setStyle'),
  maxBounds: buildSetter('setMaxBounds'),
  renderWorldCopies: buildSetter('setRenderWorldCopies'),
  // User interaction handlers
  boxZoom: buildSwitcher('boxZoom'),
  doubleClickZoom: buildSwitcher('doubleClickZoom'),
  dragPan: buildSwitcher('dragPan'),
  dragRotate: buildSwitcher('dragRotate'),
  keyboard: buildSwitcher('keyboard'),
  scrollZoom: buildSwitcher('scrollZoom'),
  touchPitch: buildSwitcher('touchPitch'),
  touchZoomRotate: buildSwitcher('touchZoomRotate')
};

export default handlers;
