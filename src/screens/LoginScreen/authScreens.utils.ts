import { LoginTypes } from 'types';
import { emailRegex, nameRegex } from 'utils/strings.utils';

export const emailEmptyMessage = 'Please enter your email';
export const emailNotValidMessage = 'Please enter a valid email address';
export const passwordValidation = 'Password is too short';
export const passwordEmptyMessage = 'Please enter your password';

// login fields
export const loginFields: Array<LoginTypes> = [
	{
		name: 'email',
		placeholder: 'your_email@mail.com',
		registerProps: {
			required: {
				value: true,
				message: emailEmptyMessage,
			},
			pattern: {
				value: emailRegex,
				message: emailNotValidMessage,
			},
		},
	},
	{
		name: 'password',
		type: 'password',
		registerProps: {
			required: {
				value: true,
				message: passwordEmptyMessage,
			},
			minLength: {
				value: 6,
				message: passwordValidation,
			},
		},
	},
];
// sign-up fields
export const signUpFields: Array<LoginTypes> = [
	{
		name: 'email',
		placeholder: 'your_email@mail.com',
		registerProps: {
			required: {
				value: true,
				message: emailEmptyMessage,
			},
			pattern: {
				value: emailRegex,
				message: emailNotValidMessage,
			},
		},
	},
	{
		name: 'displayName',
		label: 'User Name',
		placeholder: 'John Smith',
		registerProps: {
			required: {
				value: true,
				message: 'Please enter your name',
			},
			pattern: {
				value: nameRegex,
				message: 'Only letters and numbers are allowed',
			},
			maxLength: {
				value: 28,
				message: 'name too long',
			},
		},
	},
	{
		name: 'password',
		type: 'password',
		registerProps: {
			required: {
				value: true,
				message: passwordEmptyMessage,
			},
			minLength: {
				value: 6,
				message: passwordValidation,
			},
		},
	},
	{
		name: 'passwordConfirm',
		placeholder: 'Password Confirm',
		type: 'password',
		registerProps: {
			required: {
				value: true,
				message: passwordEmptyMessage,
			},
			minLength: {
				value: 6,
				message: passwordValidation,
			},
		},
	},
];
// login fields
export const recoverField: Array<LoginTypes> = [
	{
		name: 'email',
		placeholder: 'your_email@mail.com',
		registerProps: {
			required: {
				value: true,
				message: emailEmptyMessage,
			},
			pattern: {
				value: emailRegex,
				message: emailNotValidMessage,
			},
		},
	},
];
