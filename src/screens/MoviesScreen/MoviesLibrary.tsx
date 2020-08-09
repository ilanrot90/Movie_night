import React, { Suspense } from 'react';
import Header from './components/Header';

const Movies = () => {
	return (
		<div>
			<Suspense fallback={'loading header...'}>
				<Header />
			</Suspense>
		</div>
	);
};

export default React.memo(Movies);
