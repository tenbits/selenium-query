var ProtoManip = {
	attr (key, val = null) {
		if (arguments.length === 1) {
			return async_get(this, node => {
				return node.getAttribute(key);
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeSetAttr, key, val);
		});
	},
	val (val = null) {
		if (arguments.length === 0) {
			return async_get(this, node => {
				return node_eval(node, scripts_nodeProp, 'value')
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeProp, 'value', val);
		});
	},
	text (str = null) {
		if (arguments.length === 0) {
			return async_aggr('', this, (accum, node) => {
				return node_eval(node, scripts_nodeProp, 'textContent').then(val => accum + val)
			});
		}
		return async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeProp, 'textContent', str).then(() => node);
		});
	}
};