import React, { useCallback, useEffect, useState } from 'react';
// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { authAtom } from 'state/atoms/authAtom';
import { themeAtom } from 'state/atoms/styleAtom';
// utils
import { debounce } from 'utils/lodash.utils';
// components
import SearchInput from 'components/common-ui/SearchInput';
import Switch from 'components/common-ui/SwitchComponent';
// style
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { Text } from 'style/sharedStyle';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/MenuList';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

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

const useStyles = makeStyles((theme: any) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			padding: theme.spacing(1),
		},
		menu: {
			backgroundColor: theme.palette.primary.dark,
		},
		item: {
			height: 60,
		},
	})
);

type Listener = EventListenerOrEventListenerObject;
const isDarkTheme = (theme: string) => theme === 'dark';

export default function MenuAppBar() {
	const classes = useStyles();
	const user = useRecoilValue(authAtom);
	const [theme, setTheme] = useRecoilState(themeAtom);
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null) as React.MutableRefObject<HTMLInputElement>;
	const [isOnTop, setPositionTop] = useState<boolean>(true);

	useEffect(() => {
		const handleScroll: Listener = () => {
			const scrollToList = !(document.body.scrollTop > 50);
			setPositionTop(scrollToList);
		};
		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('mousedown', handleScroll);
		};
	});
	const handleChange = useCallback((value: string) => {
		console.log({ value });
	}, []);

	const handleToggle = useCallback(() => {
		setOpen(prevOpen => !prevOpen);
	}, []);

	const changeTheme = useCallback((isDarkTheme: boolean) => {
		const theme = isDarkTheme ? 'dark' : 'light';
		setTheme(theme);
	}, []);

	return (
		<>
			<TopNav isOnTop={!isOnTop} ref={anchorRef} aria-controls={open ? 'menu-list' : undefined}>
				<IconButton
					className={classes.menuButton}
					onClick={handleToggle}
					aria-label="account of current user"
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
			<Popper open={open} anchorEl={anchorRef.current} transition disablePortal placement={'bottom-start'}>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps}>
						<Paper>
							<ClickAwayListener onClickAway={handleToggle}>
								<List className={classes.menu} autoFocusItem={open} id="menu-list">
									<ListSubheader>
										<Text size={12} as={'span'}>
											Welcome {user?.displayName}
										</Text>
									</ListSubheader>
									<Divider />
									<ListItem className={classes.item}>
										<ListItemSecondaryAction>
											<Switch
												name={'theme-selector'}
												label={
													<Text size={12} as={'span'}>
														Dark theme
													</Text>
												}
												onChange={changeTheme}
												initialValue={isDarkTheme(theme)}
											/>
										</ListItemSecondaryAction>
									</ListItem>
								</List>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
}
