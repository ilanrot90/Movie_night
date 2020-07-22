import React, { useCallback, useMemo, useState } from 'react';
import AnimatedForm from './animations-blocks/AnimatedForm';
import Form from './Form';
import { MarginContainer } from './style';
import { recoverField } from './authScreens.utils';
import { FormValues } from 'types';
import { recoverPassword } from 'firebase-methods/methods';
import { EmailSvg } from './animations-blocks/SvgEmail';

const RecoverForm = () => {
	const [isDisabled, setDisabled] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = useCallback(async ({ email }: FormValues) => {
		setLoading(true);
		await recoverPassword(email);
		setDisabled(true);
		setLoading(false);
	}, []);

	const buttonText = useMemo<string>(() => (isDisabled ? 'email was send successfully' : 'send recover e-mail'), [isDisabled]);
	return (
		<AnimatedForm title={'Reset password'} footer={'Remember your password?'} link={{ to: '../', text: 'Sign In' }}>
			<>
				<MarginContainer top={32} left={'auto'} right={'auto'}>
					<EmailSvg startAnimation={loading} />
				</MarginContainer>
				<MarginContainer auto>
					<Form buttonProps={{ disabled: isDisabled }} buttonText={buttonText} fields={recoverField} onSubmit={handleSubmit} />
				</MarginContainer>
			</>
		</AnimatedForm>
	);
};

export default React.memo(RecoverForm);
