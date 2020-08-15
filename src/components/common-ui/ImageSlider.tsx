import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import usePrevious from 'hooks/usePrevious';

const ImageSlider = styled.div`
	overflow: hidden;
	position: relative;
	display: flex;
	flex-direction: column;
`;

const SliderArrows = styled.div`
	height: 0;
	left: 0;
	position: absolute;
	top: calc(50% - 35px);
	width: 100%;
	z-index: 1;
`;

const SliderIndicator = styled.div`
	position: absolute;
	bottom: 10px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 10px;
`;

const SliderNav = styled.span<{ isActive?: boolean }>`
	width: 10px;
	height: 10px;
	cursor: pointer;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.dark};
	opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
	transition: opacity ${({ theme }) => theme.utils.quickTransition};
	&:hover {
		opacity: ${({ isActive }) => (isActive ? 1 : 0.75)};
	}
`;

const SliderArrow = styled.span<{ leftArrow?: boolean }>`
	background: none;
	border: none;
	height: 40px;
	opacity: 0.5;
	outline: none;
	position: absolute;
	transition: opacity ${({ theme }) => theme.utils.quickTransition};
	padding: 0;
	width: 21px;
	cursor: pointer;
	&:hover {
		opacity: 1;
	}

	&::after,
	&::before {
		background: ${({ theme }) => theme.dark};
		border-radius: 3px;
		content: '';
		display: block;
		height: 23px;
		position: absolute;
		width: 4px;
		left: 8px;
	}

	&::before {
		top: 0;
	}

	&::after {
		bottom: 0;
	}
	${({ leftArrow }) =>
		leftArrow
			? css`
					top: 0;
					left: 10px;

					&::before {
						transform: rotate(30deg);
					}

					&::after {
						transform: rotate(-30deg);
					}
			  `
			: css`
					top: 0;
					right: 10px;

					&::before {
						transform: rotate(-30deg);
					}

					&::after {
						transform: rotate(30deg);
					}
			  `}
`;

const SliderImage = styled(motion.div).attrs({
	variants: {
		initial: (showNext: boolean) => ({
			x: showNext ? '100%' : '-100%',
		}),
		in: {
			x: 0,
		},
		out: (showNext: boolean) => ({
			x: showNext ? '-100%' : '100%',
		}),
	},
	transition: {
		type: 'spring',
		stiffness: 300,
		damping: 200,
	},
	initial: 'initial',
	animate: 'in',
	exit: 'out',
})<{ url: string; prevSlide: string; custom: boolean }>`
	background-image: url(${({ url }) => url});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 700px;
	position: relative;
	&::before {
		background-image: url(${({ prevSlide }) => prevSlide});
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		content: '';
		position: absolute;
		height: 700px;
		width: 100%;
		left: ${({ custom }) => (custom ? -100 : 100)}%;
	}
`;

interface IProps {
	slides: string[];
	autoSlide?: boolean;
	timeFrame?: number;
}

const MAXIMUM_SET_TIMEOUT_VALUE = 2147483647;

const Slider: React.FC<IProps> = ({
	slides = [],
	autoSlide = true,
	timeFrame = autoSlide ? 5000 : MAXIMUM_SET_TIMEOUT_VALUE,
}) => {
	const [[currentSlideIdx, showNext], setCurrentSlide] = useState<[number, boolean]>([0, true]);
	const prevSlideIdx = usePrevious(currentSlideIdx) || 0;
	const timerId = useRef<number>();

	const showNextSlide = useCallback(() => {
		setCurrentSlide(([prevCurrentSlideIdx]) => [(prevCurrentSlideIdx + 1) % slides.length, true]);
	}, [setCurrentSlide, slides.length]);

	const showPrevSlide = useCallback(() => {
		setCurrentSlide(([prevCurrentSlideIdx]) => [prevCurrentSlideIdx === 0 ? slides.length - 1 : prevCurrentSlideIdx - 1, false]);
	}, [setCurrentSlide, slides.length]);

	const showSelectedSlide = useCallback(
		(slideIdx: number) => () => {
			setCurrentSlide(([prevCurrentSlideIdx]) => [slideIdx, prevCurrentSlideIdx < slideIdx]);
		},
		[setCurrentSlide]
	);

	const clearTimer = useCallback(() => {
		clearTimeout(timerId.current);
	}, [timerId]);

	const startTimer = useCallback(() => {
		timerId.current && clearTimer();
		timerId.current = setTimeout(() => {
			showNextSlide();
		}, timeFrame);
	}, [showNextSlide, timerId, clearTimer, timeFrame]);

	useEffect(() => {
		startTimer();
		return () => {
			clearTimer();
		};
	}, [currentSlideIdx, clearTimer, startTimer]);

	return (
		<ImageSlider onMouseEnter={clearTimer} onMouseLeave={startTimer}>
			<SliderImage prevSlide={slides[prevSlideIdx]} url={slides[currentSlideIdx]} key={currentSlideIdx} custom={showNext} />
			<SliderArrows>
				<SliderArrow onClick={showNextSlide} />
				<SliderArrow leftArrow onClick={showPrevSlide} />
			</SliderArrows>
			<SliderIndicator>
				{Array.from({ length: slides.length }).map((_, i) => (
					<SliderNav key={i} isActive={i === currentSlideIdx} onClick={showSelectedSlide(i)} />
				))}
			</SliderIndicator>
		</ImageSlider>
	);
};

export default React.memo(Slider);
