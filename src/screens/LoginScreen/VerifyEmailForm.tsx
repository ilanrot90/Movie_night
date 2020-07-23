import React, { useMemo, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router';
// state
import { useFirebase, runFirebaseAction } from 'state/context/loginContext';
import { authAtom } from 'state/atoms';
import AnimatedForm from './animations-blocks/AnimatedForm';
// components
import { EmailSvg } from './animations-blocks/SvgEmail';
import { LoginButton, VerifyContainer, VerifyText } from './style';

const VerifyEmailForm = () => {
	const user = useRecoilValue(authAtom);
	const [{ loading, disabled }, dispatch] = useFirebase();

	const resendEmail = useCallback(async () => {
		await runFirebaseAction(dispatch, { key: 'VERIFY_EMAIL' });
	}, [dispatch]);

	const buttonText = useMemo<string>(() => (disabled ? 'email was send successfully' : 'Re - send verification email'), [
		disabled,
	]);

	return user ? (
		<AnimatedForm title={'verify email'} footer={'Have a different account?'} link={{ to: '../', text: 'Sign In' }}>
			<VerifyContainer as={'div'}>
				<VerifyText size={11}>Go to your email inbox, and please verify your email.</VerifyText>
				<EmailSvg startAnimation={loading} />
				<LoginButton disabled={disabled || loading} fullWidth onClick={resendEmail}>
					{buttonText}
				</LoginButton>
			</VerifyContainer>
		</AnimatedForm>
	) : (
		<Navigate to={'../'} />
	);
};

export default React.memo(VerifyEmailForm);
