import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Grid from 'components/Grid';
import { MainContainer, Title } from '../style';
import { useQuery } from 'react-query';

const items = [
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
	},
	{
		title: 'movie',
		imageUrl:
			'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
	},
];

const MoviesGrid = () => {
	const { data, isFetching } = useQuery(
		'movies-list',
		async () => {
			const source = axios.CancelToken.source();
			const { data } = await axios.get('https://yts.mx/api/v2/list_movies.json?page=1', {
				cancelToken: source.token,
			});

			return data;
		},
		{
			suspense: true,
		}
	);
	return (
		<MainContainer>
			<Title>latest movies</Title>
			<Grid items={items} gridCellComponent={MovieCard} />
		</MainContainer>
	);
};

export default React.memo(MoviesGrid);
