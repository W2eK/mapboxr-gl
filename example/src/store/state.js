const initialState = {
  mapbox: {
    name: 'MapboxrGL',
    checked: true,
    open: true,
    props: {
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      mapStyle: 'mapbox://styles/mapbox/light-v10',
      minZoom: 3,
      antialias: true,
      zoom: 4,
      scrollZoom: true
    }
  },
  image: {
    name: 'Image',
    checked: true,
    open: true,
    props: {
      id: 'image',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png'
    }
  },
  marker: {
    name: 'Marker',
    checked: true,
    open: false,
    props: {
      coordinates: [10, 10],
      anchor: 'bottom',
      offset: [0, 0],
      draggable: true,
      color: 'red',
      scale: 1,
      showPopup: true
    }
  },
  content: {
    name: 'Marker Content',
    checked: false,
    props: {}
  },
  popup: {
    name: 'Popup',
    checked: false,
    props: {
      anchor: 'bottom',
      trackPointer: false,
      coordinates: [0, 0],
      offset: 20,
      maxWidth: '50px',
      className: 'foo bar'
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
  icon: {
    name: 'Icons',
    checked: true,
    open: false,
    props: {
      id: 'dots-icon',
      filter: ['!', ['get', 'filter']],
      type: 'symbol',
      layout: {
        'icon-image': 'image',
        'icon-size': 0.25
      }
    }
  },
  layer: {
    name: 'Layer',
    checked: true,
    open: false,
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
    open: false,
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
    checked: false,
    props: {
      rule: ['any', ['get', 'filter'], ['to-boolean', 'id']]
    }
  },
  master: {
    name: 'Master',
    checked: true,
    open: false,
    props: {
      id: 'admin-1-boundary',
      source: 'composite',
      sourceLayer: 'admin',
      paint: { 'line-color': 'red' },
      keepMaster: true
    }
  }
};

export default initialState;
