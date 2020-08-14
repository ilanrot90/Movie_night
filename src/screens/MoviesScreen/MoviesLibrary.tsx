import React, { Suspense } from 'react';
import Header from './components/Header';
import MoviesGrid from './components/MoviesGrid';
import Skeleton from '@material-ui/lab/Skeleton';

const Movies = () => {
	return (
		<div>
			<Suspense fallback={<Skeleton variant="rect" width={'100%'} height={700} animation="wave" />}>
				<Header />
			</Suspense>
			<Suspense fallback={<Skeleton variant="rect" width={'100%'} height={700} animation="wave" />}>
				<MoviesGrid />
			</Suspense>
		</div>
	);
};

export default React.memo(Movies);
