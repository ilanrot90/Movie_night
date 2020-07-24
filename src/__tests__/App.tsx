import { renderUi, userEvent, waitFor, screen } from 'testingUtils/utils';

describe('Render app', () => {
	test('Logout from app', async () => {
		renderUi({ route: '/app' });
		expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
		userEvent.click(screen.getByRole('button', { name: /log out/i }));
		await waitFor(() => expect(screen.getAllByRole('button', { name: /log in/i })).toBeArrayOfSize(4));
	});
});
