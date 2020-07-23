import { Dispatch } from 'react';
import { Action } from './loginContext';
import { asyncHandler } from '../../utils/common.utils';
import { resendVerifyEmail, recoverPassword } from '../../firebase-methods/methods';

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

// verify email
export const verifyEmail = async (dispatch: Dispatch<Action>) => {
	setLoading(dispatch);
	const { error } = await asyncHandler(resendVerifyEmail());

	if (error) {
		setActionFailed(dispatch, error.message);
	} else {
		setActionSuccess(dispatch);
	}
	return;
};
// recover password
export const recoverPasswordWithEmail = async (dispatch: Dispatch<Action>, email: string) => {
	setLoading(dispatch);
	const { error } = await asyncHandler(recoverPassword(email));

	if (error) {
		setActionFailed(dispatch, error.message);
	} else {
		setActionSuccess(dispatch);
	}
	return;
};
