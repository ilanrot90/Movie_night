import React, { useCallback, useMemo } from 'react';
// state
import { useFirebase } from 'state/context/loginContext';
import { recoverPasswordWithEmail } from 'state/context/loginActions';
// utils
import { recoverField } from './authScreens.utils';
import { FormValues } from 'types';
// components
import Form from './Form';
import AnimatedForm from './animations-blocks/AnimatedForm';
import { EmailSvg } from './animations-blocks/SvgEmail';
// style
import { MarginContainer } from './style';

const RecoverForm = () => {
	const [{ loading, disabled }, dispatch] = useFirebase();

	const handleSubmit = useCallback(async ({ email }: FormValues) => {
		await recoverPasswordWithEmail(dispatch, email);
	}, []);

	const buttonText = useMemo<string>(() => (disabled ? 'email was send successfully' : 'send recover e-mail'), [disabled]);
	return (
		<AnimatedForm title={'Reset password'} footer={'Remember your password?'} link={{ to: '../', text: 'Sign In' }}>
			<>
				<MarginContainer top={32} left={'auto'} right={'auto'}>
					<EmailSvg startAnimation={loading} />
				</MarginContainer>
				<MarginContainer auto>
					<Form buttonProps={{ disabled }} buttonText={buttonText} fields={recoverField} onSubmit={handleSubmit} />
				</MarginContainer>
			</>
		</AnimatedForm>
	);
};

export default React.memo(RecoverForm);
