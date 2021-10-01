import React from 'react';
import ExampleComponent from 'mapboxr-gl';

import styles from './app.module.css';

const App = () => {
  console.log(ExampleComponent);
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>Controlls</aside>
      <div className={styles.container}>Map</div>
    </div>
  );
};

export default App;
