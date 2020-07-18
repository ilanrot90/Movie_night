import React, { FC, useCallback } from 'react';
import { MOVIES_PATH } from 'routes/routesPaths';
import { useRouter } from 'hooks/useRouter';
import { Container } from './style';
import Button from 'components/common-ui/Button';
import { auth, googleProvider } from 'firebase-methods/Firebase';
import Icon from 'components/common-ui/icon';

const LoginPage: FC = () => {
	const { replace } = useRouter();

	const handleAuth = useCallback(async () => {
		// TODO: handle login
		await auth.signInWithPopup(googleProvider);
		replace(`../${MOVIES_PATH}`);
	}, [replace]);

	return (
		<Container>
			<Button endIcon={<Icon name="google" size={22} />} fullWidth socialType="google" onClick={handleAuth}>
				log in with google
			</Button>
			<Button endIcon={<Icon name="facebook" size={22} />} fullWidth socialType="facebook" onClick={handleAuth}>
				log in with facebook
			</Button>
			<Button endIcon={<Icon name="github" size={22} />} fullWidth socialType="github" onClick={handleAuth}>
				log in with github
			</Button>
		</Container>
	);
};

export default React.memo(LoginPage);
