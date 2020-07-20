import { DefaultTheme, FlattenSimpleInterpolation, css } from 'styled-components';
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
			xxl: number;
		};
		shadow: {
			m: FlattenSimpleInterpolation;
		};
		text: {
			s: number;
			m: number;
			l: number;
			xl: number;
		};
	}
}

const sharedTheme = {
	text: {
		s: 10,
		m: 14,
		l: 18,
		xl: 24,
	},
	utils: {
		centerFlex,
	},
	spacing: {
		s: 4,
		m: 8,
		l: 16,
		xl: 24,
		xxl: 32,
	},
	shadow: {
		m: css`
			box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
		`,
	},
};

const theme = {
	light: {
		background: '#f9fafa',
		light: '#e7cbeb',
		main: '#e1bee7',
		dark: '#9d85a1',
		contrastText: '#222831',
		...sharedTheme,
	},
	dark: {
		background: '#121212',
		light: '#757ce8',
		main: '#3f50b5',
		dark: '#222831',
		contrastText: '#f9fafa',
		...sharedTheme,
	},
};

export default theme;
