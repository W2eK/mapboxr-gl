import { Map, PaddingOptions } from 'mapbox-gl';
import { buildHandlers, buildSwitcher, buildToggler } from '../../lib/handlers/build-handlers';



const mapHandlers = buildHandlers({
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
  zoom(this: Map, x: number) {
    this.setZoom(x ?? 0);
  },
  bearing: 'setBearing',
  pitch: 'setPitch',
  padding(this: Map, padding: Partial<PaddingOptions> = {}) {
    const { top = 0, bottom = 0, left = 0, right = 0 } = padding;
    this.setPadding({ top, bottom, left, right });
  },

  // Debug features
  showCollisionBoxes: buildToggler('showCollisionBoxes'),
  showOverdraw: buildToggler('showOverdraw'),
  showPadding: buildToggler('showPadding'),
  showTerrainWireframe: buildToggler('showTerrainWireframe'),
  showTileBoundaries: buildToggler('showTileBoundaries'),

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
