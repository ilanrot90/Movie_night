import React, { FC, NamedExoticComponent } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div<{ minColumnSize?: number; rowHeight?: number }>`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(${({ minColumnSize = 320 }) => minColumnSize}px, 1fr));
	grid-auto-rows: ${({ rowHeight = 460 }) => rowHeight}px;
	gap: ${({ theme }) => theme.spacing.m}px;
`;

const GridItem = styled.div<{ imageUrl: string }>`
	position: relative;
	display: grid;
	box-shadow: ${({ theme }) => theme.shadow.m};
	width: 100%;
	height: 100%;
	border-radius: 4px;
	background-image: url(${({ imageUrl }) => imageUrl});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;

type Item<T> = {
	imageUrl: string;
	rest?: T;
};
type Props<T> = {
	items: Item<T>[];
	gridCellComponent: NamedExoticComponent<any> | FC<any>;
};

const Grid = <T,>({ items, gridCellComponent: Cell }: Props<T>) => {
	return (
		<GridContainer>
			{items.map((item, idx) => (
				<GridItem key={`${idx}_${item.imageUrl}`} imageUrl={item.imageUrl}>
					<Cell item={item} />
				</GridItem>
			))}
		</GridContainer>
	);
};

export default React.memo(Grid);
