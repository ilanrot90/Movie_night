import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { MainContainer, Title } from '../style';
import { useQuery } from 'react-query';
import { GridContainer, GridItem } from 'style/sharedStyle';
import { MoviesResponse } from 'types';

const MoviesGrid = () => {
	const { data } = useQuery<MoviesResponse>(
		'movies-list',
		async () => {
			const source = axios.CancelToken.source();
			const {
				data: { data },
			} = await axios.get('https://yts.mx/api/v2/list_movies.json?page=1', {
				cancelToken: source.token,
			});

			return data;
		},
		{
			suspense: true,
		}
	);

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
