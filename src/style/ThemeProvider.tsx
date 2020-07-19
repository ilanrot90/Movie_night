import React, { ReactElement, FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { ThemeProvider as StyledComponentsProvider, DefaultTheme } from 'styled-components';
import { themeAtom } from 'state/atoms/styleAtom';
import theme from './theme';
import { StylesProvider, ThemeProvider as MaterialProvider, createMuiTheme } from '@material-ui/core/styles';
import { BaseContainer } from './sharedStyle';

interface IProps {
	children: ReactElement;
}
const createTheme = (theme: DefaultTheme) =>
	createMuiTheme({
		palette: {
			primary: theme,
		},
	});

const ThemeProvider: FC<IProps> = ({ children }) => {
	const themeValue = useRecoilValue(themeAtom);
	const muiTheme = useMemo(() => createTheme(theme[themeValue]), [themeValue]);

	return (
		<MaterialProvider theme={muiTheme}>
			<StylesProvider injectFirst>
				<StyledComponentsProvider theme={theme[themeValue]}>
					<BaseContainer>{children}</BaseContainer>
				</StyledComponentsProvider>
			</StylesProvider>
		</MaterialProvider>
	);
};

export default ThemeProvider;
