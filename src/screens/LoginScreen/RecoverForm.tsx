import React, { useCallback } from 'react';
import AnimatedForm from './animations-blocks/AnimatedForm';
import Form from './Form';
import { MarginContainer } from './style';
import { recoverField } from './authScreens.utils';
import { FormValues } from 'types';
import { recoverPassword } from 'firebase-methods/methods';
import { EmailSvg } from './animations-blocks/SvgEmail';

const RecoverForm = () => {
	const handleSubmit = useCallback(async ({ email }: FormValues) => {
		await recoverPassword(email);
	}, []);
	return (
		<AnimatedForm title={'Reset password'} footer={'Remember your password?'} link={{ to: '../', text: 'Sign In' }}>
			<>
				<MarginContainer top={32} left={'auto'} right={'auto'}>
					<EmailSvg startAnimation={false} />
				</MarginContainer>
				<MarginContainer auto>
					<Form buttonText={'send recover e-mail'} fields={recoverField} onSubmit={handleSubmit} />
				</MarginContainer>
			</>
		</AnimatedForm>
	);
};

export default React.memo(RecoverForm);
