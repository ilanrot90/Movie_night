import React, { ComponentType, ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import ThemeProvider from 'style/ThemeProvider';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';

/* --custom queries--
import { fromPairs } from 'utils/lodash.utils';

const GETTERS = ['Text', 'Role', 'TestId', 'LabelText', 'AltText', 'PlaceholderText'] as const;
const gettersMap = {
	Text: 'findByText' as const,
	Role: 'findByRole' as const,
	TestId: 'findByTestId' as const,
	LabelText: 'findByLabelText' as const,
	AltText: 'findByAltText' as const,
	PlaceholderText: 'findByPlaceholderText' as const,
};
const gettersKeys = {
	Text: 'clickByText' as 'findByText',
	Role: 'clickByRole' as 'findByRole',
	TestId: 'clickByTestId' as 'findByTestId',
	LabelText: 'clickByLabelText' as 'findByLabelText',
	AltText: 'clickByAltText' as 'findByAltText',
	PlaceholderText: 'clickByPlaceholderText' as 'findByPlaceholderText',
};
const clickByFactory = (fn: Function) => async (...args: Array<any>) => {
	const el: TargetElement = await fn(...args);
	el && userEvent.click(el);
	return el;
};
const changeByFactory = (fn: Function) => async (value: string, ...args: Array<any>) => {
	const el: TargetElement = await fn(...args);
	el && (await userEvent.type(el, value));
	return el;
};

const customQueries = {
	...fromPairs(GETTERS.map(v => [gettersKeys[v], clickByFactory(screen[gettersMap[v]])])),
	...fromPairs(GETTERS.map(v => [gettersKeys[v], changeByFactory(screen[gettersMap[v]])])),
};
*/
// helper to test login screens
export const signOutRender = async () => {
	renderUi({ route: '/app' });
	// open menu
	const menuButton = screen.getByRole('button', { name: /account of current user/i });
	expect(menuButton).toBeInTheDocument();
	userEvent.click(menuButton);

	expect(screen.getByTestId(/logout-btn/i)).toBeInTheDocument();
	userEvent.click(screen.getByTestId(/logout-btn/i));
	return await waitFor(() => expect(screen.getAllByRole('button', { name: /log in/i })).toBeArrayOfSize(4));
};

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
export function renderUi({ route, ...renderOptions }: RenderOptions) {
	return render(<App />, { wrapper: renderProviders(route) as ComponentType, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
export { userEvent };
