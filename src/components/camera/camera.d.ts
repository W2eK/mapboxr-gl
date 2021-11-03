import { AnimationOptions, CameraOptions } from 'mapbox-gl';

type CameraProps = Partial<CameraOptions> & AnimationOptions;

export function Camera(props: CameraProps): JSX.Element;
