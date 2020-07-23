import { LoginTypes } from 'types';
import { emailRegex, nameRegex } from 'utils/strings.utils';

// login fields
export const loginFields: Array<LoginTypes> = [
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
				message: 'Please enter your email',
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
// sign-up fields
export const signUpFields: Array<LoginTypes> = [
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
				message: 'Please enter your email',
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
				message: 'Please complete the form',
			},
			minLength: {
				value: 6,
				message: 'password too short',
			},
		},
	},
	{
		name: 'passwordConfirm',
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
// login fields
export const recoverField: Array<LoginTypes> = [
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
				message: 'Please enter your email',
			},
		},
	},
];
