import React, { ReactElement, FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';
import { themeSelector } from 'state/atoms/styleAtom';
import theme, { Theme } from './theme';
import { StylesProvider, ThemeProvider as MaterialProvider, createMuiTheme } from '@material-ui/core/styles';

interface IProps {
	children: ReactElement;
}
const createTheme = (theme: Theme) =>
	createMuiTheme({
		palette: {
			primary: theme,
		},
	});

const ThemeProvider: FC<IProps> = ({ children }) => {
	const themeValue = useRecoilValue(themeSelector);
	const muiTheme = useMemo(() => createTheme(theme[themeValue]), [themeValue]);

	return (
		<MaterialProvider theme={muiTheme}>
			<StylesProvider injectFirst>
				<StyledComponentsProvider theme={theme[themeValue]}>{children}</StyledComponentsProvider>
			</StylesProvider>
		</MaterialProvider>
	);
};

export default ThemeProvider;
