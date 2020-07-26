import React from 'react';
import { render, screen, userEvent } from 'testingUtils/utils';
import ErrorBoundary from '../ErrorBoundary';

const ShouldThrow = ({ shouldThrow }: { shouldThrow: boolean }) => {
	if (shouldThrow) {
		throw new Error('component should break');
	} else {
		return <div>some component</div>;
	}
};

describe('render ErrorBoundary component on error', () => {
	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	test('render ErrorBoundary on throw - on reset remove ErrorBoundary', async () => {
		const { rerender } = render(<ShouldThrow shouldThrow={true} />, { wrapper: ErrorBoundary });
		/*
		const error = expect.any(Error);
		const info = { componentStack: expect.stringContaining('ShouldThrow') };
*/
		expect(console.error).toHaveBeenCalledTimes(2);
		expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(`"component should break"`);

		jest.clearAllMocks();

		rerender(<ShouldThrow shouldThrow={false} />);

		const tryAgainBtn = screen.getByText(/Try again/i);
		await userEvent.click(tryAgainBtn);

		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		expect(screen.queryByText(/try again/i)).not.toBeInTheDocument();
	});
});
