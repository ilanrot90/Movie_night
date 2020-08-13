import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const Slider = styled.div`
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
})<{ url: string }>`
	background-size: cover;
	background-image: url(${({ url }) => url});
	background-position: center;
	background-repeat: no-repeat;
	height: 700px;
`;

const slides = [
	'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
	'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
	'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
];

const ImageSlider = () => {
	const [[currentSlideIdx, showNext], setCurrentSlide] = useState<[number, boolean]>([0, true]);
	const timerId = useRef<number>();

	const showNextSlide = useCallback(() => {
		setCurrentSlide(([prevCurrentSlideIdx]) => [(prevCurrentSlideIdx + 1) % slides.length, true]);
	}, [setCurrentSlide]);

	const showPrevSlide = useCallback(() => {
		setCurrentSlide(([prevCurrentSlideIdx]) => [
			prevCurrentSlideIdx - 1 < 0 ? slides.length - 1 : prevCurrentSlideIdx - 1,
			false,
		]);
	}, [setCurrentSlide]);

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
		}, 5000);
	}, [showNextSlide, timerId, clearTimer]);

	useEffect(() => {
		startTimer();
		return () => {
			clearTimer();
		};
	}, [currentSlideIdx, clearTimer, startTimer]);

	return (
		<Slider onMouseEnter={clearTimer} onMouseLeave={startTimer}>
			<SliderImage url={slides[currentSlideIdx]} key={currentSlideIdx} custom={showNext} />
			<SliderArrows>
				<SliderArrow onClick={showNextSlide} />
				<SliderArrow leftArrow onClick={showPrevSlide} />
			</SliderArrows>
			<SliderIndicator>
				{Array.from({ length: slides.length }).map((_, i) => (
					<SliderNav key={i} isActive={i === currentSlideIdx} onClick={showSelectedSlide(i)} />
				))}
			</SliderIndicator>
		</Slider>
	);
};

export default React.memo(ImageSlider);
