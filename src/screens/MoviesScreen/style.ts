import styled from 'styled-components';
import { Text } from 'style/sharedStyle';

export const Title = styled(Text).attrs({
	as: 'h1',
})`
	margin: ${({ theme }) => theme.spacing.xxl}px 0;
	align-self: flex-end;
`;
export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.xl}px;
`;
