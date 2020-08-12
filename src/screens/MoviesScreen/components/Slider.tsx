import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

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

const SliderImage = styled.div`
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 700px;
	background-color: #006600;
`;
const slides = [1, 2, 3];

const ImageSlider = () => {
	const [currentSlideIdx, setCurrentSlide] = useState<number>(0);
	const timerId = useRef<number>();

	const showNextSlide = useCallback(() => {
		setCurrentSlide(prevState => (prevState + 1) % slides.length);
	}, [setCurrentSlide]);
	const showPrevSlide = useCallback(() => {
		setCurrentSlide(prevState => (prevState - 1 < 0 ? slides.length - 1 : prevState - 1));
	}, [setCurrentSlide]);
	const showSelectedSlide = useCallback(
		(slideIdx: number) => () => {
			setCurrentSlide(slideIdx);
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
			<SliderImage>{slides[currentSlideIdx]}</SliderImage>
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
