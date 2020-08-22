import React, { FC } from 'react';
import styled from 'styled-components';
import useLazyImage from 'hooks/useLazyImage';
import { RatingStar } from 'components/common-ui/RatingStar';
import Icon from 'components/common-ui/icon';
import { Text } from 'style/sharedStyle';

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
`;

const CardDetails = styled(Text).attrs({
	as: 'span',
})`
	margin-top: auto;
`;

type Props = {
	item: {
		title: string;
		imageUrl: string;
	};
};

const MovieCard: FC<Props> = ({ item }) => {
	const { elementRef, imageSrc } = useLazyImage<HTMLDivElement>({ src: item.imageUrl });
	return (
		<Card ref={elementRef} imageSrc={imageSrc}>
			<PlayIcon size={44} name={'play'} />
			<CardDetails>
				<MovieTitle>{item.title}</MovieTitle>
				<RatingStar size={16} rating={6.5} />
			</CardDetails>
		</Card>
	);
};

export default React.memo<Props>(MovieCard);
