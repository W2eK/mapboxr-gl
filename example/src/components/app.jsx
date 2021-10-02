import React, { useReducer } from 'react';
import StoreContext from '../store/context';
import MapContainer from './map-container';
import Controlls from './controlls';
import styles from './app.module.css';
import reducer from '../store/reducer';
import initialState from '../store/state';

window.__MAPBOXR_GL_DEBUG = true;
window.__MAPBOXR_GL_LOG = true;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext value={{ state, dispatch }}>
      <div className={styles.wrapper}>
        <aside className={styles.sidebar}>
          <Controlls />
        </aside>
        <div className={styles.container}>
          <MapContainer />
        </div>
      </div>
    </StoreContext>
  );
};

export default App;
