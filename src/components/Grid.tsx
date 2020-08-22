import React, { FC, NamedExoticComponent } from 'react';
import { GridContainer, GridItem } from 'style/sharedStyle';

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
