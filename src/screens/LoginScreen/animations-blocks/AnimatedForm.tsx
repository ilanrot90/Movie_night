import React, { FC, ReactElement, useCallback, useEffect } from 'react';
import { useFirebase, resetState } from 'state/context/loginContext';
// components
import SnackbarAlert from 'components/common-ui/SnackbarAlert';
import Logo from './SvgLogo';
// style
import { Footer, Header, Content, StyledLink, Form } from '../style';

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
			<SnackbarAlert open={!!error} handleResetError={handleResetError} error={error} />
		</>
	);
};

export default React.memo(AnimatedForm);
