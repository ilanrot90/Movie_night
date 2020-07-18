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
			<Button fullWidth socialType="google" onClick={handleAuth}>
				log in with google
			</Button>
			<Button fullWidth socialType="facebook" onClick={handleAuth}>
				log in with facebook
			</Button>
			<Button fullWidth socialType="github" onClick={handleAuth}>
				log in with github
			</Button>
		</Container>
	);
};

export default React.memo(LoginPage);
