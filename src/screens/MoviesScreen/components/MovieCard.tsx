import React, { FC } from 'react';
import styled from 'styled-components';
import Icon from 'components/common-ui/icon';
import { Text } from 'style/sharedStyle';
import { RatingStar } from 'components/common-ui/RatingStar';

const PlayIcon = styled(Icon)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: none;
`;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	cursor: pointer;
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
	return (
		<Card>
			<PlayIcon size={44} name={'play'} />
			<CardDetails>
				<MovieTitle>{item.title}</MovieTitle>
				<RatingStar size={16} rating={6.5} />
			</CardDetails>
		</Card>
	);
};

export default React.memo<Props>(MovieCard);
