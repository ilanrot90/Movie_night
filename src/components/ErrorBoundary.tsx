import React from 'react';

interface InterfaceProps {
	fallback: React.ReactElement;
}

class ErrorBoundary extends React.Component<InterfaceProps> {
	state = { hasError: false };

	static getDerivedStateFromError(error: Error) {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.dir(error, errorInfo);
	}

	render() {
		const { hasError } = this.state;
		const { children, fallback } = this.props;

		if (hasError) {
			return fallback || <h1>Something went wrong.</h1>;
		}

		return children;
	}
}

export default ErrorBoundary;
