import React, { FC, useCallback } from 'react';
import { MOVIES_PATH } from 'routes/routesPaths';
import { useRouter } from 'hooks/useRouter';
import { Container, LoginButton, FormContainer } from './style';
import { auth, getProvider, Provider } from 'firebase-methods/Firebase';
import Icon from 'components/common-ui/icon';
import { asyncHandler } from 'utils/common.utils';

const providers: Array<Provider> = ['facebook', 'google', 'github'];

const LoginPage: FC = () => {
	const { push } = useRouter();

	const handleAuth = useCallback(
		provider => async () => {
			// TODO: handle login
			const providerConfig = getProvider(provider);
			const { response, error } = await asyncHandler(auth.signInWithPopup(providerConfig));
			if (error) {
				const c = await auth.fetchSignInMethodsForEmail(error.email);
				console.log(error);
				console.log(c[0].replace(/.com/gi, ''));
			}
			push(`/${MOVIES_PATH}`);
		},
		[push]
	);

	return (
		<Container>
			<FormContainer>
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
			</FormContainer>
		</Container>
	);
};

export default React.memo(LoginPage);
