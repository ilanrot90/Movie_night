import { ValidationRules } from 'react-hook-form/dist/types/form';
// login values
export interface LoginTypes {
	name: 'email' | 'password' | 'passwordConfirm' | 'displayName';
	registerProps: ValidationRules;
	placeholder?: string;
	label?: string;
	type?: string;
}
export type FormValues = {
	email: string;
	password: string;
	passwordConfirm?: string;
	displayName?: string;
};
// firebase
export type Provider = 'google' | 'facebook' | 'github';

export type Method = 'GET' | 'POST';
