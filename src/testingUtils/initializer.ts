import axiosInstance from 'axiosRequest';
import MocksManager from './mocks/axiosMock';
import { setupIntersectionObserverMock, restoreIntersectionObserverMock } from './mocks/IntersectionObserver';

const originalError = console.error;
// remove attribute not valid html - to mock 'framer-motion' and pass props to styled components
beforeAll(() => {
	setupIntersectionObserverMock();
	MocksManager.initialize(axiosInstance);
	console.error = (...args: Array<any>) => {
		if (
			/Warning.*not wrapped in act/.test(args[0]) ||
			/^Warning: React does not recognize the |`([a-zA-Z])`| prop on a DOM element./.test(args[0]) ||
			/^Warning: Received |`(true|false)`| for a non-boolean attribute/.test(args[0])
		) {
			return;
		}
		originalError.call(console, ...args);
	};
});

beforeEach(() => {
	MocksManager.reset();
});

afterEach(async () => {
	await MocksManager.validate();
});

afterAll(() => {
	console.error = originalError;
	restoreIntersectionObserverMock();
});
