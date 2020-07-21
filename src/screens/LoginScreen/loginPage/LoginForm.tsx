import React, { useCallback } from 'react';
import { useRouter } from 'hooks/useRouter';
import { auth } from 'firebase-methods/Firebase';
import { asyncHandler } from 'utils/common.utils';
import { get } from 'utils/lodash.utils';
import { APP_PATH } from 'routes/routesPaths';
import { SIGN_UP_PATH } from 'routes/routesPaths';
import { LoginButton, Content, FormBlock, Hr } from '../style';
import Icon from 'components/common-ui/icon';
import AnimatedForm from '../AnimatedForm';
import { getProvider, Provider } from 'firebase-methods/methods';
import { useForm } from 'react-hook-form';
import TextInput from 'components/common-ui/TextInput';
import { emailRegex } from 'utils/strings.utils';

const providers: Array<Provider> = ['facebook', 'google', 'github'];

const fields = [
	{
		name: 'email',
		placeholder: 'your_email@mail.com',
		registerProps: {
			required: {
				value: true,
				message: 'Please enter your email',
			},
			pattern: {
				value: emailRegex,
				message: 'Please enter your password',
			},
		},
	},
	{
		name: 'password',
		type: 'password',
		registerProps: {
			required: {
				value: true,
				message: 'Please complete the form',
			},
			minLength: {
				value: 6,
				message: 'password too short',
			},
		},
	},
];
const Form = React.memo(() => {
	const { register, handleSubmit, errors } = useForm({});

	return (
		<FormBlock>
			{fields.map(({ name, placeholder = name, registerProps, type }) => (
				<TextInput
					key={name}
					placeholder={placeholder}
					fullWidth
					type={type}
					label={name}
					name={name}
					error={!!errors[name]}
					helperText={get(errors, `${name}.message`)}
					ref={register(registerProps)}
				/>
			))}

			<LoginButton type={'submit'} fullWidth onClick={handleSubmit(d => console.log(d))}>
				log in
			</LoginButton>
		</FormBlock>
	);
});

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
		<AnimatedForm title={'login'} footer={'Don`t have an account?'} link={{ to: SIGN_UP_PATH, text: 'Sign Up' }}>
			<>
				<Form />
				<Hr size={'m'} />
				<Content size={12}>Login with your social account</Content>
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
