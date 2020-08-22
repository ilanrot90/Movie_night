import React, { FC } from 'react';
import styled from 'styled-components';
import useLazyImage from 'hooks/useLazyImage';
import { RatingStar } from 'components/common-ui/RatingStar';
import Icon from 'components/common-ui/icon';
import { Text } from 'style/sharedStyle';
import { Movie } from 'types';

const PlayIcon = styled(Icon)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: none;
`;

const Card = styled.div<{ imageSrc: string }>`
	display: flex;
	flex-direction: column;
	position: relative;
	cursor: pointer;
	border-radius: 4px;
	background-image: url(${({ imageSrc }) => imageSrc});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	padding: ${({ theme }) => theme.spacing.m}px;
	&:hover ${PlayIcon} {
		display: block;
	}
`;

const MovieTitle = styled(Text)`
	margin-bottom: ${({ theme }) => theme.spacing.m}px;
	width: fit-content;
	position: relative;
	z-index: 1;
	&::before {
		position: absolute;
		content: '';
		background-image: ${({ theme }) => theme.background};
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.4;
		z-index: -1;
	}
`;

const CardDetails = styled(Text).attrs({
	as: 'span',
})`
	margin-top: auto;
`;

type Props = {
	movie: Movie;
};

const MovieCard: FC<Props> = ({ movie }) => {
	const { elementRef, imageSrc } = useLazyImage<HTMLDivElement>({ src: movie.medium_cover_image });
	return (
		<Card ref={elementRef} imageSrc={imageSrc}>
			<PlayIcon size={44} name={'play'} />
			<CardDetails>
				<MovieTitle>{movie.title}</MovieTitle>
				<RatingStar size={16} rating={movie.rating} />
			</CardDetails>
		</Card>
	);
};

export default React.memo<Props>(MovieCard);
