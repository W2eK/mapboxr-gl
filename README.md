# mapboxr-gl

> Yet another MapboxGL.js wrapper for React

## Install

```bash
npm install --save mapbox-gl
npm install --save-dev @types/mapbox-gl
npm install --save mapboxr-gl
```

## Usage

```jsx
import React, { Component } from 'react';
import MapboxrGL from 'mapboxr-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).__MAPBOXR_GL_DEBUG = true;
  (window as any).__MAPBOXR_GL_LOG = false;
}

const Example = () => {
  return <MapboxrGL
    accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    wrapperStyle={{ minHeight: '100vh' }}
  />;
};
```

## Builtin Example

```bash
clone https://github.com/W2eK/mapboxr-gl.git
cd mapboxr-gl/example
npm install && npm run start
```

## Features

- Map
  - onviewport handler
  - array listeners
  - DebugProps
  - padding

## TODO Features

- strict mode
- built-in throttler for listeners

## License

MIT © [W2eK](https://github.com/W2eK)
