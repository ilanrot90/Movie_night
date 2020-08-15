import { signOutRender, userEvent, waitFor, screen } from 'testingUtils/utils';
import { TargetElement } from '@testing-library/user-event';
import { emailNotValidMessage, passwordValidation, passwordEmptyMessage } from '../authScreens.utils';
import * as firebaseMethods from 'firebase-methods/methods';

const mockedHandleEmailSignUp = jest.spyOn(firebaseMethods, 'handleEmailSignUp');

describe('Sign up with email actions', () => {
	let emailInput: TargetElement;
	let usernameInput: TargetElement;
	let passwordInput: TargetElement;
	let passwordConfirmInput: TargetElement;
	let signUpBtn: TargetElement;

	beforeEach(async () => {
		await signOutRender();
		await userEvent.click(screen.getByRole('link', { name: /sign up/i }));
		const signUpTitle = await screen.findByText('Please Sign up to continue');
		await waitFor(() => expect(signUpTitle).toBeInTheDocument());

		emailInput = screen.getByPlaceholderText(/email/i);
		usernameInput = screen.getByPlaceholderText(/John Smith/i);
		[passwordInput, passwordConfirmInput] = screen.getAllByPlaceholderText(/password/i);
		signUpBtn = screen.getByRole('button', { name: /sign up/i });
	});

	afterAll(() => {
		mockedHandleEmailSignUp.mockRestore();
	});

	test('submit button disabled when Sign in form is invalid', async () => {
		await userEvent.type(emailInput, 'test@test.com');
		await userEvent.type(usernameInput, 'test@test.com');
		await userEvent.type(passwordInput, '12345');

		await userEvent.click(signUpBtn);

		const passwordErrorA = await screen.findByText(passwordValidation);
		const passwordErrorB = await screen.findByText(passwordEmptyMessage);

		expect(screen.queryByText(emailNotValidMessage)).toBeNull();
		expect(passwordErrorA).toBeInTheDocument();
		expect(passwordErrorB).toBeInTheDocument();

		expect(signUpBtn).toBeDisabled();
	});

	test('Validate password are equal', async () => {
		await userEvent.type(emailInput, 'test@test.com');
		await userEvent.type(usernameInput, 'test name');
		await userEvent.type(passwordInput, '123456');
		await userEvent.type(passwordConfirmInput, '123sss45');

		await userEvent.click(signUpBtn);
		const errorMassage = await screen.findByText('The password you entered do not match');

		expect(signUpBtn).toBeDisabled();
		expect(errorMassage).toBeInTheDocument();
		expect(mockedHandleEmailSignUp).not.toBeCalled();
	});

	test('Sign up with password', async () => {
		await userEvent.type(emailInput, 'test@test.com');
		await userEvent.type(usernameInput, 'test name');
		await userEvent.type(passwordInput, '123456');
		await userEvent.type(passwordConfirmInput, '123456');

		await userEvent.click(signUpBtn);
		await waitFor(() => expect(mockedHandleEmailSignUp).toHaveBeenCalledTimes(1));
		expect(mockedHandleEmailSignUp).toHaveBeenCalledWith({
			email: 'test@test.com',
			displayName: 'test name',
			password: '123456',
			passwordConfirm: '123456',
		});
	});

	test('Show error message when Sign up failed', async () => {
		mockedHandleEmailSignUp.mockReset();
		mockedHandleEmailSignUp.mockRejectedValue(new Error('Sign up failed'));
		await userEvent.type(usernameInput, 'test name');
		await userEvent.type(emailInput, 'test@test.com');
		await userEvent.type(passwordInput, '123456');
		await userEvent.type(passwordConfirmInput, '123456');

		await userEvent.click(signUpBtn);
		await waitFor(() => expect(mockedHandleEmailSignUp).toHaveBeenCalledTimes(1));

		const errorPopup = await screen.findByTestId(/error-msg/i);
		expect(errorPopup).toMatchSnapshot();

		expect(errorPopup).toBeInTheDocument();
	});
});
