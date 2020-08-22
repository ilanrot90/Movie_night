import { ValidationRules } from 'react-hook-form/dist/types/form';
// login values
export interface LoginTypes {
	name: 'email' | 'password' | 'passwordConfirm' | 'displayName';
	registerProps: ValidationRules;
	placeholder?: string;
	label?: string;
	type?: string;
}
export type FormValues = {
	email: string;
	password: string;
	passwordConfirm?: string;
	displayName?: string;
};
// firebase
export type Provider = 'google' | 'facebook' | 'github';

export type Method = 'GET' | 'POST';

export type Movie = {
	background_image: string;
	background_image_original: string;
	date_uploaded: typeof Date;
	date_uploaded_unix: number;
	description_full: string;
	genres: string[];
	id: number;
	imdb_code: string;
	language: string;
	large_cover_image: string;
	medium_cover_image: string;
	mpa_rating: '';
	rating: 6.7;
	runtime: 0;
	slug: string;
	small_cover_image: string;
	state: 'ok';
	summary: string;
	synopsis: string;
	title: string;
	title_english: string;
	title_long: string;
	torrents: { url: string; hash: string; peers: number; seeds: number; size: string }[];
	url: string;
	year: 2010;
	yt_trailer_code: string;
};

export type MoviesResponse = {
	limit: number;
	page_number: number;
	movie_count: number;
	movies: Movie[];
};

export type TMDBMovie = {
	id: number;
	video: boolean;
	vote_count: number;
	vote_average: number;
	title: string;
	release_date: string;
	original_language: string;
	original_title: string;
	genre_ids: number[];
	backdrop_path: string;
	adult: boolean;
	overview: string;
	poster_path: string;
	popularity: number;
	media_type: string;
};

export type TMDBMoviesResponse = TMDBMovie[];
