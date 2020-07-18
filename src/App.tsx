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
			if (user) {
				const { email, displayName, refreshToken } = user;
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
		<AnimatePresence>
			<ProjectRoutes />
		</AnimatePresence>
	);
};

export default App;
