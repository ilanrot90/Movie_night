import React from 'react';
import { keyBy } from 'utils/lodash.utils';
import styled from 'styled-components';
import { isTest } from 'utils/common';
import iconPaths from './selection.json'; // the file exported from IcoMoon

const Svg = styled.svg<{ hoverColor?: string }>`
	fill: ${({ theme, color }) => color || theme.contrastText};
	&:hover {
		fill: ${({ hoverColor }) => hoverColor};
	}
`;
const iconPathsHash = keyBy(iconPaths.icons, i => i.properties.name);

function getPath(iconName: string) {
	if (iconName === '') return '';
	const iconSvg = iconPathsHash[iconName];

	if (iconSvg) {
		return iconSvg.icon.paths.join(' ');
	}
	if (isTest) {
		throw new Error(`icon ${iconName} does not exist.`);
	}
	console.warn(`icon ${iconName} does not exist.`);
	return '';
}

export type Props = {
	name: string;
	className?: string;
	width?: number;
	height?: number;
	size?: number;
	style?: { [key: string]: string };
	color?: string;
	hoverColor?: string;
	rest?: any;
};

const Icon = ({ name, className, width, height, size = 16, style, color, hoverColor, ...rest }: Props) => (
	<Svg
		className={`${className} icon-${name} icon`}
		width={width || size}
		height={height || size}
		viewBox="0 0 1024 1024"
		{...rest}
		color={color}
		hoverColor={hoverColor}
	>
		<g id={name}>
			<path d={getPath(name)} />
		</g>
	</Svg>
);

export default Icon;
