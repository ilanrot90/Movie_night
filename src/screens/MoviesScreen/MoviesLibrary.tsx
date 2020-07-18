import React from 'react';
import { auth } from 'firebase-methods/Firebase';
import Button from 'components/common-ui/Button';
import { Container } from './style';

const Movies = () => {
	const onClick = async () => {
		await auth.signOut();
	};

	return (
		<Container>
			<Button onClick={onClick}>log out</Button>
		</Container>
	);
};

export default React.memo(Movies);
