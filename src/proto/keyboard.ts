import { async_each } from "../utils/async"
import { refs } from '../global'

const Key = refs.Key;
const aliases = {
	'ctrl': 'control',
	'backspace': 'back_space',
	'esc': 'escape',
	'left': 'arrow_left',
	'right': 'arrow_right',
	'up': 'arrow_up',
	'down': 'arrow_down',
};

export const KeyboardProto = {
	sendKeys(mix) {
		return async_each(this, ($, node) => {
			return node.sendKeys(mix).then(() => {
				$.add(node);
			});
		});
	},
	type(str) {
		var arr = toSequance(str),
			fn = getSequenceFunction(arr);
		return async_each(this, ($, node) => {
			return fn(node).then(() => {
				$.add(node);
			});
		});
	},
	press(str) {
		var key = toCombination(str);
		return async_each(this, ($, node) => {
			return node.sendKeys(key).then(() => {
				$.add(node);
			});
		});
	},
};

function toSequance(str) {
	var delimiter = '_%%%%%%_';
	str = str.replace(/\{([\w_]+)\}/g, function (full, name) {
		var key = (aliases[name] || name).toUpperCase();
		if (key in Key === false) {
			return full;
		}
		return delimiter + key + delimiter;
	});
	var parts = str.split(delimiter),
		i = 1,
		imax = parts.length;

	return parts.map((str, i) => {
		if (i % 2 === 0) {
			return str;
		}
		return Key[str];
	});
}
function toCombination(str) {
	var keys = str.split('+');
	keys.forEach((x, i) => {
		if (x === '') {
			keys[i] = '+';
			return;
		}
		if (isSpecial(x)) {
			keys[i] = getSpecial(x);
			return;
		}
	});
	if (keys.length === 0) {
		return keys[0];
	}
	return Key.chord(...keys);
};

function getSpecial(name) {
	var key = (aliases[name] || name).toUpperCase();
	return Key[key];
}
function isSpecial(name) {
	var key = (aliases[name] || name).toUpperCase();
	return key in Key;
}
function getSequenceFunction(arr) {
	return function (node) {
		var dfrs = arr.map(str => node.sendKeys(str));
		return dfrs[dfrs.length - 1];
	};
}
