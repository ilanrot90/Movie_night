import { DefaultTheme, FlattenSimpleInterpolation, css } from 'styled-components';
import { centerFlex, scrollbar } from './sharedStyle';

declare module 'styled-components' {
	export interface DefaultTheme {
		light: string;
		background: string;
		main: string;
		dark: string;
		contrastText: string;
		utils: {
			centerFlex: FlattenSimpleInterpolation;
			scrollbar: FlattenSimpleInterpolation;
			quickTransition: string;
			normalTransition: string;
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
			l: FlattenSimpleInterpolation;
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
		scrollbar,
		quickTransition: `0.125s ease-in-out`,
		normalTransition: `0.250s ease-in-out`,
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
		l: css`
			box-shadow: rgba(3, 8, 20, 0.1) 0 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0 0.075rem 0.175rem;
		`,
	},
};

const theme = {
	light: {
		background: 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
		light: '#e7cbeb',
		main: '#e1bee7',
		dark: '#9d85a1',
		contrastText: '#222831',
		...sharedTheme,
	},
	dark: {
		background:
			'linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);\n' +
			' background-blend-mode: multiply;',
		light: '#757ce8',
		main: '#3f50b5',
		dark: '#222831',
		contrastText: '#f9fafa',
		...sharedTheme,
	},
};

export default theme;
