import { ValidationRules } from 'react-hook-form/dist/types/form';
// login values
export interface LoginTypes {
	name: 'email' | 'password';
	registerProps: ValidationRules;
	placeholder?: string;
	type?: string;
}
export type FormValues = {
	email: string;
	password: string;
};
// firebase
export type Provider = 'google' | 'facebook' | 'github';
