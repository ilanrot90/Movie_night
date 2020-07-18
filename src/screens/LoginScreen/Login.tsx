import React, { FC, useCallback } from 'react';
import { MOVIES_PATH } from 'routes/routesPaths';
import { useRouter } from 'hooks/useRouter';
import { Container, LoginButton, FormContainer } from './style';
import { auth, getProvider, Provider } from 'firebase-methods/Firebase';
import Icon from 'components/common-ui/icon';

const providers: Array<Provider> = ['google', 'facebook', 'github'];

const LoginPage: FC = () => {
	const { push } = useRouter();

	const handleAuth = useCallback(
		provider => async () => {
			// TODO: handle login
			const providerConfig = getProvider(provider);
			await auth.signInWithPopup(providerConfig);
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
