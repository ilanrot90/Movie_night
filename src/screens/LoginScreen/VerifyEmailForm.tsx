import React, { useState, useMemo, useCallback } from 'react';
import AnimatedForm from './animations-blocks/AnimatedForm';
import { LoginButton, VerifyContainer, VerifyText } from './style';
import { Navigate } from 'react-router';
import { resendVerifyEmail } from 'firebase-methods/methods';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'state/atoms';
import { EmailSvg } from './animations-blocks/SvgEmail';

const VerifyEmailForm = () => {
	const user = useRecoilValue(authAtom);
	const [isDisabled, setDisabled] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const resendEmail = useCallback(async () => {
		setLoading(true);
		await resendVerifyEmail();
		setDisabled(true);
		setLoading(false);
	}, []);

	const buttonText = useMemo<string>(() => (isDisabled ? 'email was send successfully' : 'Re - send verification email'), [
		isDisabled,
	]);
	return user ? (
		<AnimatedForm title={'verify email'} footer={'Have a different account?'} link={{ to: '../', text: 'Sign In' }}>
			<VerifyContainer as={'div'}>
				<VerifyText size={11}>Go to your email inbox, and please verify your email.</VerifyText>
				<EmailSvg startAnimation={loading} />
				<LoginButton disabled={isDisabled} fullWidth onClick={resendEmail}>
					{buttonText}
				</LoginButton>
			</VerifyContainer>
		</AnimatedForm>
	) : (
		<Navigate to={'../'} />
	);
};

export default React.memo(VerifyEmailForm);
