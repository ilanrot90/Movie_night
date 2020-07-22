import React, { FC } from 'react';
import { FirebaseContextProvider } from './context/loginContext';
import { Container, FormContainer } from './style';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
const LoginPage: FC = () => {
	return (
		<Container>
			<FirebaseContextProvider>
				<FormContainer>
					<AnimatePresence>
						<Outlet />
					</AnimatePresence>
				</FormContainer>
			</FirebaseContextProvider>
		</Container>
	);
};

export default React.memo(LoginPage);
