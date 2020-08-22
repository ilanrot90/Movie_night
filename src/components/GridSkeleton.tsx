import React, { FC } from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import { GridContainer, GridItem } from 'style/sharedStyle';

const SkeletonContainer = styled(GridContainer)`
	margin-top: 80px;
`;

const GridSkeleton: FC<{ animate?: false | 'pulse' | 'wave' | undefined }> = ({ animate = 'wave' }) => {
	return (
		<SkeletonContainer>
			{Array.from({ length: 9 }).map((_, i) => (
				<GridItem key={i}>
					<Skeleton variant="rect" width={'100%'} height={'100%'} animation={animate} />
				</GridItem>
			))}
		</SkeletonContainer>
	);
};

export default React.memo(GridSkeleton);
