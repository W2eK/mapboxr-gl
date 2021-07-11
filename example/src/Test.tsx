import { useMap } from 'mapboxr-gl';

function Test() {
  const map = useMap();
  console.log(map);
  return null;
}

export default Test;
