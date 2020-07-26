import { signOutRender, userEvent, waitFor, screen } from 'testingUtils/utils';
import { TargetElement } from '@testing-library/user-event';
import { emailNotValidMessage } from '../authScreens.utils';
import * as firebaseMethods from 'firebase-methods/methods';

const mockedHandleRecoverPassword = jest.spyOn(firebaseMethods, 'recoverPassword');

describe('Recover email actions', () => {
	let emailInput: TargetElement;
	let recoverBtn: TargetElement;

	beforeEach(async () => {
		await signOutRender();
		await userEvent.click(screen.getByRole('link', { name: /forget password/i }));
		const resetTitle = await screen.findByText('Please Reset password to continue');
		await waitFor(() => expect(resetTitle).toBeInTheDocument());

		emailInput = screen.getByPlaceholderText(/email/i);
		recoverBtn = screen.getByRole('button', { name: /send/i });
	});

	afterAll(() => {
		mockedHandleRecoverPassword.mockRestore();
	});

	test('Button disabled when email field is empty', async () => {
		await userEvent.type(emailInput, 'test.com');
		await userEvent.click(recoverBtn);
		const errorMessage = await screen.findByText(emailNotValidMessage);

		expect(errorMessage).toBeInTheDocument();
		expect(recoverBtn).toBeDisabled();
	});

	test('Send recover email dispatch', async () => {
		await userEvent.type(emailInput, 'test@test.com');
		await userEvent.click(recoverBtn);

		expect(screen.queryByText(emailNotValidMessage)).toBeNull();

		await waitFor(() => expect(mockedHandleRecoverPassword).toHaveBeenCalledTimes(1));
		expect(mockedHandleRecoverPassword).toHaveBeenCalledWith('test@test.com');
	});
});
