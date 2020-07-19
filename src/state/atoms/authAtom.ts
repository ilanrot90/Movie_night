import { atom } from 'recoil';
import { auth } from 'firebase-methods/Firebase';

type Auth =
	| {
			email: string | null | undefined;
			displayName: string | null | undefined;
			refreshToken: string | null | undefined;
	  }
	| undefined;

export const authAtom = atom<Auth>({
	key: 'auth',
	default: auth.currentUser
		? { email: auth.currentUser.email, displayName: auth.currentUser.refreshToken, refreshToken: auth.currentUser.refreshToken }
		: undefined,
});
