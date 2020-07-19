import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const centerFlex = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const PageContainer = styled(motion.div).attrs({
	variants: {
		initial: {
			opacity: 0,
			x: '-100vw',
			scale: 0.8,
		},
		in: {
			opacity: 1,
			x: 0,
			scale: 1,
		},
		out: {
			opacity: 0,
			x: '100vw',
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
})``;

export const BaseContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	flex-direction: column;
	background-color: ${({ theme }) => theme.background};
`;
