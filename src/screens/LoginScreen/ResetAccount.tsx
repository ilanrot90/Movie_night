import React from 'react';
import AnimatedForm from './AnimatedForm';

const ResetAccount = () => {
	return (
		<AnimatedForm title={'reset email'} footer={'Know your password?'} link={{ to: '../', text: 'Sign In' }}>
			<div>reset email</div>
		</AnimatedForm>
	);
};

export default React.memo(ResetAccount);
