import { userEvent, waitFor, screen, renderUi } from 'testingUtils/utils';
import { TargetElement } from '@testing-library/user-event';
import { emailNotValidMessage } from '../authScreens.utils';
import * as firebaseMethods from 'firebase-methods/methods';
import { LOGIN_PATH } from 'routes/routesPaths';

const mockedHandleRecoverPassword = jest.spyOn(firebaseMethods, 'recoverPassword');

describe('Recover email actions', () => {
	let emailInput: TargetElement;
	let recoverBtn: TargetElement;

	beforeEach(async () => {
		renderUi({ route: `/${LOGIN_PATH}` });
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

	test('Show error message when recover email failed', async () => {
		mockedHandleRecoverPassword.mockReset();
		mockedHandleRecoverPassword.mockRejectedValue(new Error('Email do not exist'));

		await userEvent.type(emailInput, 'test@test.com');
		await userEvent.click(recoverBtn);

		const errorPopup = await screen.findByTestId(/error-msg/i);
		expect(errorPopup).toMatchSnapshot();

		expect(errorPopup).toBeInTheDocument();
	});
});
