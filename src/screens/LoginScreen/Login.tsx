import React, { FC, useCallback } from 'react';
import { MOVIES_PATH } from 'routes/routesPaths';
import { useRouter } from 'hooks/useRouter';
import { Container } from './style';
import Button from 'components/common-ui/Button';
import { auth, googleProvider } from 'firebase-methods/Firebase';

const LoginPage: FC = () => {
	const { replace } = useRouter();

	const handleAuth = useCallback(async () => {
		// TODO: handle login
		await auth.signInWithPopup(googleProvider);
		replace(`../${MOVIES_PATH}`);
	}, [replace]);

	return (
		<Container>
			<Button onClick={handleAuth}>log in</Button>
		</Container>
	);
};

export default React.memo(LoginPage);
