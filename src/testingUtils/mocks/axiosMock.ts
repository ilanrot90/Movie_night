import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import axiosInstance from 'axiosRequest';
import { Method } from 'types';

type MockParams = {
	url: string;
	responseData?: any;
	method?: Method;
	status?: number;
	data?: any;
	responseHeaders?: any;
};

const methodsMap = {
	GET: 'onGet',
	POST: 'onPost',
} as const;

class MocksManager {
	private mock: MockAdapter;
	constructor(axiosInstance: AxiosInstance) {
		this.mock = new MockAdapter(axiosInstance);
	}
	initialize = (axiosInstance: AxiosInstance) => {
		this.mock = new MockAdapter(axiosInstance);
	};

	mockRequest = ({ url, status, method = 'GET', data = {}, responseData = {}, responseHeaders = {} }: MockParams) => {
		this.mock[methodsMap[method]](url, data).replyOnce(status || 200, responseData, responseHeaders);
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
