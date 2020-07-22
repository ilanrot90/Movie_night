import React, { useCallback, useState } from 'react';
import AnimatedForm from './animations-blocks/AnimatedForm';
import { LoginButton, VerifyContainer, VerifyText } from './style';
import { resendVerifyEmail } from 'firebase-methods/methods';
import { Navigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'state/atoms';
import { EmailSvg } from './animations-blocks/SvgEmail';

const VerifyEmail = () => {
	const user = useRecoilValue(authAtom);
	const [startAnimation, setAnimation] = useState<boolean>(false);

	const resendEmail = useCallback(async () => {
		await resendVerifyEmail();
		setAnimation(true);
	}, []);

	return user ? (
		<AnimatedForm title={'verify email'} footer={'Have a different account?'} link={{ to: '../', text: 'Sign In' }}>
			<VerifyContainer as={'div'}>
				<VerifyText size={11}>Go to your email inbox, and please verify your email.</VerifyText>
				<EmailSvg startAnimation={startAnimation} />
				<LoginButton fullWidth onClick={resendEmail}>
					Re-send verification email
				</LoginButton>
			</VerifyContainer>
		</AnimatedForm>
	) : (
		<Navigate to={'../'} />
	);
};

export default React.memo(VerifyEmail);
