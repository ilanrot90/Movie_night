import { atom } from 'recoil';
import { auth } from 'firebase-methods/Firebase';

type Auth =
	| {
			email: string;
			displayName: string;
			uid: string;
			verifyEmail: boolean;
	  }
	| undefined;

export const authAtom = atom<Auth>({
	key: 'auth',
	default: undefined,
});
