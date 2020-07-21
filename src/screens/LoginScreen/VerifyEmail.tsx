import React from 'react';
import AnimatedForm from './AnimatedForm';

const VerifyEmail = () => {
	return (
		<AnimatedForm title={'verify email'} footer={'Have a different account?'} link={{ to: '../', text: 'Sign In' }}>
			<div>verify email</div>
		</AnimatedForm>
	);
};

export default React.memo(VerifyEmail);
