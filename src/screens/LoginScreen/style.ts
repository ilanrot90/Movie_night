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
	padding: ${({ theme }) => theme.spacing.m}px;
	background-color: ${({ theme }) => theme.dark};
	height: 600px;
	border-radius: 4px;
	box-shadow: ${({ theme }) => theme.shadow.m};
`;
export const Header = styled.div`
	width: 100%;
	height: 110px;
	${({ theme }) => theme.utils.centerFlex}
`;

export const LoginButton = styled(Button)`
	margin: ${({ theme }) => theme.spacing.m}px 0;
	& .icon {
		position: absolute;
		top: 8px;
		left: 24px;
	}
`;
