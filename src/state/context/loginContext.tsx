import React, { FC } from 'react';

interface IState {
	loading: boolean;
	disabled: boolean;
	error: null | string;
}

const initialState = {
	loading: false,
	disabled: false,
	error: null,
};

export type Action =
	| {
			type: 'SET_LOADING_TRUE';
	  }
	| {
			type: 'SET_DISABLE_TRUE';
	  }
	| {
			type: 'SET_DISABLE_FALSE';
	  }
	| {
			type: 'SET_LOADING_FALSE';
	  }
	| {
			type: 'SET_ACTION_FAILED';
			error: string;
	  }
	| {
			type: 'SET_ACTION_SUCCESS';
	  }
	| {
			type: 'RESET_STATE';
	  };

type FirebaseReducer = (state: IState, action: Action) => IState;

const firebaseReducer: FirebaseReducer = (state, { type, ...payload }) => {
	switch (type) {
		case 'SET_DISABLE_TRUE': {
			return { ...state, disabled: true };
		}
		case 'SET_DISABLE_FALSE': {
			return { ...state, disabled: false };
		}
		case 'SET_LOADING_TRUE': {
			return { ...state, loading: true };
		}
		case 'SET_ACTION_SUCCESS': {
			return { ...state, loading: false, disabled: true };
		}
		case 'SET_ACTION_FAILED': {
			return { ...state, loading: false, disabled: false, ...payload };
		}
		case 'RESET_STATE': {
			return { ...initialState };
		}
		default: {
			throw new Error(`Unhandled action type: ${type}`);
		}
	}
};
// just to mock initial dispatch
const defaultDispatch: React.Dispatch<Action> = () => initialState;
const FirebaseStateContext = React.createContext<IState>(initialState);
const FirebaseDispatchContext = React.createContext(defaultDispatch);

const FirebaseContextProvider: FC<{ children: React.ReactElement }> = ({ children }) => {
	const [state, dispatch] = React.useReducer<React.Reducer<IState, Action>>(firebaseReducer, initialState);
	return (
		<FirebaseStateContext.Provider value={state}>
			<FirebaseDispatchContext.Provider value={dispatch}>{children}</FirebaseDispatchContext.Provider>
		</FirebaseStateContext.Provider>
	);
};

function useFirebaseState() {
	const context = React.useContext(FirebaseStateContext);
	if (context === undefined) {
		throw new Error('FirebaseStateContext must be used within a FirebaseContextProvider');
	}
	return context;
}

function useFirebaseDispatch() {
	const context = React.useContext(FirebaseDispatchContext);
	if (context === undefined) {
		throw new Error('FirebaseDispatchContext must be used within a FirebaseContextProvider');
	}
	return context;
}

function useFirebase(): [IState, React.Dispatch<Action>] {
	return [useFirebaseState(), useFirebaseDispatch()];
}

export { FirebaseContextProvider, useFirebaseState, useFirebaseDispatch, useFirebase };
export { runFirebaseAction, resetState } from './loginActions';
export type { Options } from './loginActions';
