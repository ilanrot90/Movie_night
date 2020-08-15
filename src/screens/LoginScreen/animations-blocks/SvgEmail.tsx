import { motion, useMotionValue, useTransform } from 'framer-motion';
import React, { useMemo } from 'react';
import usePrevious from 'hooks/usePrevious';
// style
import { MarginContainer, Text } from '../style';
import styled from 'styled-components';

const LoadingText = styled(Text)`
	position: absolute;
	bottom: 0;
	left: 115px;
`;
const SvgContainer = styled(MarginContainer)`
	position: relative;
	max-width: 280px;
`;

const tickVariants = {
	done: { pathLength: 1 },
	initial: { pathLength: 0 },
};
const boxVariants = {
	hover: { scale: 1.05, strokeWidth: 60 },
	pressed: { scale: 0.95, strokeWidth: 35 },
	done: { stroke: '#FF008C' },
	initial: { stroke: '#ddd', strokeWidth: 50 },
};

const loadingProps = {
	start: { fill: ['#642f2f', '#a25353'] },
	end: { fill: ['#ca12f3', '#A35BB4'] },
};

interface Props {
	startAnimation: boolean;
}

export const EmailSvg = ({ startAnimation }: Props) => {
	const pathLength = useMotionValue(0);
	const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
	const animationDone = usePrevious(startAnimation);
	const finalAnimation = useMemo(() => animationDone && !startAnimation, [animationDone, startAnimation]);
	return (
		<SvgContainer auto>
			<motion.svg
				initial={false}
				animate={finalAnimation ? 'done' : 'initial'}
				whileHover="hover"
				whileTap="pressed"
				width="280"
				height="100"
				viewBox="0 0 500 500"
			>
				<motion.path
					d="M 72 136 C 72 100.654 100.654 72 136 72 L 304 72 C 339.346 72 368 100.654 368 136 L 368 304 C 368 339.346 339.346 368 304 368 L 136 368 C 100.654 368 72 339.346 72 304 Z"
					fill="transparent"
					strokeWidth="50"
					stroke="#FF008C"
					variants={boxVariants}
				/>
				<g transform="scale(2.5) translate(38, 38)">
					<motion.path
						initial={false}
						animate={startAnimation ? loadingProps.start : loadingProps.end}
						d="M88 2H12C6.477 2 2 6.477 2 12v76c0 5.523 4.477 10 10 10h76c5.523 0 10-4.477 10-10V12c0-5.523-4.477-10-10-10z"
					/>
					<g fill="#FFF">
						<path d="M73.315 36.965L52.347 49.742a4.564 4.564 0 0 1-4.694.035L26.486 37.334A4.194 4.194 0 0 0 26 39.265v21.47c0 2.35 1.92 4.26 4.27 4.26h39.47c2.35 0 4.26-1.91 4.26-4.26v-21.47c0-.849-.256-1.635-.685-2.3z" />
						<path d="M51.306 48.034l20.483-12.481a4.208 4.208 0 0 0-2.049-.548H30.27c-.915 0-1.76.296-2.457.789l20.854 12.26c.818.481 1.83.474 2.639-.02z" />
					</g>
				</g>
				<motion.path
					d="M 0 128.666 L 128.658 257.373 L 341.808 0"
					transform="translate(54.917 88.332) rotate(-4 170.904 128.687)"
					fill="transparent"
					strokeWidth="65"
					stroke="hsl(0, 0%, 100%)"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={tickVariants}
					style={{ pathLength, opacity }}
					custom={finalAnimation}
				/>
				<motion.path
					d="M 0 128.666 L 128.658 257.373 L 341.808 0"
					transform="translate(54.917 68.947) rotate(-4 170.904 128.687)"
					fill="transparent"
					strokeWidth="65"
					stroke="#7700FF"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={tickVariants}
					style={{ pathLength, opacity }}
					custom={finalAnimation}
				/>
			</motion.svg>
			{startAnimation && (
				<LoadingText as={'span'} size={10}>
					loading...
				</LoadingText>
			)}
		</SvgContainer>
	);
};
