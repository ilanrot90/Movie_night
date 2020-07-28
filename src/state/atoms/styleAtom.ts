import { atom, selector } from 'recoil';

type themeValue = 'dark' | 'light';

export const themeAtom = atom<themeValue>({
	key: 'themeAtom',
	default: 'dark',
});

export const themeSelector = selector<themeValue>({
	key: 'themeSelector',
	get: ({ get }) => get<themeValue>(themeAtom),
	set: ({ set }, selectedTheme) => {
		const theme = selectedTheme ? 'dark' : 'light';
		// TODO: update localStorage
		return set<themeValue>(themeAtom, theme);
	},
});
