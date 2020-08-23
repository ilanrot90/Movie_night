import React, { Suspense } from 'react';
import Header from './components/Header';
import MoviesGrid from './components/MoviesGrid';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorBoundary from 'components/ErrorBoundary';
import GridSkeleton from 'components/GridSkeleton';

const Movies = () => {
	return (
		<div>
			<ErrorBoundary
				fallback={<Skeleton role={'header-error-fallback'} variant="rect" width={'100%'} height={700} animation={false} />}
			>
				<Suspense fallback={<Skeleton role={'header-loader'} variant="rect" width={'100%'} height={700} animation="wave" />}>
					<Header />
				</Suspense>
			</ErrorBoundary>

			<ErrorBoundary fallback={<GridSkeleton animate={false} />}>
				<Suspense fallback={<GridSkeleton />}>
					<MoviesGrid />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default React.memo(Movies);
