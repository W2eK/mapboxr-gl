const initialState = {
  mapbox: {
    name: 'MapboxrGL',
    checked: true,
    props: {
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      mapStyle: 'mapbox://styles/mapbox/light-v10',
      minZoom: 3,
      antialias: true,
      zoom: 4
    }
  },
  source: {
    name: 'Source',
    checked: true,
    props: {
      id: 'dots',
      type: 'geojson',
      maxzoom: 5,
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [3.5, 6.5]
            }
          }
        ]
      }
    }
  }
};

export default initialState;
