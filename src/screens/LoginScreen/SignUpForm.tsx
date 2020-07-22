import React, { useCallback } from 'react';
import AnimatedForm from './animations-blocks/AnimatedForm';
import Form from './Form';
import { FormValues } from 'types';
import { signUpFields } from './authScreens.utils';
import { asyncHandler } from 'utils/common.utils';
import { handleEmailSignUp } from 'firebase-methods/methods';
import { useRouter } from 'hooks/useRouter';
import { APP_PATH } from 'routes/routesPaths';

const SignUpForm = () => {
	const { push } = useRouter();
	const onSubmit = useCallback(
		async (data: FormValues, setError) => {
			if (data.password !== data.passwordConfirm) {
				setError('passwordConfirm', { message: 'password is not the same' });
			} else {
				await asyncHandler(handleEmailSignUp(data));
				push(`/${APP_PATH}`);
			}
		},
		[push]
	);

	return (
		<AnimatedForm title={'Sign up'} footer={'Already have an account?'} link={{ to: '../', text: 'Sign In' }}>
			<Form buttonText={'sign up'} fields={signUpFields} onSubmit={onSubmit} />
		</AnimatedForm>
	);
};

export default React.memo(SignUpForm);
