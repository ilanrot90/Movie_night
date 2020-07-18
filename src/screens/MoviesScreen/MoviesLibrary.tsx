import React from 'react';
import { auth } from '../../firebase-methods/Firebase';
import Button from '../../components/common-ui/Button';

const Movies = () => {
	const onClick = async () => {
		auth.signOut().then(r => {});
	};
	return (
		<div>
			<Button onClick={onClick}>log out</Button>
		</div>
	);
};

export default React.memo(Movies);
