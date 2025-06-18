import React from 'react';
import ErrorBoundary from './index';

const withErrorBoundary = (WrappedComponent, fallbackUI) => {
  return function WithErrorBoundaryWrapper(props) {
    return (
      <ErrorBoundary fallback={fallbackUI}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
};

export default withErrorBoundary; 