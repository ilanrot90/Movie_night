import styled from 'styled-components';
import { PageContainer } from 'style/sharedStyle';

export const Container = styled(PageContainer)`
	${({ theme }) => theme.utils.centerFlex};
`;
