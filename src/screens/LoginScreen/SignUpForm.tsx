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

const SignUpForm = () => {
	const [{ loading, disabled }, dispatch] = useFirebase();
	const { push } = useRouter();
	const onSubmit = useCallback(
		async (data: FormValues, setError) => {
			console.log(data);
			if (data.password !== data.passwordConfirm) {
				setError('passwordConfirm', { message: 'The password you entered do not match' });
			} else {
				const error = await runFirebaseAction(dispatch, { key: 'SIGN_UP', data });
				!error && push(`/${APP_PATH}`);
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
