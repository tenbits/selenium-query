import { async_getValueOf } from "../utils/async";
import { node_eval } from "../utils/node";

export const DriverProto = {
	eval: function evaluate (mix, ...args) {
		return async_getValueOf(0, this, node => {
			return node_eval(node, mix, ...args);
		});
	}
};
