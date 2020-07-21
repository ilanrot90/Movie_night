import React, { useCallback } from 'react';
import { useRouter } from 'hooks/useRouter';
import { auth } from 'firebase-methods/Firebase';
import { loginWithProvider } from 'firebase-methods/methods';
import { asyncHandler } from 'utils/common.utils';
import { get } from 'utils/lodash.utils';
import { APP_PATH, SIGN_UP_PATH, VERIFY_EMAIL } from 'routes/routesPaths';
import { Content, FormBlock, Hr, LoginButton } from '../style';
import Icon from 'components/common-ui/icon';
import AnimatedForm from '../AnimatedForm';
import { getProvider } from 'firebase-methods/methods';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from 'components/common-ui/TextInput';
import { emailRegex } from 'utils/strings.utils';
import { FormValues, LoginTypes, Provider } from 'types';

const providers: Array<Provider> = ['facebook', 'google', 'github'];

const fields: Array<LoginTypes> = [
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
	const {
		register,
		handleSubmit,
		errors,
		// formState: { isSubmitting },
		// setError,
	} = useForm<FormValues>({});

	const onSubmit: SubmitHandler<FormValues> = async data => {
		const { error, response } = await asyncHandler(auth.signInWithEmailAndPassword(data.email, data.password));
		console.log({ error, response });
	};

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

			<LoginButton type={'submit'} fullWidth onClick={handleSubmit(onSubmit)}>
				log in
			</LoginButton>
		</FormBlock>
	);
});

const LoginForm = () => {
	const { push } = useRouter();

	const handleAuth = useCallback(
		provider => async () => {
			const { response, error } = await asyncHandler(loginWithProvider(provider));
			if (error) {
				// TODO: handle errors
				console.log({ error });
			}

			push(response?.isNewUser ? VERIFY_EMAIL : `/${APP_PATH}`);
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
