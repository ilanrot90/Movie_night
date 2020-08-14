import { renderUi, userEvent, waitFor, screen } from 'testingUtils/utils';

// const menuButton = screen.getByRole('button', { name: /account of current user/i });
// expect(menuButton).toBeInTheDocument();
// userEvent.click(menuButton);

describe('Render app', () => {
	test('Logout from app', async () => {
		renderUi({ route: '/app' });
		expect(screen.getByTestId(/logout-btn/i)).toBeInTheDocument();
		userEvent.click(screen.getByTestId(/logout-btn/i));
		await waitFor(() => expect(screen.getAllByRole('button', { name: /log in/i })).toBeArrayOfSize(4));
	});
});
