import React, { Component, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  fallbackUI?: ReactNode;
}

class ErrorBoundaryWrapper extends Component<ErrorBoundaryWrapperProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryWrapperProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallbackUI || (
          <div className="p-4 text-red-500">
            <h2>Something went wrong.</h2>
            <details className="mt-2">
              <summary>Error details</summary>
              <pre>{this.state.error?.message}</pre>
            </details>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallbackUI?: ReactNode
): React.FC<P> => {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundaryWrapper fallbackUI={fallbackUI}>
        <WrappedComponent {...props} />
      </ErrorBoundaryWrapper>
    );
  };
};

export default withErrorBoundary;
