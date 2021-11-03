import { useMap } from '../context';

/*
  cameraForBounds         bounds + camera

  panBy                   offset + animation
  panTo                   lngLat + animation
  fitBounds               bounds + camera + animation
  fitScreenCoordinates    points + camera + animation

  jumpTo                           camera
  easeTo                           camera + animation + { delayEndEvents }
  flyTo                            camera + animation + { curve minZoom speed screenSpeed maxDuration }

  setFreeCameraOptions             freeCamera

  eventData
*/

/**
 * @param {import("./camera").CameraProps} props
 * @returns {import("react").ReactElement}
 */
export function Camera(props) {
  const { map } = useMap();
  /*
  const {
    center = map.getCenter(),
    zoom = map.getZoom(),
    bearing = map.getBearing(),
    pitch = map.getPitch(),
    padding = map.getPadding()
  } = props;
  */
  return null;
}
