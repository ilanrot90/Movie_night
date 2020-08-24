import { waitFor, screen, homePageRender, renderUi } from 'testingUtils/utils';
import { queryCache } from 'react-query';
import * as mockedMethods from 'queries/movies.queries';
import mockTMDBResponse from 'testingUtils/mocks/TMDBMovies.json';
import mockYTSResponse from 'testingUtils/mocks/YTSMovies.json';
import mockAxois from 'testingUtils/mocks/axiosMock';
import { TMDB_GET_MOVIES_LIST, YTS_GET_MOVIES_LIST } from 'queries/movies.queries';

const mockedGetMoviesList = jest.spyOn(mockedMethods, 'getMoviesList');
const mockedGetTopWeekMovies = jest.spyOn(mockedMethods, 'getTopWeekMovies');

describe('Render movies from API calls', () => {
	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
		jest.spyOn(console, 'dir').mockImplementation(() => {});
	});
	// clear queryCache after each call
	afterEach(() => {
		queryCache.clear();
		mockedGetTopWeekMovies.mockClear();
		mockedGetMoviesList.mockClear();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	test('Render ErrorBoundry when TMDB API returns status 400', async () => {
		jest.useFakeTimers();

		renderUi({ route: '/app' });
		expect(screen.queryByRole(/header-loader/i)).toBeInTheDocument();
		mockAxois.mockRequest({ url: YTS_GET_MOVIES_LIST(1), responseData: mockYTSResponse });
		Array.from({ length: 2 }).forEach(() => {
			// react query will try to re-fetch two more times
			mockAxois.mockRequest({ url: TMDB_GET_MOVIES_LIST, status: 400 });
		});
		expect(mockedGetTopWeekMovies).toHaveBeenCalledTimes(1);
		expect(mockedGetMoviesList).toHaveBeenCalledTimes(1);

		jest.advanceTimersByTime(10000);
		await waitFor(() => expect(screen.queryByRole(/header-error-fallback/i)).toBeInTheDocument());

		jest.useRealTimers();
	});

	test('Render ErrorBoundry when YTS API returns status 400', async () => {
		jest.useFakeTimers();

		renderUi({ route: '/app' });
		expect(screen.queryByRole(/movie-list-skeleton-loader/i)).toBeInTheDocument();
		Array.from({ length: 2 }).forEach(() => {
			// react query will try to re-fetch two more times
			mockAxois.mockRequest({ url: YTS_GET_MOVIES_LIST(1), status: 400 });
		});
		mockAxois.mockRequest({ url: TMDB_GET_MOVIES_LIST, responseData: mockTMDBResponse });
		expect(mockedGetTopWeekMovies).toHaveBeenCalledTimes(1);
		expect(mockedGetMoviesList).toHaveBeenCalledTimes(1);

		jest.advanceTimersByTime(10000);
		await waitFor(() => expect(screen.queryByRole(/movie-list-skeleton-fallback/i)).toBeInTheDocument());
		expect(screen.queryByRole(/movie-list-skeleton-loader/i)).not.toBeInTheDocument();

		jest.useRealTimers();
	});

	test('render movies to screen', async () => {
		homePageRender();
		// Show Suspense fallback component
		expect(screen.queryByRole(/header-loader/i)).toBeInTheDocument();
		expect(screen.queryByRole(/movie-list-skeleton-loader/i)).toBeInTheDocument();
		// return movies from YTS API
		const MovieListQueryData = mockYTSResponse.data;
		expect(mockedGetMoviesList).toHaveBeenCalledTimes(1);
		await waitFor(() => expect(mockedGetMoviesList).toHaveReturnedWith(Promise.resolve(MovieListQueryData)));

		// return movies from TMDB API
		const MovieTopWeekQueryData = mockTMDBResponse.results;
		expect(mockedGetTopWeekMovies).toHaveBeenCalledTimes(1);
		await waitFor(() => expect(mockedGetTopWeekMovies).toHaveReturnedWith(Promise.resolve(MovieTopWeekQueryData)));
		// Render slider to DOM
		expect(screen.queryByTestId(/image-slider/i)).toBeInTheDocument();

		// Render movies to DOM
		const moviesItems = await screen.findAllByLabelText(/grid-item/i);
		expect(moviesItems).toHaveLength(4);
	});
});
