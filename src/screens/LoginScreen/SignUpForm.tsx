import React, { useCallback } from 'react';
import { useRouter } from 'hooks/useRouter';
import { useFirebase, runFirebaseAction } from 'state/context/loginContext';
// utils
import { signUpFields } from './authScreens.utils';
import { FormValues } from 'types';
import { APP_PATH } from 'routes/routesPaths';
// components
import AnimatedForm from './animations-blocks/AnimatedForm';
import Form from './Form';
import { asyncHandler } from 'utils/common.utils';

const SignUpForm = () => {
	const [{ loading, disabled }, dispatch] = useFirebase();
	const { push } = useRouter();
	const onSubmit = useCallback(
		async (data: FormValues, setError) => {
			if (data.password !== data.passwordConfirm) {
				setError('passwordConfirm', { message: 'password is not the same' });
			} else {
				await asyncHandler(runFirebaseAction(dispatch, { key: 'SIGN_UP', data }));
				push(`/${APP_PATH}`);
			}
		},
		[push, dispatch]
	);

	return (
		<AnimatedForm title={'Sign up'} footer={'Already have an account?'} link={{ to: '../', text: 'Sign In' }}>
			<Form buttonText={'sign up'} fields={signUpFields} onSubmit={onSubmit} buttonProps={{ loading, disabled }} />
		</AnimatedForm>
	);
};

export default React.memo(SignUpForm);
