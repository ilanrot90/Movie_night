import React, { Suspense } from 'react';
import Header from './components/Header';
import Skeleton from '@material-ui/lab/Skeleton';

const Movies = () => {
	return (
		<div>
			<Suspense fallback={<Skeleton variant="rect" width={'100%'} height={400} animation="wave" />}>
				<Header />
			</Suspense>
		</div>
	);
};

export default React.memo(Movies);
