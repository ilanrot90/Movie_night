import React, { FC } from 'react';
import { Container, FormContainer } from './style';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
const LoginPage: FC = () => {
	return (
		<Container>
			<FormContainer>
				<AnimatePresence>
					<Outlet />
				</AnimatePresence>
			</FormContainer>
		</Container>
	);
};

export default React.memo(LoginPage);
