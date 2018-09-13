import { async_getValueOf, async_mutate } from "../utils/async";
import { node_eval } from "../utils/node";

declare var scripts_nodeAttribute: any;
declare var scripts_nodeProperty: any;
declare var scripts_nodeDataset: any;

export const PropertiesProto = {
	attr(mix, val = null) {
		if (arguments.length === 1 && typeof mix === 'string') {
			return async_getValueOf(0, this, node => {
				return node.getAttribute(mix);
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeAttribute, mix, val);
		});
	},
	val(val = null) {
		if (arguments.length === 0) {
			return async_getValueOf(0, this, node => {
				return node_eval(node, scripts_nodeProperty, 'value')
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeProperty, 'value', val);
		});
	},
	data(key, val = null) {
		if (arguments.length === 1) {
			return async_getValueOf(0, this, node => {
				return node_eval(node, scripts_nodeDataset, key)
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeDataset, key, val);
		});
	},
	prop(key, val = null) {
		if (arguments.length === 1) {
			return async_getValueOf(0, this, node => {
				return node_eval(node, scripts_nodeProperty, key)
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeProperty, key, val);
		});
	}
};
