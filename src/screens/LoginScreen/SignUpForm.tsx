import React, { useCallback } from 'react';
import AnimatedForm from './AnimatedForm';
import Form from './Form';
import { FormValues } from 'types';
import { signUpFields } from './authScreens.utils';

const SignUpForm = () => {
	const onSubmit = useCallback((data: FormValues, setError) => {
		console.log(data);
		if (data.password !== data.passwordConfirm) {
			setError('passwordConfirm', { message: 'password is not the same' });
		}
	}, []);

	return (
		<AnimatedForm title={'Sign up'} footer={'Already have an account?'} link={{ to: '../', text: 'Sign In' }}>
			<Form buttonText={'sign up'} fields={signUpFields} onSubmit={onSubmit} />
		</AnimatedForm>
	);
};

export default React.memo(SignUpForm);
