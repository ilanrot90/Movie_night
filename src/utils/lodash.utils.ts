import keyBy from 'lodash/keyBy';
import map from 'lodash/map';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import startCase from 'lodash/startCase';
import fromPairs from 'lodash/fromPairs';
/*
import mapValues from 'lodash/mapValues';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import capitalize from 'lodash/capitalize';

const chainableFunctions = {
	map,
	// orderBy,
	// groupBy,
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
*/
export { fromPairs, startCase, map, debounce, /*orderBy, capitalize, chain, groupBy,*/ keyBy, isEmpty, get };
