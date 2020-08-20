import React, { FC, NamedExoticComponent } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div<{ minColumnSize?: number; rowHeight?: number }>`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(${({ minColumnSize = 240 }) => minColumnSize}px, 1fr));
	grid-auto-rows: ${({ rowHeight = 360 }) => rowHeight}px;
	grid-column-gap: ${({ theme }) => theme.spacing.xl}px;
	grid-row-gap: ${({ theme }) => theme.spacing.xxl}px;
`;

const GridItem = styled.div`
	position: relative;
	display: grid;
	box-shadow: ${({ theme }) => theme.shadow.l};
	width: 100%;
	height: 100%;
	border-radius: 4px;
	transition: all ${({ theme }) => theme.utils.normalTransition};
	&:hover {
		transform: translateY(3px) scale(1.1);
	}
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
				<GridItem key={`${idx}_${item.imageUrl}`}>
					<Cell item={item} />
				</GridItem>
			))}
		</GridContainer>
	);
};

export default React.memo(Grid);
