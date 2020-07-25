import React, { useCallback, useState } from 'react';
import { useRouter } from 'hooks/useRouter';
import { useFirebase, runFirebaseAction, Options } from 'state/context/loginContext';
// utils
import { APP_PATH, SIGN_UP_PATH, RESET_PATH } from 'routes/routesPaths';
import { loginFields } from './authScreens.utils';
import { get } from 'utils/lodash.utils';
import { FormValues, Provider } from 'types';
// components
import Icon from 'components/common-ui/icon';
import AnimatedForm from './animations-blocks/AnimatedForm';
import Form from './Form';
// style
import { Content, Hr, LoginButton, ForgotPasswordLink } from './style';
const providers: Array<Provider> = ['facebook', 'google', 'github'];

const LoginForm = () => {
	const [selectedProvider, setProvider] = useState<string | null>(null);
	const [{ loading }, dispatch] = useFirebase();
	const { push } = useRouter();

	const handleRedirect = useCallback(() => {
		push(`/${APP_PATH}`);
	}, [push]);

	const signInCallback = useCallback(
		async (action: Options) => {
			setProvider(get(action, 'provider', null));
			const hasError = await runFirebaseAction(dispatch, action);
			if (!hasError) {
				handleRedirect();
			}
		},
		[handleRedirect, dispatch]
	);

	const handlePasswordSignIn = useCallback(
		async (data: FormValues) => {
			await signInCallback({ key: 'LOGIN_PASSWORD', data });
		},
		[signInCallback]
	);

	const handleSocialSignIn = useCallback(
		provider => async () => {
			await signInCallback({ key: 'LOGIN_PROVIDER', provider });
		},
		[signInCallback]
	);

	return (
		<AnimatedForm title={'login'} footer={'Don`t have an account?'} link={{ to: SIGN_UP_PATH, text: 'Sign Up' }}>
			<>
				<Form
					buttonText={'log in'}
					fields={loginFields}
					onSubmit={handlePasswordSignIn}
					buttonProps={{ testId: 'password-login', loading: loading && !selectedProvider }}
				/>
				<ForgotPasswordLink underline={'true'} size={10} to={RESET_PATH}>
					forget password?
				</ForgotPasswordLink>
				<Hr size={'m'} />
				<Content size={12}>Login with your social account</Content>
				{providers.map(provider => (
					<LoginButton
						key={provider}
						endIcon={<Icon name={provider} size={22} />}
						fullWidth
						socialType={provider}
						loading={loading && provider === selectedProvider}
						disabled={loading}
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
