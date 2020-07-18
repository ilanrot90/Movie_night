import React from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { authAtom } from 'state/atoms/authAtom';
import { LOGIN_PATH } from 'routes/routesPaths';
import { useRouter } from 'hooks/useRouter';
import { useMount } from 'hooks/useMount';
import { auth } from 'firebase-methods/Firebase';
import ProjectRoutes from 'routes/ProjectRoutes';

const App = () => {
	const { replace } = useRouter();
	const setUser = useSetRecoilState(authAtom);
	const reset = useResetRecoilState(authAtom);

	useMount(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				const { email, displayName, refreshToken } = user;
				console.log({ user });
				// User is signed in.
				setUser({ email, displayName, refreshToken });
			} else {
				// No user is signed in.
				reset();
				replace(LOGIN_PATH);
			}
		});
	});

	return <ProjectRoutes />;
};

export default App;
