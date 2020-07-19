import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';

const chainableFunctions = {
	map,
	orderBy,
	groupBy,
};

const chain = (input: any) => {
	let value = input;
	const wrapper = {
		...mapValues(chainableFunctions, (f: typeof Function) => (...args: any) => {
			value = f(...args);
			return wrapper;
		}),
		value: () => value,
	};

	return wrapper;
};

export { chain, map, orderBy, groupBy, keyBy, isEmpty, get };
