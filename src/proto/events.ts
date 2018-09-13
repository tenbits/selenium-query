import { async_each, async_mutate } from "../utils/async";
import { node_eval } from "../utils/node";

declare var scripts_nodeTrigger: any;
declare var scripts_nodeSelectOption: any;
declare var scripts_nodeSelectTextRange: any;
declare var scripts_nodeFunctionCall: any;

export const EventsProto = {
	click() {
		return async_each(this, ($, node) => {
			return node.click().then(() => {
				$.add(node);
			});
		});
	},
	trigger(type, ...args) {
		return async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeTrigger, type, ...args)
				.done(() => $.add(node));
		});
	},
	select(...args) {

		return async_mutate(this, (node, $) => {
			return node.getTagName().then(name => {
				var fn = name === 'select' ?
					scripts_nodeSelectOption :
					scripts_nodeSelectTextRange;

				return node_eval(node, fn, ...args);
			});
		});
	},

	focus: callerFn('focus'),
	blur: callerFn('blur')
};

function callerFn(name) {
	return function () {
		return async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeFunctionCall, name)
				.done(() => $.add(node));
		});
	};
}