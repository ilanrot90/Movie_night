import React, { FC } from 'react';

type Props = {
	item: {
		title: string;
		imageUrl: string;
	};
};

const MovieCard: FC<Props> = ({ item }) => {
	return <div>{item.title}</div>;
};

export default React.memo<Props>(MovieCard);
