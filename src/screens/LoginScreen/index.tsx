import React, { FC } from 'react';
import { FirebaseContextProvider } from 'state/context/loginContext';
import { Container, FormContainer, Text, MarginContainer } from './style';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from 'components/ErrorBoundary';

const FallBack = () => (
	<FormContainer>
		<MarginContainer auto>
			<Text as={'h2'} weight={600}>
				Something went wrong.
			</Text>
		</MarginContainer>
	</FormContainer>
);

const LoginPage: FC = () => {
	return (
		<Container>
			<FirebaseContextProvider>
				<ErrorBoundary fallback={<FallBack />}>
					<FormContainer>
						<AnimatePresence>
							<Outlet />
						</AnimatePresence>
					</FormContainer>
				</ErrorBoundary>
			</FirebaseContextProvider>
		</Container>
	);
};

export default React.memo(LoginPage);
