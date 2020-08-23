import { renderUi, waitFor, screen } from 'testingUtils/utils';
import mockAxois from 'testingUtils/mocks/axiosMock';
import { TMDB_GET_MOVIES_LIST, YTS_GET_MOVIES_LIST } from 'queries/movies.queries';
import * as mockedMethods from 'queries/movies.queries';
import mockTMDBResponse from 'testingUtils/mocks/TMDBMovies.json';
import mockYTSResponse from 'testingUtils/mocks/YTSMovies.json';

const mockedGetMoviesList = jest.spyOn(mockedMethods, 'getMoviesList');
const mockedGetTopWeekMovies = jest.spyOn(mockedMethods, 'getTopWeekMovies');

describe('Render movies from API calls', () => {
	afterAll(() => {
		mockedGetMoviesList.mockRestore();
		mockedGetTopWeekMovies.mockRestore();
	});

	test('render movies to screen', async () => {
		renderUi({ route: '/app' });
		// return movies from YTS API
		mockAxois.mockRequest({ url: YTS_GET_MOVIES_LIST(1), responseData: mockYTSResponse });
		const MovieListQueryData = mockYTSResponse.data;
		expect(mockedGetMoviesList).toHaveBeenCalledTimes(1);
		await waitFor(() => expect(mockedGetMoviesList).toHaveReturnedWith(Promise.resolve(MovieListQueryData)));

		// return movies from TMDB API
		mockAxois.mockRequest({ url: TMDB_GET_MOVIES_LIST, responseData: mockTMDBResponse });
		const MovieTopWeekQueryData = mockTMDBResponse.results;
		expect(mockedGetTopWeekMovies).toHaveBeenCalledTimes(1);
		await waitFor(() => expect(mockedGetTopWeekMovies).toHaveReturnedWith(Promise.resolve(MovieTopWeekQueryData)));

		const moviesItems = await screen.findAllByLabelText(/grid-item/i);
		expect(moviesItems).toHaveLength(4);
	});
});
