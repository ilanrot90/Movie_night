import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { PageContainer } from 'style/sharedStyle';

const Container = styled(PageContainer)`
	${({ theme }) => theme.utils.centerFlex};
`;

const AppLayout = () => {
	return (
		<Container>
			<Outlet />
		</Container>
	);
};

export default AppLayout;
