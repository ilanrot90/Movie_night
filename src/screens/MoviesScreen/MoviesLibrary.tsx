import React, { Suspense } from 'react';
import Header from './components/Header';
import MoviesGrid from './components/MoviesGrid';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorBoundary from 'components/ErrorBoundary';

const Movies = () => {
	return (
		<div>
			<ErrorBoundary fallback={<Skeleton variant="rect" width={'100%'} height={700} animation={false} />}>
				<Suspense fallback={<Skeleton variant="rect" width={'100%'} height={700} animation="wave" />}>
					<Header />
				</Suspense>
			</ErrorBoundary>

			<Suspense fallback={<Skeleton variant="rect" width={'100%'} height={700} animation="wave" />}>
				<MoviesGrid />
			</Suspense>
		</div>
	);
};

export default React.memo(Movies);
