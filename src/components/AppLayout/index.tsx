import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { PageContainer } from 'style/sharedStyle';
import MenuAppBar from './MenuAppBar';

const Container = styled(PageContainer)`
	position: relative;
`;

const Index = () => {
	return (
		<Container>
			<MenuAppBar />
			<Outlet />
		</Container>
	);
};

export default Index;
