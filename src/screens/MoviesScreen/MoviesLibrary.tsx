import React from 'react';
import { auth } from 'firebase-methods/Firebase';
import Button from 'components/common-ui/Button';

const Movies = () => {
	const onClick = async () => {
		await auth.signOut();
	};

	return <Button onClick={onClick}>log out</Button>;
};

export default React.memo(Movies);
