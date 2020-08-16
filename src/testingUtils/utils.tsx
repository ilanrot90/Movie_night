import React, { ComponentType, ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import ThemeProvider from 'style/ThemeProvider';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';

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
	app?: ReactElement;
};

export function renderUi({ app = <App />, route, ...renderOptions }: RenderOptions) {
	return render(app, { wrapper: renderProviders(route) as ComponentType, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
export { userEvent };
