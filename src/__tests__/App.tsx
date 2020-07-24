import { renderUi, userEvent, waitFor, screen } from 'testingUtils/utils';

describe('Render app', () => {
	test('test', async () => {
		renderUi({ route: '/app' });
		expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
		userEvent.click(screen.getByRole('button', { name: /log out/i }));
	});
});
