import { async_aggr, async_each, async_getValueOf } from "../utils/async";
import { node_eval } from "../utils/node";

declare var scripts_nodeProperty: any;
declare var scripts_nodeFunctionCall: any;


export const ContentProto = {
	text(str = null) {
		if (arguments.length === 0) {
			return async_aggr('', this, (accum, node) => {
				return node_eval(node, scripts_nodeProperty, 'textContent').then(val => accum + val)
			});
		}
		return async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeProperty, 'textContent', str)
				.done(() => $.add(node));
		});
	},
	html(str = null) {
		if (arguments.length === 0) {
			return async_getValueOf(0, this, node => {
				return node_eval(node, scripts_nodeProperty, 'innerHTML')
			});
		}
		return async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeProperty, 'textContent', str)
				.done(() => $.add(node));
		});
	},
	append: inserter ('beforeend'),
	prepend: inserter('afterbegin'),
	before: inserter('beforebegin'),
	after: inserter('afterend')
};

function inserter (position) {
	return function (html: string) {
		return async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeFunctionCall, 'insertAdjacentHTML', position, html)
				.done(() => $.add(node));
		});
	};
}
