import React, { useCallback, useMemo } from 'react';
// state
import { useFirebase, runFirebaseAction } from 'state/context/loginContext';
// utils
import { recoverField } from './authScreens.utils';
import { FormValues } from 'types';
// components
import Form from './Form';
import AnimatedForm from './animations-blocks/AnimatedForm';
import { EmailSvg } from './animations-blocks/SvgEmail';
// style
import { MarginContainer } from './style';
import { asyncHandler } from 'utils/common.utils';

const RecoverForm = () => {
	const [{ loading, disabled }, dispatch] = useFirebase();

	const handleSubmit = useCallback(
		async ({ email }: FormValues) => {
			await asyncHandler(runFirebaseAction(dispatch, { key: 'RECOVER_PASSWORD', email }));
		},
		[dispatch]
	);

	const buttonText = useMemo<string>(() => (disabled ? 'email was send successfully' : 'send recover e-mail'), [disabled]);
	return (
		<AnimatedForm title={'Reset password'} footer={'Remember your password?'} link={{ to: '../', text: 'Sign In' }}>
			<>
				<MarginContainer top={32} left={'auto'} right={'auto'}>
					<EmailSvg startAnimation={loading} />
				</MarginContainer>
				<MarginContainer auto>
					<Form
						buttonProps={{ disabled: disabled || loading, loading }}
						buttonText={buttonText}
						fields={recoverField}
						onSubmit={handleSubmit}
					/>
				</MarginContainer>
			</>
		</AnimatedForm>
	);
};

export default React.memo(RecoverForm);
