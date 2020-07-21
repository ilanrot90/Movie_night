import React, { useCallback } from 'react';
import { useRouter } from 'hooks/useRouter';
import { loginWithProvider, handleEmailLogin } from 'firebase-methods/methods';
import { asyncHandler } from 'utils/common.utils';
import { APP_PATH, SIGN_UP_PATH } from 'routes/routesPaths';
import { Content, Hr, LoginButton } from './style';
import Icon from 'components/common-ui/icon';
import AnimatedForm from './AnimatedForm';
import { SubmitHandler } from 'react-hook-form';
import Form from './Form';
import { loginFields } from './authScreens.utils';
import { FormValues, Provider } from 'types';

const providers: Array<Provider> = ['facebook', 'google', 'github'];

const LoginForm = () => {
	const { push } = useRouter();

	const handleRedirect = useCallback(() => {
		push(`/${APP_PATH}`);
	}, [push]);

	const handlePasswordSignIn = async (data: FormValues) => {
		const { error, response } = await asyncHandler(handleEmailLogin(data));
		console.log({ error, response });
		handleRedirect();
	};

	const handleSocialSignIn = useCallback(
		provider => async () => {
			const { error } = await asyncHandler(loginWithProvider(provider));
			if (error) {
				// TODO: handle errors
				console.log({ error });
			}

			handleRedirect();
		},
		[handleRedirect]
	);

	return (
		<AnimatedForm title={'login'} footer={'Don`t have an account?'} link={{ to: SIGN_UP_PATH, text: 'Sign Up' }}>
			<>
				<Form buttonText={'log in'} fields={loginFields} onSubmit={handlePasswordSignIn} />
				<Hr size={'m'} />
				<Content size={12}>Login with your social account</Content>
				{providers.map(provider => (
					<LoginButton
						key={provider}
						endIcon={<Icon name={provider} size={22} />}
						fullWidth
						socialType={provider}
						onClick={handleSocialSignIn(provider)}
					>
						log in with {provider}
					</LoginButton>
				))}
			</>
		</AnimatedForm>
	);
};

export default React.memo(LoginForm);
