import axios from 'axios';

export const methods = {
	GET: 'get',
	DELETE: 'delete',
	HEAD: 'head',
	OPTIONS: 'options',
	POST: 'post',
	PUT: 'put',
	PATCH: 'patch',
};

const BASE_URL = document.location.origin;

function createAxiosInstance() {
	return axios.create({
		baseURL: BASE_URL,
	});
}

const request = createAxiosInstance();

export function setHeaderToken(token?: string) {
	if (token) {
		request.defaults.headers.Authorization = token;
	} else {
		delete request.defaults.headers.Authorization;
	}
}

export { axios };
export default request;
