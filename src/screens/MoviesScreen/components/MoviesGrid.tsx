import React, { RefObject } from 'react';
import MovieCard from './MovieCard';
import { MainContainer, Title, InfiniteLoader } from '../style';
import { useInfiniteQuery } from 'react-query';
import { GridContainer, GridItem } from 'style/sharedStyle';
import { MoviesResponse } from 'types';
import { getMoviesList } from 'queries/movies.queries';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { createGridItemSkeleton } from 'components/GridSkeleton';

const getNextPage = ({ movie_count, limit, page_number }: MoviesResponse): number | undefined =>
	Math.ceil(movie_count / limit) > page_number ? page_number + 1 : undefined;

const MoviesGrid = () => {
	const loadMoreRef = React.useRef() as RefObject<HTMLSpanElement>;
	const { data, fetchMore, canFetchMore, isFetchingMore } = useInfiniteQuery<MoviesResponse>('movies-list', getMoviesList, {
		staleTime: 1000 * 60 * 5,
		getFetchMore: getNextPage,
	});

	return (
		<MainContainer>
			<Title>latest movies</Title>
			<GridContainer>
				{data?.map((page, idx) => (
					<React.Fragment key={idx}>
						{page.movies.map(movie => (
							<GridItem key={movie.id} aria-label="grid-item">
								<MovieCard movie={movie} />
							</GridItem>
						))}
					</React.Fragment>
				))}

				{isFetchingMore && createGridItemSkeleton(14)}
				<InfiniteLoader ref={loadMoreRef} />
			</GridContainer>
		</MainContainer>
	);
};

export default React.memo(MoviesGrid);
