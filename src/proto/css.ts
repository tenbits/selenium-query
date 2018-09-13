import { async_getValueOf, async_mutate } from "../utils/async";
import { node_eval } from "../utils/node";

declare var scripts_nodeCss: any;
declare var scripts_nodeProperty: any;
declare var scripts_nodeFunctionCall: any;


export const CssProto = {
	css(mix, val = null) {
		if (arguments.length === 1 && typeof mix === 'string') {
			return async_getValueOf(0, this, node => {
				return node.getCssValue(mix);
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeCss, mix, val);
		});
	},
	height(val = null) {
		if (val == null) {
			return async_getValueOf(0, this, node => {
				return node.getSize().then(x => x.height);
			});
		}
		return this.css('height', val);
	},
	innerHeight(val) {
		return async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeProperty, 'offsetHeight');
		});
	},
	width(val = null) {
		if (val == null) {
			return async_getValueOf(0, this, node => {
				return node.getSize().then(x => x.width);
			});
		}
		return this.css('width', val);
	},
	innerWidth(val) {
		return async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeProperty, 'offsetWidth');
		});
	},
	offset() {
		return async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeFunctionCall, 'getBoundingClientRect')
				.then(x => ({ top: x.top, left: x.left }));
		});
	},
	position() {
		return async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeProperty, 'offsetTop')
				.then(top => {
					return node_eval(node, scripts_nodeProperty, 'offsetLeft')
						.then(left => {
							return { top, left }
						});
				});
		});
	},
	scrollTop(...args) {
		return async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeProperty, 'scrollTop', ...args);
		});
	},
	scrollLeft(...args) {
		return async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeProperty, 'scrollLeft', ...args);
		});
	}
};
