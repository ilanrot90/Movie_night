import React, { FC, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { authAtom } from 'state/atoms/authAtom';
import { MOVIES_PATH } from 'routes/routesPaths';
import { useRouter } from 'hooks/useRouter';
import { Container } from './style';
import Button from 'components/common-ui/Button';
import { auth, googleProvider } from 'firebase-methods/Firebase';

const LoginPage: FC = () => {
	const setAuth = useSetRecoilState(authAtom);
	const { replace } = useRouter();

	const handleAuth = useCallback(async () => {
		// TODO: handle login
		const user = await auth.signInWithPopup(googleProvider);
		// setAuth({
		//   name: 'user'
		// });
		replace(`../${MOVIES_PATH}`);
	}, [setAuth, replace]);

	return (
		<Container>
			<Button onClick={handleAuth}>log in</Button>
		</Container>
	);
};

export default React.memo(LoginPage);
