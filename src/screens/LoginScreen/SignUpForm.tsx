import React from 'react';
import AnimatedForm from './AnimatedForm';

const SignUpForm = () => {
	return (
		<AnimatedForm title={'Sign up'} link={{ to: '../', text: 'Sign In' }}>
			<div>sign up form</div>
		</AnimatedForm>
	);
};

export default React.memo(SignUpForm);