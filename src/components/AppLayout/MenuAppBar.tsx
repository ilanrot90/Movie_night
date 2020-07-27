import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { debounce } from 'utils/lodash.utils';
import SearchInput from 'components/common-ui/SearchInput';
import { Text } from 'style/sharedStyle';

const TopNav = styled.div<{ isOnTop: boolean }>`
	max-width: 100%;
	height: 60px;
	position: sticky;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${({ theme, isOnTop }) => (isOnTop ? 'transparent' : theme.dark)};
	transition: background-color 0.125s ease-in;
	padding: ${({ theme }) => theme.spacing.m}px;
`;

const Input = styled.div`
	margin: auto 0;
`;

const Title = styled(Text)`
	margin-left: ${({ theme }) => theme.spacing.xxl * 4}px;
`;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			padding: theme.spacing(1),
		},
	})
);

type Listener = EventListenerOrEventListenerObject;

export default function MenuAppBar() {
	const classes = useStyles();
	const [isOnTop, setPositionTop] = useState<boolean>(true);
	useEffect(() => {
		const handleScroll: Listener = e => {
			const scrollToList = !(document.body.scrollTop > 50);
			setPositionTop(scrollToList);
		};
		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('mousedown', handleScroll);
		};
	});
	const handleChange = (value: string) => {
		console.log({ value });
	};

	return (
		<TopNav isOnTop={!isOnTop}>
			<IconButton
				className={classes.menuButton}
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				color="inherit"
			>
				<Avatar>IR</Avatar>
			</IconButton>
			<Title as="h1" size={22}>
				Title
			</Title>
			<Input>
				<SearchInput callBack={debounce(handleChange, 500)} />
			</Input>
		</TopNav>
	);
}
