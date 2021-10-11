const initialState = {
  mapbox: {
    name: 'MapboxrGL',
    checked: true,
    props: {
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      mapStyle: 'mapbox://styles/mapbox/light-v10',
      minZoom: 3,
      antialias: true,
      zoom: 4,
      scrollZoom: true
    }
  },
  source: {
    name: 'Source',
    checked: true,
    props: {
      id: 'dots',
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            id: 0,
            properties: {
              id: 0,
              filter: true
            },
            geometry: {
              type: 'Point',
              coordinates: [2.5, 6.5]
            }
          },
          {
            type: 'Feature',
            id: 1,
            properties: {
              id: 1,
              filter: false
            },
            geometry: {
              type: 'Point',
              coordinates: [3.5, 6.5]
            }
          }
        ]
      }
    }
  },
  state: {
    name: 'FeatureState',
    checked: true,
    props: {
      state: [{ hover: true }, { hover: false }]
    }
  },
  layer: {
    name: 'Layer',
    checked: true,
    props: {
      id: 'dots-circle',
      filter: ['get', 'filter'],
      type: 'circle',
      cursor: true,
      maxzoom: 16,
      paint: { 'circle-radius': 10 }
    }
  },
  property: {
    name: 'Property',
    checked: true,
    props: {
      id: 'circle-color',
      type: 'paint',
      value: [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        'red',
        'blue'
      ]
    }
  },
  filter: {
    name: 'Filter',
    checked: true,
    props: {
      rule: ['any', ['get', 'filter'], ['to-boolean', 'id']]
    }
  },
  master: {
    name: 'Master',
    checked: false,
    props: {
      id: 'land',
      paint: { 'background-color': 'lightblue', 'background-opacity': 0.5 }
    }
  }
};

export default initialState;
