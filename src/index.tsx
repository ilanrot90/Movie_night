import ReactDOM from 'react-dom';
import React, { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'normalize.css';
import ThemeProvider from 'style/ThemeProvider';

interface IProps {
	children: ReactElement;
}

const Root = ({ children }: IProps) => {
	return (
		<RecoilRoot>
			<ThemeProvider>
				<BrowserRouter children={children} />
			</ThemeProvider>
		</RecoilRoot>
	);
};

const root = document.getElementById('root') as HTMLElement;
ReactDOM.unstable_createRoot(root).render(
	<Root>
		<App />
	</Root>
);
