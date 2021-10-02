const initialState = {
  mapbox: {
    name: 'MapboxrGL',
    checked: true,
    props: {
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      mapStyle: 'mapbox://styles/mapbox/light-v10',
      minZoom: 3,
      antialias: true
    }
  }
};

export default initialState;
