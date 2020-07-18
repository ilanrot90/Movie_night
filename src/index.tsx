import ReactDOM from 'react-dom';
import React, { ReactElement } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'normalize.css';

interface IProps {
	children: ReactElement;
}

const Root = ({ children }: IProps) => {
	return (
		<RecoilRoot>
			<StylesProvider injectFirst>
				<BrowserRouter children={children} />
			</StylesProvider>
		</RecoilRoot>
	);
};

const root = document.getElementById('root') as HTMLElement;
ReactDOM.unstable_createRoot(root).render(
	<Root>
		<App />
	</Root>
);
