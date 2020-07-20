import React, { useCallback } from 'react';
import { useRouter } from 'hooks/useRouter';
import { auth, getProvider, Provider } from 'firebase-methods/Firebase';
import { asyncHandler } from 'utils/common.utils';
import { get } from 'utils/lodash.utils';
import { APP_PATH } from 'routes/routesPaths';
import { SIGN_UP_PATH } from 'routes/routesPaths';
import { LoginButton } from './style';
import Icon from 'components/common-ui/icon';
import AnimatedForm from './AnimatedForm';

const providers: Array<Provider> = ['facebook', 'google', 'github'];

const LoginForm = () => {
	const { push } = useRouter();

	const handleAuth = useCallback(
		provider => async () => {
			// TODO: handle login
			const providerConfig = getProvider(provider);
			const { response, error } = await asyncHandler(auth.signInWithPopup(providerConfig));
			if (error) {
				console.log(error);
			}
			const isNewUser = response?.additionalUserInfo?.isNewUser;
			if (isNewUser) {
				const linkedAccounts = await auth.fetchSignInMethodsForEmail(get('response', 'user.providerData[0].email'));
				console.log({ linkedAccounts });
			}

			push(`/${APP_PATH}`);
		},
		[push]
	);

	return (
		<AnimatedForm title={'login'} link={{ to: SIGN_UP_PATH, text: 'Sign Up' }}>
			<>
				{providers.map(provider => (
					<LoginButton
						key={provider}
						endIcon={<Icon name={provider} size={22} />}
						fullWidth
						socialType={provider}
						onClick={handleAuth(provider)}
					>
						log in with {provider}
					</LoginButton>
				))}
			</>
		</AnimatedForm>
	);
};

export default React.memo(LoginForm);
