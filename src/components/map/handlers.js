import { buildHandlers, buildSetter, buildSwitcher } from '../../hooks';

export const handlers = buildHandlers({
  // Properties
  minZoom: 'setMinZoom',
  maxZoom: 'setMaxZoom',
  minPitch: 'setMinPitch',
  maxPitch: 'setMaxPitch',
  mapStyle: 'setStyle',
  maxBounds: 'setMaxBounds',
  renderWorldCopies: 'setRenderWorldCopies',

  // Camera properties
  center: 'setCenter',
  zoom: 'setZoom',
  bearing: 'setBearing',
  pitch: 'setPitch',
  padding(padding = {}) {
    const { top = 0, bottom = 0, left = 0, right = 0 } = padding;
    this.setPadding({ top, bottom, left, right });
  },

  // Debug features
  showCollisionBoxes: buildSetter('showCollisionBoxes'),
  showOverdrawInspector: buildSetter('showOverdrawInspector'),
  showPadding: buildSetter('showPadding'),
  showTerrainWireframe: buildSetter('showTerrainWireframe'),
  showTileBoundaries: buildSetter('showTileBoundaries'),

  // User interaction handlers
  boxZoom: buildSwitcher('boxZoom'),
  doubleClickZoom: buildSwitcher('doubleClickZoom'),
  dragPan: buildSwitcher('dragPan'),
  dragRotate: buildSwitcher('dragRotate'),
  keyboard: buildSwitcher('keyboard'),
  scrollZoom: buildSwitcher('scrollZoom'),
  touchPitch: buildSwitcher('touchPitch'),
  touchZoomRotate: buildSwitcher('touchZoomRotate')
});
