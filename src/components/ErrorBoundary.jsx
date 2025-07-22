import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
          <span role="img" aria-label="error" className="text-4xl mb-4">😞</span>
          <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">
            We encountered an unexpected error while processing your request.
          </p>
          <a href="/" className="inline-block px-4 py-2 bg-primary text-white rounded-md">← Back</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
