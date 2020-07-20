import styled from 'styled-components';
import { PageContainer, Text } from 'style/sharedStyle';
import Button from 'components/common-ui/Button';
import { motion } from 'framer-motion';
export { StyledLink, Hr } from 'style/sharedStyle';
export const Container = styled(PageContainer)`
	width: 100%;
	height: 100vh;
	${({ theme }) => theme.utils.centerFlex};
`;

export const FormContainer = styled.div`
	width: 40%;
	min-width: 320px;
	padding: ${({ theme }) => `${theme.spacing.m}px ${theme.spacing.m}px ${theme.spacing.xxl}px`};
	overflow: hidden;
	background-color: ${({ theme }) => theme.dark};
	height: 600px;
	border-radius: 4px;
	box-shadow: ${({ theme }) => theme.shadow.m};
`;

export const Form = styled(motion.div).attrs({
	variants: {
		initial: {
			opacity: 0,
			scale: 0.8,
		},
		in: {
			opacity: 1,
			scale: 1,
		},
		out: {
			opacity: 0,
			scale: 1.2,
		},
	},
	transition: {
		type: 'tween',
		ease: 'anticipate',
		duration: 0.5,
	},
	initial: 'initial',
	animate: 'in',
	exit: 'out',
})`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const Header = styled.div`
	width: 100%;
	height: 110px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

// login form
export const FormBlock = styled.form`
	margin-bottom: ${({ theme }) => theme.spacing.m}px;
`;

export const Content = styled(Text)`
	margin: ${({ theme }) => theme.spacing.m}px auto;
	max-width: fit-content;
`;

export const LoginButton = styled(Button)`
	margin: ${({ theme }) => theme.spacing.m}px 0;
	& .icon {
		position: absolute;
		top: 10px;
		left: 24px;
	}
`;
export const Footer = styled(Text)`
	margin-top: auto;
	align-self: center;
`;
