import React, { lazy, Suspense } from 'react';
import { Props } from './IconSvg';
const IconImpl = lazy(() => import('./IconSvg'));

export default (props: Props) => (
	<Suspense fallback={<i id={props.name}>&nbsp;</i>}>
		<IconImpl {...props} />
	</Suspense>
);
