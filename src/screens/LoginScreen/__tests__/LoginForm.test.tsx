import { signOutRender, userEvent, waitFor, screen } from 'testingUtils/utils';
import { TargetElement } from '@testing-library/user-event';

const [validEmail, unValidEmail] = ['test@test.com', 'test-test.com'];
const [validPassword, unValidPassword] = ['min_6_length', '12345'];

describe('Login actions', () => {
	let emailInput: TargetElement;
	let passwordInput: TargetElement;
	let loginButton: TargetElement;

	beforeEach(async () => {
		await signOutRender();
		emailInput = screen.getByRole('textbox', {
			name: /email/i,
		});
		passwordInput = screen.getByPlaceholderText(/password/i);
		loginButton = screen.getByTestId(/password-login/i);
	});

	test('Successful Login with Password', async () => {
		await userEvent.type(emailInput, validEmail);
		await userEvent.type(passwordInput, validPassword);

		expect(emailInput).toHaveValue(validEmail);
		expect(passwordInput).toHaveValue(validPassword);

		await userEvent.click(loginButton);

		await waitFor(() => expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument());
	});

	test('Login button is Disabled when login in process', async () => {
		await userEvent.type(emailInput, validEmail);
		await userEvent.type(passwordInput, validPassword);
		await userEvent.click(loginButton);

		await waitFor(() => expect(loginButton).toBeDisabled());
	});
});
