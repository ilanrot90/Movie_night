import { signOutRender, userEvent, waitFor, screen } from 'testingUtils/utils';

const [validEmail, unValidEmail] = ['test@test.com', 'testtest.com'];
const [validPassword, unValidPassword] = ['min_6_length', '12345'];

describe('Login actions', () => {
	beforeEach(async () => {
		await signOutRender();
	});

	test('Successful Login with Password', async () => {
		const emailInput = screen.getByPlaceholderText(/email/i);
		const passwordInput = screen.getByPlaceholderText(/password/i);

		await userEvent.type(emailInput, validEmail);
		await userEvent.type(passwordInput, validPassword);

		expect(emailInput).toHaveValue(validEmail);
		expect(passwordInput).toHaveValue(validPassword);

		await userEvent.click(screen.getByTestId(/password-login/i));

		await waitFor(() => expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument());
	});
});
