import { async_each, async_getValueOf } from '../utils/async'
import { node_eval } from '../utils/node';

declare var scripts_nodeClassHas: any;
declare var scripts_nodeClassAdd: any;
declare var scripts_nodeClassRemove: any;
declare var scripts_nodeClassToggle: any;

export const ClassProto = {
	hasClass (name): PromiseLike<boolean> {
		return <PromiseLike<boolean>> async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeClassHas, name);
		});
	},
	addClass: classMutationDelegate(scripts_nodeClassAdd),
	removeClass: classMutationDelegate(scripts_nodeClassRemove),
	toggleClass: classMutationDelegate(scripts_nodeClassToggle),
};

function classMutationDelegate(fn) {
	return function (name) {
		return async_each(this, ($, node) => {
			return node_eval(node, fn, name)
				.done(() => $.add(node));
		});
	};
}
