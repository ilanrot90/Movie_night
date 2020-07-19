import styled from 'styled-components';
import { PageContainer } from 'style/sharedStyle';
import Button from 'components/common-ui/Button';

export const Container = styled(PageContainer)`
	width: 100%;
	height: 100vh;
	${({ theme }) => theme.utils.centerFlex};
`;

export const FormContainer = styled.div`
	width: 40%;
	min-width: 320px;
	padding: ${({ theme }) => theme.spacing.s}px;
`;

export const LoginButton = styled(Button)`
	margin: ${({ theme }) => theme.spacing.m}px 0;
`;
