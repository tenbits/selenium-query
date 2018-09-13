import { async_each } from "../utils/async";
import { node_eval } from "../utils/node";

declare var scripts_nodeRemove: any

export const ManipulateProto = {
	remove() {
		return async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeRemove)
				.done(() => $.add(node));
		});
	},
};

