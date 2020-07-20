import React, { FC } from 'react';
import { Footer, Header, Content, StyledLink, Form } from './style';
import Logo from './SvgLogo';

interface IProps {
	title: string;
	link: {
		to: string;
		text: string;
	};
	children: React.ReactElement;
}

const AnimatedForm: FC<IProps> = ({ title, link, children }) => {
	return (
		<Form>
			<Header>
				<Logo />
				<Content>Please {title} to continue</Content>
			</Header>
			{children}
			<Footer as="span">
				Don`t have an account? <StyledLink to={link.to}> {link.text}</StyledLink>
			</Footer>
		</Form>
	);
};

export default React.memo(AnimatedForm);
