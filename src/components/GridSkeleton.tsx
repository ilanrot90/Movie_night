import React, { FC } from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import { GridContainer, GridItem } from 'style/sharedStyle';

const SkeletonContainer = styled(GridContainer)`
	margin: 80px ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.xl}px;
`;

const SkeletonItem = styled(Skeleton)``;
type Animate = false | 'pulse' | 'wave' | undefined;

export const createGridItemSkeleton = (length: number, animate: Animate = 'wave') =>
	Array.from({ length }).map((_, i) => (
		<GridItem key={i}>
			<SkeletonItem variant="rect" width={'100%'} height={'100%'} animation={animate} />
		</GridItem>
	));

const GridSkeleton: FC<{ animate?: Animate }> = ({ animate = 'wave' }) => {
	return (
		<SkeletonContainer role={`movie-list-skeleton-${animate ? 'loader' : 'fallback'}`}>
			{createGridItemSkeleton(9)}
		</SkeletonContainer>
	);
};

export default React.memo(GridSkeleton);
