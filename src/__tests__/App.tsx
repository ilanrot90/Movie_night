import { renderUi, waitFor, screen } from 'testingUtils/utils';

describe('Render app', () => {
	test('test', async () => {
		renderUi({ route: '/login' });
		expect(screen.getAllByAltText('login')).toBeInTheDocument();
	});
});
