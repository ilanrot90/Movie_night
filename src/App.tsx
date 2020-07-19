import React, { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { authAtom } from 'state/atoms/authAtom';
import { useMount } from 'hooks/useMount';
import { auth } from 'firebase-methods/Firebase';
import ProjectRoutes from 'routes/ProjectRoutes';

const App = () => {
	const [isReady, setMount] = useState(false);
	const setUser = useSetRecoilState(authAtom);
	const reset = useResetRecoilState(authAtom);

	useMount(() => {
		auth.onAuthStateChanged(user => {
			setMount(true);
			console.log({ user });
			if (user) {
				const { refreshToken } = user;
				const email = user?.providerData[0]?.email;
				const displayName = user?.providerData[0]?.displayName;
				// User is signed in.
				setUser({ email, displayName, refreshToken });
			} else {
				// No user is signed in.
				reset();
			}
		});
	});

	if (!isReady) {
		return null;
	}
	return (
		<AnimatePresence exitBeforeEnter>
			<ProjectRoutes />
		</AnimatePresence>
	);
};

export default App;
