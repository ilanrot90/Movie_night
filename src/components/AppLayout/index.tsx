import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { PageContainer, HEADER_HEIGHT } from 'style/sharedStyle';
import MenuAppBar from './MenuAppBar';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryConfigProvider } from 'react-query';

const Container = styled(PageContainer)`
	position: relative;
	height: calc(100vh - ${HEADER_HEIGHT});
	${({ theme }) => theme.utils.scrollbar}
	overflow-x: hidden;
`;

const queryConfig = {
	queries: {
		suspense: true,
		useErrorBoundary: true,
		retry: 2,
	},
};

const Index = () => {
	return (
		<ReactQueryConfigProvider config={queryConfig}>
			<MenuAppBar />
			<Container>
				<Outlet />
			</Container>
			<ReactQueryDevtools />
		</ReactQueryConfigProvider>
	);
};

export default Index;
