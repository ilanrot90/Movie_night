import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import axiosInstance from 'axiosRequest';
import { Method } from 'types';

type MockParams = {
	url: string;
	method: Method;
	status?: number;
	data?: any;
	responseData?: any;
	responseHeaders?: any;
};

const methodsMap = {
	GET: 'onGet' as 'onGet',
	POST: 'onPost' as 'onPost',
};

class MocksManager {
	private mock: MockAdapter;
	constructor(axiosInstance: AxiosInstance) {
		this.mock = new MockAdapter(axiosInstance);
	}
	initialize = (axiosInstance: AxiosInstance) => {
		this.mock = new MockAdapter(axiosInstance);
	};

	mockRequest = ({ url, status = 200, method = 'GET', data = {}, responseData = {}, responseHeaders = {} }: MockParams) => {
		this.mock[methodsMap[method]](url, data).replyOnce(status, responseData, responseHeaders);
	};

	// validate = (): Promise<any> => {
	// 	return waitFor(() => {
	// 		const uncalledHandlers = JSON.stringify(this.mock.handlers, null, 2).filter(handler => handler.called === 0);
	//
	// 		if (uncalledHandlers.length) {
	// 			const handlersInfo = uncalledHandlers
	// 				.map(handler => {
	// 					const handlerInfo = JSON.stringify(handler.slice(0, 2));
	// 					return `Handler not called: ${handlerInfo}`;
	// 				})
	// 				.join('\n');
	//
	// 			throw new Error(`Uncalled handlers:\n ${handlersInfo}`);
	// 		}
	// 	});
	// };
	validate = () => {
		this.mock.resetHandlers();
	};

	reset = () => {
		this.mock.reset();
	};
}

export default new MocksManager(axiosInstance);
