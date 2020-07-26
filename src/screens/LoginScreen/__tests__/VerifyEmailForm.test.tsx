import { userEvent, waitFor, screen, renderUi } from 'testingUtils/utils';
import * as firebaseMethods from 'firebase-methods/methods';

const mockedHandleResendVerifyEmail = jest.spyOn(firebaseMethods, 'resendVerifyEmail');

describe('Verify Email re-send', () => {
	afterAll(() => {
		mockedHandleResendVerifyEmail.mockRestore();
	});

	test('Send email to user', async () => {
		renderUi({ route: '/login/verify-email' });
		const title = await screen.findByText(/Please verify email to continue/i);
		await waitFor(() => expect(title).toBeInTheDocument());

		const submitBtn = screen.getByRole('button', { name: /Re - send verification email/i });
		expect(submitBtn).not.toBeDisabled();

		await userEvent.click(submitBtn);
		await waitFor(() => expect(mockedHandleResendVerifyEmail).toHaveBeenCalledTimes(1));
		expect(submitBtn).toBeDisabled();
	});
});
