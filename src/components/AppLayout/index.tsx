import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { PageContainer, HEADER_HEIGHT } from 'style/sharedStyle';
import MenuAppBar from './MenuAppBar';

const Container = styled(PageContainer)`
	position: relative;
	height: calc(100vh - ${HEADER_HEIGHT});
	${({ theme }) => theme.utils.scrollbar}
	overflow-x: hidden;
`;

const Index = () => {
	return (
		<>
			<MenuAppBar />
			<Container>
				<Outlet />
			</Container>
		</>
	);
};

export default Index;
