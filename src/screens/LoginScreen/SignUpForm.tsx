import React, { useCallback } from 'react';
import AnimatedForm from './AnimatedForm';
import Form from './Form';
import { FormValues } from 'types';
import { signUpFields } from './authScreens.utils';

const SignUpForm = () => {
	const onSubmit = useCallback((data: FormValues) => {
		console.log(data);
	}, []);

	return (
		<AnimatedForm title={'Sign up'} footer={'Already have an account?'} link={{ to: '../', text: 'Sign In' }}>
			<Form fields={signUpFields} onSubmit={onSubmit} />
		</AnimatedForm>
	);
};

export default React.memo(SignUpForm);
