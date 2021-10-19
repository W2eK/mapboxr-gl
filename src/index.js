import React, { useEffect, useState } from 'react';

import { MapboxrGL } from './components/map';
import { ErrorBoundary } from './components/error';
export * from './components/context';
export * from './components/filter';
export * from './components/feature-state';
export * from './components/layer';
export * from './components/listener';
export * from './components/marker';
export * from './components/popup';
export * from './components/property';
export * from './components/source';

function WithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <MapboxrGL {...props} />
    </ErrorBoundary>
  );
}

export default WithErrorBoundary;
