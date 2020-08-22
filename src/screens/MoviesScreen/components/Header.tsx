import React from 'react';
import Slider from 'components/common-ui/ImageSlider';
import { useQuery } from 'react-query';
import { TMDBMoviesResponse } from 'types';
import { getTopWeekMovies, TMDB_GET_MOVIE_POSTER } from 'queries/movies.queries';

const Header = () => {
	const { data } = useQuery<TMDBMoviesResponse>('top-weekly-movies-list', getTopWeekMovies, {
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 60,
	});
	const slides = data?.map(movie => TMDB_GET_MOVIE_POSTER(movie.backdrop_path));

	return (
		<div>
			<Slider slides={slides || []} height={700} />
		</div>
	);
};

export default Header;
