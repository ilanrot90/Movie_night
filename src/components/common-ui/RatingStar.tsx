import styled from 'styled-components';

export const RatingStar = styled.span<{ size: number; rating: number; initialSize?: number }>`
	width: ${({ size, initialSize = 10 }) => `calc(${size}px * ${initialSize})`};
	height: ${({ size }) => size}px;
	display: block;
	position: relative;
	&:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 0;
		width: 100%;
		background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-40 -40 80 80"><path fill="transparent" stroke="%23ffbc0b" stroke-width="2"  d="M 0.000 20.000 L 23.511 32.361 L 19.021 6.180 L 38.042 -12.361 L 11.756 -16.180 L 0.000 -40.000 L -11.756 -16.180 L -38.042 -12.361 L -19.021 6.180 L -23.511 32.361 L 0.000 20.000 "/></svg>');
	}
	&:after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
		width: ${({ size, rating }) => `calc(${size}px * ${rating})`};
		background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-40 -40 80 80"><path fill="%23ffbc0b" stroke="%23ffbc0b" stroke-width="2"  d="M 0.000 20.000 L 23.511 32.361 L 19.021 6.180 L 38.042 -12.361 L 11.756 -16.180 L 0.000 -40.000 L -11.756 -16.180 L -38.042 -12.361 L -19.021 6.180 L -23.511 32.361 L 0.000 20.000 "/></svg>');
	}
`;
