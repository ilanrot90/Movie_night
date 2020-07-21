import { atom } from 'recoil';

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
