import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { PageContainer } from 'style/sharedStyle';
import MenuAppBar from './MenuAppBar';
import IconButton from '@material-ui/core/IconButton';
import { auth } from 'firebase-methods/Firebase';
import Icon from 'components/common-ui/icon';

const Container = styled(PageContainer)`
	position: relative;
`;
const LogoutButton = styled(IconButton)`
	position: fixed;
	bottom: 10px;
	left: 10px;
	background-color: ${({ theme }) => theme.dark};
	transition: opacity 0.125s ease-in;
	&:hover {
		background-color: ${({ theme }) => theme.dark};
		opacity: 0.8;
	}
`;

const Index = () => {
	const onClick = async () => {
		await auth.signOut();
	};

	return (
		<Container>
			<MenuAppBar />
			<Outlet />
			<LogoutButton data-testid={'logout-btn'} onClick={onClick} aria-label="log-out user" color="inherit">
				<Icon name={'exit'} />
			</LogoutButton>
		</Container>
	);
};

export default Index;
