import request, { axios } from 'axiosRequest';
import { TMBD_KEY } from 'config';
import { TMDBMovie, MoviesResponse } from 'types';

export const TMDB_GET_MOVIES_LIST = `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMBD_KEY}`;
export const YTS_GET_MOVIES_LIST = (page = 1) => `https://yts.mx/api/v2/list_movies.json?page=${page}`;

const getRequestList = <T>(url: string) => {
	const source = axios.CancelToken.source();
	return request.get<T>(url, {
		cancelToken: source.token,
	});
};

export const TMDB_GET_MOVIE_POSTER = (image: string) => `https://image.tmdb.org/t/p/original${image}`;

export const getMoviesList = async (key: string, nextPage = 1): Promise<MoviesResponse> => {
	const url = YTS_GET_MOVIES_LIST(nextPage);
	const {
		data: { data },
	} = await getRequestList<{ data: MoviesResponse }>(url);

	return data;
};

export const getTopWeekMovies = async (): Promise<TMDBMovie[]> => {
	const {
		data: { results },
	} = await getRequestList<{ results: TMDBMovie[] }>(TMDB_GET_MOVIES_LIST);

	return results;
};
