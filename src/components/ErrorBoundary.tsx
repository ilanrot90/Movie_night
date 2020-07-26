import React from 'react';
import Button from './common-ui/Button';

interface InterfaceProps {
	fallback?: React.ReactElement;
}

class ErrorBoundary extends React.Component<InterfaceProps> {
	state: { hasError: boolean; message: null | string } = { hasError: false, message: null };

	static getDerivedStateFromError({ message }: Error) {
		return { hasError: true, message };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.dir(error, errorInfo);
	}

	tryAgain = () => {
		this.setState({ hasError: false });
	};

	render() {
		const { hasError, message } = this.state;
		const { children, fallback } = this.props;

		if (hasError) {
			return (
				fallback || (
					<div>
						<h1 role="alert">{message}</h1>
						<Button onClick={this.tryAgain}>Try again</Button>
					</div>
				)
			);
		}

		return children;
	}
}

export default ErrorBoundary;
