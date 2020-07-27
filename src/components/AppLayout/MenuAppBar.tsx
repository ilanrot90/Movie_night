import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { debounce } from 'utils/lodash.utils';
import SearchInput from 'components/common-ui/SearchInput';

const TopNav = styled.div`
	max-width: 100%;
	height: 60px;
	position: sticky;
	display: flex;
	background-color: ${({ theme }) => theme.dark};
	padding: ${({ theme }) => theme.spacing.m}px;
`;

const Input = styled.div`
	margin: auto 0 auto auto;
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

export default function MenuAppBar() {
	const classes = useStyles();
	const handleChange = (value: string) => {
		console.log({ value });
	};

	return (
		<TopNav>
			<IconButton
				className={classes.menuButton}
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				color="inherit"
			>
				<Avatar>IR</Avatar>
			</IconButton>
			<Input>
				<SearchInput callBack={debounce(handleChange, 500)} />
			</Input>
		</TopNav>
	);
}
