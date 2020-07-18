import { atom } from 'recoil';

type Auth =
	| {
			email: string | null;
			displayName: string | null;
			refreshToken: string | null;
	  }
	| undefined;

export const authAtom = atom<Auth>({
	key: 'auth',
	default: undefined,
});
