import React, { FC, ReactElement, useEffect } from 'react';
import { useFirebaseDispatch } from 'state/context/loginContext';
import { resetState } from 'state/context/loginActions';
import { Footer, Header, Content, StyledLink, Form } from '../style';
import Logo from './SvgLogo';

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
	const dispatch = useFirebaseDispatch();

	useEffect(() => {
		return () => {
			resetState(dispatch);
		};
	}, [dispatch]);

	return (
		<Form>
			<Header>
				<Logo />
				<Content>Please {title} to continue</Content>
			</Header>
			{children}
			<Footer as="span">
				{footer} <StyledLink to={link.to}> {link.text}</StyledLink>
			</Footer>
		</Form>
	);
};

export default React.memo(AnimatedForm);
