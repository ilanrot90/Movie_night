import React, { FC, useCallback } from 'react';
import { MOVIES_PATH } from 'routes/routesPaths';
import { useRouter } from 'hooks/useRouter';
import { Container, LoginButton, FormContainer, Header, HeaderText } from './style';
import { auth, getProvider, Provider } from 'firebase-methods/Firebase';
import Icon from 'components/common-ui/icon';
import { asyncHandler } from 'utils/common.utils';
import { get } from 'utils/lodash.utils';
import Logo from './SvgLogo';

const providers: Array<Provider> = ['facebook', 'google', 'github'];

const LoginPage: FC = () => {
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

			push(`/${MOVIES_PATH}`);
		},
		[push]
	);

	return (
		<Container>
			<FormContainer>
				<Header>
					<Logo />
					<HeaderText>Please login to continue</HeaderText>
				</Header>
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
