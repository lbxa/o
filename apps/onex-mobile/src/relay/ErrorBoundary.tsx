import React from "react";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * There is no functional equivalent for hooks yet*
   * @see https://react.dev/reference/react/Component#static-getderivedstatefromerror
   */
  static getDerivedStateFromError(_: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error:", error);
    console.error("Component Stack:", info.componentStack);
    // Canary only (below)
    // console.error("Owner Stack:", React.captureOwnerStack());
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}
