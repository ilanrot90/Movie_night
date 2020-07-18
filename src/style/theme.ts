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
	}
}

const theme = {
	light: {
		background: '#f9fafa',
		light: '#757ce8',
		main: '#3f50b5',
		dark: '#002884',
		contrastText: '#222831',
		utils: {
			centerFlex,
		},
	},
	dark: {
		background: '#222831',
		light: '#e7cbeb',
		main: '#e1bee7',
		dark: '#9d85a1',
		contrastText: '#f9fafa',
		utils: {
			centerFlex,
		},
	},
};

export default theme;
