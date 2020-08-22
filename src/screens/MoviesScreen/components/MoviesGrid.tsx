import React from 'react';
import MovieCard from './MovieCard';
import { MainContainer, Title } from '../style';
import { useQuery } from 'react-query';
import { GridContainer, GridItem } from 'style/sharedStyle';
import { MoviesResponse } from 'types';
import { getMoviesList } from 'queries/movies.queries';

const MoviesGrid = () => {
	const { data } = useQuery<MoviesResponse>('movies-list', getMoviesList, {
		staleTime: 1000 * 60 * 5,
	});

	return (
		<MainContainer>
			<Title>latest movies</Title>
			<GridContainer>
				{data?.movies?.map(movie => (
					<GridItem key={movie.id}>
						<MovieCard movie={movie} />
					</GridItem>
				))}
			</GridContainer>
		</MainContainer>
	);
};

export default React.memo(MoviesGrid);
