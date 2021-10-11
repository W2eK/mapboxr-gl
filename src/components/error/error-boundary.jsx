import React, { Component } from 'react';
import { Placeholder } from './placeholder';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // componentDidCatch(error, errorInfo) {
  //   console.warn(error);
  // }

  render() {
    if (this.state.hasError) {
      return <Placeholder />;
    }
    return this.props.children;
  }
}
