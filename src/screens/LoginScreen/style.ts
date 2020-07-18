import styled from 'styled-components';
import { PageContainer } from 'style/sharedStyle';

export const Container = styled(PageContainer)`
	display: flex;
	width: 100%;
	height: 100vh;
	flex-direction: column;
	${({ theme }) => theme.utils.centerFlex};
	background-color: ${({ theme }) => theme.background};
`;
