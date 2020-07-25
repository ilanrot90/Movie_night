import React, { useCallback, useState } from 'react';
import { useRouter } from 'hooks/useRouter';
import { useFirebase, runFirebaseAction } from 'state/context/loginContext';
// utils
import { APP_PATH, SIGN_UP_PATH, RESET_PATH } from 'routes/routesPaths';
import { loginFields } from './authScreens.utils';
import { FormValues, Provider } from 'types';
// components
import Icon from 'components/common-ui/icon';
import AnimatedForm from './animations-blocks/AnimatedForm';
import Form from './Form';
// style
import { Content, Hr, LoginButton, ForgotPasswordLink } from './style';
import { asyncHandler } from 'utils/common.utils';

const providers: Array<Provider> = ['facebook', 'google', 'github'];

const LoginForm = () => {
	const [selectedProvider, setProvider] = useState<string | null>(null);
	const [{ loading }, dispatch] = useFirebase();
	const { push } = useRouter();

	const handleRedirect = useCallback(() => {
		push(`/${APP_PATH}`);
	}, [push]);

	const handlePasswordSignIn = useCallback(
		async (data: FormValues) => {
			setProvider(null);
			await asyncHandler(runFirebaseAction(dispatch, { key: 'LOGIN_PASSWORD', data }));
			handleRedirect();
		},
		[handleRedirect, dispatch]
	);

	const handleSocialSignIn = useCallback(
		provider => async () => {
			setProvider(provider);
			await asyncHandler(runFirebaseAction(dispatch, { key: 'LOGIN_PROVIDER', provider }));
			handleRedirect();
		},
		[handleRedirect, dispatch]
	);

	return (
		<AnimatedForm title={'login'} footer={'Don`t have an account?'} link={{ to: SIGN_UP_PATH, text: 'Sign Up' }}>
			<>
				<Form
					buttonText={'log in'}
					fields={loginFields}
					onSubmit={handlePasswordSignIn}
					buttonProps={{ testId: 'password-login', disabled: loading, loading: loading && !selectedProvider }}
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
