import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

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
	flex-direction: column;
	background-image: ${({ theme }) => theme.background};
`;
// text component
interface ITextProps {
	size?: number;
	weight?: number;
	color?: string;
}
export const Text = styled.p.attrs(({ as }: { as?: 'p' | 'div' | 'span' | 'h2' | 'h1' }) => ({
	as,
}))<ITextProps>`
	${({ theme, color, size, weight }) => css`
		font-size: ${size || theme.text.m}px;
		font-weight: ${weight || 300};
		color: ${color || theme.contrastText};
	`}
`;
// link component
interface ILinkProps {
	color?: string;
	hoverColor?: string;
	underline?: string;
	size?: number;
}
export const StyledLink = styled(Link)<ILinkProps>`
	color: ${({ theme, color }) => color || theme.main};
	font-size: ${({ size, theme }) => size || theme.text.m}px;
	${({ underline }) =>
		underline &&
		css`
			text-decoration: underline;
		`};
	transition: all ${({ theme }) => theme.utils.quickTransition};
	&:hover {
		font-weight: 500;
		color: ${({ theme, hoverColor }) => hoverColor || theme.light};
	}
`;

export const Hr = styled(Divider)<{ size?: 's' | 'm' | 'xl' | 'l' }>`
	margin: ${({ theme, size = 'm' }) => theme.spacing[size]}px 0;
	background-color: ${({ theme }) => theme.contrastText};
`;
const getCssAttribute = (value: string | number = 0) => (Number(value) ? `${value}px` : value);

export const MarginContainer = styled.div<{
	auto?: boolean;
	top?: number | string;
	left?: number | string;
	right?: number | string;
	bottom?: number | string;
}>`
	${({ auto, ...props }) =>
		auto
			? `margin: auto;`
			: css`
					margin-top: ${getCssAttribute(props.top)};
					margin-left: ${getCssAttribute(props.left)};
					margin-right: ${getCssAttribute(props.right)};
					margin-bottom: ${getCssAttribute(props.bottom)};
			  `}
`;

export const scrollbar = css`
	overflow: overlay;
	&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
		background-color: #ffffff;
	}
	&::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: rgba(166, 185, 200, 0.75);
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 4px;
		background-color: rgba(166, 185, 200, 0.75);
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: rgba(166, 185, 200, 1);
	}

	&:hover::-webkit-scrollbar {
		width: 8px;
		height: 6px;
	}
`;

export const HEADER_HEIGHT = '76px';
