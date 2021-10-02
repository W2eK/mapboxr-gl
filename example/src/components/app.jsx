import React from 'react';
import MapContainer from './map-container';

import styles from './app.module.css';

window.__MAPBOXR_GL_DEBUG = true;
window.__MAPBOXR_GL_LOG = true;

const App = () => {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>Controlls</aside>
      <div className={styles.container}>
        <MapContainer />
      </div>
    </div>
  );
};

export default App;
