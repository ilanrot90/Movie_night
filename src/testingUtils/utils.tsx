import React, { ComponentType, ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import history from './history';
import { render } from '@testing-library/react';
import App from 'App';
import ThemeProvider from 'style/ThemeProvider';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';

const renderProviders = (route: string) => ({ children }: { children: ReactElement }): ReactElement => (
	<RecoilRoot>
		<ThemeProvider>
			<MemoryRouter initialEntries={[route]}> {children}</MemoryRouter>
		</ThemeProvider>
	</RecoilRoot>
);
type RenderOptions = {
	route: string;
};
// function renderUi(ui: ReactElement, { initialState = { auth }, store = getStore(initialState), ...renderOptions } = {}) {
export function renderUi({ route, ...renderOptions }: RenderOptions) {
	return render(<App />, { wrapper: renderProviders(route) as ComponentType, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
export { userEvent, history };
