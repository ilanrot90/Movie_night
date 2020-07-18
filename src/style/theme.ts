import { DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';
import { centerFlex } from './sharedStyle';
export interface Theme {
	light: string;
	background: string;
	main: string;
	dark: string;
	contrastText: string;
	utils: {
		centerFlex: FlattenSimpleInterpolation;
	};
}

declare module 'styled-components' {
	export interface DefaultTheme {
		light: string;
		background: string;
		main: string;
		dark: string;
		contrastText: string;
		utils: {
			centerFlex: FlattenSimpleInterpolation;
		};
		spacing: {
			s: number;
			m: number;
			l: number;
			xl: number;
		};
	}
}

const sharedTheme = {
	utils: {
		centerFlex,
	},
	spacing: {
		s: 4,
		m: 8,
		l: 16,
		xl: 24,
	},
};

const theme = {
	light: {
		background: '#f9fafa',
		light: '#757ce8',
		main: '#3f50b5',
		dark: '#002884',
		contrastText: '#222831',
		...sharedTheme,
	},
	dark: {
		background: '#222831',
		light: '#e7cbeb',
		main: '#e1bee7',
		dark: '#9d85a1',
		contrastText: '#f9fafa',
		...sharedTheme,
	},
};

export default theme;
