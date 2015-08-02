(function(){

	_.obj_extend(SQueryProto, {
		attr (key, val = null) {
			if (arguments.length === 1) {
				return async_getValueOf(0, this, node => {
					return node.getAttribute(key);
				});
			}
			return async_mutate(this, node => {
				return node_eval(node, scripts_nodeAttribute, key, val);
			});
		},
		val (val = null) {
			if (arguments.length === 0) {
				return async_getValueOf(0, this, node => {
					return node_eval(node, scripts_nodeProperty, 'value')
				});
			}
			return async_mutate(this, node => {
				return node_eval(node, scripts_nodeProperty, 'value', val);
			});
		},
		data (key, val = null) {
			if (arguments.length === 1) {
				return async_getValueOf(0, this, node => {
					return node_eval(node, scripts_nodeDataset, key)
				});
			}
			return async_mutate(this, node => {
				return node_eval(node, scripts_nodeDataset, key, val);
			});
		},
		prop (key, val = null) {
			if (arguments.length === 1) {
				return async_getValueOf(0, this, node => {
					return node_eval(node, scripts_nodeProperty, key)
				});
			}
			return async_mutate(this, node => {
				return node_eval(node, scripts_nodeProperty, key, val);
			});
		}
	});

}());