import { userEvent, waitFor, screen, renderUi } from 'testingUtils/utils';
import * as firebaseMethods from 'firebase-methods/methods';
import { TargetElement } from '@testing-library/user-event';

const mockedHandleResendVerifyEmail = jest.spyOn(firebaseMethods, 'resendVerifyEmail');

describe('Verify Email re-send', () => {
	let submitBtn: TargetElement;
	beforeEach(async () => {
		renderUi({ route: '/login/verify-email' });
		const title = await screen.findByText(/Please verify email to continue/i);
		await waitFor(() => expect(title).toBeInTheDocument());
		submitBtn = screen.getByRole('button', { name: /Re - send verification email/i });
	});

	afterAll(() => {
		mockedHandleResendVerifyEmail.mockRestore();
	});

	test('Send email to user', async () => {
		expect(submitBtn).not.toBeDisabled();

		await userEvent.click(submitBtn);
		await waitFor(() => expect(mockedHandleResendVerifyEmail).toHaveBeenCalledTimes(1));
		expect(submitBtn).toBeDisabled();
	});

	test('Show error message when Verify Email re-send failed', async () => {
		mockedHandleResendVerifyEmail.mockReset();
		mockedHandleResendVerifyEmail.mockRejectedValue(new Error('Email do not exist'));

		await userEvent.click(submitBtn);

		const errorPopup = await screen.findByTestId(/error-msg/i);
		expect(errorPopup).toMatchSnapshot();

		expect(errorPopup).toBeInTheDocument();
	});
});
