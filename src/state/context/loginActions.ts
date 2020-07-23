import { Dispatch } from 'react';
import { Action } from './loginContext';
import { asyncHandler } from 'utils/common.utils';
import {
	resendVerifyEmail,
	recoverPassword,
	loginWithProvider,
	handleEmailLogin,
	handleEmailSignUp,
} from 'firebase-methods/methods';
import { FormValues, Provider } from 'types';

type Type =
	| 'SET_LOADING_TRUE'
	| 'SET_DISABLE_TRUE'
	| 'SET_DISABLE_FALSE'
	| 'SET_LOADING_FALSE'
	| 'SET_ACTION_FAILED'
	| 'SET_ACTION_SUCCESS'
	| 'RESET_STATE';

export const setLoading = (dispatch: Dispatch<Action>) => dispatch({ type: 'SET_LOADING_TRUE' });
export const setDisabled = (dispatch: Dispatch<Action>) => dispatch({ type: 'SET_DISABLE_TRUE' });
export const setLoadingOff = (dispatch: Dispatch<Action>) => dispatch({ type: 'SET_LOADING_FALSE' });
export const setDisabledOff = (dispatch: Dispatch<Action>) => dispatch({ type: 'SET_DISABLE_FALSE' });
export const resetState = (dispatch: Dispatch<Action>) => dispatch({ type: 'RESET_STATE' });
export const setActionSuccess = (dispatch: Dispatch<Action>) => dispatch({ type: 'SET_ACTION_SUCCESS' });
export const setActionFailed = (dispatch: Dispatch<Action>, error: string) => dispatch({ type: 'SET_ACTION_FAILED', error });

type Options =
	| { key: 'VERIFY_EMAIL' }
	| { key: 'RECOVER_PASSWORD'; email: string }
	| { key: 'LOGIN_PROVIDER'; provider: Provider }
	| { key: 'LOGIN_PASSWORD'; data: FormValues }
	| { key: 'SIGN_UP'; data: FormValues };
// methods mapper
const runMethod = (options: Options) => {
	switch (options.key) {
		case 'RECOVER_PASSWORD':
			return recoverPassword(options.email);
		case 'VERIFY_EMAIL':
			return resendVerifyEmail();
		case 'LOGIN_PROVIDER':
			return loginWithProvider(options.provider);
		case 'LOGIN_PASSWORD':
			return handleEmailLogin(options.data);
		case 'SIGN_UP':
			return handleEmailSignUp(options.data);
	}
};
// verify email
export const runFirebaseAction = async (dispatch: Dispatch<Action>, options: Options) => {
	setLoading(dispatch);
	const { error } = await asyncHandler(runMethod(options));

	if (error) {
		setActionFailed(dispatch, error.message);
	} else {
		setActionSuccess(dispatch);
	}
	return;
};
