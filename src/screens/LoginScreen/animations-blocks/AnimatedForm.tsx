import React, { FC, ReactElement, useCallback, useEffect } from 'react';
import { useFirebase, resetState } from 'state/context/loginContext';
// components
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Logo from './SvgLogo';
// style
import { Footer, Header, Content, StyledLink, Form } from '../style';

const Alert = (props: AlertProps) => {
	return <MuiAlert data-testid={'login-screens-error-msg'} elevation={6} variant="filled" {...props} />;
};

interface IProps {
	title: string;
	footer: string;
	link: {
		to: string;
		text: string;
	};
	children: ReactElement;
}

const AnimatedForm: FC<IProps> = ({ title, footer, link, children }) => {
	const [{ error }, dispatch] = useFirebase();
	const handleResetError = useCallback(() => {
		resetState(dispatch);
	}, [dispatch]);
	useEffect(() => {
		return () => {
			resetState(dispatch);
		};
	}, [dispatch]);

	return (
		<>
			<Form>
				<Header>
					<Logo />
					<Content as={'h1'} size={14}>
						Please {title} to continue
					</Content>
				</Header>
				{children}
				<Footer as="span">
					{footer} <StyledLink to={link.to}> {link.text}</StyledLink>
				</Footer>
			</Form>
			<Snackbar open={!!error} autoHideDuration={3000} onClose={handleResetError}>
				<Alert onClose={handleResetError} severity="error">
					{error}
				</Alert>
			</Snackbar>
		</>
	);
};

export default React.memo(AnimatedForm);
