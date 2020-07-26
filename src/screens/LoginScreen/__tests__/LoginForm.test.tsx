import { signOutRender, userEvent, waitFor, screen } from 'testingUtils/utils';
import { TargetElement } from '@testing-library/user-event';
import { emailNotValidMessage, passwordValidation } from '../authScreens.utils';
import * as firebaseMethods from 'firebase-methods/methods';

const mockedLoginWithProvider = jest.spyOn(firebaseMethods, 'loginWithProvider');
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

	afterAll(() => {
		mockedLoginWithProvider.mockRestore();
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

	test('Fields not valid format - show errors', async () => {
		await userEvent.type(emailInput, unValidEmail);
		await userEvent.type(passwordInput, unValidPassword);
		await userEvent.click(loginButton);

		const errorPasswordMsg = await screen.findByText(emailNotValidMessage);
		const errorEmailMsg = await screen.findByText(passwordValidation);

		expect(errorPasswordMsg).toBeInTheDocument();
		expect(errorEmailMsg).toBeInTheDocument();
	});

	test('Sign in with provider', async () => {
		const loginButtons = screen.getAllByRole('button', { name: /log in with/i });
		expect(loginButtons).toMatchSnapshot();

		const facebookLoginBtn = loginButtons[0];
		await userEvent.click(facebookLoginBtn);

		expect(mockedLoginWithProvider).toHaveBeenCalledTimes(1);
		expect(mockedLoginWithProvider).toHaveBeenCalledWith('facebook');
	});

	test('Show error message when login failed', async () => {
		mockedLoginWithProvider.mockReset();
		mockedLoginWithProvider.mockRejectedValue(new Error('Failed login with facebook'));
		const loginButtons = screen.getAllByRole('button', { name: /log in with/i });

		const facebookLoginBtn = loginButtons[0];
		await userEvent.click(facebookLoginBtn);

		expect(mockedLoginWithProvider).toHaveBeenCalledTimes(1);
		expect(mockedLoginWithProvider).toHaveBeenCalledWith('facebook');

		const errorPopup = await screen.findByTestId(/login-screens-error-msg/i);
		expect(errorPopup).toMatchSnapshot();

		expect(errorPopup).toBeInTheDocument();
	});
});
