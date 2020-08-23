import React, { ComponentType, ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import ThemeProvider from 'style/ThemeProvider';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import mockAxois from './mocks/axiosMock';
import { TMDB_GET_MOVIES_LIST, YTS_GET_MOVIES_LIST } from '../queries/movies.queries';
import mockYTSResponse from './mocks/YTSMovies.json';
import mockTMDBResponse from './mocks/TMDBMovies.json';

export const homePageRender = () => {
	mockAxois.mockRequest({ url: YTS_GET_MOVIES_LIST(1), responseData: mockYTSResponse });
	mockAxois.mockRequest({ url: TMDB_GET_MOVIES_LIST, responseData: mockTMDBResponse });
	renderUi({ route: '/app' });
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
