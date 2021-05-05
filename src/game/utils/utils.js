import _ from "lodash";

const all = (entities, ...predicates) => {
	if (!entities) return;
	if (!predicates || predicates.length < 1) return entities;

	if (Array.isArray(entities))
		return entities.filter(e => _.every(predicates, p => p(e)))

	return Object.keys(entities).filter(key => _.every(predicates, p => p(entities[key]))).map(key => entities[key])
}

const allKeys = (entities, ...predicates) => {
	if (!entities) return;
	if (!predicates || predicates.length < 1) return Object.keys(entities);

	return Object.keys(entities).filter(key => _.every(predicates, p => p(entities[key])));
}

//-- https://stackoverflow.com/a/7616484/138392
const getHashCode = str => {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const positive = val => Math.abs(val)

const negative = val => {
	if (val > 0) return -val
	return val
}

const remap = (n, start1, stop1, start2, stop2) => {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

const constrain = (n, low, high) => {
  return Math.max(Math.min(n, high), low);
}

const between = (n, low, high) => {
  return n > low && n < high
}

const pipe = (...funcs) => _.flow(_.flatten(funcs || []))

const id = (seed = 0) => (prefix = "") => `${prefix}${++seed}`

const cond = (condition, func) => {
	return (args) => {
		const test = _.isFunction(condition) ? condition(args) : condition
		return test ? func(args) : args
	}
}

const log = label => data => {
	// console.log(label, data);
	return data;
}

const randomInt = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1) + min);

const throttle = (func, interval, defaultValue) => {
	let last = 0;
	return (...args) => {
		const current = performance.now();
		if ((current - last) > interval) {
			last = current;
			return func(...args);
		} else {
			return _.isFunction(defaultValue) ? defaultValue(...args) : defaultValue;
		}
	}
}

const getParamSafely = (obj, path) => {
	return path.split('.').reduce((o, x) => o === undefined ? o : o[x], obj)
}

const screen = window.screen;

const find = _.find;
const filter = _.filter;
const clamp = constrain;
const once = _.once;
const memoize = _.memoize;
export {
	find,
	filter,
	all,
	allKeys,
	getHashCode,
	positive,
	negative,
	remap,
	constrain,
	clamp,
	between,
	pipe,
	id,
	cond,
	log,
	randomInt,
	once,
	memoize,
	throttle,
	getParamSafely,
	screen,
}